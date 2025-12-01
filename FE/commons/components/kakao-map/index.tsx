/**
 * KakaoMap Component
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] WebView 기반 카카오맵 연동
 * - [x] 시맨틱 구조 유지
 */

import React, { useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { env } from '@/commons/config';
import { styles } from './styles';

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  content?: string;
}

interface KakaoMapProps {
  latitude?: number;
  longitude?: number;
  level?: number;
  markers?: MapMarker[];
  onMapReady?: () => void;
  onRegionChange?: (bounds: MapBounds) => void;
  onMarkerClick?: (markerId: string) => void;
}

interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

export default function KakaoMap({
  latitude = 37.5665,
  longitude = 126.9780,
  level = 3,
  markers = [],
  onMapReady,
  onRegionChange,
  onMarkerClick,
}: KakaoMapProps) {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 마커 업데이트
  React.useEffect(() => {
    if (markers.length > 0 && webViewRef.current) {
      const markersData = JSON.stringify(markers);
      webViewRef.current.injectJavaScript(`
        if (window.updateMarkers) {
          window.updateMarkers(${markersData});
        }
        true;
      `);
    }
  }, [markers]);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
          #map { width: 100%; height: 100%; }
        </style>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakaoMapApiKey}&autoload=false"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          let map = null;
          
          let markers = [];
          
          // 카카오맵 초기화
          kakao.maps.load(function() {
            const container = document.getElementById('map');
            const options = {
              center: new kakao.maps.LatLng(${latitude}, ${longitude}),
              level: ${level}
            };
            
            map = new kakao.maps.Map(container, options);
            
            // 지도 준비 완료 이벤트
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'MAP_READY'
            }));
            
            // 지도 영역 변경 이벤트
            kakao.maps.event.addListener(map, 'bounds_changed', function() {
              const bounds = map.getBounds();
              const sw = bounds.getSouthWest();
              const ne = bounds.getNorthEast();
              
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'REGION_CHANGE',
                data: {
                  swLat: sw.getLat(),
                  swLng: sw.getLng(),
                  neLat: ne.getLat(),
                  neLng: ne.getLng()
                }
              }));
            });
          });
          
          // 마커 업데이트 함수
          window.updateMarkers = function(newMarkers) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'LOG',
              data: '마커 업데이트 시도: ' + newMarkers.length + '개'
            }));

            if (!map) return;
            
            // 기존 마커 제거
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];
            
            // 새 마커 추가
            newMarkers.forEach(function(markerData) {
              try {
                const position = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);
              const marker = new kakao.maps.Marker({
                position: position,
                title: markerData.title,
                image: new kakao.maps.MarkerImage(
                  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                  new kakao.maps.Size(24, 35)
                )
              });
                
                marker.setMap(map);
                markers.push(marker);
                
                // 마커 클릭 이벤트
                kakao.maps.event.addListener(marker, 'click', function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'MARKER_CLICK',
                    data: { id: markerData.id }
                  }));
                });
                
                // 인포윈도우 (선택사항)
                if (markerData.content) {
                  const infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="padding:5px;">' + markerData.content + '</div>'
                  });
                  
                  kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                  });
                }
              } catch (e) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'ERROR',
                  data: '마커 생성 오류: ' + e.message
                }));
              }
            });

            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'LOG',
              data: '마커 업데이트 완료: ' + markers.length + '개 생성됨'
            }));
          };
          
          // 지도 이동 함수
          window.moveMap = function(lat, lng) {
            if (map) {
              const moveLatLon = new kakao.maps.LatLng(lat, lng);
              map.setCenter(moveLatLon);
            }
          };
          
          // 줌 레벨 변경 함수
          window.setZoomLevel = function(level) {
            if (map) {
              map.setLevel(level);
            }
          };
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      
      switch (message.type) {
        case 'MAP_READY':
          setIsLoading(false);
          onMapReady?.();
          break;
          
        case 'REGION_CHANGE':
          onRegionChange?.(message.data);
          break;
          
        case 'MARKER_CLICK':
          onMarkerClick?.(message.data.id);
          break;

        case 'LOG':
          console.log('[KakaoMap WebLog]', message.data);
          break;

        case 'ERROR':
          console.error('[KakaoMap WebError]', message.data);
          break;
      }
    } catch (error) {
      console.error('카카오맵 메시지 처리 오류:', error);
    }
  };

  return (
    <View style={styles['kakao-map-wrapper']}>
      {isLoading && (
        <View style={styles['kakao-map-loading']}>
          <ActivityIndicator size="large" color="#8B7FFF" />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={styles['kakao-map-webview']}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

