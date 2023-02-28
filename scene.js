 var createScene = function () {
  var currentScene = new BABYLON.Scene(engine);
  const alpha = 3 * Math.PI / 2;
  const beta = Math.PI / 5;
  const radius = 400;
  const target = new BABYLON.Vector3(0, 0, -100);
  const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, currentScene);
  camera.attachControl(canvas, true);
  currentScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
 
  // Guitar
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("electric_guitar/", "scene.gltf", currentScene, function (currentScene) {
    // Create a default arc rotate camera and light.

    currentScene.createDefaultCameraOrLight(true, false, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    currentScene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    currentScene.activeCamera.beta -= Math.PI;





    // Call the function for each note

    noteInteraction = createNoteInteraction("E-G", new BABYLON.Color3(1, 1, 1), "E-G.mp3");
    noteInteraction = createNoteInteraction("E-F#", new BABYLON.Color3(1, 1, 1), "E-Fs.mp3");
    noteInteraction = createNoteInteraction("E-F", new BABYLON.Color3(1, 1, 1), "E-F.mp3");

    noteInteraction = createNoteInteraction("G-G#", new BABYLON.Color3(1, 1, 1), "G-Gs.mp3");
    noteInteraction = createNoteInteraction("G-A", new BABYLON.Color3(1, 1, 1), "G-A.mp3");
    noteInteraction = createNoteInteraction("G-A#", new BABYLON.Color3(1, 1, 1), "G-As.mp3");

    noteInteraction = createNoteInteraction("B-C", new BABYLON.Color3(1, 1, 1), "B-C.mp3");
    noteInteraction = createNoteInteraction("B-C#", new BABYLON.Color3(1, 1, 1), "B-Cs.mp3");
    noteInteraction = createNoteInteraction("B-D", new BABYLON.Color3(1, 1, 1), "B-D.mp3");

    noteInteraction = createNoteInteraction("D-D#", new BABYLON.Color3(1, 1, 1), "D-Ds.mp3");
    noteInteraction = createNoteInteraction("D-E", new BABYLON.Color3(1, 1, 1), "D-E.mp3");
    noteInteraction = createNoteInteraction("D-F", new BABYLON.Color3(1, 1, 1), "D-F.mp3");

    noteInteraction = createNoteInteraction("A-A#", new BABYLON.Color3(1, 1, 1), "A-As.mp3");
    noteInteraction = createNoteInteraction("A-B", new BABYLON.Color3(1, 1, 1), "A-B.mp3");
    noteInteraction = createNoteInteraction("A-C", new BABYLON.Color3(1, 1, 1), "A-C.mp3");

    noteInteraction = createNoteInteraction("E1-G", new BABYLON.Color3(1, 1, 1), "E1-G.mp3");
    noteInteraction = createNoteInteraction("E1-F#", new BABYLON.Color3(1, 1, 1), "E1-Fs.mp3");
    noteInteraction = createNoteInteraction("E1-F", new BABYLON.Color3(1, 1, 1), "E1-F.mp3");


  });


  const targetPosition = new BABYLON.Vector3(0, 200, -250);
  const delay = 3000; // 5-second delay
  const duration = 3000; // 2-second animation duration
  zoomToTarget(camera, targetPosition, delay, duration);






  // Create GUI element
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
gui.backgroundIsVisible = false;

// Calculate button width based on screen size
var buttonWidth = window.innerWidth / 6 - 50;

// Create Lesson 1 button
var button1 = BABYLON.GUI.Button.CreateSimpleButton("lesson1", "Lesson 1");
button1.width = buttonWidth + "px";
button1.height = "40px";
button1.color = "white";
button1.cornerRadius = 10;
button1.background = "green";
// Add click event for "Lesson 1" button
button1.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 1 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson1Scene(); // Create Lesson 1 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});

gui.addControl(button1);

// Create Lesson 2 button
var button2 = BABYLON.GUI.Button.CreateSimpleButton("lesson2", "Lesson 2");
button2.width = buttonWidth + "px";
button2.height = "40px";
button2.color = "white";
button2.cornerRadius = 10;
button2.background = "red";
// Add click event for "Lesson 2" button
button2.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 2 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson2Scene(); // Create Lesson 2 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});
gui.addControl(button2);

// Create Lesson 3 button
var button3 = BABYLON.GUI.Button.CreateSimpleButton("lesson3", "Lesson 3");
button3.width = buttonWidth + "px";
button3.height = "40px";
button3.color = "white";
button3.cornerRadius = 10;
button3.background = "blue";
// Add click event for "Lesson 3" button
button3.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 3 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson3Scene(); // Create Lesson 3 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});


gui.addControl(button3);

// Position buttons on top of screen with equal spacing
button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
button1.left = 10;
button1.top = "-46%";

button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
button2.top = "-46%";

button3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
button3.left = -10;
button3.top = "-46%";



var text = "Welcome to the interactive guitar instrument course. You will learn here how to play notes, scales and chords. Just hover over the fret and click on the desired note";
setTimeout(function() {
  showTextLetterByLetter(text, 0);
}, 5000);


  return currentScene;

}

