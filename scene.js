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



    console.log(currentScene instanceof BABYLON.Scene);


    const targetPosition = new BABYLON.Vector3(0, 200, -250);
    const delay = 3000; // 3-second delay
    const duration = 3000; // 3-second animation duration
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
      const textElement = document.getElementById("text");
      textElement.style.display = "none"; // Hide the text element
      clearHighlighting();
      // The cache of meshes with the original material has been cleared.
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson1Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson2Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson3Scene(); // Create new scene and set it as current
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
    setTimeout(function () {
      showTextLetterByLetter(text, 0);
    }, 5000);

    // Call the function for each note using js objects
    notes.forEach(function (note) {
      myFunction(note.originalMaterialName, note.highlightColor, note.soundFileName, currentScene);
    });




  });


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



    console.log(currentScene instanceof BABYLON.Scene);


    const targetPosition = new BABYLON.Vector3(0, 200, -250);
    const delay = 3000; // 3-second delay
    const duration = 3000; // 3-second animation duration
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
      const textElement = document.getElementById("text");
      textElement.style.display = "none"; // Hide the text element
      clearHighlighting();
      // The cache of meshes with the original material has been cleared.
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson1Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson2Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson3Scene(); // Create new scene and set it as current
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
    setTimeout(function () {
      showTextLetterByLetter(text, 0);
    }, 5000);

    // Call the function for each note using js objects
    notes.forEach(function (note) {
      myFunction(note.originalMaterialName, note.highlightColor, note.soundFileName, currentScene);
    });




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


  // Guitar
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("electric_guitar/", "scene1.gltf", currentScene, function (currentScene) {
    // Create a default arc rotate camera and light.

    currentScene.createDefaultCameraOrLight(true, false, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    currentScene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    currentScene.activeCamera.beta -= Math.PI;






    const targetPosition = new BABYLON.Vector3(0, 200, -250);
    const delay = 3000; // 3-second delay
    const duration = 3000; // 3-second animation duration
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
      clearHighlighting();
      const textElement = document.getElementById("text");
      textElement.style.display = "none"; // Hide the text element
      console.log("Switching to Lesson 1 scene");
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson1Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson2Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson3Scene(); // Create new scene and set it as current
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

    // Call the function for each note using js objects
    notes.forEach(function (note) {
      myFunction(note.originalMaterialName, note.highlightColor, note.soundFileName, currentScene);
    });


  });

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


  // Guitar
  // Append glTF model to scene.
  BABYLON.SceneLoader.Append("electric_guitar/", "scene1.gltf", currentScene, function (currentScene) {
    // Create a default arc rotate camera and light.

    currentScene.createDefaultCameraOrLight(true, false, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    currentScene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    currentScene.activeCamera.beta -= Math.PI;






    const targetPosition = new BABYLON.Vector3(0, 200, -250);
    const delay = 3000; // 3-second delay
    const duration = 3000; // 3-second animation duration
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
      clearHighlighting();
      const textElement = document.getElementById("text");
      textElement.style.display = "none"; // Hide the text element
      console.log("Switching to Lesson 1 scene");
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson1Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson2Scene(); // Create new scene and set it as current
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
      engine.stopRenderLoop(); // Stop previous render loop
      if (currentScene) {
        currentScene.dispose(); // Dispose of previous scene
      }
      currentScene = lesson3Scene(); // Create new scene and set it as current
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

    // Call the function for each note using js objects
    notes.forEach(function (note) {
      myFunction(note.originalMaterialName, note.highlightColor, note.soundFileName, currentScene);
    });


  });

  return currentScene;

}


//Create note interaction
// function createNoteInteraction(originalMaterialName, highlightColor, soundFileName) {
//   var pickResult;
//   var originalMaterial;
//   var highlightMaterial;
//   var isHighlighted = false;
//   var pointerObserver;

//   // Get the original material from the Blender object
//   originalMaterial = currentScene.getMaterialByName(originalMaterialName);
//   if (!originalMaterial) {
//     console.error("Material not found:", originalMaterialName);
//     return;
//   }

//   // Create a new material for highlighting
//   highlightMaterial = originalMaterial.clone(originalMaterialName + "_highlight");
//   console.log(originalMaterialName);
//   highlightMaterial.emissiveColor = highlightColor;
//   highlightMaterial.alpha = 0.3;

//   // Cache the meshes with the original material
//   var originalMeshes = currentScene.meshes.filter(function (mesh) {
//     return mesh.material === originalMaterial;
//   }); // have a look at this to return true or false

//   // Perform the raycasting operation when the mouse is moved
//   pointerObserver = currentScene.onPointerObservable.add(function (pointerInfo) {
//     if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
//       pickResult = currentScene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY, function (mesh) {
//         // Check if the mesh has one of the original materials
//         return originalMeshes.indexOf(mesh) !== -1;
//       });

//       // Check if the pointer is over the guitar mesh
//       if (pickResult.hit && !isHighlighted) {
//         // Change the material to the highlight material
//         pickResult.pickedMesh.material = highlightMaterial;
//         console.log("Highlighted note quad.");
//         isHighlighted = true;
//       } else if (!pickResult.hit && isHighlighted) {
//         // Change back to the original material
//         originalMeshes.forEach(function (mesh) {
//           mesh.material = originalMaterial;
//         });
//         isHighlighted = false;
//       }
//     } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted) {
//       // Play the sound when the mouse is clicked and the material is highlighted
//       var noteSound = new Audio('Sound/' + soundFileName);
//       noteSound.play();

//       // Display the text after the "-" symbol for 2 seconds
//       var noteText = document.getElementById("note-text");
//       var parts = originalMaterialName.split("-");
//       var textAfterDash = parts[1];
//       noteText.innerHTML = textAfterDash;
//       noteText.style.opacity = 1;
//       setTimeout(function () {
//         noteText.style.opacity = 0;
//       }, 3000);
//     }
//   });

//   // Return the observer object so that it can be disposed later
//   return pointerObserver;
// }


// Zoom in animation
// function zoomToTarget(camera, targetPosition, delay = 0, duration = 1000) {


//   const zoomAnimation = new BABYLON.Animation(
//     "zoomAnimation",
//     "radius",
//     duration,
//     BABYLON.Animation.ANIMATIONTYPE_FLOAT,
//     BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
//   );

//   const keys = [];
//   keys.push({
//     frame: 0,
//     value: camera.radius
//   });
//   keys.push({
//     frame: duration,
//     value: targetPosition.subtract(camera.position).length()
//   });

//   zoomAnimation.setKeys(keys);


//   setTimeout(() => {
//     currentScene.beginDirectAnimation(camera, [zoomAnimation], 0, duration, false);
//     // This targets the camera to scene origin
//     camera.setTarget(new BABYLON.Vector3(0, 0, -250));
//     currentScene.activeCamera.alpha -= Math.PI / 2;
//     currentScene.activeCamera.beta -= Math.PI;
//   }, delay);

// }

async function zoomToTarget(camera, targetPosition, delay = 0, duration = 1000) {
  return new Promise(resolve => {
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
      camera.setTarget(new BABYLON.Vector3(0, 0, -250));
      currentScene.activeCamera.alpha -= Math.PI / 2;
      currentScene.activeCamera.beta -= Math.PI;
      resolve();
    }, delay);
  });
}


