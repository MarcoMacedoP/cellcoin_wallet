export function showAddressPreview(text: string) {
    const smallerText = text.split('', 20).toString();
    const cleanedText = smallerText.replace(/,/g, '');
    return `${cleanedText}...`;
}