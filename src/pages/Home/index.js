import { StyleSheet, StatusBar, BackHandler, Alert } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import RNPrint from 'react-native-print';

export default function Home({ navigation }) {
  const webViewRef = useRef(null);
  const [printHtml, setPrintHtml] = useState(null);

  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  // Print ketika printHtml berubah
  useEffect(() => {
    if (printHtml) {
      (async () => {
        try {
          console.log('[Print] Memulai print, panjang HTML:', printHtml.length);
          await RNPrint.print({ html: printHtml });
          console.log('[Print] Print berhasil');
        } catch (err) {
          console.error('[Print] Error:', err);
          Alert.alert('Print gagal', err.message || 'Terjadi kesalahan saat print');
        } finally {
          setTimeout(() => setPrintHtml(null), 500);
        }
      })();
    }
  }, [printHtml]);

  const handleNavigationStateChange = (navState) => {
    if (!navState.canGoBack && navState.url === 'https://app.bozzparfum.my.id/') {
      // optional
    }
  };

  const onShouldStartLoadWithRequest = (request) => {
    const { url, navigationType } = request;
    if (navigationType === 'click' || navigationType === 'other') {
      if (webViewRef.current && url !== webViewRef.current.url) {
        try {
          webViewRef.current.injectJavaScript(`window.location.href = "${url}"; true;`);
        } catch (e) {}
        return false;
      }
    }
    return true;
  };

  // Fetch dengan cookies/credentials dari WebView
  const fetchWithWebViewCookies = (url) => {
    return new Promise((resolve, reject) => {
      if (!webViewRef.current) {
        reject(new Error('WebView not available'));
        return;
      }

      const timeoutId = setTimeout(() => {
        reject(new Error('Fetch timeout'));
      }, 15000);

      const messageHandler = (event) => {
        try {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'FETCH_RESULT' && data.requestUrl === url) {
            clearTimeout(timeoutId);
            if (data.success) {
              resolve(data.html);
            } else {
              reject(new Error(data.error || 'Fetch failed'));
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
      };

      // Temporary listener
      const subscription = webViewRef.current.onMessage = messageHandler;

      const safeUrl = url.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
      const fetchScript = `
        (function() {
          var url = '${safeUrl}';
          console.log('[WebView Fetch] Starting for:', url);
          
          fetch(url, { 
            credentials: 'include',
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
          })
          .then(function(response) {
            console.log('[WebView Fetch] Response status:', response.status);
            if (!response.ok) {
              throw new Error('HTTP ' + response.status);
            }
            return response.text();
          })
          .then(function(html) {
            console.log('[WebView Fetch] Success, HTML length:', html.length);
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'FETCH_RESULT',
              requestUrl: url,
              success: true,
              html: html
            }));
          })
          .catch(function(error) {
            console.error('[WebView Fetch] Error:', error.message);
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'FETCH_RESULT',
              requestUrl: url,
              success: false,
              error: error.message
            }));
          });
        })();
        true;
      `;

      try {
        webViewRef.current.injectJavaScript(fetchScript);
      } catch (injectErr) {
        clearTimeout(timeoutId);
        reject(injectErr);
      }
    });
  };

  // Handle print receipt
  const handlePrintReceipt = async (htmlContent, pageUrl = '') => {
    console.log('[handlePrintReceipt] Dipanggil, URL:', pageUrl);

    if (!htmlContent) {
      console.warn('[handlePrintReceipt] HTML kosong');
      Alert.alert('Print gagal', 'Konten kosong.');
      return;
    }

    let rawHtml = typeof htmlContent === 'string' ? htmlContent : String(htmlContent);
    
    // Bersihkan escape characters
    const cleanHtml = rawHtml.replace(/\\n/g, '').replace(/\\t/g, '').replace(/\\r/g, '');

    console.log('[handlePrintReceipt] HTML length:', cleanHtml.length);

    // Wrap dengan styling yang proper
    const wrappedHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Times New Roman', Times, serif;
              font-size: 12px;
              color: #000;
              background: #fff;
              padding: 10px;
            }
            img { max-width: 100%; height: auto; }
            table { width: 100%; border-collapse: collapse; }
            .centered { text-align: center; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }
            @media print { 
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              @page { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${cleanHtml}
        </body>
      </html>
    `;

    setPrintHtml(wrappedHtml);
  };

  // Main message handler
  const onMessage = async (event) => {
    try {
      const payload = event?.nativeEvent?.data;
      if (!payload) return;

      const data = JSON.parse(payload);
      console.log('[onMessage] Type:', data.type);

      // AJAX Response (dari receipt API)
      if (data.type === 'AJAX_RESPONSE') {
        if (data.response?.success === 1 && data.response?.receipt?.html_content) {
          console.log('[AJAX_RESPONSE] Receipt ditemukan');
          await handlePrintReceipt(data.response.receipt.html_content, data.url || '');
        }
        return;
      }

      // Print Request dengan HTML langsung
      if (data.type === 'PRINT_REQUEST' && data.html) {
        console.log('[PRINT_REQUEST] HTML langsung, length:', data.html.length);
        await handlePrintReceipt(data.html, data.url || '');
        return;
      }

      // Print Request dari URL (target="_blank" atau window.open)
      if (data.type === 'PRINT_REQUEST_URL' && data.url) {
        console.log('[PRINT_REQUEST_URL] URL:', data.url);
        
        try {
          // Gunakan WebView untuk fetch dengan cookies
          console.log('[PRINT_REQUEST_URL] Fetching dengan WebView cookies...');
          const html = await fetchWithWebViewCookies(data.url);
          console.log('[PRINT_REQUEST_URL] Fetch berhasil, length:', html.length);
          await handlePrintReceipt(html, data.url);
        } catch (error) {
          console.error('[PRINT_REQUEST_URL] Fetch error:', error.message);
          Alert.alert('Print gagal', `Tidak dapat mengambil halaman: ${error.message}`);
        }
        return;
      }

      // Window.open intercepted
      if (data.type === 'WINDOW_OPEN' && data.url) {
        console.log('[WINDOW_OPEN] URL:', data.url);
        
        try {
          const html = await fetchWithWebViewCookies(data.url);
          console.log('[WINDOW_OPEN] Fetch berhasil, length:', html.length);
          await handlePrintReceipt(html, data.url);
        } catch (error) {
          console.error('[WINDOW_OPEN] Fetch error:', error.message);
          Alert.alert('Print gagal', `Tidak dapat mengambil halaman: ${error.message}`);
        }
        return;
      }

      // Fetch result (internal use)
      if (data.type === 'FETCH_RESULT') {
        // Handled by fetchWithWebViewCookies promise
        return;
      }

    } catch (error) {
      console.error('[onMessage] Error:', error);
    }
  };

  // Injected JavaScript
  const injectedJavaScript = `
    (function() {
      console.log('[Injected] Script loaded');

      function post(type, payload) {
        try {
          var msg = JSON.stringify(Object.assign({type: type}, payload || {}));
          window.ReactNativeWebView.postMessage(msg);
          console.log('[Post]', type, payload);
        } catch(e) {
          console.error('[Post] Error:', e);
        }
      }

      // Intercept clicks pada link dengan target="_blank"
      document.addEventListener('click', function(e) {
        try {
          var target = e.target;
          var link = target.closest ? target.closest('a') : null;
          
          if (!link) {
            // Coba cari parent anchor
            while (target && target !== document) {
              if (target.tagName && target.tagName.toLowerCase() === 'a') {
                link = target;
                break;
              }
              target = target.parentNode;
            }
          }

          if (link) {
            var href = link.href || link.getAttribute('href');
            var linkTarget = link.getAttribute('target');
            
            console.log('[Click] Link detected:', href, 'target:', linkTarget);
            
            if (href && (linkTarget === '_blank' || linkTarget === 'blank')) {
              e.preventDefault();
              e.stopPropagation();
              
              console.log('[Click] Preventing default, posting PRINT_REQUEST_URL');
              post('PRINT_REQUEST_URL', { url: href });
              
              return false;
            }
          }
        } catch(err) {
          console.error('[Click] Error:', err);
        }
      }, true);

      // Intercept window.open
      try {
        var originalWindowOpen = window.open;
        window.open = function(url, target, features) {
          console.log('[window.open] Called with:', url, target);
          
          try {
            if (url) {
              // Resolve relative URL
              var resolved = url;
              try {
                var a = document.createElement('a');
                a.href = url;
                resolved = a.href;
              } catch(e) {}
              
              console.log('[window.open] Resolved URL:', resolved);
              post('WINDOW_OPEN', { url: resolved });
            }
          } catch(e) {
            console.error('[window.open] Post error:', e);
          }
          
          // Return null agar tidak buka window baru
          return null;
        };
      } catch(e) {
        console.error('[window.open] Override error:', e);
      }

      // Intercept XMLHttpRequest (untuk AJAX receipt)
      try {
        var OriginalXHR = window.XMLHttpRequest;
        var origOpen = OriginalXHR.prototype.open;
        var origSend = OriginalXHR.prototype.send;
        
        OriginalXHR.prototype.open = function(method, url) {
          this._method = method;
          this._url = url;
          return origOpen.apply(this, arguments);
        };
        
        OriginalXHR.prototype.send = function(body) {
          var xhr = this;
          
          this.addEventListener('load', function() {
            try {
              var response = JSON.parse(this.responseText);
              
              if (response && response.success === 1 && response.receipt && response.receipt.html_content) {
                console.log('[XHR] Receipt found in response');
                post('AJAX_RESPONSE', {
                  url: xhr._url,
                  method: xhr._method,
                  response: response
                });
              }
            } catch(e) {
              // Not JSON or no receipt
            }
          });
          
          return origSend.apply(this, arguments);
        };
      } catch(e) {
        console.error('[XHR] Override error:', e);
      }

      // Intercept Fetch API
      try {
        var originalFetch = window.fetch;
        window.fetch = function() {
          return originalFetch.apply(this, arguments).then(function(response) {
            try {
              var cloned = response.clone();
              cloned.json().then(function(data) {
                if (data && data.success === 1 && data.receipt && data.receipt.html_content) {
                  console.log('[Fetch] Receipt found in response');
                  post('AJAX_RESPONSE', {
                    url: response.url,
                    method: 'GET',
                    response: data
                  });
                }
              }).catch(function() {
                // Not JSON
              });
            } catch(e) {}
            
            return response;
          });
        };
      } catch(e) {
        console.error('[Fetch] Override error:', e);
      }

      // Intercept window.print
      try {
        var originalPrint = window.print;
        window.print = function() {
          console.log('[window.print] Called');
          post('PRINT_REQUEST', {
            html: document.documentElement.outerHTML,
            url: window.location.href
          });
        };
      } catch(e) {
        console.error('[print] Override error:', e);
      }

      console.log('[Injected] All interceptors installed');
      true;
    })();
  `;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar hidden={true} />

      <WebView
        ref={webViewRef}
        source={{ uri: 'https://app.bozzparfum.my.id/' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures={true}
        incognito={false}
        cacheEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', margin: 0, padding: 0 },
  webview: { flex: 1, margin: 0, padding: 0 },
});