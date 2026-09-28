function detectDelimiter(text) {
    if (!text) return ' ';
    const firstLine = (text.split('\n').find(l => l.trim().length > 0) || '').trim();
    const gaps = firstLine.match(/\s+/g);
    if (!gaps || gaps.length === 0) return ' ';
    const firstGap = gaps[0];
    const isConsistent = gaps.every(gap => gap === firstGap);
    return isConsistent ? firstGap : null;
}

function reorderCoordinatesLogic(text, delimiter) {
    if (!text || !delimiter) return text;
    const lines = text.split('\n');
    const reordered = lines.map(line => {
        const parts = line.trim().split(delimiter);
        if (parts.length === 4) {
            [parts[1], parts[2]] = [parts[2], parts[1]];
            return parts.join(delimiter);
        } else if (parts.length === 3) {
            [parts[0], parts[1]] = [parts[1], parts[0]];
            return parts.join(delimiter);
        }
        return line;
    });
    return reordered.join('\n');
}

function processCoordinates(text) {
    if (!text || text.trim().length === 0) {
        return { allValid: false, errorLineIndices: [], htmlLines: '', isEmpty: true };
    }

    const allLines = text.split('\n');
    
    const delimiter = detectDelimiter(text);
    if (!delimiter) {
        return { 
            allValid: false, 
            errorLineIndices: allLines.map((_, index) => index), 
            htmlLines: '', 
            delimiterError: true 
        };
    }

    const coordinateLineRegex = new RegExp(`^(?:([a-zA-Z0-9_.-]+)${delimiter})?(-?\\d+[.,]?\\d+)${delimiter}(-?\\d+[.,]?\\d+)${delimiter}(-?\\d+[.,]?\\d+)$`);
    const errorLineIndices = [];
    let allValid = true;

    allLines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.length === 0) return;
        
        const match = trimmedLine.match(coordinateLineRegex);
        if (!match) {
            allValid = false;
            errorLineIndices.push(index);
        }
    });

    const htmlLines = allLines.map((line, index) => {
        const isEmpty = line.trim().length === 0;
        if (isEmpty) return line;
        
        const hasError = errorLineIndices.includes(index);
        const indicator = hasError 
            ? '<span title="Line contains error" class="error-indicator visible"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="red"/></svg></span>' 
            : '<span class="error-indicator"></span>';
        return line + indicator;
    }).join('\n');

    return { allValid, errorLineIndices, htmlLines, isEmpty: false, delimiterError: false };
}

function getCursorIndex(element) {
    if (!element || document.activeElement !== element) return -1;
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return -1;
    
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
}

function setCursorIndex(element, cursorIndex) {
    if (!element || cursorIndex < 0) return;
    const selection = window.getSelection();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let charCount = 0;
    
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (charCount + node.length >= cursorIndex) {
            const range = document.createRange();
            range.setStart(node, cursorIndex - charCount);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            break;
        }
        charCount += node.length;
    }
}

export default {
    detectDelimiter,
    reorderCoordinatesLogic,
    processCoordinates,
    getCursorIndex,
    setCursorIndex
}