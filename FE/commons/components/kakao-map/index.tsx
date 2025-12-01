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

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  content?: string;
  category?: 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP';
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
            var marker = new kakao.maps.Marker({
              position: position,
              map: map,
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
