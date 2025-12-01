/**
 * KakaoMap Component
 * 버전: 2.1.0 (마커 표시 기능 추가)
 * 수정 시각: 2025-12-01
 */

import React, { useRef, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { env } from '@/commons/config';
import { styles } from './styles';

import { MarkerVariant } from '../marker';

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  content?: string;
  category?: MarkerVariant;
  price?: number;
  vendorName?: string;
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

  // markers가 변경될 때마다 WebView에 전달
  useEffect(() => {
    if (webViewRef.current && markers.length > 0) {
      const message = JSON.stringify({ type: 'UPDATE_MARKERS', markers });
      webViewRef.current.postMessage(message);
      console.log(`📍 [KakaoMap] 마커 업데이트: ${markers.length}개`);
    }
  }, [markers]);

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    #map { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    // 즉시 실행으로 로그 확인
    (function() {
      var map = null;
      var markers = [];

      // 커스텀 마커 SVG 정의
      var markerSVGs = {};
      markerSVGs.shirt = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" fill="white"/><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" stroke="#FF5C8D" stroke-width="4"/><g clip-path="url(#clip0_4178_448)"><path d="M20.1899 11.73L17.9999 11C17.9999 11.5304 17.7892 12.0391 17.4141 12.4142C17.039 12.7893 16.5303 13 15.9999 13C15.4695 13 14.9608 12.7893 14.5857 12.4142C14.2106 12.0391 13.9999 11.5304 13.9999 11L11.8099 11.73C11.5836 11.8054 11.3917 11.9592 11.2688 12.1637C11.146 12.3681 11.1002 12.6098 11.1399 12.845L11.4299 14.58C11.4489 14.6975 11.5092 14.8043 11.6 14.8813C11.6907 14.9582 11.8059 15.0003 11.9249 15H12.9999V20C12.9999 20.55 13.4499 21 13.9999 21H17.9999C18.2651 21 18.5195 20.8946 18.707 20.7071C18.8945 20.5196 18.9999 20.2652 18.9999 20V15H20.0749C20.1939 15.0003 20.3091 14.9582 20.3998 14.8813C20.4906 14.8043 20.5509 14.6975 20.5699 14.58L20.8599 12.845C20.8996 12.6098 20.8538 12.3681 20.731 12.1637C20.6081 11.9592 20.4162 11.8054 20.1899 11.73Z" stroke="#FF5C8D" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_4178_448"><rect width="12" height="12" fill="white" transform="translate(10 10)"/></clipPath></defs></svg>';
      markerSVGs.camera = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#B885FA"/><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" fill="white"/><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" stroke="#B885FA" stroke-width="4"/><path d="M16.9985 12C17.1789 12 17.3559 12.0488 17.5109 12.1412C17.6658 12.2336 17.7928 12.3663 17.8785 12.525L18.1215 12.975C18.2072 13.1337 18.3342 13.2664 18.4891 13.3588C18.6441 13.4512 18.8211 13.5 19.0015 13.5H20C20.2652 13.5 20.5196 13.6054 20.7071 13.7929C20.8946 13.9804 21 14.2348 21 14.5V19C21 19.2652 20.8946 19.5196 20.7071 19.7071C20.5196 19.8946 20.2652 20 20 20H12C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19V14.5C11 14.2348 11.1054 13.9804 11.2929 13.7929C11.4804 13.6054 11.7348 13.5 12 13.5H12.9985C13.1787 13.5 13.3556 13.4513 13.5104 13.3591C13.6652 13.2668 13.7922 13.1345 13.878 12.976L14.1225 12.524C14.2083 12.3655 14.3353 12.2332 14.4901 12.1409C14.6449 12.0487 14.8218 12 15.002 12H16.9985Z" stroke="#B885FA" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 18C16.8284 18 17.5 17.3284 17.5 16.5C17.5 15.6716 16.8284 15 16 15C15.1716 15 14.5 15.6716 14.5 16.5C14.5 17.3284 15.1716 18 16 18Z" stroke="#B885FA" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      markerSVGs.palette = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#FFA537"/><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" fill="white"/><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" stroke="#FFA537" stroke-width="4"/><g clip-path="url(#clip0_4183_8065)"><path d="M16 21C14.6739 21 13.4021 20.4732 12.4645 19.5355C11.5268 18.5979 11 17.3261 11 16C11 14.6739 11.5268 13.4021 12.4645 12.4645C13.4021 11.5268 14.6739 11 16 11C17.3261 11 18.5979 11.4741 19.5355 12.318C20.4732 13.1619 21 14.3065 21 15.5C21 16.163 20.7366 16.7989 20.2678 17.2678C19.7989 17.7366 19.163 18 18.5 18H17.375C17.2125 18 17.0532 18.0452 16.915 18.1307C16.7768 18.2161 16.665 18.3383 16.5924 18.4837C16.5197 18.629 16.4889 18.7917 16.5035 18.9536C16.5181 19.1154 16.5775 19.27 16.675 19.4L16.825 19.6C16.9225 19.73 16.9819 19.8846 16.9965 20.0464C17.0111 20.2083 16.9803 20.371 16.9076 20.5163C16.835 20.6617 16.7232 20.7839 16.585 20.8693C16.4468 20.9548 16.2875 21 16.125 21H16Z" stroke="#FFA537" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.75 13.5C16.8881 13.5 17 13.3881 17 13.25C17 13.1119 16.8881 13 16.75 13C16.6119 13 16.5 13.1119 16.5 13.25C16.5 13.3881 16.6119 13.5 16.75 13.5Z" stroke="#FFA537" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.75 15.5C18.8881 15.5 19 15.3881 19 15.25C19 15.1119 18.8881 15 18.75 15C18.6119 15 18.5 15.1119 18.5 15.25C18.5 15.3881 18.6119 15.5 18.75 15.5Z" stroke="#FFA537" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.25 16.5C13.3881 16.5 13.5 16.3881 13.5 16.25C13.5 16.1119 13.3881 16 13.25 16C13.1119 16 13 16.1119 13 16.25C13 16.3881 13.1119 16.5 13.25 16.5Z" stroke="#FFA537" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.25 14C14.3881 14 14.5 13.8881 14.5 13.75C14.5 13.6119 14.3881 13.5 14.25 13.5C14.1119 13.5 14 13.6119 14 13.75C14 13.8881 14.1119 14 14.25 14Z" stroke="#FFA537" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_4183_8065"><rect width="12" height="12" fill="white" transform="translate(10 10)"/></clipPath></defs></svg>';
      markerSVGs.hotel = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#73C600"/><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" fill="white"/><path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2Z" stroke="#73C600" stroke-width="4"/><path d="M15 21V17.715M16 15.5H16.005M16 13.5H16.005M17 17.715V21M17.5 18C17.0673 17.6754 16.5409 17.5 16 17.5C15.4591 17.5 14.9327 17.6754 14.5 18M18 15.5H18.005M18 13.5H18.005M14 15.5H14.005M14 13.5H14.005M13 11H19C19.5523 11 20 11.4477 20 12V20C20 20.5523 19.5523 21 19 21H13C12.4477 21 12 20.5523 12 20V12C12 11.4477 12.4477 11 13 11Z" stroke="#73C600" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      function sendMessage(type, data) {
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: type, data: data }));
        } catch(e) {
          console.log('메시지 전송 실패:', e);
        }
      }
      
      sendMessage('LOG', '🔵 스크립트 시작');
      sendMessage('LOG', 'ReactNativeWebView 존재: ' + (!!window.ReactNativeWebView));
      
      // React Native로부터 메시지 수신
      document.addEventListener('message', function(e) {
        handleMessage(e.data);
      });
      window.addEventListener('message', function(e) {
        handleMessage(e.data);
      });
      
      function handleMessage(data) {
        try {
          var message = JSON.parse(data);
          if (message.type === 'UPDATE_MARKERS') {
            updateMarkers(message.markers);
          }
        } catch(e) {
          sendMessage('ERROR', '메시지 처리 오류: ' + e.message);
        }
      }
      
      function updateMarkers(newMarkers) {
        if (!map || !newMarkers) return;

        sendMessage('LOG', '📍 마커 업데이트 시작: ' + newMarkers.length + '개');

        // 기존 마커 제거
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // 새 마커 생성
        newMarkers.forEach(function(markerData) {
          try {
            var position = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);

            // 카테고리에 따른 SVG 선택 (기본값은 hotel)
            var category = markerData.category || 'hotel';
            var svgContent = markerSVGs[category] || markerSVGs.hotel;

            // SVG를 data URL로 변환
            var svgDataUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgContent);

            var markerImage = new kakao.maps.MarkerImage(
              svgDataUrl,
              new kakao.maps.Size(32, 32),
              {
                offset: new kakao.maps.Point(16, 32) // 마커의 중심점을 이미지 중앙 하단으로 설정
              }
            );

            var marker = new kakao.maps.Marker({
              position: position,
              map: map,
              image: markerImage,
              title: markerData.title
            });

            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, 'click', function() {
              sendMessage('MARKER_CLICK', { id: markerData.id });
            });

            markers.push(marker);
          } catch(e) {
            sendMessage('ERROR', '마커 생성 오류: ' + e.message);
          }
        });

        sendMessage('LOG', '✅ 마커 생성 완료: ' + markers.length + '개');
      }
      
      // Kakao SDK를 동적으로 로드
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakaoMapApiKey}&autoload=false';
      script.onload = function() {
        sendMessage('LOG', '🟢 Kakao SDK 스크립트 로드 완료');
        initMap();
      };
      script.onerror = function() {
        sendMessage('ERROR', '🔴 Kakao SDK 로드 실패');
      };
      document.head.appendChild(script);
      
      function initMap() {
        sendMessage('LOG', '🟡 지도 초기화 시작');
        
        if (typeof kakao === 'undefined') {
          sendMessage('ERROR', 'kakao 객체 없음');
          return;
        }
        
        if (!kakao.maps) {
          sendMessage('ERROR', 'kakao.maps 없음');
          return;
        }
        
        sendMessage('LOG', 'kakao.maps.load 호출');
        
        // Kakao Maps API가 완전히 로드된 후 실행
        kakao.maps.load(function() {
          sendMessage('LOG', '🟢 Kakao Maps API 초기화 완료');
          
          try {
            var container = document.getElementById('map');
            if (!container) {
              sendMessage('ERROR', '컨테이너 없음');
              return;
            }
            
            sendMessage('LOG', '컨테이너 크기: ' + container.offsetWidth + 'x' + container.offsetHeight);
            
            var options = {
              center: new kakao.maps.LatLng(${latitude}, ${longitude}),
              level: ${level}
            };
            
            map = new kakao.maps.Map(container, options);
            sendMessage('LOG', '✅ 지도 생성 완료!');
            sendMessage('MAP_READY', {});

            // 아주 미세한 이동으로 bounds_changed 이벤트 강제 트리거 (마커 표시를 위한 초기 API 호출)
            setTimeout(function() {
              var currentCenter = map.getCenter();
              var tinyOffset = 0.00001; // 아주 미세한 이동 (약 1미터)
              var tempPosition = new kakao.maps.LatLng(
                currentCenter.getLat() + tinyOffset,
                currentCenter.getLng() + tinyOffset
              );
              map.setCenter(tempPosition);

              // 바로 원래 위치로 복귀
              setTimeout(function() {
                map.setCenter(currentCenter);
              }, 10);
            }, 100);

            // 영역 변경 이벤트
            kakao.maps.event.addListener(map, 'bounds_changed', function() {
              var bounds = map.getBounds();
              var sw = bounds.getSouthWest();
              var ne = bounds.getNorthEast();
              sendMessage('REGION_CHANGE', {
                swLat: sw.getLat(),
                swLng: sw.getLng(),
                neLat: ne.getLat(),
                neLng: ne.getLng()
              });
            });
            
          } catch(e) {
            sendMessage('ERROR', '지도 생성 오류: ' + e.message);
          }
        });
      }
    })();
  </script>
</body>
</html>`;

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
          console.log(message.data);
          break;

        case 'ERROR':
          console.error(message.data);
          break;
      }
    } catch (error) {
      console.error('메시지 처리 오류:', error);
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
        onLoadEnd={() => {
          console.log('✅ [KakaoMap] WebView 로드 완료');
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('❌ [KakaoMap] WebView 오류:', nativeEvent);
          setIsLoading(false);
        }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="always"
      />
    </View>
  );
}
