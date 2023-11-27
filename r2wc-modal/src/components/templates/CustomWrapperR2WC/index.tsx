import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { useRef } from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

type ElementRef<T> = React.MutableRefObject<T | null>;

export function CustomModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef: ElementRef<HTMLDivElement> = useRef(null);
  const queryClient = new QueryClient();

  React.useEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement) {
      const shadowRoot = rootElement.attachShadow({ mode: "open" });
      const emotionRoot = document.createElement("style");
      const shadowRootElement = document.createElement("div");
      shadowRoot.appendChild(emotionRoot);
      shadowRoot.appendChild(shadowRootElement);

      const cache = createCache({
        key: "css",
        prepend: true,
        container: emotionRoot,
      });

      const theme = createTheme({
        typography: {
          h6: {
            fontSize: "20px",
          },
          body1: {
            fontSize: "16px",
          },
          button: {
            fontSize: "14px",
          },
        },
        components: {
          MuiPopover: {
            defaultProps: {
              container: shadowRootElement,
            },
          },
          MuiPopper: {
            defaultProps: {
              container: shadowRootElement,
            },
          },
          MuiModal: {
            defaultProps: {
              container: shadowRootElement,
            },
          },
        },
      });

      ReactDOM.createRoot(shadowRootElement).render(
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </CacheProvider>
      );
    }
  }, []);

  return <div ref={rootRef}></div>;
}
