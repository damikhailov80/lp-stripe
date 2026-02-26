'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export function Analytics() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('[data-track="true"]');
            if (!target) return;

            const trackData: Record<string, string> = {};
            Array.from(target.attributes).forEach(attr => {
                if (attr.name.startsWith('data-track-')) {
                    const key = 'cta_' + attr.name.replace('data-track-', '');
                    trackData[key] = attr.value;
                }
            });

            if (Object.keys(trackData).length > 0) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'track_click',
                    ...trackData
                });
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
            </Script>
        </>
    );
}
