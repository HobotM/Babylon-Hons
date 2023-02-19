var createScene = function () {
    //const scene = new BABYLON.Scene(engine);
    const alpha = 3 * Math.PI / 2;
    const beta = Math.PI / 5;
    const radius = 20;
    const target = new BABYLON.Vector3(2, 0, 0);
     const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
     camera.attachControl(canvas, true);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);



// Guitar
// Append glTF model to scene.
BABYLON.SceneLoader.Append("electric_guitar/", "scene.gltf", scene, function (scene) {
    // Create a default arc rotate camera and light.
    scene.createDefaultCameraOrLight(true, true, true);

    // The default camera looks at the back of the asset.
    // Rotate the camera by 180 degrees to the front of the asset.
    scene.activeCamera.alpha += Math.PI / 2;
    // Rotate the mesh around its y-axis
    scene.activeCamera.beta -= Math.PI;

    var pickResult;
    var originalMaterial;
    var highlightMaterial;

    // Get the original material from the Blender object
    originalMaterial = scene.getMaterialByName("E-G");
    console.log(originalMaterial)
    if (!originalMaterial) {
        console.error("Material not found:");
        return;
    }

    console.log("Original material:", originalMaterial.name);

    // Create a new material for highlighting
    highlightMaterial = originalMaterial.clone("E-G");
    highlightMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // Set the diffuse color to white
    highlightMaterial.alpha = 0.3; // Set the alpha value to 0.5 for semi-transparency

    console.log("cloned");

    var isHighlighted = false;

    // Perform the raycasting operation when the mouse is moved
    scene.onPointerObservable.add(function (pointerInfo) {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
            pickResult = scene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY, function (mesh) {
                // Return true for the mesh with the correct material
                return mesh.material === originalMaterial;
            });

            // Check if the pointer is over the guitar mesh
            if (pickResult.hit && !isHighlighted) {
                // Change the material to the highlight material
                pickResult.pickedMesh.material = highlightMaterial;
                console.log("Highlighted note quad.");
                isHighlighted = true;
            } else if (!pickResult.hit && isHighlighted) {
                // Change back to the original material
                scene.meshes.forEach(function (mesh) {
                    if (mesh.material === highlightMaterial) {
                        mesh.material = originalMaterial;
                    }
                });
                isHighlighted = false;
            }
        } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted) {
            // Play the sound when the mouse is clicked and the material is highlighted
            var guitarSound = new Audio('Sound/p-hub-intro.mp3');
            guitarSound.play();
        }
    });


    var pickResult1;
    var originalMaterial1;
    var highlightMaterial1;

    // Get the original material from the Blender object
    originalMaterial1 = scene.getMaterialByName("E-F#");
    console.log(originalMaterial1)
    if (!originalMaterial1) {
        console.error("Material not found:");
        return;
    }

    console.log("Original material:", originalMaterial1.name);

    // Create a new material for highlighting
    highlightMaterial1 = originalMaterial1.clone("E-F#");
    highlightMaterial1.emissiveColor = new BABYLON.Color3(1, 1, 1); // Set the diffuse color to white
    highlightMaterial1.alpha = 0.3; // Set the alpha value to 0.5 for semi-transparency

    console.log("cloned");

    var isHighlighted1 = false;

    // Perform the raycasting operation when the mouse is moved
    scene.onPointerObservable.add(function (pointerInfo) {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
            pickResult1 = scene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY, function (mesh) {
                // Return true for the mesh with the correct material
                return mesh.material === originalMaterial1;
            });

            // Check if the pointer is over the guitar mesh
            if (pickResult1.hit && !isHighlighted1) {
                // Change the material to the highlight material
                pickResult1.pickedMesh.material = highlightMaterial1;
                console.log("Highlighted note quad.");
                isHighlighted1 = true;
            } else if (!pickResult1.hit && isHighlighted1) {
                // Change back to the original material
                scene.meshes.forEach(function (mesh) {
                    if (mesh.material === highlightMaterial1) {
                        mesh.material = originalMaterial1;
                    }
                });
                isHighlighted1 = false;
            }
        } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && isHighlighted1) {
            // Play the sound when the mouse is clicked and the material is highlighted
            var guitarSound1 = new Audio('Sound/pew.mp3');
            guitarSound1.play();
        }
    });
});



  

    

  












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