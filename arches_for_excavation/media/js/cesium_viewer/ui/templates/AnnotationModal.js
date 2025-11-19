export function createAnnotationModal(parentElement, existingAnnotationData = {}, tool, allowsDelete = false) {
    parentElement.classList.add('infoDisplayWithModal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modalContent');

    const closeButton = document.createElement('button');
    closeButton.id = 'modalCloseButton';
    closeButton.innerHTML = '<img src="/static/img/cesium_viewer/cancel_icon.svg" alt="Close annotation modal" />';
    closeButton.title = 'Cancel';
    closeButton.onclick = () => {
        parentElement.classList.remove('infoDisplayWithModal');
        tool.cancelAnnotation();
        parentElement.innerHTML = '';
    };
    modalContent.appendChild(closeButton);

    const title = document.createElement('h2');
    title.textContent = `${allowsDelete ? 'Edit' : 'Create'} Annotation`;
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

    colorWrapper.appendChild(colorLabel);
    colorWrapper.appendChild(colorPicker);
    modalContent.appendChild(colorWrapper);

    const controlPanel = document.createElement('div');
    controlPanel.classList.add('modalControlPanel');

    const saveButton = document.createElement('button');
    saveButton.innerHTML =  '<img src="/static/img/cesium_viewer/save_icon.svg" alt="Save Annotation" />';
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
    deleteButton.innerHTML = '<img src="/static/img/cesium_viewer/delete_icon.svg" alt="Delete Annotation" />';
    deleteButton.classList.add('modalButton');
    deleteButton.title = 'Delete Annotation';
    deleteButton.onclick = () => {
        if (confirm('Are you sure you want to delete this annotation?')) {
            parentElement.classList.remove('infoDisplayWithModal');
            tool.deleteAnnotation();
            parentElement.innerHTML = '';
        }
    };
    
    controlPanel.appendChild(saveButton);
    if (allowsDelete) {
        controlPanel.appendChild(deleteButton);
        controlPanel.classList.add('spaced-between');
    }
    modalContent.appendChild(controlPanel);

    parentElement.innerHTML = '';
    parentElement.appendChild(modalContent);
}
