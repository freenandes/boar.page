document.addEventListener('DOMContentLoaded', function() {
    const maxChars = 240;
    document.querySelectorAll('article p').forEach(editableP => {
        const article = editableP.closest('article');
        const counter = document.createElement('span');
        counter.classList.add('counter');
        article.appendChild(counter); // Append counter to the article
        counter.style.display = 'none'; // Initially hide the counter

        updateCounter(editableP, counter, maxChars);

        // Show the counter when the editable element is focused
        editableP.addEventListener('focus', function() {
            counter.style.display = ''; // Make the counter visible
        });

        // Hide the counter when the editable element loses focus
        editableP.addEventListener('blur', function() {
            counter.style.display = 'none'; // Hide the counter
            togglePlaceholder(this, article);
        });

        editableP.addEventListener('paste', function(event) {
            event.preventDefault();
            const pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');

            // Additional paste handling code remains unchanged...
            
            updateCounter(this, counter, maxChars); // Ensure counter updates after paste
        });

        // Event listeners for keydown, input...
        // Keydown listener remains unchanged...
        
        editableP.addEventListener('input', function() {
            updateCounter(this, counter, maxChars);
        });

        // Additional logic for 'focus' event listener remains unchanged...
        
        // Existing updateCounter, togglePlaceholder, and isControlKey functions...
    });

    function updateCounter(editableP, counter, max) {
        const textLength = editableP.innerText.trim().length;
        counter.textContent = `${textLength} / ${max}`;
        // Show counter if there's input; otherwise, ensure it's hidden on blur
        counter.style.display = textLength > 0 ? '' : 'none';
        editableP.classList.toggle('has-value', textLength > 0);
    }

    function togglePlaceholder(editableP, article) {
        const isEmpty = editableP.innerText.trim() === '';
        editableP.classList.toggle('has-value', !isEmpty);
    }

    function isControlKey(event) {
        return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key);
    }
});
