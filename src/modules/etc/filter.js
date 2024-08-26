import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'; // 보정용
import { HueSaturationShader } from 'three/examples/jsm/shaders/HueSaturationShader.js'; // 보정용
import { BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader.js'; // 보정용


export default async function filter(sdk, modelNumber) {
    let hueSaturationShader, bcShader;
    await sdk.Scene.configure(function (renderer, THREE, effectComposer) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        if (effectComposer) {
            if (modelNumber = "809") {
                hueSaturationShader = new ShaderPass(HueSaturationShader);
                // hueSaturationShader.uniforms['hue'].value = 0.015; // -1 to 1 색조
                hueSaturationShader.uniforms['saturation'].value = 0.1; // 0 to 1 채도
                effectComposer.addPass(hueSaturationShader);

                // Add the Brightness/Contrast shader pass
                bcShader = new ShaderPass(BrightnessContrastShader);
                bcShader.uniforms['brightness'].value = 0.05; // -1 to 1 명도
                // bcShader.uniforms['contrast'].value = 0.1; // -1 to 1 대조
                effectComposer.addPass(bcShader);
            } else {
                hueSaturationShader = new ShaderPass(HueSaturationShader);
                // hueSaturationShader.uniforms['hue'].value = 0.015; // -1 to 1 색조
                hueSaturationShader.uniforms['saturation'].value = 0.1; // 0 to 1 채도
                effectComposer.addPass(hueSaturationShader);

                // Add the Brightness/Contrast shader pass
                bcShader = new ShaderPass(BrightnessContrastShader);
                bcShader.uniforms['brightness'].value = 0.1; // -1 to 1 명도
                bcShader.uniforms['contrast'].value = 0.1; // -1 to 1 대조
                effectComposer.addPass(bcShader);
            }
        }
    }).then(() => {
        console.log("필터 적용됨");
    });
}