'use client'

import React, { useEffect } from 'react'
import './Newsletter.css'

export default function Newsletter() {

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://tecvibes.kit.com/8be77e31cc/index.js'
        script.async = true
        script.setAttribute('data-uid', '8be77e31cc')

        const container = document.getElementById('newsletter-container')
        if (container) {
            container.appendChild(script)
        }

        // Cleanup function in case the component unmounts
        return () => {
            if (container) {
                // The external script might add more than just the script tag itself,
                // so a simple container.innerHTML = '' is a safer cleanup.
                container.innerHTML = ''
            }
        }
    }, []) // Empty dependency array ensures this runs only once

    return (
        <div className="footer-middle">
            <div className="footer-widget">
                <div className="widget widget-newsletter" id="newsletter-container"></div>
            </div>
        </div>
    )
}