document.addEventListener('DOMContentLoaded', function() {
  // Add button
  const button = document.createElement('button');
  button.id = 'randomButton';
  button.innerHTML = '✨ Select random topic';
  document.body.appendChild(button);

  const topicItems = document.querySelectorAll('.markdown-body > li.task-list-item');
  let currentHighlight = null;

  function getFirstTextNode(element) {
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        return node;
      }
    }
    return null;
  }

  button.addEventListener('click', function() {
    if (currentHighlight) {
      currentHighlight.classList.remove('highlight-task');
    }

    const randomtopic = topicItems[Math.floor(Math.random() * topicItems.length)];
    const textNode = getFirstTextNode(randomtopic);
    
    if (textNode) {
      const span = document.createElement('span');
      span.className = 'highlight-task';
      textNode.parentNode.insertBefore(span, textNode);
      span.appendChild(textNode);
      currentHighlight = span;
    } else {
      randomtopic.classList.add('highlight-task');
      currentHighlight = randomtopic;
    }

    randomtopic.scrollIntoView({behavior: 'smooth', block: 'center'});
  });

  document.addEventListener('click', function(event) {
    if (event.target !== button && currentHighlight) {
      if (currentHighlight.tagName === 'SPAN') {
        const parent = currentHighlight.parentNode;
        parent.insertBefore(currentHighlight.firstChild, currentHighlight);
        parent.removeChild(currentHighlight);
      } else {
        currentHighlight.classList.remove('highlight-task');
      }
      currentHighlight = null;
    }
  });
});