var lesson1Scene = function () {
  var currentScene = new BABYLON.Scene(engine);
  const alpha = 3 * Math.PI / 2;
  const beta = Math.PI / 5;
  const radius = 400;
  const target = new BABYLON.Vector3(0, 0, -100);
  const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, currentScene);
  camera.attachControl(canvas, true);
  currentScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  var text = "";


  // Guitar
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("electric_guitar/", "scene.gltf", currentScene, function (currentScene) {
    // Create a default arc rotate camera and light.

    currentScene.createDefaultCameraOrLight(true, false, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    currentScene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    currentScene.activeCamera.beta -= Math.PI;


  });



   // Create GUI element
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
gui.backgroundIsVisible = false;

// Calculate button width based on screen size
var buttonWidth = window.innerWidth / 6 - 50;

// Create Lesson 1 button
var button1 = BABYLON.GUI.Button.CreateSimpleButton("lesson1", "Lesson 1");
button1.width = buttonWidth + "px";
button1.height = "40px";
button1.color = "white";
button1.cornerRadius = 10;
button1.background = "green";
// Add click event for "Lesson 1" button
button1.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 1 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson1Scene(); // Create Lesson 1 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});

gui.addControl(button1);

// Create Lesson 2 button
var button2 = BABYLON.GUI.Button.CreateSimpleButton("lesson2", "Lesson 2");
button2.width = buttonWidth + "px";
button2.height = "40px";
button2.color = "white";
button2.cornerRadius = 10;
button2.background = "red";
// Add click event for "Lesson 2" button
button2.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 2 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson2Scene(); // Create Lesson 2 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});

gui.addControl(button2);

// Create Lesson 3 button
var button3 = BABYLON.GUI.Button.CreateSimpleButton("lesson3", "Lesson 3");
button3.width = buttonWidth + "px";
button3.height = "40px";
button3.color = "white";
button3.cornerRadius = 10;
button3.background = "blue";
// Add click event for "Lesson 3" button
button3.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 3 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson3Scene(); // Create Lesson 3 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});
gui.addControl(button3);

// Position buttons on top of screen with equal spacing
button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
button1.left = 10;
button1.top = "-46%";

button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
button2.top = "-46%";

button3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
button3.left = -10;
button3.top = "-46%";


var originalMaterialName = ["E-G", "E-F#", "E-F", "G-G#", "G-A", "G-A#", "B-C", "B-C#", "B-D", "D-D#", "D-E", "D-F", "A-A#", "A-B", "A-C", "E1-G", "E1-F#","E1-F"];
originalMaterialNames.forEach(function(originalMaterialName) {
  createNoteInteraction(originalMaterialName, highlightColor, soundFileName);
});



  return currentScene;

}