//Show text
function showTextLetterByLetter(text, index) {
  // Get the text element
  var textElement = document.getElementById("text");

  // Check if we've reached the end of the text
  if (index >= text.length) {
    setTimeout(function () {
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
  setTimeout(function () {
    showTextLetterByLetter(text, index);
  }, 20);

}

let originalMeshes = [];

async function createNoteQuiz(originalMaterialName, highlightColor, soundFileName, currentScene) {
  let originalMaterial;
  let highlightMaterial;
  let isHighlighted = false;
  let pointerObserver;
  let quizMaterialName;
  let quizText;
  let quizElement;

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

  // Clear the cache of meshes with the original material
  BABYLON.Mesh.CleanCachedMaterialByName(originalMaterial.name);

  // Cache the meshes with the original material
  const originalMeshes = currentScene.meshes.filter(mesh => mesh.material === originalMaterial);

  // Choose a random material for the quiz and display the question
  quizMaterialName = originalMaterialName.split("-")[1];
  quizText = `Play the note ${quizMaterialName}`;
  quizElement = document.getElementById("note-quiz");
  quizElement.innerHTML = quizText;

  // Perform the raycasting operation when the mouse is moved
  pointerObserver = currentScene.onPointerObservable.add(async function (pointerInfo) {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
      const pickResult = currentScene.pick(
        pointerInfo.event.clientX,
        pointerInfo.event.clientY,
        mesh => originalMeshes.indexOf(mesh) !== -1
      );

      // Check if the pointer is over the guitar mesh
      if (pickResult.hit && !isHighlighted) {
        // Change the material to the highlight material
        pickResult.pickedMesh.material = highlightMaterial;
        isHighlighted = true;
      } else if (!pickResult.hit && isHighlighted) {
        // Change back to the original material
        originalMeshes.forEach(mesh => mesh.material = originalMaterial);
        isHighlighted = false;
      }
    } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted) {
      // Check if the user has clicked on the correct material
      const pickedMaterialName = pickResult.pickedMesh.name.split("-")[1];
      if (pickedMaterialName === quizMaterialName) {
        // Play the sound when the correct material is clicked
        const noteSound = new Audio('Sound/' + soundFileName);
        noteSound.play();

        // Display "Well done!" message for 2 seconds
        quizElement.innerHTML = "Well done!";
        setTimeout(function () {
          quizElement.innerHTML = quizText;
        }, 2000);

        // Choose a new random material for the quiz
        quizMaterialName = originalMaterialName.split("-")[1];
        quizText = `Play the note ${quizMaterialName}`;
      } else {
        // Display "Try again" message for 2 seconds
        quizElement.innerHTML = "Try again";
        setTimeout(function () {
          quizElement.innerHTML = quizText;
        }, 2000);
      }

      // Change back to the original material
      originalMeshes.forEach(mesh => mesh.material = originalMaterial);
      isHighlighted = false;
    }
  });

  // Return the observer object so that it can be disposed later
  return pointerObserver;
}
let myFunction1 = async function createNoteLesson1(originalMaterialName, highlightColor, soundFileName, currentScene) {
  let originalMaterial;
  let highlightMaterial;
  let isHighlighted = false;
  let pointerObserver;

  // Get the original material from the Blender object
  originalMaterial = currentScene.getMaterialByName(originalMaterialName);
  if (!originalMaterial) {
    console.error("Material not found:", originalMaterialName);
    return;
  }

  // Create a new material for highlighting
  highlightMaterial = originalMaterial.clone(originalMaterialName + "_highlight");
  console.log(originalMaterialName);
  highlightMaterial.emissiveColor = highlightColor;
  highlightMaterial.alpha = 0.3;

  // Cache the meshes with the original material
  const originalMeshes = currentScene.meshes.filter(mesh => mesh.material === originalMaterial);

  // Perform the raycasting operation when the mouse is moved
  pointerObserver = currentScene.onPointerObservable.add(async function (pointerInfo) {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
      const pickResult = currentScene.pick(
        pointerInfo.event.clientX,
        pointerInfo.event.clientY,
        mesh => originalMeshes.indexOf(mesh) !== -1
      );

      // Check if the pointer is over the guitar mesh
      if (pickResult.hit && !isHighlighted) {
        // Change the material to the highlight material
        pickResult.pickedMesh.material = highlightMaterial;
        console.log("Highlighted note quad.");
        isHighlighted = true;
      } else if (!pickResult.hit && isHighlighted) {
        // Change back to the original material
        originalMeshes.forEach(mesh => mesh.material = originalMaterial);
        isHighlighted = false;
      }
    } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted) {
      // Prompt the user to play the note
      const noteText = document.getElementById("note-text");
      const parts = originalMaterialName.split("-");
      const textAfterDash = parts[1];
      const userNote = prompt("Play the note " + textAfterDash + " on your instrument.");
      
      // Verify whether the user played the correct note
      const correctNote = soundFileName.split(".")[0];
      if (userNote.toLowerCase() === correctNote.toLowerCase()) {
        alert("Well done!");
      } else {
        alert("Try again!");
        return;
      }
      
      // Play the sound when the mouse is clicked and the material is highlighted
      const noteSound = new Audio('Sound/' + soundFileName);
      noteSound.play();

      // Display the text after the "-" symbol for 2 seconds
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

let myFunction = async function createNoteInteraction(originalMaterialName, highlightColor, soundFileName, currentScene) {
  let originalMaterial;
  let highlightMaterial;
  let isHighlighted = false;
  let pointerObserver;

  // Get the original material from the Blender object
  originalMaterial = currentScene.getMaterialByName(originalMaterialName);
  if (!originalMaterial) {
    console.error("Material not found:", originalMaterialName);
    return;
  }

  // Create a new material for highlighting
  highlightMaterial = originalMaterial.clone(originalMaterialName + "_highlight");
  console.log(originalMaterialName);
  highlightMaterial.emissiveColor = highlightColor;
  highlightMaterial.alpha = 0.3;

  // Cache the meshes with the original material
  const originalMeshes = currentScene.meshes.filter(mesh => mesh.material === originalMaterial);

  // Perform the raycasting operation when the mouse is moved
  pointerObserver = currentScene.onPointerObservable.add(async function (pointerInfo) {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
      const pickResult = currentScene.pick(
        pointerInfo.event.clientX,
        pointerInfo.event.clientY,
        mesh => originalMeshes.indexOf(mesh) !== -1
      );

      // Check if the pointer is over the guitar mesh
      if (pickResult.hit && !isHighlighted) {
        // Change the material to the highlight material
        pickResult.pickedMesh.material = highlightMaterial;
        console.log("Highlighted note quad.");
        isHighlighted = true;
      } else if (!pickResult.hit && isHighlighted) {
        // Change back to the original material
        originalMeshes.forEach(mesh => mesh.material = originalMaterial);
        isHighlighted = false;
      }
    } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted) {
      // Play the sound when the mouse is clicked and the material is highlighted
      const noteSound = new Audio('Sound/' + soundFileName);
      noteSound.play();

      // Display the text after the "-" symbol for 2 seconds
      const noteText = document.getElementById("note-text");
      const parts = originalMaterialName.split("-");
      const textAfterDash = parts[1];
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

//Java Script objects for notes
var notes = [
  {
    originalMaterialName: "E-E",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E-E.mp3"
  },
  {
    originalMaterialName: "E-G",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E-G.mp3"
  },
  {
    originalMaterialName: "E-F#",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E-Fs.mp3"
  },
  {
    originalMaterialName: "E-F",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E-F.mp3"
  },
  {
    originalMaterialName: "G-G",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "G-G.mp3"
  },
  {
    originalMaterialName: "G-G#",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "G-Gs.mp3"
  },
  {
    originalMaterialName: "G-A",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "G-A.mp3"
  },
  {
    originalMaterialName: "G-A#",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "G-As.mp3"
  }
  ,
  {
    originalMaterialName: "B-B",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "B-B.mp3"
  },
  {
    originalMaterialName: "B-C",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "B-C.mp3"
  },
  {
    originalMaterialName: "B-C#",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "B-Cs.mp3"
  },
  {
    originalMaterialName: "B-D",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "B-D.mp3"
  }
  ,
  {
    originalMaterialName: "D-D",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "D-D.mp3"
  },
  {
    originalMaterialName: "D-D#",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "D-Ds.mp3"
  },
  {
    originalMaterialName: "D-E",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "D-E.mp3"
  },
  {
    originalMaterialName: "D-F",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "D-F.mp3"
  }
  ,
  {
    originalMaterialName: "A-A",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "A-A.mp3"
  },
  {
    originalMaterialName: "A-A#",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "A-As.mp3"
  },
  {
    originalMaterialName: "A-B",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "A-B.mp3"
  },
  {
    originalMaterialName: "A-C",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "A-C.mp3"
  }
  ,
  {
    originalMaterialName: "E1-E",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E1-E.mp3"
  },
  {
    originalMaterialName: "E1-G",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E1-G.mp3"
  },
  {
    originalMaterialName: "E1-F#",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E1-Fs.mp3"
  },
  {
    originalMaterialName: "E1-F",
    highlightColor: new BABYLON.Color3(1, 1, 1),
    soundFileName: "E1-F.mp3"
  }
];
// Function to clear the originalMeshes array and set the material of each mesh back to the original material
function clearHighlighting() {
  originalMeshes.forEach(mesh => mesh.material = mesh.originalMaterial);
  originalMeshes = [];
}

