import * as THREE from "https://threejs.org/build/three.module.js";

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function SetObjectToCenter(obj, cntr) {

    var bbox = new THREE.Box3().setFromObject(obj);

    var cx = (bbox.max.x - bbox.min.x) / 2;
    var cz = (bbox.max.z - bbox.min.z) / 2;
    var cy = (bbox.max.y - bbox.min.y);

    obj.position.x -= bbox.min.x + cx;
    obj.position.z -= bbox.min.z + cz;
    obj.position.y -= bbox.min.y;

    cntr.target = new THREE.Vector3(0, cy / 2, 0);
}

function NormalizeExtrudeUV(object) {

    object.computeBoundingBox();
    var bbox = object.boundingBox;
    var dx = bbox.max.x - bbox.min.x;
    var dy = bbox.max.y - bbox.min.y;
    var dz = bbox.max.z - bbox.min.z;

    var fn = new THREE.Vector3();

    let uvAttribute = object.attributes.uv;
    for (var i = 0; i < uvAttribute.count; i += 1) {
        var u = uvAttribute.getX(i);
        var v = uvAttribute.getY(i);

        uvAttribute.setXY(i, u / dx, v / dy);
    }

    uvAttribute.needsUpdate = true;
}

function AddColorToCanvas(Color, Canvas) {
    Canvas.fillStyle = Color;
    Canvas.fillRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
}

function AddImageToCanvas(Image, Canvas) {
    var image = new THREE.ImageLoader().load(Image);
    Canvas.drawImage(image, 0, 0, Canvas.canvas.width, Canvas.canvas.height);
}

function SetLightPos(light, dist, alpha, betta) {
    light.position.x = dist * Math.cos(pi * alpha) * Math.sin(pi * betta);
    light.position.z = dist * Math.sin(pi * alpha) * Math.sin(pi * betta);
    light.position.y = dist * Math.cos(pi * betta)
    light.lookAt(0, 0, 0);
}

function DisposeObj(obj) {

    while (obj.children.length > 0) {
        DisposeObj(obj.children[0]);
        obj.remove(obj.children[0]);
    }

    if (obj.geometry) obj.geometry.dispose();
    scene.remove(obj);
}

export {
    rgbToHex,
    SetObjectToCenter,
    NormalizeExtrudeUV,
    AddColorToCanvas,
    AddImageToCanvas,
    SetLightPos,
    DisposeObj
};
