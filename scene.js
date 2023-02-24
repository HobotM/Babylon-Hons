var createScene = function () {
  //const scene = new BABYLON.Scene(engine);
  const alpha = 3 * Math.PI / 2;
  const beta = Math.PI / 5;
  const radius = 400;
  const target = new BABYLON.Vector3(0, 0, -100);
  const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
  camera.attachControl(canvas, true);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  var canvas = document.getElementById("game");

  

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
    
     // Add an easing function to the animation
  const easeOutCubic = new BABYLON.CubicEase();
  easeOutCubic.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
  zoomAnimation.setEasingFunction(easeOutCubic);
  
    setTimeout(() => {
      scene.beginDirectAnimation(camera, [zoomAnimation], 0, duration, false);
       // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0,0, -250));
    scene.activeCamera.alpha -= Math.PI /2;
    scene.activeCamera.beta -= Math.PI ;
    }, delay);

  }
  
 

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

    createNoteInteraction("G-G#", new BABYLON.Color3(1, 1, 1), "G-Gs.mp3");
    createNoteInteraction("G-A", new BABYLON.Color3(1, 1, 1), "G-A.mp3");
    createNoteInteraction("G-A#", new BABYLON.Color3(1, 1, 1), "G-As.mp3");

    createNoteInteraction("B-C", new BABYLON.Color3(1, 1, 1), "B-C.mp3");
    createNoteInteraction("B-C#", new BABYLON.Color3(1, 1, 1), "B-Cs.mp3");
    createNoteInteraction("B-D", new BABYLON.Color3(1, 1, 1), "B-D.mp3");

    createNoteInteraction("D-D#", new BABYLON.Color3(1, 1, 1), "D-Ds.mp3");
    createNoteInteraction("D-E", new BABYLON.Color3(1, 1, 1), "D-E.mp3");
    createNoteInteraction("D-F", new BABYLON.Color3(1, 1, 1), "D-F.mp3");

    createNoteInteraction("A-A#", new BABYLON.Color3(1, 1, 1), "A-As.mp3");
    createNoteInteraction("A-B", new BABYLON.Color3(1, 1, 1), "A-B.mp3");
    createNoteInteraction("A-C", new BABYLON.Color3(1, 1, 1), "A-C.mp3");

    createNoteInteraction("E1-G", new BABYLON.Color3(1, 1, 1), "E1-G.mp3");
    createNoteInteraction("E1-F#", new BABYLON.Color3(1, 1, 1), "E1-Fs.mp3");
    createNoteInteraction("E1-F", new BABYLON.Color3(1, 1, 1), "E1-F.mp3");


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
button1.onPointerUpObservable.add(function() {
  // Create a new scene
  var newScene = new BABYLON.Scene(engine);

  // Add any scene elements you want to the new scene here

  // Open the new scene
  engine.scenes.push(newScene);
  engine.enterFullscreen(true);
});
gui.addControl(button1);

// Create Lesson 2 button
var button2 = BABYLON.GUI.Button.CreateSimpleButton("lesson2", "Lesson 2");
button2.width = buttonWidth + "px";
button2.height = "40px";
button2.color = "white";
button2.cornerRadius = 10;
button2.background = "red";
button2.onPointerUpObservable.add(function() {
  console.log("Lesson 2 button clicked");
});
gui.addControl(button2);

