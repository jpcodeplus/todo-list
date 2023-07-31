class TaskHelpers {

    constructor() { }

    createToast(text = "", type = "default") {

        const toastsDiv = document.createElement('div');
        const errorDiv = document.createElement('div');

        toastsDiv.className = 'toasts';
        errorDiv.className = `toast-${type}`;
        errorDiv.textContent = text;

        setTimeout(() => {
            toastsDiv.classList.add('toast-show');
            setTimeout(() => {toastsDiv.classList.remove('toast-show')}, 2700);
        }, 10);

        toastsDiv.appendChild(errorDiv);
        document.body.appendChild(toastsDiv);
    }
    //---
    createHash(string, date = new Date) {

        const saltMin = 1000;
        const saltMax = 9999;
        const salt = Math.floor(Math.random() * (saltMin - saltMax + 1)) + saltMin;

        const combinedData = `${date}_${string}_${salt}`;

        // Konvertiere den kombinierten String in eine UTF-8-Byte-Sequenz
        const encoder = new TextEncoder();
        const data = encoder.encode(combinedData);

        // Erzeuge einen Uint8Array, um den Hash zu speichern
        const hashArray = new Uint8Array(16); // 128-bit Hash (MD5)

        // Führe den Hash-Algorithmus durch
        let h1 = 0x67452301;
        let h2 = 0xefcdab89;
        let h3 = 0x98badcfe;
        let h4 = 0x10325476;

        for (let i = 0; i < data.length; i++) {
            let byte = data[i];
            h1 += byte;
            h2 += h1;
            h3 += h2;
            h4 += h3;
        }

        // Kombiniere die Ergebnisse der Hash-Berechnung
        hashArray[0] = h1 & 0xFF;
        hashArray[1] = (h1 >> 8) & 0xFF;
        hashArray[2] = (h1 >> 16) & 0xFF;
        hashArray[3] = (h1 >> 24) & 0xFF;
        hashArray[4] = h2 & 0xFF;
        hashArray[5] = (h2 >> 8) & 0xFF;
        hashArray[6] = (h2 >> 16) & 0xFF;
        hashArray[7] = (h2 >> 24) & 0xFF;
        hashArray[8] = h3 & 0xFF;
        hashArray[9] = (h3 >> 8) & 0xFF;
        hashArray[10] = (h3 >> 16) & 0xFF;
        hashArray[11] = (h3 >> 24) & 0xFF;
        hashArray[12] = h4 & 0xFF;
        hashArray[13] = (h4 >> 8) & 0xFF;
        hashArray[14] = (h4 >> 16) & 0xFF;
        hashArray[15] = (h4 >> 24) & 0xFF;

        // Konvertiere den Hashwert in eine hexadezimale Zeichenkette
        const hashString = Array.from(hashArray, byte => byte.toString(16).padStart(2, '0')).join('');
        return hashString;
    }

    feedback(type){
        if(type === "vibrate" && window.navigator.vibrate){
            window.navigator.vibrate(200);
        }
    }

}