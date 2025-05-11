document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const webhookInput = document.getElementById('webhook');
    const redirectInput = document.getElementById('redirect');
    const messageInput = document.getElementById('message');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const createNewBtn = document.getElementById('create-new-btn');
    const generatedLinkInput = document.getElementById('generated-link');
    const webhookError = document.getElementById('webhook-error');
    const redirectError = document.getElementById('redirect-error');
    
    function validateInputs() {
        let isValid = true;
        
        if (!webhookInput.value) {
            showError(webhookError, 'Webhook URL is required');
            webhookInput.classList.add('shake');
            setTimeout(() => webhookInput.classList.remove('shake'), 500);
            isValid = false;
        } else if (!Utils.isValidUrl(webhookInput.value)) {
            showError(webhookError, 'Please enter a valid URL');
            isValid = false;
        } else if (!Utils.isValidWebhook(webhookInput.value)) {
            showError(webhookError, 'Please enter a valid Discord webhook URL');
            isValid = false;
        } else {
            clearError(webhookError);
        }
        
        if (!redirectInput.value) {
            showError(redirectError, 'Redirect URL is required');
            redirectInput.classList.add('shake');
            setTimeout(() => redirectInput.classList.remove('shake'), 500);
            isValid = false;
        } else if (!Utils.isValidUrl(redirectInput.value)) {
            showError(redirectError, 'Please enter a valid URL');
            isValid = false;
        } else {
            clearError(redirectError);
        }
        
        return isValid;
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.style.opacity = 1;
    }
    
    function clearError(element) {
        element.textContent = '';
        element.style.opacity = 0;
    }
    
    function generateLink() {
        const webhookUrl = webhookInput.value;
        const redirectUrl = redirectInput.value;
        const message = messageInput.value || 'Someone clicked your link!';
        const uniqueId = Utils.generateId(10);
        
        const data = {
            webhook: webhookUrl,
            redirect: redirectUrl,
            message: message,
            id: uniqueId
        };
        
        const encodedData = Utils.encodeData(data);
        const trackingLink = `${Utils.getBaseUrl()}track.html?data=${encodedData}`;
        
        return trackingLink;
    }
    
    generateBtn.addEventListener('click', () => {
        if (validateInputs()) {
            const trackingLink = generateLink();
            generatedLinkInput.value = trackingLink;
            
            Utils.hideElement(step1);
            Utils.showElement(step2);
        }
    });
    
    copyBtn.addEventListener('click', async () => {
        await Utils.copyToClipboard(generatedLinkInput.value);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1000);
    });
    
    createNewBtn.addEventListener('click', () => {
        webhookInput.value = '';
        redirectInput.value = '';
        messageInput.value = '';
        generatedLinkInput.value = '';
        
        clearError(webhookError);
        clearError(redirectError);
        
        Utils.hideElement(step2);
        Utils.showElement(step1);
    });
    
    webhookInput.addEventListener('input', () => clearError(webhookError));
    redirectInput.addEventListener('input', () => clearError(redirectError));
});