var lesson2Scene = function () {
  var currentScene = new BABYLON.Scene(engine);
  const alpha = 3 * Math.PI / 2;
  const beta = Math.PI / 5;
  const radius = 400;
  const target = new BABYLON.Vector3(0, 0, -100);
  const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, currentScene);
  camera.attachControl(canvas, true);
  currentScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  var text = "";


  // Guitar
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("electric_guitar/", "scene.gltf", currentScene, function (currentScene) {
    // Create a default arc rotate camera and light.

    currentScene.createDefaultCameraOrLight(true, false, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    currentScene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    currentScene.activeCamera.beta -= Math.PI;


  });



  // Create GUI element
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
gui.backgroundIsVisible = false;

// Calculate button width based on screen size
var buttonWidth = window.innerWidth / 6 - 50;

// Create Lesson 1 button
var button1 = BABYLON.GUI.Button.CreateSimpleButton("lesson1", "Lesson 1");
button1.width = buttonWidth + "px";
button1.height = "40px";
button1.color = "white";
button1.cornerRadius = 10;
button1.background = "green";
// Add click event for "Lesson 1" button
button1.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 1 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson1Scene(); // Create Lesson 1 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});

gui.addControl(button1);

// Create Lesson 2 button
var button2 = BABYLON.GUI.Button.CreateSimpleButton("lesson2", "Lesson 2");
button2.width = buttonWidth + "px";
button2.height = "40px";
button2.color = "white";
button2.cornerRadius = 10;
button2.background = "red";
// Add click event for "Lesson 2" button
button2.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 2 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson2Scene(); // Create Lesson 2 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});
gui.addControl(button2);

// Create Lesson 3 button
var button3 = BABYLON.GUI.Button.CreateSimpleButton("lesson3", "Lesson 3");
button3.width = buttonWidth + "px";
button3.height = "40px";
button3.color = "white";
button3.cornerRadius = 10;
button3.background = "blue";
// Add click event for "Lesson 3" button
button3.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 3 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson3Scene(); // Create Lesson 3 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});

gui.addControl(button3);

// Position buttons on top of screen with equal spacing
button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
button1.left = 10;
button1.top = "-46%";

button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
button2.top = "-46%";

button3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
button3.left = -10;
button3.top = "-46%";



  return currentScene;

}


var lesson3Scene = function () {
  var currentScene = new BABYLON.Scene(engine);
  const alpha = 3 * Math.PI / 2;
  const beta = Math.PI / 5;
  const radius = 400;
  const target = new BABYLON.Vector3(0, 0, -100);
  const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, currentScene);
  camera.attachControl(canvas, true);
  currentScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  var text = "";


  // Guitar
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("electric_guitar/", "scene.gltf", currentScene, function (currentScene) {
    // Create a default arc rotate camera and light.

    currentScene.createDefaultCameraOrLight(true, false, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    currentScene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    currentScene.activeCamera.beta -= Math.PI;

  });



  // Create GUI element
var gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
gui.backgroundIsVisible = false;

// Calculate button width based on screen size
var buttonWidth = window.innerWidth / 6 - 50;

// Create Lesson 1 button
var button1 = BABYLON.GUI.Button.CreateSimpleButton("lesson1", "Lesson 1");
button1.width = buttonWidth + "px";
button1.height = "40px";
button1.color = "white";
button1.cornerRadius = 10;
button1.background = "green";
// Add click event for "Lesson 1" button
button1.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 1 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson1Scene(); // Create Lesson 1 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});

gui.addControl(button1);

// Create Lesson 2 button
var button2 = BABYLON.GUI.Button.CreateSimpleButton("lesson2", "Lesson 2");
button2.width = buttonWidth + "px";
button2.height = "40px";
button2.color = "white";
button2.cornerRadius = 10;
button2.background = "red";
// Add click event for "Lesson 2" button
button2.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 2 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson2Scene(); // Create Lesson 2 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});
gui.addControl(button2);

// Create Lesson 3 button
var button3 = BABYLON.GUI.Button.CreateSimpleButton("lesson3", "Lesson 3");
button3.width = buttonWidth + "px";
button3.height = "40px";
button3.color = "white";
button3.cornerRadius = 10;
button3.background = "blue";
// Add click event for "Lesson 3" button
button3.onPointerUpObservable.add(function () {
  console.log("Switching to Lesson 3 scene");
  engine.stopRenderLoop(); // Stop render loop for previous scene
  currentScene.dispose(); // Dispose of previous scene
  currentScene = lesson3Scene(); // Create Lesson 3 scene and set it as current
  engine.runRenderLoop(function () {
    currentScene.render(); // Render current scene
  });
});


gui.addControl(button3);

// Position buttons on top of screen with equal spacing
button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
button1.left = 10;
button1.top = "-46%";

button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
button2.top = "-46%";

button3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
button3.left = -10;
button3.top = "-46%";



  return currentScene;

}

   