// Create Lesson 3 button
var button3 = BABYLON.GUI.Button.CreateSimpleButton("lesson3", "Lesson 3");
button3.width = buttonWidth + "px";
button3.height = "40px";
button3.color = "white";
button3.cornerRadius = 10;
button3.background = "blue";
button3.onPointerUpObservable.add(function() {
  console.log("Lesson 3 button clicked");
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











  //  // Call the function for each note
  //  createNoteInteraction("E-G", new BABYLON.Color3(1, 1, 1), "p-hub-intro.mp3");
  //  createNoteInteraction("E-F#", new BABYLON.Color3(1, 1, 1), "pew.mp3");
  //  createNoteInteraction("E-F", new BABYLON.Color3(1, 1, 1), "pew.mp3");
  //  createNoteInteraction("B-C", new BABYLON.Color3(1, 1, 1), "emotional-damage-meme.mp3");
  //  createNoteInteraction("B-C#", new BABYLON.Color3(1, 1, 1), "error_CDOxCYm.mp3");
  //  createNoteInteraction("B-D", new BABYLON.Color3(1, 1, 1), "rehehehe.mp3");


  // //SOUNDS
  // var soundA = new BABYLON.Sound("A", "Sound/A.mp3", scene, null, { loop: false, autoplay: false });
  // var soundB = new BABYLON.Sound("B", "Sound/B.mp3", scene, null, { loop: false, autoplay: false });
  // var soundC = new BABYLON.Sound("C", "Sound/C.mp3", scene, null, { loop: false, autoplay: false });
  // var soundD = new BABYLON.Sound("D", "Sound/D.mp3", scene, null, { loop: false, autoplay: false });
  // var soundE = new BABYLON.Sound("E", "Sound/E.mp3", scene, null, { loop: false, autoplay: false });
  // var soundF = new BABYLON.Sound("F", "Sound/F.mp3", scene, null, { loop: false, autoplay: false });




  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  // light.intensity = 1.5;


  // // Create the line
  // var line1 = BABYLON.MeshBuilder.CreateLines("line1", { points: [new BABYLON.Vector3(-5, 0, 0), new BABYLON.Vector3(5, 0, 0)] }, scene);
  // line1.color = new BABYLON.Color3(1, 0, 0); // set the color of the line
  // line1.alpha = 1;
  // line1.width = 0.1;

  // var line2 = BABYLON.MeshBuilder.CreateLines("line2", { points: [new BABYLON.Vector3(-5, 0, 0.5), new BABYLON.Vector3(5, 0, 0.5)] }, scene);
  // line2.color = new BABYLON.Color3(1, 0, 0); // set the color of the line
  // line2.alpha = 1;
  // line2.width = 0.1;

  // var line3 = BABYLON.MeshBuilder.CreateLines("line3", { points: [new BABYLON.Vector3(-5, 0, 1), new BABYLON.Vector3(5, 0, 1)] }, scene);
  // line3.color = new BABYLON.Color3(1, 0, 0); // set the color of the line
  // line3.alpha = 1;
  // line3.width = 0.1;

  // var line4 = BABYLON.MeshBuilder.CreateLines("line4", { points: [new BABYLON.Vector3(-5, 0, 1.5), new BABYLON.Vector3(5, 0, 1.5)] }, scene);
  // line4.color = new BABYLON.Color3(1, 0, 0); // set the color of the line
  // line4.alpha = 1;
  // line4.width = 0.1;

  // var line5 = BABYLON.MeshBuilder.CreateLines("line5", { points: [new BABYLON.Vector3(-5, 0, 2), new BABYLON.Vector3(5, 0, 2)] }, scene);
  // line5.color = new BABYLON.Color3(1, 0, 0); // set the color of the line
  // line5.alpha = 1;
  // line5.width = 0.1;

  // var line6 = BABYLON.MeshBuilder.CreateLines("line6", { points: [new BABYLON.Vector3(-5, 0, 2.5), new BABYLON.Vector3(5, 0, 2.5)] }, scene);
  // line6.color = new BABYLON.Color3(1, 0, 0); // set the color of the line
  // line6.alpha = 1;
  // line6.width = 0.1;

  // // Create the point for line1
  // var A = BABYLON.MeshBuilder.CreateSphere("A", { diameter: 0.1 }, scene);
  // A.position = new BABYLON.Vector3(-2, 0, 0);
  // var B = BABYLON.MeshBuilder.CreateSphere("B", { diameter: 0.1 }, scene);
  // B.position = new BABYLON.Vector3(-1, 0, 0);
  // var C = BABYLON.MeshBuilder.CreateSphere("C", { diameter: 0.1 }, scene);
  // C.position = new BABYLON.Vector3(0, 0, 0);
  // var D = BABYLON.MeshBuilder.CreateSphere("D", { diameter: 0.1 }, scene);
  // D.position = new BABYLON.Vector3(1, 0, 0);
  // var E = BABYLON.MeshBuilder.CreateSphere("E", { diameter: 0.1 }, scene);
  // E.position = new BABYLON.Vector3(2, 0, 0);
  // var F = BABYLON.MeshBuilder.CreateSphere("F", { diameter: 0.1 }, scene);
  // F.position = new BABYLON.Vector3(3, 0, 0);

  // // Create the point for line2
  // var A = BABYLON.MeshBuilder.CreateSphere("A", { diameter: 0.1 }, scene);
  // A.position = new BABYLON.Vector3(-2, 0, 0.5);
  // var B = BABYLON.MeshBuilder.CreateSphere("B", { diameter: 0.1 }, scene);
  // B.position = new BABYLON.Vector3(-1, 0, 0.5);
  // var C = BABYLON.MeshBuilder.CreateSphere("C", { diameter: 0.1 }, scene);
  // C.position = new BABYLON.Vector3(0, 0, 0.5);
  // var D = BABYLON.MeshBuilder.CreateSphere("D", { diameter: 0.1 }, scene);
  // D.position = new BABYLON.Vector3(1, 0, 0.5);
  // var E = BABYLON.MeshBuilder.CreateSphere("E", { diameter: 0.1 }, scene);
  // E.position = new BABYLON.Vector3(2, 0, 0.5);
  // var F = BABYLON.MeshBuilder.CreateSphere("F", { diameter: 0.1 }, scene);
  // F.position = new BABYLON.Vector3(3, 0, 0.5);

  // // Create the point for line3
  // var A = BABYLON.MeshBuilder.CreateSphere("A", { diameter: 0.1 }, scene);
  // A.position = new BABYLON.Vector3(-2, 0, 1);
  // var B = BABYLON.MeshBuilder.CreateSphere("B", { diameter: 0.1 }, scene);
  // B.position = new BABYLON.Vector3(-1, 0, 1);
  // var C = BABYLON.MeshBuilder.CreateSphere("C", { diameter: 0.1 }, scene);
  // C.position = new BABYLON.Vector3(0, 0, 1);
  // var D = BABYLON.MeshBuilder.CreateSphere("D", { diameter: 0.1 }, scene);
  // D.position = new BABYLON.Vector3(1, 0, 1);
  // var E = BABYLON.MeshBuilder.CreateSphere("E", { diameter: 0.1 }, scene);
  // E.position = new BABYLON.Vector3(2, 0, 1);
  // var F = BABYLON.MeshBuilder.CreateSphere("F", { diameter: 0.1 }, scene);
  // F.position = new BABYLON.Vector3(3, 0, 1);

  // // Create the point for line4
  // var A = BABYLON.MeshBuilder.CreateSphere("A", { diameter: 0.1 }, scene);
  // A.position = new BABYLON.Vector3(-2, 0, 1.5);
  // var B = BABYLON.MeshBuilder.CreateSphere("B", { diameter: 0.1 }, scene);
  // B.position = new BABYLON.Vector3(-1, 0, 1.5);
  // var C = BABYLON.MeshBuilder.CreateSphere("C", { diameter: 0.1 }, scene);
  // C.position = new BABYLON.Vector3(0, 0, 1.5);
  // var D = BABYLON.MeshBuilder.CreateSphere("D", { diameter: 0.1 }, scene);
  // D.position = new BABYLON.Vector3(1, 0, 1.5);
  // var E = BABYLON.MeshBuilder.CreateSphere("E", { diameter: 0.1 }, scene);
  // E.position = new BABYLON.Vector3(2, 0, 1.5);
  // var F = BABYLON.MeshBuilder.CreateSphere("F", { diameter: 0.1 }, scene);
  // F.position = new BABYLON.Vector3(3, 0, 1.5);

  // // Create the point for line5
  // var A = BABYLON.MeshBuilder.CreateSphere("A", { diameter: 0.1 }, scene);
  // A.position = new BABYLON.Vector3(-2, 0, 2);
  // var B = BABYLON.MeshBuilder.CreateSphere("B", { diameter: 0.1 }, scene);
  // B.position = new BABYLON.Vector3(-1, 0, 2);
  // var C = BABYLON.MeshBuilder.CreateSphere("C", { diameter: 0.1 }, scene);
  // C.position = new BABYLON.Vector3(0, 0, 2);
  // var D = BABYLON.MeshBuilder.CreateSphere("D", { diameter: 0.1 }, scene);
  // D.position = new BABYLON.Vector3(1, 0, 2);
  // var E = BABYLON.MeshBuilder.CreateSphere("E", { diameter: 0.1 }, scene);
  // E.position = new BABYLON.Vector3(2, 0, 2);
  // var F = BABYLON.MeshBuilder.CreateSphere("F", { diameter: 0.1 }, scene);
  // F.position = new BABYLON.Vector3(3, 0, 2);

  // // Create the point for line6
  // var A = BABYLON.MeshBuilder.CreateSphere("A", { diameter: 0.1 }, scene);
  // A.position = new BABYLON.Vector3(-2, 0, 2.5);
  // var B = BABYLON.MeshBuilder.CreateSphere("B", { diameter: 0.1 }, scene);
  // B.position = new BABYLON.Vector3(-1, 0, 2.5);
  // var C = BABYLON.MeshBuilder.CreateSphere("C", { diameter: 0.1 }, scene);
  // C.position = new BABYLON.Vector3(0, 0, 2.5);
  // var D = BABYLON.MeshBuilder.CreateSphere("D", { diameter: 0.1 }, scene);
  // D.position = new BABYLON.Vector3(1, 0, 2.5);
  // var E = BABYLON.MeshBuilder.CreateSphere("E", { diameter: 0.1 }, scene);
  // E.position = new BABYLON.Vector3(2, 0, 2.5);
  // var F = BABYLON.MeshBuilder.CreateSphere("F", { diameter: 0.1 }, scene);
  // F.position = new BABYLON.Vector3(3, 0, 2.5);


  // // Register an action manager to handle the click event
  // A.actionManager = new BABYLON.ActionManager(scene);
  // A.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
  //     soundA.play();
  // }));

  // B.actionManager = new BABYLON.ActionManager(scene);
  // B.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
  //     soundB.play();
  // }));
  // C.actionManager = new BABYLON.ActionManager(scene);
  // C.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
  //     soundC.play();
  // }));
  // D.actionManager = new BABYLON.ActionManager(scene);
  // D.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
  //     soundD.play();
  // }));
  // E.actionManager = new BABYLON.ActionManager(scene);
  // E.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
  //     soundE.play();
  // }));
  // F.actionManager = new BABYLON.ActionManager(scene);
  // F.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
  //     soundF.play();
  // }));


  return scene;
}
