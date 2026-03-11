export function createAnnotationModal(parentElement, existingAnnotationData = {}, tool, allowAnnotationsEdits = false) {
    parentElement.classList.add('infoDisplayWithModal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modalContent');

    const closeButton = document.createElement('button');
    closeButton.id = 'modalCloseButton';
    closeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    closeButton.title = 'Cancel';
    closeButton.onclick = () => {
        parentElement.classList.remove('infoDisplayWithModal');
        tool.cancelAnnotation();
        parentElement.innerHTML = '';
    };
    modalContent.appendChild(closeButton);

    const title = document.createElement('h2');
    title.textContent = `${allowAnnotationsEdits ? 'Configure' : 'View'} Annotation`;
    modalContent.appendChild(title);

    const annotationNameWrapper = document.createElement('div');
    annotationNameWrapper.classList.add('formGroup');

    const annotationNameLabel = document.createElement('label');
    annotationNameLabel.textContent = 'Annotation Name:';
    annotationNameLabel.htmlFor = 'annotationNameInput';

    const annotationNameInput = document.createElement('input');
    annotationNameInput.type = 'text';
    annotationNameInput.id = 'annotationNameInput';
    annotationNameInput.placeholder = 'Enter name for annotation...';
    if (existingAnnotationData.name) {
        annotationNameInput.value = existingAnnotationData.name;
    }
    annotationNameInput.disabled = !allowAnnotationsEdits;
    annotationNameWrapper.appendChild(annotationNameLabel);
    annotationNameWrapper.appendChild(annotationNameInput);
    modalContent.appendChild(annotationNameWrapper);

    const annotationDescriptionWrapper = document.createElement('div');
    annotationDescriptionWrapper.classList.add('formGroup');

    const annotationDescriptionLabel = document.createElement('label');
    annotationDescriptionLabel.textContent = 'Description:';
    annotationDescriptionLabel.htmlFor = 'annotationDescriptionInput';

    const annotationDescriptionInput = document.createElement('textarea');
    annotationDescriptionInput.id = 'annotationDescriptionInput';
    annotationDescriptionInput.placeholder = 'Enter description for annotation...';
    if (existingAnnotationData.description) {
        annotationDescriptionInput.value = existingAnnotationData.description;
    }
    annotationDescriptionInput.rows = 4;
    annotationDescriptionInput.disabled = !allowAnnotationsEdits;
    annotationDescriptionWrapper.appendChild(annotationDescriptionLabel);
    annotationDescriptionWrapper.appendChild(annotationDescriptionInput);
    modalContent.appendChild(annotationDescriptionWrapper);

    const colorWrapper = document.createElement('div');
    colorWrapper.classList.add('formGroup');

    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Color:';
    colorLabel.htmlFor = 'annotationColorPicker';

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = `${existingAnnotationData.color || '#64ff64'}`;
    colorPicker.id = 'annotationColorPicker';
    colorPicker.disabled = !allowAnnotationsEdits;
    colorWrapper.appendChild(colorLabel);   
    colorWrapper.appendChild(colorPicker);
    modalContent.appendChild(colorWrapper);

    const controlPanel = document.createElement('div');
    controlPanel.classList.add('modalControlPanel');

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i>';
    saveButton.classList.add('modalButton');
    saveButton.title = 'Save Annotation';
    saveButton.onclick = () => {
        parentElement.classList.remove('infoDisplayWithModal');
        const annotationData = {
            name: annotationNameInput.value,
            description: annotationDescriptionInput.value,
            color: colorPicker.value
        };
        
        tool.saveAnnotation(annotationData);
        parentElement.innerHTML = '';
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteButton.classList.add('modalButton');
    deleteButton.title = 'Delete Annotation';
    deleteButton.onclick = () => {
        if (confirm('Are you sure you want to delete this annotation?')) {
            parentElement.classList.remove('infoDisplayWithModal');
            tool.deleteAnnotation();
            parentElement.innerHTML = '';
        }
    };
    
    if (allowAnnotationsEdits) {
        controlPanel.appendChild(saveButton);
        controlPanel.appendChild(deleteButton);
        controlPanel.classList.add('spaced-between');
        
        modalContent.appendChild(controlPanel);
    }

    parentElement.innerHTML = '';
    parentElement.appendChild(modalContent);
}