//Create note interaction
function createNoteInteraction(originalMaterialName, highlightColor, soundFileName) {
  var pickResult;
  var originalMaterial;
  var highlightMaterial;
  var isHighlighted = false;
  var pointerObserver;

  // Get the original material from the Blender object
  originalMaterial = currentScene.getMaterialByName(originalMaterialName);
  if (!originalMaterial) {
    console.error("Material not found:", originalMaterialName);
    return;
  }

  // Create a new material for highlighting
  highlightMaterial = originalMaterial.clone(originalMaterialName + "_highlight");
  highlightMaterial.emissiveColor = highlightColor;
  highlightMaterial.alpha = 0.3;

  // Cache the meshes with the original material
  var originalMeshes = currentScene.meshes.filter(function (mesh) {
    return mesh.material === originalMaterial;
  });

  // Perform the raycasting operation when the mouse is moved
  pointerObserver = currentScene.onPointerObservable.add(function (pointerInfo) {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
      pickResult = currentScene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY, function (mesh) {
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
  
  // Return the observer object so that it can be disposed later
  return pointerObserver;
}


// Zoom in animation
function zoomToTarget(camera, targetPosition, delay = 0, duration = 1000) {


  const zoomAnimation = new BABYLON.Animation(
    "zoomAnimation",
    "radius",
    duration,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  const keys = [];
  keys.push({
    frame: 0,
    value: camera.radius
  });
  keys.push({
    frame: duration,
    value: targetPosition.subtract(camera.position).length()
  });

  zoomAnimation.setKeys(keys);


  setTimeout(() => {
    currentScene.beginDirectAnimation(camera, [zoomAnimation], 0, duration, false);
    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 0, -250));
    currentScene.activeCamera.alpha -= Math.PI / 2;
    currentScene.activeCamera.beta -= Math.PI;
  }, delay);

}

//Show text
function showTextLetterByLetter(text, index) {
  // Get the text element
  var textElement = document.getElementById("text");

  // Check if we've reached the end of the text
    // Check if we've reached the end of the text
    if (index >= text.length) {
      setTimeout(function() {
        // Hide the text element after 10 seconds
        textElement.style.display = "none";
      }, 10000);
      return;
    }

  // Get the current text and add the next letter
  var currentText = textElement.innerHTML;
  currentText += text.charAt(index);

  // Set the text element's innerHTML to the current text
  textElement.innerHTML = currentText;

  // Increase the index by 1
  index++;

  // Call this function again after a delay
  setTimeout(function() {
    showTextLetterByLetter(text, index);
  }, 20);

}


function randomNoteLesson1(originalMaterialNames, highlightColor, soundFileName) {
  var pickResult;
  var originalMaterials = [];
  var highlightMaterials = [];
  var isHighlighted = false;
  var pointerObserver;

  // Get the original materials from the Blender objects
  originalMaterialNames.forEach(function(name) {
    var material = currentScene.getMaterialByName(name);
    if (!material) {
      console.error("Material not found:", name);
      return;
    }
    originalMaterials.push(material);

    // Create a new material for highlighting
    var highlightMaterial = material.clone(name + "_highlight");
    highlightMaterial.emissiveColor = highlightColor;
    highlightMaterial.alpha = 0.3;
    highlightMaterials.push(highlightMaterial);
  });

  // Cache the meshes with the original materials
  var originalMeshes = currentScene.meshes.filter(function (mesh) {
    return originalMaterials.indexOf(mesh.material) !== -1;
  });

  // Perform the raycasting operation when the mouse is moved
  pointerObserver = currentScene.onPointerObservable.add(function (pointerInfo) {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
      pickResult = currentScene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY, function (mesh) {
        // Check if the mesh has one of the original materials
        return originalMeshes.indexOf(mesh) !== -1;
      });

      // Check if the pointer is over a mesh with one of the original materials
      if (pickResult.hit && !isHighlighted) {
        // Change the material to the highlight material
        var index = originalMaterials.indexOf(pickResult.pickedMesh.material);
        if (index !== -1) {
          pickResult.pickedMesh.material = highlightMaterials[index];
          console.log("Highlighted note quad.");
          isHighlighted = true;
        }
      } else if (!pickResult.hit && isHighlighted) {
        // Change back to the original materials
        originalMeshes.forEach(function (mesh) {
          var index = originalMaterials.indexOf(mesh.material);
          if (index !== -1) {
            mesh.material = originalMaterials[index];
          }
        });
        isHighlighted = false;
      }
    } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted) {
      // Play the sound when the mouse is clicked and the material is highlighted
      var noteSound = new Audio('Sound/' + soundFileName);
      noteSound.play();
    }
  });
  
  // Return the observer object so that it can be disposed later
  return pointerObserver;
}


