var lesson1 = function () {
  //const scene = new BABYLON.Scene(engine);
  const alpha = 3 * Math.PI / 2;
  const beta = Math.PI / 5;
  const radius = 400;
  const target = new BABYLON.Vector3(0, 0, -100);
  const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
  camera.attachControl(canvas, true);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);


  // Guitar
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("electric_guitar/", "scene.gltf", scene, function (scene) {
    // Create a default arc rotate camera and light.
    
    scene.createDefaultCameraOrLight(true, false, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    scene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    scene.activeCamera.beta -= Math.PI;
    


    function createNoteInteraction(originalMaterialName, highlightColor, soundFileName) {
      var pickResult;
      var originalMaterial;
      var highlightMaterial;
      var isHighlighted = false;

      // Get the original material from the Blender object
      originalMaterial = scene.getMaterialByName(originalMaterialName);
      if (!originalMaterial) {
        console.error("Material not found:", originalMaterialName);
        return;
      }

      // Create a new material for highlighting
      highlightMaterial = originalMaterial.clone(originalMaterialName + "_highlight");
      highlightMaterial.emissiveColor = highlightColor;
      highlightMaterial.alpha = 0.3;

      // Cache the meshes with the original material
      var originalMeshes = scene.meshes.filter(function (mesh) {
        return mesh.material === originalMaterial;
      });

      // Perform the raycasting operation when the mouse is moved
      scene.onPointerObservable.add(function (pointerInfo) {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
          pickResult = scene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY, function (mesh) {
            // Check if the mesh has one of the original materials
            return originalMeshes.indexOf(mesh) !== -1;
          });

          // Check if the pointer is over the guitar mesh
          if (pickResult.hit && !isHighlighted) {
            // Change the material to the highlight material
            pickResult.pickedMesh.material = highlightMaterial;
            console.log("Highlighted note quad.");
            isHighlighted = true;
          } else if (!pickResult.hit && isHighlighted) {
            // Change back to the original material
            originalMeshes.forEach(function (mesh) {
              mesh.material = originalMaterial;
            });
            isHighlighted = false;
          }
        } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted) {
          // Play the sound when the mouse is clicked and the material is highlighted
          var noteSound = new Audio('Sound/' + soundFileName);
          noteSound.play();

          // Display the text after the "-" symbol for 2 seconds
          var noteText = document.getElementById("note-text");
          var parts = originalMaterialName.split("-");
          var textAfterDash = parts[1];
          noteText.innerHTML = textAfterDash;
          noteText.style.opacity = 1;
          setTimeout(function () {
            noteText.style.opacity = 0;
          }, 3000);


        }
      });
    }


    // Call the function for each note
    createNoteInteraction("E-G", new BABYLON.Color3(1, 1, 1), "E-G.mp3");
    createNoteInteraction("E-F#", new BABYLON.Color3(1, 1, 1), "E-Fs.mp3");
    createNoteInteraction("E-F", new BABYLON.Color3(1, 1, 1), "E-F.mp3");

    // createNoteInteraction("G-G#", new BABYLON.Color3(1, 1, 1), "G-Gs.mp3");
    // createNoteInteraction("G-A", new BABYLON.Color3(1, 1, 1), "G-A.mp3");
    // createNoteInteraction("G-A#", new BABYLON.Color3(1, 1, 1), "G-As.mp3");

    // createNoteInteraction("B-C", new BABYLON.Color3(1, 1, 1), "B-C.mp3");
    // createNoteInteraction("B-C#", new BABYLON.Color3(1, 1, 1), "B-Cs.mp3");
    // createNoteInteraction("B-D", new BABYLON.Color3(1, 1, 1), "B-D.mp3");

    // createNoteInteraction("D-D#", new BABYLON.Color3(1, 1, 1), "D-Ds.mp3");
    // createNoteInteraction("D-E", new BABYLON.Color3(1, 1, 1), "D-E.mp3");
    // createNoteInteraction("D-F", new BABYLON.Color3(1, 1, 1), "D-F.mp3");

    // createNoteInteraction("A-A#", new BABYLON.Color3(1, 1, 1), "A-As.mp3");
    // createNoteInteraction("A-B", new BABYLON.Color3(1, 1, 1), "A-B.mp3");
    // createNoteInteraction("A-C", new BABYLON.Color3(1, 1, 1), "A-C.mp3");

    // createNoteInteraction("E1-G", new BABYLON.Color3(1, 1, 1), "E1-G.mp3");
    // createNoteInteraction("E1-F#", new BABYLON.Color3(1, 1, 1), "E1-Fs.mp3");
    // createNoteInteraction("E1-F", new BABYLON.Color3(1, 1, 1), "E1-F.mp3");


  });


      const targetPosition = new BABYLON.Vector3(0, 200, -250);
      const delay = 3000; // 5-second delay
      const duration = 3000; // 2-second animation duration
      zoomToTarget(camera, targetPosition, delay, duration);
  

 
  
// // Create GUI element
// var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
// gui.backgroundIsVisible = false;

// // Calculate button width based on screen size
// var buttonWidth = window.innerWidth / 6 - 50;

// // Create Lesson 1 button
// var button1 = BABYLON.GUI.Button.CreateSimpleButton("lesson1", "Lesson 1");
// button1.width = buttonWidth + "px";
// button1.height = "40px";
// button1.color = "white";
// button1.cornerRadius = 10;
// button1.background = "green";
// button1.onPointerUpObservable.add(function() {
//   loadLesson1();
// });

// gui.addControl(button1);

// // Create Lesson 2 button
// var button2 = BABYLON.GUI.Button.CreateSimpleButton("lesson2", "Lesson 2");
// button2.width = buttonWidth + "px";
// button2.height = "40px";
// button2.color = "white";
// button2.cornerRadius = 10;
// button2.background = "red";
// button2.onPointerUpObservable.add(function() {
//   console.log("Lesson 2 button clicked");
// });
// gui.addControl(button2);

// // Create Lesson 3 button
// var button3 = BABYLON.GUI.Button.CreateSimpleButton("lesson3", "Lesson 3");
// button3.width = buttonWidth + "px";
// button3.height = "40px";
// button3.color = "white";
// button3.cornerRadius = 10;
// button3.background = "blue";
// button3.onPointerUpObservable.add(function() {
//   console.log("Lesson 3 button clicked");
// });
// gui.addControl(button3);

// // Position buttons on top of screen with equal spacing
// button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
// button1.left = 10;
// button1.top = "-46%";

// button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
// button2.top = "-46%";

// button3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
// button3.left = -10;
// button3.top = "-46%";


// function loadScene(lesson1) {
//   // Show loading screen
//   showLoadingScreen();

//   // Load scene from file
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", `${lesson1}.js`, true);
//   xhr.addEventListener("load", function () {
//     // Load scene into engine
//     engine.loadAssetContainerAsync(`data:application/octet-stream;base64,${btoa(xhr.responseText)}`).then(function (container) {
//       // Remove current scene
//       scene.dispose();

//       // Set new scene
//       scene = container.meshes[0].getScene();
//       engine.scenes.push(scene);

//       // Hide loading screen
//       hideLoadingScreen();

//       // Log that the scene was loaded
//       console.log(`${lesson1} loaded`);
//     });
//   });
//   xhr.send();
// }

// // Add click event for "Lesson 1" button
// button1.onPointerUpObservable.add(function() {
//   loadScene("lesson1");
// });




  return scene;
}
