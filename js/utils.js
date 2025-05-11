const Utils = {
    isValidUrl: function(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    },
    
    isValidWebhook: function(url) {
        return url.startsWith('https://discord.com/api/webhooks/') || 
               url.startsWith('https://discordapp.com/api/webhooks/');
    },
    
    encodeData: function(data) {
        return btoa(encodeURIComponent(JSON.stringify(data)));
    },
    
    decodeData: function(encodedData) {
        try {
            return JSON.parse(decodeURIComponent(atob(encodedData)));
        } catch (e) {
            return null;
        }
    },
    
    getBaseUrl: function() {
        const url = window.location.href;
        return url.substring(0, url.lastIndexOf('/') + 1);
    },
    
    generateId: function(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    },
    
    showElement: function(element) {
        element.classList.add('active');
    },
    
    hideElement: function(element) {
        element.classList.remove('active');
    },
    
    copyToClipboard: function(text) {
        return navigator.clipboard.writeText(text);
    },
    
    getDeviceInfo: function() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor,
            language: navigator.language,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            colorDepth: window.screen.colorDepth,
            pixelRatio: window.devicePixelRatio,
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            referrer: document.referrer,
            timestamp: new Date().toISOString()
        };
    },
    
    fetchIpInfo: async function() {
        try {
            const response = await fetch('https://ipinfo.io/json');
            return await response.json();
        } catch (error) {
            return { error: 'Failed to fetch IP information' };
        }
    }
};