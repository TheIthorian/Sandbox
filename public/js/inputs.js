(function() {
    let fileAreas = document.getElementsByClassName("input-file-container");

    for (fileArea of fileAreas) {

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileArea.addEventListener(eventName, function(e) {
                e.preventDefault()
                e.stopPropagation()
            }, false);
            //document.body.addEventListener(eventName, preventDefaults, false);
        })
    
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
        fileArea.addEventListener(eventName, function(e){
            e.target.classList.add('highlight');
        }, false)
        })
    
        ['dragleave', 'drop'].forEach(eventName => {
        fileArea.addEventListener(eventName, function(e) {
            e.target.classList.remove('highlight');
        }, false)
        })
    
        // Handle dropped files
        fileArea.addEventListener('drop', handleDrop, false);

    }


    
})();


function handleDrop(e) {
    let data = e.dataTransfer;
    let files = data.files;

    handleFiles(files);
}

function handleFiles(files) {
    files = [...files];
    files.forEach(uploadFile);
}


// function uploadFile(file, i) {
//     var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
//     var xhr = new XMLHttpRequest()
//     var formData = new FormData()
//     xhr.open('POST', url, true)
//     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

//     // Update progress (can be used to show progress indicator)
//     xhr.upload.addEventListener("progress", function (e) {
//         updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
//     })

//     xhr.addEventListener('readystatechange', function (e) {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             updateProgress(i, 100) // <- Add this
//         }
//         else if (xhr.readyState == 4 && xhr.status != 200) {
//             // Error. Inform the user
//         }
//     })

//     formData.append('upload_preset', 'ujpu6gyk')
//     formData.append('file', file)
//     xhr.send(formData)
// }