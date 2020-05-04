import { property, UpdatingElement } from '../lit-element.js';
import { Loader, FileLoader, BufferGeometry, BufferAttribute, LoaderUtils, Color, SpotLight, PointLight, DirectionalLight, MeshBasicMaterial, MeshStandardMaterial, TangentSpaceNormalMap, TextureLoader, InterleavedBuffer, LinearFilter, LinearMipmapLinearFilter, RepeatWrapping, RGBFormat, PointsMaterial, Material as Material$1, LineBasicMaterial, VertexColors, DoubleSide, Vector2, sRGBEncoding, SkinnedMesh, Mesh, LineSegments, Line, LineLoop, Points, Group, PerspectiveCamera, Math as MathUtils, OrthographicCamera, InterpolateLinear, AnimationClip, Bone, Object3D, PropertyBinding, Matrix4, Scene, Skeleton, Interpolant, NearestFilter, NearestMipmapNearestFilter, LinearMipmapNearestFilter, NearestMipmapLinearFilter, ClampToEdgeWrapping, MirroredRepeatWrapping, InterpolateDiscrete, RGBAFormat, FrontSide, InterleavedBufferAttribute, TriangleFanDrawMode, TriangleStripDrawMode, VectorKeyframeTrack, QuaternionKeyframeTrack, NumberKeyframeTrack, Vector3, Box3, Sphere, PlaneBufferGeometry, RawShaderMaterial, NoBlending, WebGLRenderTarget, LinearMipMapLinearFilter, AnimationMixer, SkeletonHelper, Euler, Quaternion, RingGeometry, EventDispatcher, ShaderMaterial, Texture, DataTextureLoader, HalfFloatType, FloatType, UnsignedByteType, RGBEFormat, LinearEncoding, RGBEEncoding, BoxBufferGeometry, BackSide, Cache, PMREMGenerator, GammaEncoding, WebGLRenderer, PCFSoftShadowMap, ACESFilmicToneMapping, ShadowMaterial, Raycaster, Spherical } from '../three.js';

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// NOTE(cdata): The HAS_WEBXR_* constants can be enabled in Chrome by turning on
// the appropriate flags. However, just because we have the API does not
// guarantee that AR will work.
const HAS_WEBXR_DEVICE_API = navigator.xr != null &&
    self.XRSession != null && navigator.xr.isSessionSupported != null;
const HAS_WEBXR_HIT_TEST_API = HAS_WEBXR_DEVICE_API && self.XRSession.prototype.requestHitTestSource;
const HAS_RESIZE_OBSERVER = self.ResizeObserver != null;
const HAS_INTERSECTION_OBSERVER = self.IntersectionObserver != null;
const IS_WEBXR_AR_CANDIDATE = HAS_WEBXR_HIT_TEST_API;
const IS_MOBILE = (() => {
    const userAgent = navigator.userAgent || navigator.vendor || self.opera;
    let check = false;
    // eslint-disable-next-line
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
        .test(userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
            .test(userAgent.substr(0, 4))) {
        check = true;
    }
    return check;
})();
const HAS_OFFSCREEN_CANVAS = Boolean(self.OffscreenCanvas);
const OFFSCREEN_CANVAS_SUPPORT_BITMAP = Boolean(self.OffscreenCanvas) &&
    Boolean(self.OffscreenCanvas.prototype.transferToImageBitmap);
const IS_ANDROID = /android/i.test(navigator.userAgent);
// Prior to iOS 13, detecting iOS Safari was relatively straight-forward.
// As of iOS 13, Safari on iPad (in its default configuration) reports the same
// user-agent string as Safari on desktop MacOS. Strictly speaking, we only care
// about iOS for the purposes if selecting for cases where Quick Look is known
// to be supported. However, for API correctness purposes, we must rely on
// known, detectable signals to distinguish iOS Safari from MacOS Safari. At the
// time of this writing, there are no non-iOS/iPadOS Apple devices with
// multi-touch displays.
// @see https://stackoverflow.com/questions/57765958/how-to-detect-ipad-and-ipad-os-version-in-ios-13-and-up
// @see https://forums.developer.apple.com/thread/119186
// @see https://github.com/GoogleWebComponents/model-viewer/issues/758
const IS_IOS = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !self.MSStream) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const IS_AR_QUICKLOOK_CANDIDATE = (() => {
    const tempAnchor = document.createElement('a');
    return Boolean(tempAnchor.relList && tempAnchor.relList.supports &&
        tempAnchor.relList.supports('ar'));
})();
// @see https://developer.chrome.com/multidevice/user-agent
const IS_IOS_CHROME = IS_IOS && /CriOS\//.test(navigator.userAgent);
const IS_IOS_SAFARI = IS_IOS && /Safari\//.test(navigator.userAgent);

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CloseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000">
    <!-- NOTE(cdata): This SVG filter is a stop-gap until we can implement
         support for dynamic re-coloring of UI components -->
    <defs>
      <filter id="drop-shadow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
        <feOffset dx="0" dy="0" result="offsetblur"/>
        <feFlood flood-color="#000000"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path filter="url(#drop-shadow)" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>`;

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ControlsPrompt = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="36">
    <defs>
        <path id="A" d="M.001.232h24.997V36H.001z" />
    </defs>
    <g transform="translate(-11 -4)" fill="none" fill-rule="evenodd">
        <path fill-opacity="0" fill="#fff" d="M0 0h44v44H0z" />
        <g transform="translate(11 3)">
            <path d="M8.733 11.165c.04-1.108.766-2.027 1.743-2.307a2.54 2.54 0 0 1 .628-.089c.16 0 .314.017.463.044 1.088.2 1.9 1.092 1.9 2.16v8.88h1.26c2.943-1.39 5-4.45 5-8.025a9.01 9.01 0 0 0-1.9-5.56l-.43-.5c-.765-.838-1.683-1.522-2.712-2-1.057-.49-2.226-.77-3.46-.77s-2.4.278-3.46.77c-1.03.478-1.947 1.162-2.71 2l-.43.5a9.01 9.01 0 0 0-1.9 5.56 9.04 9.04 0 0 0 .094 1.305c.03.21.088.41.13.617l.136.624c.083.286.196.56.305.832l.124.333a8.78 8.78 0 0 0 .509.953l.065.122a8.69 8.69 0 0 0 3.521 3.191l1.11.537v-9.178z" fill-opacity=".5" fill="#e4e4e4" />
            <path d="M22.94 26.218l-2.76 7.74c-.172.485-.676.8-1.253.8H12.24c-1.606 0-3.092-.68-3.98-1.82-1.592-2.048-3.647-3.822-6.11-5.27-.095-.055-.15-.137-.152-.23-.004-.1.046-.196.193-.297.56-.393 1.234-.6 1.926-.6a3.43 3.43 0 0 1 .691.069l4.922.994V10.972c0-.663.615-1.203 1.37-1.203s1.373.54 1.373 1.203v9.882h2.953c.273 0 .533.073.757.21l6.257 3.874c.027.017.045.042.07.06.41.296.586.77.426 1.22M4.1 16.614c-.024-.04-.042-.083-.065-.122a8.69 8.69 0 0 1-.509-.953c-.048-.107-.08-.223-.124-.333l-.305-.832c-.058-.202-.09-.416-.136-.624l-.13-.617a9.03 9.03 0 0 1-.094-1.305c0-2.107.714-4.04 1.9-5.56l.43-.5c.764-.84 1.682-1.523 2.71-2 1.058-.49 2.226-.77 3.46-.77s2.402.28 3.46.77c1.03.477 1.947 1.16 2.712 2l.428.5a9 9 0 0 1 1.901 5.559c0 3.577-2.056 6.636-5 8.026h-1.26v-8.882c0-1.067-.822-1.96-1.9-2.16-.15-.028-.304-.044-.463-.044-.22 0-.427.037-.628.09-.977.28-1.703 1.198-1.743 2.306v9.178l-1.11-.537C6.18 19.098 4.96 18 4.1 16.614M22.97 24.09l-6.256-3.874c-.102-.063-.218-.098-.33-.144 2.683-1.8 4.354-4.855 4.354-8.243 0-.486-.037-.964-.104-1.43a9.97 9.97 0 0 0-1.57-4.128l-.295-.408-.066-.092a10.05 10.05 0 0 0-.949-1.078c-.342-.334-.708-.643-1.094-.922-1.155-.834-2.492-1.412-3.94-1.65l-.732-.088-.748-.03a9.29 9.29 0 0 0-1.482.119c-1.447.238-2.786.816-3.94 1.65a9.33 9.33 0 0 0-.813.686 9.59 9.59 0 0 0-.845.877l-.385.437-.36.5-.288.468-.418.778-.04.09c-.593 1.28-.93 2.71-.93 4.222 0 3.832 2.182 7.342 5.56 8.938l1.437.68v4.946L5 25.64a4.44 4.44 0 0 0-.888-.086c-.017 0-.034.003-.05.003-.252.004-.503.033-.75.08a5.08 5.08 0 0 0-.237.056c-.193.046-.382.107-.568.18-.075.03-.15.057-.225.1-.25.114-.494.244-.723.405a1.31 1.31 0 0 0-.566 1.122 1.28 1.28 0 0 0 .645 1.051C4 29.925 5.96 31.614 7.473 33.563a5.06 5.06 0 0 0 .434.491c1.086 1.082 2.656 1.713 4.326 1.715h6.697c.748-.001 1.43-.333 1.858-.872.142-.18.256-.38.336-.602l2.757-7.74c.094-.26.13-.53.112-.794s-.088-.52-.203-.76a2.19 2.19 0 0 0-.821-.91" fill-opacity=".6" fill="#000" />
            <path d="M22.444 24.94l-6.257-3.874a1.45 1.45 0 0 0-.757-.211h-2.953v-9.88c0-.663-.616-1.203-1.373-1.203s-1.37.54-1.37 1.203v16.643l-4.922-.994a3.44 3.44 0 0 0-.692-.069 3.35 3.35 0 0 0-1.925.598c-.147.102-.198.198-.194.298.004.094.058.176.153.23 2.462 1.448 4.517 3.22 6.11 5.27.887 1.14 2.373 1.82 3.98 1.82h6.686c.577 0 1.08-.326 1.253-.8l2.76-7.74c.16-.448-.017-.923-.426-1.22-.025-.02-.043-.043-.07-.06z" fill="#fff" />
            <g transform="translate(0 .769)">
                <mask id="B" fill="#fff">
                    <use xlink:href="#A" />
                </mask>
                <path d="M23.993 24.992a1.96 1.96 0 0 1-.111.794l-2.758 7.74c-.08.22-.194.423-.336.602-.427.54-1.11.87-1.857.872h-6.698c-1.67-.002-3.24-.633-4.326-1.715-.154-.154-.3-.318-.434-.49C5.96 30.846 4 29.157 1.646 27.773c-.385-.225-.626-.618-.645-1.05a1.31 1.31 0 0 1 .566-1.122 4.56 4.56 0 0 1 .723-.405l.225-.1a4.3 4.3 0 0 1 .568-.18l.237-.056c.248-.046.5-.075.75-.08.018 0 .034-.003.05-.003.303-.001.597.027.89.086l3.722.752V20.68l-1.436-.68c-3.377-1.596-5.56-5.106-5.56-8.938 0-1.51.336-2.94.93-4.222.015-.03.025-.06.04-.09.127-.267.268-.525.418-.778.093-.16.186-.316.288-.468.063-.095.133-.186.2-.277L3.773 5c.118-.155.26-.29.385-.437.266-.3.544-.604.845-.877a9.33 9.33 0 0 1 .813-.686C6.97 2.167 8.31 1.59 9.757 1.35a9.27 9.27 0 0 1 1.481-.119 8.82 8.82 0 0 1 .748.031c.247.02.49.05.733.088 1.448.238 2.786.816 3.94 1.65.387.28.752.588 1.094.922a9.94 9.94 0 0 1 .949 1.078l.066.092c.102.133.203.268.295.408a9.97 9.97 0 0 1 1.571 4.128c.066.467.103.945.103 1.43 0 3.388-1.67 6.453-4.353 8.243.11.046.227.08.33.144l6.256 3.874c.37.23.645.55.82.9.115.24.185.498.203.76m.697-1.195c-.265-.55-.677-1.007-1.194-1.326l-5.323-3.297c2.255-2.037 3.564-4.97 3.564-8.114 0-2.19-.637-4.304-1.84-6.114-.126-.188-.26-.37-.4-.552-.645-.848-1.402-1.6-2.252-2.204C15.472.91 13.393.232 11.238.232A10.21 10.21 0 0 0 5.23 2.19c-.848.614-1.606 1.356-2.253 2.205-.136.18-.272.363-.398.55C1.374 6.756.737 8.87.737 11.06c0 4.218 2.407 8.08 6.133 9.842l.863.41v3.092l-2.525-.51c-.356-.07-.717-.106-1.076-.106a5.45 5.45 0 0 0-3.14.996c-.653.46-1.022 1.202-.99 1.983a2.28 2.28 0 0 0 1.138 1.872c2.24 1.318 4.106 2.923 5.543 4.772 1.26 1.62 3.333 2.59 5.55 2.592h6.698c1.42-.001 2.68-.86 3.134-2.138l2.76-7.74c.272-.757.224-1.584-.134-2.325" fill-opacity=".05" fill="#000" mask="url(#B)" />
            </g>
        </g>
    </g>
</svg>`;

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ARGlyph = `
<svg version="1.1" id="view_x5F_in_x5F_AR_x5F_icon"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px"
	 viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
<rect id="Bounding_Box" x="0" y="0" fill="none" width="24" height="24"/>
<g id="Art_layer">
	<path d="M3,4c0-0.55,0.45-1,1-1h2V1H4C2.35,1,1,2.35,1,4v2h2V4z"/>
	<path d="M20,3c0.55,0,1,0.45,1,1v2h2V4c0-1.65-1.35-3-3-3h-2v2H20z"/>
	<path d="M4,21c-0.55,0-1-0.45-1-1v-2H1v2c0,1.65,1.35,3,3,3h2v-2H4z"/>
	<path d="M20,21c0.55,0,1-0.45,1-1v-2h2v2c0,1.65-1.35,3-3,3h-2v-2H20z"/>
	<g>
		<path d="M18.25,7.6l-5.5-3.18c-0.46-0.27-1.04-0.27-1.5,0L5.75,7.6C5.29,7.87,5,8.36,5,8.9v6.35c0,0.54,0.29,1.03,0.75,1.3
			l5.5,3.18c0.46,0.27,1.04,0.27,1.5,0l5.5-3.18c0.46-0.27,0.75-0.76,0.75-1.3V8.9C19,8.36,18.71,7.87,18.25,7.6z M7,14.96v-4.62
			l4,2.32v4.61L7,14.96z M12,10.93L8,8.61l4-2.31l4,2.31L12,10.93z M13,17.27v-4.61l4-2.32v4.62L13,17.27z"/>
	</g>
</g>
</svg>`;

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: block;
  position: relative;
  contain: strict;
  width: 300px;
  height: 150px;
}

/* NOTE: This ruleset is our integration surface area with the
 * :focus-visible polyfill.
 *
 * @see https://github.com/WICG/focus-visible/pull/196 */
:host([data-js-focus-visible]:focus:not(.focus-visible)),
:host([data-js-focus-visible]) :focus:not(.focus-visible) {
  outline: none;
}

.container {
  position: relative;
}

.annotation-container {
  position: absolute;
  pointer-events: none;
  top: 0;
}

canvas {
  width: 100%;
  height: 100%;
  display: none;
  /* NOTE(cdata): Chrome 76 and below apparently have a bug
   * that causes our canvas not to display pixels unless it is
   * on its own render layer
   * @see https://github.com/GoogleWebComponents/model-viewer/pull/755#issuecomment-536597893
   */
  transform: translateZ(0);
}

canvas.show {
  display: block;
}

/* Adapted from HTML5 Boilerplate
 *
 * @see https://github.com/h5bp/html5-boilerplate/blob/ceb4620c78fc82e13534fc44202a3f168754873f/dist/css/main.css#L122-L133 */
.screen-reader-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.slot {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slot > * {
  pointer-events: initial;
}

.annotation-wrapper ::slotted(*) {
  opacity: var(--max-hotspot-opacity, 1);
  transition: opacity 0.3s;
}

.pointer-tumbling .annotation-wrapper ::slotted(*) {
  pointer-events: none;
}

.annotation-wrapper ::slotted(*) {
  pointer-events: initial;
}

.annotation-wrapper.hide ::slotted(*) {
  opacity: var(--min-hotspot-opacity, 0.25);
}

.slot.poster {
  opacity: 0;
  transition: opacity 0.3s 0.3s;
  background-color: inherit;
}

.slot.poster.show {
  opacity: 1;
  transition: none;
}

.slot.poster > * {
  pointer-events: initial;
}

.slot.poster:not(.show) > * {
  pointer-events: none;
}

#default-poster {
  width: 100%;
  height: 100%;
  /* The default poster is a <button> so we need to set display
   * to prevent it from being affected by text-align: */
  display: block;
  position: absolute;
  border: none;
  padding: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--poster-color, inherit);
  background-image: var(--poster-image, none);
}

#default-progress-bar {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

#default-progress-bar > .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--progress-mask, #fff);
  transition: opacity 0.3s;
  opacity: 0.2;
}

#default-progress-bar > .bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--progress-bar-height, 5px);
  transition: transform 0.09s;
  transform-origin: top left;
  transform: scaleX(0);
  overflow: hidden;
}

#default-progress-bar > .bar:before {
  content: '';
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: var(--progress-bar-color, rgba(0, 0, 0, 0.4));

  transition: none;
  transform-origin: top left;
  transform: translateY(0);
}

#default-progress-bar > .bar.hide:before {
  transition: transform 0.3s 1s;
  transform: translateY(-100%);
}

.slot.interaction-prompt {
  display: var(--interaction-prompt-display, flex);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  align-items: center;
  justify-content: center;

  opacity: 0;
  will-change: opacity;
  overflow: hidden;
  transition: opacity 0.3s;
}

.slot.interaction-prompt.visible {
  opacity: 1;
}

.slot.interaction-prompt > .animated-container {
  will-change: transform, opacity;
}

.slot.interaction-prompt > * {
  pointer-events: none;
}

.slot.ar-button {
  -moz-user-select: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  display: var(--ar-button-display, block);
}

.slot.ar-button:not(.enabled),
.fullscreen .slot.ar-button {
  display: none;
}

.fab {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 100px;
}

.fab > * {
  opacity: 0.87;
}

#default-ar-button {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

:not(.fullscreen) .slot.exit-fullscreen-button {
  display: none;
}

#default-exit-fullscreen-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
}

#default-exit-fullscreen-button > svg {
  fill: #fff;
}
</style>
<div class="container">
  <canvas tabindex="1"
    aria-label="A depiction of a 3D model"
    aria-live="polite">
  </canvas>

  <!-- NOTE(cdata): We need to wrap slots because browsers without ShadowDOM
        will have their <slot> elements removed by ShadyCSS -->
  <div class="slot poster">
    <slot name="poster">
      <button type="button" id="default-poster" aria-hidden="true" aria-label="Activate to view in 3D!"></button>
    </slot>
  </div>

  <div class="slot progress-bar">
    <slot name="progress-bar">
      <div id="default-progress-bar" aria-hidden="true">
        <div class="mask"></div>
        <div class="bar"></div>
      </div>
    </slot>
  </div>

  <div class="slot ar-button">
    <slot name="ar-button">
      <a id="default-ar-button" class="fab"
          tabindex="2"
          aria-label="View this 3D model up close">
        ${ARGlyph}
      </a>
    </slot>
  </div>

  <div class="slot exit-fullscreen-button">
    <slot name="exit-fullscreen-button">
      <a id="default-exit-fullscreen-button"
          tabindex="3"
          aria-label="Exit fullscreen"
          aria-hidden="true">
        ${CloseIcon}
      </a>
    </slot>
  </div>

  <div class="slot interaction-prompt">
    <div class="animated-container" part="interaction-prompt">
      <slot name="interaction-prompt" aria-hidden="true">
        ${ControlsPrompt}
      </slot>
    </div>
  </div>

  <div class="slot default">
    <slot></slot>
  </div>
</div>`;
const makeTemplate = (tagName) => {
    const clone = document.createElement('template');
    clone.innerHTML = template.innerHTML;
    if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(clone, tagName);
    }
    return clone;
};

/**
 * @author Don McCurdy / https://www.donmccurdy.com
 */

var DRACOLoader = function ( manager ) {

	Loader.call( this, manager );

	this.decoderPath = '';
	this.decoderConfig = {};
	this.decoderBinary = null;
	this.decoderPending = null;

	this.workerLimit = 4;
	this.workerPool = [];
	this.workerNextTaskID = 1;
	this.workerSourceURL = '';

	this.defaultAttributeIDs = {
		position: 'POSITION',
		normal: 'NORMAL',
		color: 'COLOR',
		uv: 'TEX_COORD'
	};
	this.defaultAttributeTypes = {
		position: 'Float32Array',
		normal: 'Float32Array',
		color: 'Float32Array',
		uv: 'Float32Array'
	};

};

DRACOLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: DRACOLoader,

	setDecoderPath: function ( path ) {

		this.decoderPath = path;

		return this;

	},

	setDecoderConfig: function ( config ) {

		this.decoderConfig = config;

		return this;

	},

	setWorkerLimit: function ( workerLimit ) {

		this.workerLimit = workerLimit;

		return this;

	},

	/** @deprecated */
	setVerbosity: function () {

		console.warn( 'THREE.DRACOLoader: The .setVerbosity() method has been removed.' );

	},

	/** @deprecated */
	setDrawMode: function () {

		console.warn( 'THREE.DRACOLoader: The .setDrawMode() method has been removed.' );

	},

	/** @deprecated */
	setSkipDequantization: function () {

		console.warn( 'THREE.DRACOLoader: The .setSkipDequantization() method has been removed.' );

	},

	load: function ( url, onLoad, onProgress, onError ) {

		var loader = new FileLoader( this.manager );

		loader.setPath( this.path );
		loader.setResponseType( 'arraybuffer' );

		if ( this.crossOrigin === 'use-credentials' ) {

			loader.setWithCredentials( true );

		}

		loader.load( url, ( buffer ) => {

			var taskConfig = {
				attributeIDs: this.defaultAttributeIDs,
				attributeTypes: this.defaultAttributeTypes,
				useUniqueIDs: false
			};

			this.decodeGeometry( buffer, taskConfig )
				.then( onLoad )
				.catch( onError );

		}, onProgress, onError );

	},

	/** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */
	decodeDracoFile: function ( buffer, callback, attributeIDs, attributeTypes ) {

		var taskConfig = {
			attributeIDs: attributeIDs || this.defaultAttributeIDs,
			attributeTypes: attributeTypes || this.defaultAttributeTypes,
			useUniqueIDs: !! attributeIDs
		};

		this.decodeGeometry( buffer, taskConfig ).then( callback );

	},

	decodeGeometry: function ( buffer, taskConfig ) {

		// TODO: For backward-compatibility, support 'attributeTypes' objects containing
		// references (rather than names) to typed array constructors. These must be
		// serialized before sending them to the worker.
		for ( var attribute in taskConfig.attributeTypes ) {

			var type = taskConfig.attributeTypes[ attribute ];

			if ( type.BYTES_PER_ELEMENT !== undefined ) {

				taskConfig.attributeTypes[ attribute ] = type.name;

			}

		}

		//

		var taskKey = JSON.stringify( taskConfig );

		// Check for an existing task using this buffer. A transferred buffer cannot be transferred
		// again from this thread.
		if ( DRACOLoader.taskCache.has( buffer ) ) {

			var cachedTask = DRACOLoader.taskCache.get( buffer );

			if ( cachedTask.key === taskKey ) {

				return cachedTask.promise;

			} else if ( buffer.byteLength === 0 ) {

				// Technically, it would be possible to wait for the previous task to complete,
				// transfer the buffer back, and decode again with the second configuration. That
				// is complex, and I don't know of any reason to decode a Draco buffer twice in
				// different ways, so this is left unimplemented.
				throw new Error(

					'THREE.DRACOLoader: Unable to re-decode a buffer with different ' +
					'settings. Buffer has already been transferred.'

				);

			}

		}

		//

		var worker;
		var taskID = this.workerNextTaskID ++;
		var taskCost = buffer.byteLength;

		// Obtain a worker and assign a task, and construct a geometry instance
		// when the task completes.
		var geometryPending = this._getWorker( taskID, taskCost )
			.then( ( _worker ) => {

				worker = _worker;

				return new Promise( ( resolve, reject ) => {

					worker._callbacks[ taskID ] = { resolve, reject };

					worker.postMessage( { type: 'decode', id: taskID, taskConfig, buffer }, [ buffer ] );

					// this.debug();

				} );

			} )
			.then( ( message ) => this._createGeometry( message.geometry ) );

		// Remove task from the task list.
		geometryPending
			.finally( () => {

				if ( worker && taskID ) {

					this._releaseTask( worker, taskID );

					// this.debug();

				}

			} );

		// Cache the task result.
		DRACOLoader.taskCache.set( buffer, {

			key: taskKey,
			promise: geometryPending

		} );

		return geometryPending;

	},

	_createGeometry: function ( geometryData ) {

		var geometry = new BufferGeometry();

		if ( geometryData.index ) {

			geometry.setIndex( new BufferAttribute( geometryData.index.array, 1 ) );

		}

		for ( var i = 0; i < geometryData.attributes.length; i ++ ) {

			var attribute = geometryData.attributes[ i ];
			var name = attribute.name;
			var array = attribute.array;
			var itemSize = attribute.itemSize;

			geometry.setAttribute( name, new BufferAttribute( array, itemSize ) );

		}

		return geometry;

	},

	_loadLibrary: function ( url, responseType ) {

		var loader = new FileLoader( this.manager );
		loader.setPath( this.decoderPath );
		loader.setResponseType( responseType );

		return new Promise( ( resolve, reject ) => {

			loader.load( url, resolve, undefined, reject );

		} );

	},

	preload: function () {

		this._initDecoder();

		return this;

	},

	_initDecoder: function () {

		if ( this.decoderPending ) return this.decoderPending;

		var useJS = typeof WebAssembly !== 'object' || this.decoderConfig.type === 'js';
		var librariesPending = [];

		if ( useJS ) {

			librariesPending.push( this._loadLibrary( 'draco_decoder.js', 'text' ) );

		} else {

			librariesPending.push( this._loadLibrary( 'draco_wasm_wrapper.js', 'text' ) );
			librariesPending.push( this._loadLibrary( 'draco_decoder.wasm', 'arraybuffer' ) );

		}

		this.decoderPending = Promise.all( librariesPending )
			.then( ( libraries ) => {

				var jsContent = libraries[ 0 ];

				if ( ! useJS ) {

					this.decoderConfig.wasmBinary = libraries[ 1 ];

				}

				var fn = DRACOLoader.DRACOWorker.toString();

				var body = [
					'/* draco decoder */',
					jsContent,
					'',
					'/* worker */',
					fn.substring( fn.indexOf( '{' ) + 1, fn.lastIndexOf( '}' ) )
				].join( '\n' );

				this.workerSourceURL = URL.createObjectURL( new Blob( [ body ] ) );

			} );

		return this.decoderPending;

	},

	_getWorker: function ( taskID, taskCost ) {

		return this._initDecoder().then( () => {

			if ( this.workerPool.length < this.workerLimit ) {

				var worker = new Worker( this.workerSourceURL );

				worker._callbacks = {};
				worker._taskCosts = {};
				worker._taskLoad = 0;

				worker.postMessage( { type: 'init', decoderConfig: this.decoderConfig } );

				worker.onmessage = function ( e ) {

					var message = e.data;

					switch ( message.type ) {

						case 'decode':
							worker._callbacks[ message.id ].resolve( message );
							break;

						case 'error':
							worker._callbacks[ message.id ].reject( message );
							break;

						default:
							console.error( 'THREE.DRACOLoader: Unexpected message, "' + message.type + '"' );

					}

				};

				this.workerPool.push( worker );

			} else {

				this.workerPool.sort( function ( a, b ) {

					return a._taskLoad > b._taskLoad ? - 1 : 1;

				} );

			}

			var worker = this.workerPool[ this.workerPool.length - 1 ];
			worker._taskCosts[ taskID ] = taskCost;
			worker._taskLoad += taskCost;
			return worker;

		} );

	},

	_releaseTask: function ( worker, taskID ) {

		worker._taskLoad -= worker._taskCosts[ taskID ];
		delete worker._callbacks[ taskID ];
		delete worker._taskCosts[ taskID ];

	},

	debug: function () {

		console.log( 'Task load: ', this.workerPool.map( ( worker ) => worker._taskLoad ) );

	},

	dispose: function () {

		for ( var i = 0; i < this.workerPool.length; ++ i ) {

			this.workerPool[ i ].terminate();

		}

		this.workerPool.length = 0;

		return this;

	}

} );

/* WEB WORKER */

DRACOLoader.DRACOWorker = function () {

	var decoderConfig;
	var decoderPending;

	onmessage = function ( e ) {

		var message = e.data;

		switch ( message.type ) {

			case 'init':
				decoderConfig = message.decoderConfig;
				decoderPending = new Promise( function ( resolve/*, reject*/ ) {

					decoderConfig.onModuleLoaded = function ( draco ) {

						// Module is Promise-like. Wrap before resolving to avoid loop.
						resolve( { draco: draco } );

					};

					DracoDecoderModule( decoderConfig );

				} );
				break;

			case 'decode':
				var buffer = message.buffer;
				var taskConfig = message.taskConfig;
				decoderPending.then( ( module ) => {

					var draco = module.draco;
					var decoder = new draco.Decoder();
					var decoderBuffer = new draco.DecoderBuffer();
					decoderBuffer.Init( new Int8Array( buffer ), buffer.byteLength );

					try {

						var geometry = decodeGeometry( draco, decoder, decoderBuffer, taskConfig );

						var buffers = geometry.attributes.map( ( attr ) => attr.array.buffer );

						if ( geometry.index ) buffers.push( geometry.index.array.buffer );

						self.postMessage( { type: 'decode', id: message.id, geometry }, buffers );

					} catch ( error ) {

						console.error( error );

						self.postMessage( { type: 'error', id: message.id, error: error.message } );

					} finally {

						draco.destroy( decoderBuffer );
						draco.destroy( decoder );

					}

				} );
				break;

		}

	};

	function decodeGeometry( draco, decoder, decoderBuffer, taskConfig ) {

		var attributeIDs = taskConfig.attributeIDs;
		var attributeTypes = taskConfig.attributeTypes;

		var dracoGeometry;
		var decodingStatus;

		var geometryType = decoder.GetEncodedGeometryType( decoderBuffer );

		if ( geometryType === draco.TRIANGULAR_MESH ) {

			dracoGeometry = new draco.Mesh();
			decodingStatus = decoder.DecodeBufferToMesh( decoderBuffer, dracoGeometry );

		} else if ( geometryType === draco.POINT_CLOUD ) {

			dracoGeometry = new draco.PointCloud();
			decodingStatus = decoder.DecodeBufferToPointCloud( decoderBuffer, dracoGeometry );

		} else {

			throw new Error( 'THREE.DRACOLoader: Unexpected geometry type.' );

		}

		if ( ! decodingStatus.ok() || dracoGeometry.ptr === 0 ) {

			throw new Error( 'THREE.DRACOLoader: Decoding failed: ' + decodingStatus.error_msg() );

		}

		var geometry = { index: null, attributes: [] };

		// Gather all vertex attributes.
		for ( var attributeName in attributeIDs ) {

			var attributeType = self[ attributeTypes[ attributeName ] ];

			var attribute;
			var attributeID;

			// A Draco file may be created with default vertex attributes, whose attribute IDs
			// are mapped 1:1 from their semantic name (POSITION, NORMAL, ...). Alternatively,
			// a Draco file may contain a custom set of attributes, identified by known unique
			// IDs. glTF files always do the latter, and `.drc` files typically do the former.
			if ( taskConfig.useUniqueIDs ) {

				attributeID = attributeIDs[ attributeName ];
				attribute = decoder.GetAttributeByUniqueId( dracoGeometry, attributeID );

			} else {

				attributeID = decoder.GetAttributeId( dracoGeometry, draco[ attributeIDs[ attributeName ] ] );

				if ( attributeID === - 1 ) continue;

				attribute = decoder.GetAttribute( dracoGeometry, attributeID );

			}

			geometry.attributes.push( decodeAttribute( draco, decoder, dracoGeometry, attributeName, attributeType, attribute ) );

		}

		// Add index.
		if ( geometryType === draco.TRIANGULAR_MESH ) {

			// Generate mesh faces.
			var numFaces = dracoGeometry.num_faces();
			var numIndices = numFaces * 3;
			var index = new Uint32Array( numIndices );
			var indexArray = new draco.DracoInt32Array();

			for ( var i = 0; i < numFaces; ++ i ) {

				decoder.GetFaceFromMesh( dracoGeometry, i, indexArray );

				for ( var j = 0; j < 3; ++ j ) {

					index[ i * 3 + j ] = indexArray.GetValue( j );

				}

			}

			geometry.index = { array: index, itemSize: 1 };

			draco.destroy( indexArray );

		}

		draco.destroy( dracoGeometry );

		return geometry;

	}

	function decodeAttribute( draco, decoder, dracoGeometry, attributeName, attributeType, attribute ) {

		var numComponents = attribute.num_components();
		var numPoints = dracoGeometry.num_points();
		var numValues = numPoints * numComponents;
		var dracoArray;

		var array;

		switch ( attributeType ) {

			case Float32Array:
				dracoArray = new draco.DracoFloat32Array();
				decoder.GetAttributeFloatForAllPoints( dracoGeometry, attribute, dracoArray );
				array = new Float32Array( numValues );
				break;

			case Int8Array:
				dracoArray = new draco.DracoInt8Array();
				decoder.GetAttributeInt8ForAllPoints( dracoGeometry, attribute, dracoArray );
				array = new Int8Array( numValues );
				break;

			case Int16Array:
				dracoArray = new draco.DracoInt16Array();
				decoder.GetAttributeInt16ForAllPoints( dracoGeometry, attribute, dracoArray );
				array = new Int16Array( numValues );
				break;

			case Int32Array:
				dracoArray = new draco.DracoInt32Array();
				decoder.GetAttributeInt32ForAllPoints( dracoGeometry, attribute, dracoArray );
				array = new Int32Array( numValues );
				break;

			case Uint8Array:
				dracoArray = new draco.DracoUInt8Array();
				decoder.GetAttributeUInt8ForAllPoints( dracoGeometry, attribute, dracoArray );
				array = new Uint8Array( numValues );
				break;

			case Uint16Array:
				dracoArray = new draco.DracoUInt16Array();
				decoder.GetAttributeUInt16ForAllPoints( dracoGeometry, attribute, dracoArray );
				array = new Uint16Array( numValues );
				break;

			case Uint32Array:
				dracoArray = new draco.DracoUInt32Array();
				decoder.GetAttributeUInt32ForAllPoints( dracoGeometry, attribute, dracoArray );
				array = new Uint32Array( numValues );
				break;

			default:
				throw new Error( 'THREE.DRACOLoader: Unexpected attribute type.' );

		}

		for ( var i = 0; i < numValues; i ++ ) {

			array[ i ] = dracoArray.GetValue( i );

		}

		draco.destroy( dracoArray );

		return {
			name: attributeName,
			array: array,
			itemSize: numComponents
		};

	}

};

DRACOLoader.taskCache = new WeakMap();

/** Deprecated static methods */

/** @deprecated */
DRACOLoader.setDecoderPath = function () {

	console.warn( 'THREE.DRACOLoader: The .setDecoderPath() method has been removed. Use instance methods.' );

};

/** @deprecated */
DRACOLoader.setDecoderConfig = function () {

	console.warn( 'THREE.DRACOLoader: The .setDecoderConfig() method has been removed. Use instance methods.' );

};

/** @deprecated */
DRACOLoader.releaseDecoderModule = function () {

	console.warn( 'THREE.DRACOLoader: The .releaseDecoderModule() method has been removed. Use instance methods.' );

};

/** @deprecated */
DRACOLoader.getDecoderModule = function () {

	console.warn( 'THREE.DRACOLoader: The .getDecoderModule() method has been removed. Use instance methods.' );

};

/**
 * @author Rich Tibbett / https://github.com/richtr
 * @author mrdoob / http://mrdoob.com/
 * @author Tony Parisi / http://www.tonyparisi.com/
 * @author Takahiro / https://github.com/takahirox
 * @author Don McCurdy / https://www.donmccurdy.com
 */

var GLTFLoader = ( function () {

	function GLTFLoader( manager ) {

		Loader.call( this, manager );

		this.dracoLoader = null;
		this.ddsLoader = null;

	}

	GLTFLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

		constructor: GLTFLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var resourcePath;

			if ( this.resourcePath !== '' ) {

				resourcePath = this.resourcePath;

			} else if ( this.path !== '' ) {

				resourcePath = this.path;

			} else {

				resourcePath = LoaderUtils.extractUrlBase( url );

			}

			// Tells the LoadingManager to track an extra item, which resolves after
			// the model is fully loaded. This means the count of items loaded will
			// be incorrect, but ensures manager.onLoad() does not fire early.
			scope.manager.itemStart( url );

			var _onError = function ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );
				scope.manager.itemEnd( url );

			};

			var loader = new FileLoader( scope.manager );

			loader.setPath( this.path );
			loader.setResponseType( 'arraybuffer' );

			if ( scope.crossOrigin === 'use-credentials' ) {

				loader.setWithCredentials( true );

			}

			loader.load( url, function ( data ) {

				try {

					scope.parse( data, resourcePath, function ( gltf ) {

						onLoad( gltf );

						scope.manager.itemEnd( url );

					}, _onError );

				} catch ( e ) {

					_onError( e );

				}

			}, onProgress, _onError );

		},

		setDRACOLoader: function ( dracoLoader ) {

			this.dracoLoader = dracoLoader;
			return this;

		},

		setDDSLoader: function ( ddsLoader ) {

			this.ddsLoader = ddsLoader;
			return this;

		},

		parse: function ( data, path, onLoad, onError ) {

			var content;
			var extensions = {};

			if ( typeof data === 'string' ) {

				content = data;

			} else {

				var magic = LoaderUtils.decodeText( new Uint8Array( data, 0, 4 ) );

				if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

					try {

						extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );

					} catch ( error ) {

						if ( onError ) onError( error );
						return;

					}

					content = extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content;

				} else {

					content = LoaderUtils.decodeText( new Uint8Array( data ) );

				}

			}

			var json = JSON.parse( content );

			if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

				if ( onError ) onError( new Error( 'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.' ) );
				return;

			}

			if ( json.extensionsUsed ) {

				for ( var i = 0; i < json.extensionsUsed.length; ++ i ) {

					var extensionName = json.extensionsUsed[ i ];
					var extensionsRequired = json.extensionsRequired || [];

					switch ( extensionName ) {

						case EXTENSIONS.KHR_LIGHTS_PUNCTUAL:
							extensions[ extensionName ] = new GLTFLightsExtension( json );
							break;

						case EXTENSIONS.KHR_MATERIALS_UNLIT:
							extensions[ extensionName ] = new GLTFMaterialsUnlitExtension();
							break;

						case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
							extensions[ extensionName ] = new GLTFMaterialsPbrSpecularGlossinessExtension();
							break;

						case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
							extensions[ extensionName ] = new GLTFDracoMeshCompressionExtension( json, this.dracoLoader );
							break;

						case EXTENSIONS.MSFT_TEXTURE_DDS:
							extensions[ extensionName ] = new GLTFTextureDDSExtension( this.ddsLoader );
							break;

						case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
							extensions[ extensionName ] = new GLTFTextureTransformExtension();
							break;

						case EXTENSIONS.KHR_MESH_QUANTIZATION:
							extensions[ extensionName ] = new GLTFMeshQuantizationExtension();
							break;

						default:

							if ( extensionsRequired.indexOf( extensionName ) >= 0 ) {

								console.warn( 'THREE.GLTFLoader: Unknown extension "' + extensionName + '".' );

							}

					}

				}

			}

			var parser = new GLTFParser( json, extensions, {

				path: path || this.resourcePath || '',
				crossOrigin: this.crossOrigin,
				manager: this.manager

			} );

			parser.parse( onLoad, onError );

		}

	} );

	/* GLTFREGISTRY */

	function GLTFRegistry() {

		var objects = {};

		return	{

			get: function ( key ) {

				return objects[ key ];

			},

			add: function ( key, object ) {

				objects[ key ] = object;

			},

			remove: function ( key ) {

				delete objects[ key ];

			},

			removeAll: function () {

				objects = {};

			}

		};

	}

	/*********************************/
	/********** EXTENSIONS ***********/
	/*********************************/

	var EXTENSIONS = {
		KHR_BINARY_GLTF: 'KHR_binary_glTF',
		KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
		KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
		KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
		KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
		KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
		KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
		MSFT_TEXTURE_DDS: 'MSFT_texture_dds'
	};

	/**
	 * DDS Texture Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_texture_dds
	 *
	 */
	function GLTFTextureDDSExtension( ddsLoader ) {

		if ( ! ddsLoader ) {

			throw new Error( 'THREE.GLTFLoader: Attempting to load .dds texture without importing DDSLoader' );

		}

		this.name = EXTENSIONS.MSFT_TEXTURE_DDS;
		this.ddsLoader = ddsLoader;

	}

	/**
	 * Punctual Lights Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
	 */
	function GLTFLightsExtension( json ) {

		this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

		var extension = ( json.extensions && json.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ] ) || {};
		this.lightDefs = extension.lights || [];

	}

	GLTFLightsExtension.prototype.loadLight = function ( lightIndex ) {

		var lightDef = this.lightDefs[ lightIndex ];
		var lightNode;

		var color = new Color( 0xffffff );
		if ( lightDef.color !== undefined ) color.fromArray( lightDef.color );

		var range = lightDef.range !== undefined ? lightDef.range : 0;

		switch ( lightDef.type ) {

			case 'directional':
				lightNode = new DirectionalLight( color );
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			case 'point':
				lightNode = new PointLight( color );
				lightNode.distance = range;
				break;

			case 'spot':
				lightNode = new SpotLight( color );
				lightNode.distance = range;
				// Handle spotlight properties.
				lightDef.spot = lightDef.spot || {};
				lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
				lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
				lightNode.angle = lightDef.spot.outerConeAngle;
				lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			default:
				throw new Error( 'THREE.GLTFLoader: Unexpected light type, "' + lightDef.type + '".' );

		}

		// Some lights (e.g. spot) default to a position other than the origin. Reset the position
		// here, because node-level parsing will only override position if explicitly specified.
		lightNode.position.set( 0, 0, 0 );

		lightNode.decay = 2;

		if ( lightDef.intensity !== undefined ) lightNode.intensity = lightDef.intensity;

		lightNode.name = lightDef.name || ( 'light_' + lightIndex );

		return Promise.resolve( lightNode );

	};

	/**
	 * Unlit Materials Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
	 */
	function GLTFMaterialsUnlitExtension() {

		this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;

	}

	GLTFMaterialsUnlitExtension.prototype.getMaterialType = function () {

		return MeshBasicMaterial;

	};

	GLTFMaterialsUnlitExtension.prototype.extendParams = function ( materialParams, materialDef, parser ) {

		var pending = [];

		materialParams.color = new Color( 1.0, 1.0, 1.0 );
		materialParams.opacity = 1.0;

		var metallicRoughness = materialDef.pbrMetallicRoughness;

		if ( metallicRoughness ) {

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				var array = metallicRoughness.baseColorFactor;

				materialParams.color.fromArray( array );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture ) );

			}

		}

		return Promise.all( pending );

	};

	/* BINARY EXTENSION */
	var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
	var BINARY_EXTENSION_HEADER_LENGTH = 12;
	var BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

	function GLTFBinaryExtension( data ) {

		this.name = EXTENSIONS.KHR_BINARY_GLTF;
		this.content = null;
		this.body = null;

		var headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );

		this.header = {
			magic: LoaderUtils.decodeText( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'THREE.GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'THREE.GLTFLoader: Legacy binary file detected.' );

		}

		var chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
		var chunkIndex = 0;

		while ( chunkIndex < chunkView.byteLength ) {

			var chunkLength = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			var chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

				var contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
				this.content = LoaderUtils.decodeText( contentArray );

			} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

				var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
				this.body = data.slice( byteOffset, byteOffset + chunkLength );

			}

			// Clients must ignore chunks with unknown types.

			chunkIndex += chunkLength;

		}

		if ( this.content === null ) {

			throw new Error( 'THREE.GLTFLoader: JSON content not found.' );

		}

	}

	/**
	 * DRACO Mesh Compression Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
	 */
	function GLTFDracoMeshCompressionExtension( json, dracoLoader ) {

		if ( ! dracoLoader ) {

			throw new Error( 'THREE.GLTFLoader: No DRACOLoader instance provided.' );

		}

		this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
		this.json = json;
		this.dracoLoader = dracoLoader;
		this.dracoLoader.preload();

	}

	GLTFDracoMeshCompressionExtension.prototype.decodePrimitive = function ( primitive, parser ) {

		var json = this.json;
		var dracoLoader = this.dracoLoader;
		var bufferViewIndex = primitive.extensions[ this.name ].bufferView;
		var gltfAttributeMap = primitive.extensions[ this.name ].attributes;
		var threeAttributeMap = {};
		var attributeNormalizedMap = {};
		var attributeTypeMap = {};

		for ( var attributeName in gltfAttributeMap ) {

			var threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			threeAttributeMap[ threeAttributeName ] = gltfAttributeMap[ attributeName ];

		}

		for ( attributeName in primitive.attributes ) {

			var threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			if ( gltfAttributeMap[ attributeName ] !== undefined ) {

				var accessorDef = json.accessors[ primitive.attributes[ attributeName ] ];
				var componentType = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

				attributeTypeMap[ threeAttributeName ] = componentType;
				attributeNormalizedMap[ threeAttributeName ] = accessorDef.normalized === true;

			}

		}

		return parser.getDependency( 'bufferView', bufferViewIndex ).then( function ( bufferView ) {

			return new Promise( function ( resolve ) {

				dracoLoader.decodeDracoFile( bufferView, function ( geometry ) {

					for ( var attributeName in geometry.attributes ) {

						var attribute = geometry.attributes[ attributeName ];
						var normalized = attributeNormalizedMap[ attributeName ];

						if ( normalized !== undefined ) attribute.normalized = normalized;

					}

					resolve( geometry );

				}, threeAttributeMap, attributeTypeMap );

			} );

		} );

	};

	/**
	 * Texture Transform Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
	 */
	function GLTFTextureTransformExtension() {

		this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;

	}

	GLTFTextureTransformExtension.prototype.extendTexture = function ( texture, transform ) {

		texture = texture.clone();

		if ( transform.offset !== undefined ) {

			texture.offset.fromArray( transform.offset );

		}

		if ( transform.rotation !== undefined ) {

			texture.rotation = transform.rotation;

		}

		if ( transform.scale !== undefined ) {

			texture.repeat.fromArray( transform.scale );

		}

		if ( transform.texCoord !== undefined ) {

			console.warn( 'THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.' );

		}

		texture.needsUpdate = true;

		return texture;

	};

	/**
	 * Specular-Glossiness Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
	 */

	/**
	 * A sub class of StandardMaterial with some of the functionality
	 * changed via the `onBeforeCompile` callback
	 * @pailhead
	 */

	function GLTFMeshStandardSGMaterial( params ) {

		MeshStandardMaterial.call( this );

		this.isGLTFSpecularGlossinessMaterial = true;

		//various chunks that need replacing
		var specularMapParsFragmentChunk = [
			'#ifdef USE_SPECULARMAP',
			'	uniform sampler2D specularMap;',
			'#endif'
		].join( '\n' );

		var glossinessMapParsFragmentChunk = [
			'#ifdef USE_GLOSSINESSMAP',
			'	uniform sampler2D glossinessMap;',
			'#endif'
		].join( '\n' );

		var specularMapFragmentChunk = [
			'vec3 specularFactor = specular;',
			'#ifdef USE_SPECULARMAP',
			'	vec4 texelSpecular = texture2D( specularMap, vUv );',
			'	texelSpecular = sRGBToLinear( texelSpecular );',
			'	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture',
			'	specularFactor *= texelSpecular.rgb;',
			'#endif'
		].join( '\n' );

		var glossinessMapFragmentChunk = [
			'float glossinessFactor = glossiness;',
			'#ifdef USE_GLOSSINESSMAP',
			'	vec4 texelGlossiness = texture2D( glossinessMap, vUv );',
			'	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture',
			'	glossinessFactor *= texelGlossiness.a;',
			'#endif'
		].join( '\n' );

		var lightPhysicalFragmentChunk = [
			'PhysicalMaterial material;',
			'material.diffuseColor = diffuseColor.rgb;',
			'vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );',
			'float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );',
			'material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.',
			'material.specularRoughness += geometryRoughness;',
			'material.specularRoughness = min( material.specularRoughness, 1.0 );',
			'material.specularColor = specularFactor.rgb;',
		].join( '\n' );

		var uniforms = {
			specular: { value: new Color().setHex( 0xffffff ) },
			glossiness: { value: 1 },
			specularMap: { value: null },
			glossinessMap: { value: null }
		};

		this._extraUniforms = uniforms;

		// please see #14031 or #13198 for an alternate approach
		this.onBeforeCompile = function ( shader ) {

			for ( var uniformName in uniforms ) {

				shader.uniforms[ uniformName ] = uniforms[ uniformName ];

			}

			shader.fragmentShader = shader.fragmentShader.replace( 'uniform float roughness;', 'uniform vec3 specular;' );
			shader.fragmentShader = shader.fragmentShader.replace( 'uniform float metalness;', 'uniform float glossiness;' );
			shader.fragmentShader = shader.fragmentShader.replace( '#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk );
			shader.fragmentShader = shader.fragmentShader.replace( '#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk );
			shader.fragmentShader = shader.fragmentShader.replace( '#include <roughnessmap_fragment>', specularMapFragmentChunk );
			shader.fragmentShader = shader.fragmentShader.replace( '#include <metalnessmap_fragment>', glossinessMapFragmentChunk );
			shader.fragmentShader = shader.fragmentShader.replace( '#include <lights_physical_fragment>', lightPhysicalFragmentChunk );

		};

		/*eslint-disable*/
		Object.defineProperties(
			this,
			{	
				specular: {
					get: function () { return uniforms.specular.value; },
					set: function ( v ) { uniforms.specular.value = v; }
				},
				specularMap: {
					get: function () { return uniforms.specularMap.value; },
					set: function ( v ) { uniforms.specularMap.value = v; }
				},
				glossiness: {
					get: function () { return uniforms.glossiness.value; },
					set: function ( v ) { uniforms.glossiness.value = v; }
				},
				glossinessMap: {
					get: function () { return uniforms.glossinessMap.value; },
					set: function ( v ) {

						uniforms.glossinessMap.value = v;
						//how about something like this - @pailhead
						if ( v ) {

							this.defines.USE_GLOSSINESSMAP = '';
							// set USE_ROUGHNESSMAP to enable vUv
							this.defines.USE_ROUGHNESSMAP = '';

						} else {

							delete this.defines.USE_ROUGHNESSMAP;
							delete this.defines.USE_GLOSSINESSMAP;

						}

					}
				}
			}
		);

		/*eslint-enable*/
		delete this.metalness;
		delete this.roughness;
		delete this.metalnessMap;
		delete this.roughnessMap;

		this.setValues( params );

	}

	GLTFMeshStandardSGMaterial.prototype = Object.create( MeshStandardMaterial.prototype );
	GLTFMeshStandardSGMaterial.prototype.constructor = GLTFMeshStandardSGMaterial;

	GLTFMeshStandardSGMaterial.prototype.copy = function ( source ) {

		MeshStandardMaterial.prototype.copy.call( this, source );
		this.specularMap = source.specularMap;
		this.specular.copy( source.specular );
		this.glossinessMap = source.glossinessMap;
		this.glossiness = source.glossiness;
		delete this.metalness;
		delete this.roughness;
		delete this.metalnessMap;
		delete this.roughnessMap;
		return this;

	};

	function GLTFMaterialsPbrSpecularGlossinessExtension() {

		return {

			name: EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,

			specularGlossinessParams: [
				'color',
				'map',
				'lightMap',
				'lightMapIntensity',
				'aoMap',
				'aoMapIntensity',
				'emissive',
				'emissiveIntensity',
				'emissiveMap',
				'bumpMap',
				'bumpScale',
				'normalMap',
				'normalMapType',
				'displacementMap',
				'displacementScale',
				'displacementBias',
				'specularMap',
				'specular',
				'glossinessMap',
				'glossiness',
				'alphaMap',
				'envMap',
				'envMapIntensity',
				'refractionRatio',
			],

			getMaterialType: function () {

				return GLTFMeshStandardSGMaterial;

			},

			extendParams: function ( materialParams, materialDef, parser ) {

				var pbrSpecularGlossiness = materialDef.extensions[ this.name ];

				materialParams.color = new Color( 1.0, 1.0, 1.0 );
				materialParams.opacity = 1.0;

				var pending = [];

				if ( Array.isArray( pbrSpecularGlossiness.diffuseFactor ) ) {

					var array = pbrSpecularGlossiness.diffuseFactor;

					materialParams.color.fromArray( array );
					materialParams.opacity = array[ 3 ];

				}

				if ( pbrSpecularGlossiness.diffuseTexture !== undefined ) {

					pending.push( parser.assignTexture( materialParams, 'map', pbrSpecularGlossiness.diffuseTexture ) );

				}

				materialParams.emissive = new Color( 0.0, 0.0, 0.0 );
				materialParams.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
				materialParams.specular = new Color( 1.0, 1.0, 1.0 );

				if ( Array.isArray( pbrSpecularGlossiness.specularFactor ) ) {

					materialParams.specular.fromArray( pbrSpecularGlossiness.specularFactor );

				}

				if ( pbrSpecularGlossiness.specularGlossinessTexture !== undefined ) {

					var specGlossMapDef = pbrSpecularGlossiness.specularGlossinessTexture;
					pending.push( parser.assignTexture( materialParams, 'glossinessMap', specGlossMapDef ) );
					pending.push( parser.assignTexture( materialParams, 'specularMap', specGlossMapDef ) );

				}

				return Promise.all( pending );

			},

			createMaterial: function ( materialParams ) {

				var material = new GLTFMeshStandardSGMaterial( materialParams );
				material.fog = true;

				material.color = materialParams.color;

				material.map = materialParams.map === undefined ? null : materialParams.map;

				material.lightMap = null;
				material.lightMapIntensity = 1.0;

				material.aoMap = materialParams.aoMap === undefined ? null : materialParams.aoMap;
				material.aoMapIntensity = 1.0;

				material.emissive = materialParams.emissive;
				material.emissiveIntensity = 1.0;
				material.emissiveMap = materialParams.emissiveMap === undefined ? null : materialParams.emissiveMap;

				material.bumpMap = materialParams.bumpMap === undefined ? null : materialParams.bumpMap;
				material.bumpScale = 1;

				material.normalMap = materialParams.normalMap === undefined ? null : materialParams.normalMap;
				material.normalMapType = TangentSpaceNormalMap;

				if ( materialParams.normalScale ) material.normalScale = materialParams.normalScale;

				material.displacementMap = null;
				material.displacementScale = 1;
				material.displacementBias = 0;

				material.specularMap = materialParams.specularMap === undefined ? null : materialParams.specularMap;
				material.specular = materialParams.specular;

				material.glossinessMap = materialParams.glossinessMap === undefined ? null : materialParams.glossinessMap;
				material.glossiness = materialParams.glossiness;

				material.alphaMap = null;

				material.envMap = materialParams.envMap === undefined ? null : materialParams.envMap;
				material.envMapIntensity = 1.0;

				material.refractionRatio = 0.98;

				return material;

			},

		};

	}

	/**
	 * Mesh Quantization Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization
	 */
	function GLTFMeshQuantizationExtension() {

		this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;

	}

	/*********************************/
	/********** INTERPOLATION ********/
	/*********************************/

	// Spline Interpolation
	// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
	function GLTFCubicSplineInterpolant( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		Interpolant.call( this, parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	GLTFCubicSplineInterpolant.prototype = Object.create( Interpolant.prototype );
	GLTFCubicSplineInterpolant.prototype.constructor = GLTFCubicSplineInterpolant;

	GLTFCubicSplineInterpolant.prototype.copySampleValue_ = function ( index ) {

		// Copies a sample value to the result buffer. See description of glTF
		// CUBICSPLINE values layout in interpolate_() function below.

		var result = this.resultBuffer,
			values = this.sampleValues,
			valueSize = this.valueSize,
			offset = index * valueSize * 3 + valueSize;

		for ( var i = 0; i !== valueSize; i ++ ) {

			result[ i ] = values[ offset + i ];

		}

		return result;

	};

	GLTFCubicSplineInterpolant.prototype.beforeStart_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

	GLTFCubicSplineInterpolant.prototype.afterEnd_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

	GLTFCubicSplineInterpolant.prototype.interpolate_ = function ( i1, t0, t, t1 ) {

		var result = this.resultBuffer;
		var values = this.sampleValues;
		var stride = this.valueSize;

		var stride2 = stride * 2;
		var stride3 = stride * 3;

		var td = t1 - t0;

		var p = ( t - t0 ) / td;
		var pp = p * p;
		var ppp = pp * p;

		var offset1 = i1 * stride3;
		var offset0 = offset1 - stride3;

		var s2 = - 2 * ppp + 3 * pp;
		var s3 = ppp - pp;
		var s0 = 1 - s2;
		var s1 = s3 - pp + p;

		// Layout of keyframe output values for CUBICSPLINE animations:
		//   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
		for ( var i = 0; i !== stride; i ++ ) {

			var p0 = values[ offset0 + i + stride ]; // splineVertex_k
			var m0 = values[ offset0 + i + stride2 ] * td; // outTangent_k * (t_k+1 - t_k)
			var p1 = values[ offset1 + i + stride ]; // splineVertex_k+1
			var m1 = values[ offset1 + i ] * td; // inTangent_k+1 * (t_k+1 - t_k)

			result[ i ] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

		}

		return result;

	};

	/*********************************/
	/********** INTERNALS ************/
	/*********************************/

	/* CONSTANTS */

	var WEBGL_CONSTANTS = {
		FLOAT: 5126,
		//FLOAT_MAT2: 35674,
		FLOAT_MAT3: 35675,
		FLOAT_MAT4: 35676,
		FLOAT_VEC2: 35664,
		FLOAT_VEC3: 35665,
		FLOAT_VEC4: 35666,
		LINEAR: 9729,
		REPEAT: 10497,
		SAMPLER_2D: 35678,
		POINTS: 0,
		LINES: 1,
		LINE_LOOP: 2,
		LINE_STRIP: 3,
		TRIANGLES: 4,
		TRIANGLE_STRIP: 5,
		TRIANGLE_FAN: 6,
		UNSIGNED_BYTE: 5121,
		UNSIGNED_SHORT: 5123
	};

	var WEBGL_COMPONENT_TYPES = {
		5120: Int8Array,
		5121: Uint8Array,
		5122: Int16Array,
		5123: Uint16Array,
		5125: Uint32Array,
		5126: Float32Array
	};

	var WEBGL_FILTERS = {
		9728: NearestFilter,
		9729: LinearFilter,
		9984: NearestMipmapNearestFilter,
		9985: LinearMipmapNearestFilter,
		9986: NearestMipmapLinearFilter,
		9987: LinearMipmapLinearFilter
	};

	var WEBGL_WRAPPINGS = {
		33071: ClampToEdgeWrapping,
		33648: MirroredRepeatWrapping,
		10497: RepeatWrapping
	};

	var WEBGL_TYPE_SIZES = {
		'SCALAR': 1,
		'VEC2': 2,
		'VEC3': 3,
		'VEC4': 4,
		'MAT2': 4,
		'MAT3': 9,
		'MAT4': 16
	};

	var ATTRIBUTES = {
		POSITION: 'position',
		NORMAL: 'normal',
		TANGENT: 'tangent',
		TEXCOORD_0: 'uv',
		TEXCOORD_1: 'uv2',
		COLOR_0: 'color',
		WEIGHTS_0: 'skinWeight',
		JOINTS_0: 'skinIndex',
	};

	var PATH_PROPERTIES = {
		scale: 'scale',
		translation: 'position',
		rotation: 'quaternion',
		weights: 'morphTargetInfluences'
	};

	var INTERPOLATION = {
		CUBICSPLINE: undefined, // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
		                        // keyframe track will be initialized with a default interpolation type, then modified.
		LINEAR: InterpolateLinear,
		STEP: InterpolateDiscrete
	};

	var ALPHA_MODES = {
		OPAQUE: 'OPAQUE',
		MASK: 'MASK',
		BLEND: 'BLEND'
	};

	var MIME_TYPE_FORMATS = {
		'image/png': RGBAFormat,
		'image/jpeg': RGBFormat
	};

	/* UTILITY FUNCTIONS */

	function resolveURL( url, path ) {

		// Invalid URL
		if ( typeof url !== 'string' || url === '' ) return '';

		// Host Relative URL
		if ( /^https?:\/\//i.test( path ) && /^\//.test( url ) ) {

			path = path.replace( /(^https?:\/\/[^\/]+).*/i, '$1' );

		}

		// Absolute URL http://,https://,//
		if ( /^(https?:)?\/\//i.test( url ) ) return url;

		// Data URI
		if ( /^data:.*,.*$/i.test( url ) ) return url;

		// Blob URL
		if ( /^blob:.*$/i.test( url ) ) return url;

		// Relative URL
		return path + url;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
	 */
	function createDefaultMaterial( cache ) {

		if ( cache[ 'DefaultMaterial' ] === undefined ) {

			cache[ 'DefaultMaterial' ] = new MeshStandardMaterial( {
				color: 0xFFFFFF,
				emissive: 0x000000,
				metalness: 1,
				roughness: 1,
				transparent: false,
				depthTest: true,
				side: FrontSide
			} );

		}

		return cache[ 'DefaultMaterial' ];

	}

	function addUnknownExtensionsToUserData( knownExtensions, object, objectDef ) {

		// Add unknown glTF extensions to an object's userData.

		for ( var name in objectDef.extensions ) {

			if ( knownExtensions[ name ] === undefined ) {

				object.userData.gltfExtensions = object.userData.gltfExtensions || {};
				object.userData.gltfExtensions[ name ] = objectDef.extensions[ name ];

			}

		}

	}

	/**
	 * @param {Object3D|Material|BufferGeometry} object
	 * @param {GLTF.definition} gltfDef
	 */
	function assignExtrasToUserData( object, gltfDef ) {

		if ( gltfDef.extras !== undefined ) {

			if ( typeof gltfDef.extras === 'object' ) {

				Object.assign( object.userData, gltfDef.extras );

			} else {

				console.warn( 'THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras );

			}

		}

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
	 *
	 * @param {BufferGeometry} geometry
	 * @param {Array<GLTF.Target>} targets
	 * @param {GLTFParser} parser
	 * @return {Promise<BufferGeometry>}
	 */
	function addMorphTargets( geometry, targets, parser ) {

		var hasMorphPosition = false;
		var hasMorphNormal = false;

		for ( var i = 0, il = targets.length; i < il; i ++ ) {

			var target = targets[ i ];

			if ( target.POSITION !== undefined ) hasMorphPosition = true;
			if ( target.NORMAL !== undefined ) hasMorphNormal = true;

			if ( hasMorphPosition && hasMorphNormal ) break;

		}

		if ( ! hasMorphPosition && ! hasMorphNormal ) return Promise.resolve( geometry );

		var pendingPositionAccessors = [];
		var pendingNormalAccessors = [];

		for ( var i = 0, il = targets.length; i < il; i ++ ) {

			var target = targets[ i ];

			if ( hasMorphPosition ) {

				var pendingAccessor = target.POSITION !== undefined
					? parser.getDependency( 'accessor', target.POSITION )
					: geometry.attributes.position;

				pendingPositionAccessors.push( pendingAccessor );

			}

			if ( hasMorphNormal ) {

				var pendingAccessor = target.NORMAL !== undefined
					? parser.getDependency( 'accessor', target.NORMAL )
					: geometry.attributes.normal;

				pendingNormalAccessors.push( pendingAccessor );

			}

		}

		return Promise.all( [
			Promise.all( pendingPositionAccessors ),
			Promise.all( pendingNormalAccessors )
		] ).then( function ( accessors ) {

			var morphPositions = accessors[ 0 ];
			var morphNormals = accessors[ 1 ];

			if ( hasMorphPosition ) geometry.morphAttributes.position = morphPositions;
			if ( hasMorphNormal ) geometry.morphAttributes.normal = morphNormals;
			geometry.morphTargetsRelative = true;

			return geometry;

		} );

	}

	/**
	 * @param {Mesh} mesh
	 * @param {GLTF.Mesh} meshDef
	 */
	function updateMorphTargets( mesh, meshDef ) {

		mesh.updateMorphTargets();

		if ( meshDef.weights !== undefined ) {

			for ( var i = 0, il = meshDef.weights.length; i < il; i ++ ) {

				mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

			}

		}

		// .extras has user-defined data, so check that .extras.targetNames is an array.
		if ( meshDef.extras && Array.isArray( meshDef.extras.targetNames ) ) {

			var targetNames = meshDef.extras.targetNames;

			if ( mesh.morphTargetInfluences.length === targetNames.length ) {

				mesh.morphTargetDictionary = {};

				for ( var i = 0, il = targetNames.length; i < il; i ++ ) {

					mesh.morphTargetDictionary[ targetNames[ i ] ] = i;

				}

			} else {

				console.warn( 'THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.' );

			}

		}

	}

	function createPrimitiveKey( primitiveDef ) {

		var dracoExtension = primitiveDef.extensions && primitiveDef.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ];
		var geometryKey;

		if ( dracoExtension ) {

			geometryKey = 'draco:' + dracoExtension.bufferView
				+ ':' + dracoExtension.indices
				+ ':' + createAttributesKey( dracoExtension.attributes );

		} else {

			geometryKey = primitiveDef.indices + ':' + createAttributesKey( primitiveDef.attributes ) + ':' + primitiveDef.mode;

		}

		return geometryKey;

	}

	function createAttributesKey( attributes ) {

		var attributesKey = '';

		var keys = Object.keys( attributes ).sort();

		for ( var i = 0, il = keys.length; i < il; i ++ ) {

			attributesKey += keys[ i ] + ':' + attributes[ keys[ i ] ] + ';';

		}

		return attributesKey;

	}

	/* GLTF PARSER */

	function GLTFParser( json, extensions, options ) {

		this.json = json || {};
		this.extensions = extensions || {};
		this.options = options || {};

		// loader object cache
		this.cache = new GLTFRegistry();

		// BufferGeometry caching
		this.primitiveCache = {};

		this.textureLoader = new TextureLoader( this.options.manager );
		this.textureLoader.setCrossOrigin( this.options.crossOrigin );

		this.fileLoader = new FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

		if ( this.options.crossOrigin === 'use-credentials' ) {

			this.fileLoader.setWithCredentials( true );

		}

	}

	GLTFParser.prototype.parse = function ( onLoad, onError ) {

		var parser = this;
		var json = this.json;
		var extensions = this.extensions;

		// Clear the loader cache
		this.cache.removeAll();

		// Mark the special nodes/meshes in json for efficient parse
		this.markDefs();

		Promise.all( [

			this.getDependencies( 'scene' ),
			this.getDependencies( 'animation' ),
			this.getDependencies( 'camera' ),

		] ).then( function ( dependencies ) {

			var result = {
				scene: dependencies[ 0 ][ json.scene || 0 ],
				scenes: dependencies[ 0 ],
				animations: dependencies[ 1 ],
				cameras: dependencies[ 2 ],
				asset: json.asset,
				parser: parser,
				userData: {}
			};

			addUnknownExtensionsToUserData( extensions, result, json );

			assignExtrasToUserData( result, json );

			onLoad( result );

		} ).catch( onError );

	};

	/**
	 * Marks the special nodes/meshes in json for efficient parse.
	 */
	GLTFParser.prototype.markDefs = function () {

		var nodeDefs = this.json.nodes || [];
		var skinDefs = this.json.skins || [];
		var meshDefs = this.json.meshes || [];

		var meshReferences = {};
		var meshUses = {};

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( var skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex ++ ) {

			var joints = skinDefs[ skinIndex ].joints;

			for ( var i = 0, il = joints.length; i < il; i ++ ) {

				nodeDefs[ joints[ i ] ].isBone = true;

			}

		}

		// Meshes can (and should) be reused by multiple nodes in a glTF asset. To
		// avoid having more than one Mesh with the same name, count
		// references and rename instances below.
		//
		// Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
		for ( var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			var nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				if ( meshReferences[ nodeDef.mesh ] === undefined ) {

					meshReferences[ nodeDef.mesh ] = meshUses[ nodeDef.mesh ] = 0;

				}

				meshReferences[ nodeDef.mesh ] ++;

				// Nothing in the mesh definition indicates whether it is
				// a SkinnedMesh or Mesh. Use the node's mesh reference
				// to mark SkinnedMesh if node has skin.
				if ( nodeDef.skin !== undefined ) {

					meshDefs[ nodeDef.mesh ].isSkinnedMesh = true;

				}

			}

		}

		this.json.meshReferences = meshReferences;
		this.json.meshUses = meshUses;

	};

	/**
	 * Requests the specified dependency asynchronously, with caching.
	 * @param {string} type
	 * @param {number} index
	 * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
	 */
	GLTFParser.prototype.getDependency = function ( type, index ) {

		var cacheKey = type + ':' + index;
		var dependency = this.cache.get( cacheKey );

		if ( ! dependency ) {

			switch ( type ) {

				case 'scene':
					dependency = this.loadScene( index );
					break;

				case 'node':
					dependency = this.loadNode( index );
					break;

				case 'mesh':
					dependency = this.loadMesh( index );
					break;

				case 'accessor':
					dependency = this.loadAccessor( index );
					break;

				case 'bufferView':
					dependency = this.loadBufferView( index );
					break;

				case 'buffer':
					dependency = this.loadBuffer( index );
					break;

				case 'material':
					dependency = this.loadMaterial( index );
					break;

				case 'texture':
					dependency = this.loadTexture( index );
					break;

				case 'skin':
					dependency = this.loadSkin( index );
					break;

				case 'animation':
					dependency = this.loadAnimation( index );
					break;

				case 'camera':
					dependency = this.loadCamera( index );
					break;

				case 'light':
					dependency = this.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ].loadLight( index );
					break;

				default:
					throw new Error( 'Unknown type: ' + type );

			}

			this.cache.add( cacheKey, dependency );

		}

		return dependency;

	};

	/**
	 * Requests all dependencies of the specified type asynchronously, with caching.
	 * @param {string} type
	 * @return {Promise<Array<Object>>}
	 */
	GLTFParser.prototype.getDependencies = function ( type ) {

		var dependencies = this.cache.get( type );

		if ( ! dependencies ) {

			var parser = this;
			var defs = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

			dependencies = Promise.all( defs.map( function ( def, index ) {

				return parser.getDependency( type, index );

			} ) );

			this.cache.add( type, dependencies );

		}

		return dependencies;

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	GLTFParser.prototype.loadBuffer = function ( bufferIndex ) {

		var bufferDef = this.json.buffers[ bufferIndex ];
		var loader = this.fileLoader;

		if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

			throw new Error( 'THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

		}

		// If present, GLB container is required to be the first buffer.
		if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

			return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

		}

		var options = this.options;

		return new Promise( function ( resolve, reject ) {

			loader.load( resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

				reject( new Error( 'THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferViewIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	GLTFParser.prototype.loadBufferView = function ( bufferViewIndex ) {

		var bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			var byteLength = bufferViewDef.byteLength || 0;
			var byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
	 * @param {number} accessorIndex
	 * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
	 */
	GLTFParser.prototype.loadAccessor = function ( accessorIndex ) {

		var parser = this;
		var json = this.json;

		var accessorDef = this.json.accessors[ accessorIndex ];

		if ( accessorDef.bufferView === undefined && accessorDef.sparse === undefined ) {

			// Ignore empty accessors, which may be used to declare runtime
			// information about attributes coming from another source (e.g. Draco
			// compression extension).
			return Promise.resolve( null );

		}

		var pendingBufferViews = [];

		if ( accessorDef.bufferView !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.bufferView ) );

		} else {

			pendingBufferViews.push( null );

		}

		if ( accessorDef.sparse !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.indices.bufferView ) );
			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.values.bufferView ) );

		}

		return Promise.all( pendingBufferViews ).then( function ( bufferViews ) {

			var bufferView = bufferViews[ 0 ];

			var itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			var TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

			// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
			var elementBytes = TypedArray.BYTES_PER_ELEMENT;
			var itemBytes = elementBytes * itemSize;
			var byteOffset = accessorDef.byteOffset || 0;
			var byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[ accessorDef.bufferView ].byteStride : undefined;
			var normalized = accessorDef.normalized === true;
			var array, bufferAttribute;

			// The buffer is not interleaved if the stride is the item size in bytes.
			if ( byteStride && byteStride !== itemBytes ) {

				// Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
				// This makes sure that IBA.count reflects accessor.count properly
				var ibSlice = Math.floor( byteOffset / byteStride );
				var ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
				var ib = parser.cache.get( ibCacheKey );

				if ( ! ib ) {

					array = new TypedArray( bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					ib = new InterleavedBuffer( array, byteStride / elementBytes );

					parser.cache.add( ibCacheKey, ib );

				}

				bufferAttribute = new InterleavedBufferAttribute( ib, itemSize, ( byteOffset % byteStride ) / elementBytes, normalized );

			} else {

				if ( bufferView === null ) {

					array = new TypedArray( accessorDef.count * itemSize );

				} else {

					array = new TypedArray( bufferView, byteOffset, accessorDef.count * itemSize );

				}

				bufferAttribute = new BufferAttribute( array, itemSize, normalized );

			}

			// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
			if ( accessorDef.sparse !== undefined ) {

				var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
				var TypedArrayIndices = WEBGL_COMPONENT_TYPES[ accessorDef.sparse.indices.componentType ];

				var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
				var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

				var sparseIndices = new TypedArrayIndices( bufferViews[ 1 ], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices );
				var sparseValues = new TypedArray( bufferViews[ 2 ], byteOffsetValues, accessorDef.sparse.count * itemSize );

				if ( bufferView !== null ) {

					// Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
					bufferAttribute = new BufferAttribute( bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized );

				}

				for ( var i = 0, il = sparseIndices.length; i < il; i ++ ) {

					var index = sparseIndices[ i ];

					bufferAttribute.setX( index, sparseValues[ i * itemSize ] );
					if ( itemSize >= 2 ) bufferAttribute.setY( index, sparseValues[ i * itemSize + 1 ] );
					if ( itemSize >= 3 ) bufferAttribute.setZ( index, sparseValues[ i * itemSize + 2 ] );
					if ( itemSize >= 4 ) bufferAttribute.setW( index, sparseValues[ i * itemSize + 3 ] );
					if ( itemSize >= 5 ) throw new Error( 'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.' );

				}

			}

			return bufferAttribute;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
	 * @param {number} textureIndex
	 * @return {Promise<THREE.Texture>}
	 */
	GLTFParser.prototype.loadTexture = function ( textureIndex ) {

		var parser = this;
		var json = this.json;
		var options = this.options;
		var textureLoader = this.textureLoader;

		var URL = window.URL || window.webkitURL;

		var textureDef = json.textures[ textureIndex ];

		var textureExtensions = textureDef.extensions || {};

		var source;

		if ( textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ] ) {

			source = json.images[ textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ].source ];

		} else {

			source = json.images[ textureDef.source ];

		}

		var sourceURI = source.uri;
		var isObjectURL = false;

		if ( source.bufferView !== undefined ) {

			// Load binary image data from bufferView, if provided.

			sourceURI = parser.getDependency( 'bufferView', source.bufferView ).then( function ( bufferView ) {

				isObjectURL = true;
				var blob = new Blob( [ bufferView ], { type: source.mimeType } );
				sourceURI = URL.createObjectURL( blob );
				return sourceURI;

			} );

		}

		return Promise.resolve( sourceURI ).then( function ( sourceURI ) {

			// Load Texture resource.

			var loader = options.manager.getHandler( sourceURI );

			if ( ! loader ) {

				loader = textureExtensions[ EXTENSIONS.MSFT_TEXTURE_DDS ]
					? parser.extensions[ EXTENSIONS.MSFT_TEXTURE_DDS ].ddsLoader
					: textureLoader;

			}

			return new Promise( function ( resolve, reject ) {

				loader.load( resolveURL( sourceURI, options.path ), resolve, undefined, reject );

			} );

		} ).then( function ( texture ) {

			// Clean up resources and configure Texture.

			if ( isObjectURL === true ) {

				URL.revokeObjectURL( sourceURI );

			}

			texture.flipY = false;

			if ( textureDef.name !== undefined ) texture.name = textureDef.name;

			// Ignore unknown mime types, like DDS files.
			if ( source.mimeType in MIME_TYPE_FORMATS ) {

				texture.format = MIME_TYPE_FORMATS[ source.mimeType ];

			}

			var samplers = json.samplers || {};
			var sampler = samplers[ textureDef.sampler ] || {};

			texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || LinearFilter;
			texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || LinearMipmapLinearFilter;
			texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || RepeatWrapping;
			texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || RepeatWrapping;

			return texture;

		} );

	};

	/**
	 * Asynchronously assigns a texture to the given material parameters.
	 * @param {Object} materialParams
	 * @param {string} mapName
	 * @param {Object} mapDef
	 * @return {Promise}
	 */
	GLTFParser.prototype.assignTexture = function ( materialParams, mapName, mapDef ) {

		var parser = this;

		return this.getDependency( 'texture', mapDef.index ).then( function ( texture ) {

			if ( ! texture.isCompressedTexture ) {

				switch ( mapName ) {

					case 'aoMap':
					case 'emissiveMap':
					case 'metalnessMap':
					case 'normalMap':
					case 'roughnessMap':
						texture.format = RGBFormat;
						break;

				}

			}

			// Materials sample aoMap from UV set 1 and other maps from UV set 0 - this can't be configured
			// However, we will copy UV set 0 to UV set 1 on demand for aoMap
			if ( mapDef.texCoord !== undefined && mapDef.texCoord != 0 && ! ( mapName === 'aoMap' && mapDef.texCoord == 1 ) ) {

				console.warn( 'THREE.GLTFLoader: Custom UV set ' + mapDef.texCoord + ' for texture ' + mapName + ' not yet supported.' );

			}

			if ( parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] ) {

				var transform = mapDef.extensions !== undefined ? mapDef.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] : undefined;

				if ( transform ) {

					texture = parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ].extendTexture( texture, transform );

				}

			}

			materialParams[ mapName ] = texture;

		} );

	};

	/**
	 * Assigns final material to a Mesh, Line, or Points instance. The instance
	 * already has a material (generated from the glTF material options alone)
	 * but reuse of the same glTF material may require multiple threejs materials
	 * to accomodate different primitive types, defines, etc. New materials will
	 * be created if necessary, and reused from a cache.
	 * @param  {Object3D} mesh Mesh, Line, or Points instance.
	 */
	GLTFParser.prototype.assignFinalMaterial = function ( mesh ) {

		var geometry = mesh.geometry;
		var material = mesh.material;
		var extensions = this.extensions;

		var useVertexTangents = geometry.attributes.tangent !== undefined;
		var useVertexColors = geometry.attributes.color !== undefined;
		var useFlatShading = geometry.attributes.normal === undefined;
		var useSkinning = mesh.isSkinnedMesh === true;
		var useMorphTargets = Object.keys( geometry.morphAttributes ).length > 0;
		var useMorphNormals = useMorphTargets && geometry.morphAttributes.normal !== undefined;

		if ( mesh.isPoints ) {

			var cacheKey = 'PointsMaterial:' + material.uuid;

			var pointsMaterial = this.cache.get( cacheKey );

			if ( ! pointsMaterial ) {

				pointsMaterial = new PointsMaterial();
				Material$1.prototype.copy.call( pointsMaterial, material );
				pointsMaterial.color.copy( material.color );
				pointsMaterial.map = material.map;
				pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

				this.cache.add( cacheKey, pointsMaterial );

			}

			material = pointsMaterial;

		} else if ( mesh.isLine ) {

			var cacheKey = 'LineBasicMaterial:' + material.uuid;

			var lineMaterial = this.cache.get( cacheKey );

			if ( ! lineMaterial ) {

				lineMaterial = new LineBasicMaterial();
				Material$1.prototype.copy.call( lineMaterial, material );
				lineMaterial.color.copy( material.color );

				this.cache.add( cacheKey, lineMaterial );

			}

			material = lineMaterial;

		}

		// Clone the material if it will be modified
		if ( useVertexTangents || useVertexColors || useFlatShading || useSkinning || useMorphTargets ) {

			var cacheKey = 'ClonedMaterial:' + material.uuid + ':';

			if ( material.isGLTFSpecularGlossinessMaterial ) cacheKey += 'specular-glossiness:';
			if ( useSkinning ) cacheKey += 'skinning:';
			if ( useVertexTangents ) cacheKey += 'vertex-tangents:';
			if ( useVertexColors ) cacheKey += 'vertex-colors:';
			if ( useFlatShading ) cacheKey += 'flat-shading:';
			if ( useMorphTargets ) cacheKey += 'morph-targets:';
			if ( useMorphNormals ) cacheKey += 'morph-normals:';

			var cachedMaterial = this.cache.get( cacheKey );

			if ( ! cachedMaterial ) {

				cachedMaterial = material.clone();

				if ( useSkinning ) cachedMaterial.skinning = true;
				if ( useVertexTangents ) cachedMaterial.vertexTangents = true;
				if ( useVertexColors ) cachedMaterial.vertexColors = VertexColors;
				if ( useFlatShading ) cachedMaterial.flatShading = true;
				if ( useMorphTargets ) cachedMaterial.morphTargets = true;
				if ( useMorphNormals ) cachedMaterial.morphNormals = true;

				this.cache.add( cacheKey, cachedMaterial );

			}

			material = cachedMaterial;

		}

		// workarounds for mesh and geometry

		if ( material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined ) {

			geometry.setAttribute( 'uv2', new BufferAttribute( geometry.attributes.uv.array, 2 ) );

		}

		// https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995
		if ( material.normalScale && ! useVertexTangents ) {

			material.normalScale.y = - material.normalScale.y;

		}

		mesh.material = material;

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
	 * @param {number} materialIndex
	 * @return {Promise<Material>}
	 */
	GLTFParser.prototype.loadMaterial = function ( materialIndex ) {

		var parser = this;
		var json = this.json;
		var extensions = this.extensions;
		var materialDef = json.materials[ materialIndex ];

		var materialType;
		var materialParams = {};
		var materialExtensions = materialDef.extensions || {};

		var pending = [];

		if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] ) {

			var sgExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
			materialType = sgExtension.getMaterialType();
			pending.push( sgExtension.extendParams( materialParams, materialDef, parser ) );

		} else if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ] ) {

			var kmuExtension = extensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ];
			materialType = kmuExtension.getMaterialType();
			pending.push( kmuExtension.extendParams( materialParams, materialDef, parser ) );

		} else {

			// Specification:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

			materialType = MeshStandardMaterial;

			var metallicRoughness = materialDef.pbrMetallicRoughness || {};

			materialParams.color = new Color( 1.0, 1.0, 1.0 );
			materialParams.opacity = 1.0;

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				var array = metallicRoughness.baseColorFactor;

				materialParams.color.fromArray( array );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture ) );

			}

			materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
			materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

			if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'metalnessMap', metallicRoughness.metallicRoughnessTexture ) );
				pending.push( parser.assignTexture( materialParams, 'roughnessMap', metallicRoughness.metallicRoughnessTexture ) );

			}

		}

		if ( materialDef.doubleSided === true ) {

			materialParams.side = DoubleSide;

		}

		var alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

		if ( alphaMode === ALPHA_MODES.BLEND ) {

			materialParams.transparent = true;

		} else {

			materialParams.transparent = false;

			if ( alphaMode === ALPHA_MODES.MASK ) {

				materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

			}

		}

		if ( materialDef.normalTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'normalMap', materialDef.normalTexture ) );

			materialParams.normalScale = new Vector2( 1, 1 );

			if ( materialDef.normalTexture.scale !== undefined ) {

				materialParams.normalScale.set( materialDef.normalTexture.scale, materialDef.normalTexture.scale );

			}

		}

		if ( materialDef.occlusionTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'aoMap', materialDef.occlusionTexture ) );

			if ( materialDef.occlusionTexture.strength !== undefined ) {

				materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

			}

		}

		if ( materialDef.emissiveFactor !== undefined && materialType !== MeshBasicMaterial ) {

			materialParams.emissive = new Color().fromArray( materialDef.emissiveFactor );

		}

		if ( materialDef.emissiveTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'emissiveMap', materialDef.emissiveTexture ) );

		}

		return Promise.all( pending ).then( function () {

			var material;

			if ( materialType === GLTFMeshStandardSGMaterial ) {

				material = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].createMaterial( materialParams );

			} else {

				material = new materialType( materialParams );

			}

			if ( materialDef.name !== undefined ) material.name = materialDef.name;

			// baseColorTexture, emissiveTexture, and specularGlossinessTexture use sRGB encoding.
			if ( material.map ) material.map.encoding = sRGBEncoding;
			if ( material.emissiveMap ) material.emissiveMap.encoding = sRGBEncoding;

			assignExtrasToUserData( material, materialDef );

			if ( materialDef.extensions ) addUnknownExtensionsToUserData( extensions, material, materialDef );

			return material;

		} );

	};

	/**
	 * @param {BufferGeometry} geometry
	 * @param {GLTF.Primitive} primitiveDef
	 * @param {GLTFParser} parser
	 */
	function computeBounds( geometry, primitiveDef, parser ) {

		var attributes = primitiveDef.attributes;

		var box = new Box3();

		if ( attributes.POSITION !== undefined ) {

			var accessor = parser.json.accessors[ attributes.POSITION ];

			var min = accessor.min;
			var max = accessor.max;

			// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

			if ( min !== undefined && max !== undefined ) {

				box.set(
					new Vector3( min[ 0 ], min[ 1 ], min[ 2 ] ),
					new Vector3( max[ 0 ], max[ 1 ], max[ 2 ] ) );

			} else {

				console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

				return;

			}

		} else {

			return;

		}

		var targets = primitiveDef.targets;

		if ( targets !== undefined ) {

			var vector = new Vector3();

			for ( var i = 0, il = targets.length; i < il; i ++ ) {

				var target = targets[ i ];

				if ( target.POSITION !== undefined ) {

					var accessor = parser.json.accessors[ target.POSITION ];
					var min = accessor.min;
					var max = accessor.max;

					// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

					if ( min !== undefined && max !== undefined ) {

						// we need to get max of absolute components because target weight is [-1,1]
						vector.setX( Math.max( Math.abs( min[ 0 ] ), Math.abs( max[ 0 ] ) ) );
						vector.setY( Math.max( Math.abs( min[ 1 ] ), Math.abs( max[ 1 ] ) ) );
						vector.setZ( Math.max( Math.abs( min[ 2 ] ), Math.abs( max[ 2 ] ) ) );

						box.expandByVector( vector );

					} else {

						console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

					}

				}

			}

		}

		geometry.boundingBox = box;

		var sphere = new Sphere();

		box.getCenter( sphere.center );
		sphere.radius = box.min.distanceTo( box.max ) / 2;

		geometry.boundingSphere = sphere;

	}

	/**
	 * @param {BufferGeometry} geometry
	 * @param {GLTF.Primitive} primitiveDef
	 * @param {GLTFParser} parser
	 * @return {Promise<BufferGeometry>}
	 */
	function addPrimitiveAttributes( geometry, primitiveDef, parser ) {

		var attributes = primitiveDef.attributes;

		var pending = [];

		function assignAttributeAccessor( accessorIndex, attributeName ) {

			return parser.getDependency( 'accessor', accessorIndex )
				.then( function ( accessor ) {

					geometry.setAttribute( attributeName, accessor );

				} );

		}

		for ( var gltfAttributeName in attributes ) {

			var threeAttributeName = ATTRIBUTES[ gltfAttributeName ] || gltfAttributeName.toLowerCase();

			// Skip attributes already provided by e.g. Draco extension.
			if ( threeAttributeName in geometry.attributes ) continue;

			pending.push( assignAttributeAccessor( attributes[ gltfAttributeName ], threeAttributeName ) );

		}

		if ( primitiveDef.indices !== undefined && ! geometry.index ) {

			var accessor = parser.getDependency( 'accessor', primitiveDef.indices ).then( function ( accessor ) {

				geometry.setIndex( accessor );

			} );

			pending.push( accessor );

		}

		assignExtrasToUserData( geometry, primitiveDef );

		computeBounds( geometry, primitiveDef, parser );

		return Promise.all( pending ).then( function () {

			return primitiveDef.targets !== undefined
				? addMorphTargets( geometry, primitiveDef.targets, parser )
				: geometry;

		} );

	}

	/**
	 * @param {BufferGeometry} geometry
	 * @param {Number} drawMode
	 * @return {BufferGeometry}
	 */
	function toTrianglesDrawMode( geometry, drawMode ) {

		var index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			var indices = [];

			var position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( var i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		var numberOfTriangles = index.count - 2;
		var newIndices = [];

		if ( drawMode === TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( var i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( var i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );


				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		var newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );

		return newGeometry;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
	 *
	 * Creates BufferGeometries from primitives.
	 *
	 * @param {Array<GLTF.Primitive>} primitives
	 * @return {Promise<Array<BufferGeometry>>}
	 */
	GLTFParser.prototype.loadGeometries = function ( primitives ) {

		var parser = this;
		var extensions = this.extensions;
		var cache = this.primitiveCache;

		function createDracoPrimitive( primitive ) {

			return extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ]
				.decodePrimitive( primitive, parser )
				.then( function ( geometry ) {

					return addPrimitiveAttributes( geometry, primitive, parser );

				} );

		}

		var pending = [];

		for ( var i = 0, il = primitives.length; i < il; i ++ ) {

			var primitive = primitives[ i ];
			var cacheKey = createPrimitiveKey( primitive );

			// See if we've already created this geometry
			var cached = cache[ cacheKey ];

			if ( cached ) {

				// Use the cached geometry if it exists
				pending.push( cached.promise );

			} else {

				var geometryPromise;

				if ( primitive.extensions && primitive.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ] ) {

					// Use DRACO geometry if available
					geometryPromise = createDracoPrimitive( primitive );

				} else {

					// Otherwise create a new geometry
					geometryPromise = addPrimitiveAttributes( new BufferGeometry(), primitive, parser );

				}

				// Cache this geometry
				cache[ cacheKey ] = { primitive: primitive, promise: geometryPromise };

				pending.push( geometryPromise );

			}

		}

		return Promise.all( pending );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
	 * @param {number} meshIndex
	 * @return {Promise<Group|Mesh|SkinnedMesh>}
	 */
	GLTFParser.prototype.loadMesh = function ( meshIndex ) {

		var parser = this;
		var json = this.json;

		var meshDef = json.meshes[ meshIndex ];
		var primitives = meshDef.primitives;

		var pending = [];

		for ( var i = 0, il = primitives.length; i < il; i ++ ) {

			var material = primitives[ i ].material === undefined
				? createDefaultMaterial( this.cache )
				: this.getDependency( 'material', primitives[ i ].material );

			pending.push( material );

		}

		pending.push( parser.loadGeometries( primitives ) );

		return Promise.all( pending ).then( function ( results ) {

			var materials = results.slice( 0, results.length - 1 );
			var geometries = results[ results.length - 1 ];

			var meshes = [];

			for ( var i = 0, il = geometries.length; i < il; i ++ ) {

				var geometry = geometries[ i ];
				var primitive = primitives[ i ];

				// 1. create Mesh

				var mesh;

				var material = materials[ i ];

				if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
					primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
					primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
					primitive.mode === undefined ) {

					// .isSkinnedMesh isn't in glTF spec. See .markDefs()
					mesh = meshDef.isSkinnedMesh === true
						? new SkinnedMesh( geometry, material )
						: new Mesh( geometry, material );

					if ( mesh.isSkinnedMesh === true && ! mesh.geometry.attributes.skinWeight.normalized ) {

						// we normalize floating point skin weight array to fix malformed assets (see #15319)
						// it's important to skip this for non-float32 data since normalizeSkinWeights assumes non-normalized inputs
						mesh.normalizeSkinWeights();

					}

					if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, TriangleStripDrawMode );

					} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, TriangleFanDrawMode );

					}

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

					mesh = new LineSegments( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

					mesh = new Line( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

					mesh = new LineLoop( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

					mesh = new Points( geometry, material );

				} else {

					throw new Error( 'THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode );

				}

				if ( Object.keys( mesh.geometry.morphAttributes ).length > 0 ) {

					updateMorphTargets( mesh, meshDef );

				}

				mesh.name = meshDef.name || ( 'mesh_' + meshIndex );

				if ( geometries.length > 1 ) mesh.name += '_' + i;

				assignExtrasToUserData( mesh, meshDef );

				parser.assignFinalMaterial( mesh );

				meshes.push( mesh );

			}

			if ( meshes.length === 1 ) {

				return meshes[ 0 ];

			}

			var group = new Group();

			for ( var i = 0, il = meshes.length; i < il; i ++ ) {

				group.add( meshes[ i ] );

			}

			return group;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
	 * @param {number} cameraIndex
	 * @return {Promise<THREE.Camera>}
	 */
	GLTFParser.prototype.loadCamera = function ( cameraIndex ) {

		var camera;
		var cameraDef = this.json.cameras[ cameraIndex ];
		var params = cameraDef[ cameraDef.type ];

		if ( ! params ) {

			console.warn( 'THREE.GLTFLoader: Missing camera parameters.' );
			return;

		}

		if ( cameraDef.type === 'perspective' ) {

			camera = new PerspectiveCamera( MathUtils.radToDeg( params.yfov ), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new OrthographicCamera( params.xmag / - 2, params.xmag / 2, params.ymag / 2, params.ymag / - 2, params.znear, params.zfar );

		}

		if ( cameraDef.name !== undefined ) camera.name = cameraDef.name;

		assignExtrasToUserData( camera, cameraDef );

		return Promise.resolve( camera );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
	 * @param {number} skinIndex
	 * @return {Promise<Object>}
	 */
	GLTFParser.prototype.loadSkin = function ( skinIndex ) {

		var skinDef = this.json.skins[ skinIndex ];

		var skinEntry = { joints: skinDef.joints };

		if ( skinDef.inverseBindMatrices === undefined ) {

			return Promise.resolve( skinEntry );

		}

		return this.getDependency( 'accessor', skinDef.inverseBindMatrices ).then( function ( accessor ) {

			skinEntry.inverseBindMatrices = accessor;

			return skinEntry;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
	 * @param {number} animationIndex
	 * @return {Promise<AnimationClip>}
	 */
	GLTFParser.prototype.loadAnimation = function ( animationIndex ) {

		var json = this.json;

		var animationDef = json.animations[ animationIndex ];

		var pendingNodes = [];
		var pendingInputAccessors = [];
		var pendingOutputAccessors = [];
		var pendingSamplers = [];
		var pendingTargets = [];

		for ( var i = 0, il = animationDef.channels.length; i < il; i ++ ) {

			var channel = animationDef.channels[ i ];
			var sampler = animationDef.samplers[ channel.sampler ];
			var target = channel.target;
			var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
			var input = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.input ] : sampler.input;
			var output = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.output ] : sampler.output;

			pendingNodes.push( this.getDependency( 'node', name ) );
			pendingInputAccessors.push( this.getDependency( 'accessor', input ) );
			pendingOutputAccessors.push( this.getDependency( 'accessor', output ) );
			pendingSamplers.push( sampler );
			pendingTargets.push( target );

		}

		return Promise.all( [

			Promise.all( pendingNodes ),
			Promise.all( pendingInputAccessors ),
			Promise.all( pendingOutputAccessors ),
			Promise.all( pendingSamplers ),
			Promise.all( pendingTargets )

		] ).then( function ( dependencies ) {

			var nodes = dependencies[ 0 ];
			var inputAccessors = dependencies[ 1 ];
			var outputAccessors = dependencies[ 2 ];
			var samplers = dependencies[ 3 ];
			var targets = dependencies[ 4 ];

			var tracks = [];

			for ( var i = 0, il = nodes.length; i < il; i ++ ) {

				var node = nodes[ i ];
				var inputAccessor = inputAccessors[ i ];
				var outputAccessor = outputAccessors[ i ];
				var sampler = samplers[ i ];
				var target = targets[ i ];

				if ( node === undefined ) continue;

				node.updateMatrix();
				node.matrixAutoUpdate = true;

				var TypedKeyframeTrack;

				switch ( PATH_PROPERTIES[ target.path ] ) {

					case PATH_PROPERTIES.weights:

						TypedKeyframeTrack = NumberKeyframeTrack;
						break;

					case PATH_PROPERTIES.rotation:

						TypedKeyframeTrack = QuaternionKeyframeTrack;
						break;

					case PATH_PROPERTIES.position:
					case PATH_PROPERTIES.scale:
					default:

						TypedKeyframeTrack = VectorKeyframeTrack;
						break;

				}

				var targetName = node.name ? node.name : node.uuid;

				var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : InterpolateLinear;

				var targetNames = [];

				if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

					// Node may be a Group (glTF mesh with several primitives) or a Mesh.
					node.traverse( function ( object ) {

						if ( object.isMesh === true && object.morphTargetInfluences ) {

							targetNames.push( object.name ? object.name : object.uuid );

						}

					} );

				} else {

					targetNames.push( targetName );

				}

				var outputArray = outputAccessor.array;

				if ( outputAccessor.normalized ) {

					var scale;

					if ( outputArray.constructor === Int8Array ) {

						scale = 1 / 127;

					} else if ( outputArray.constructor === Uint8Array ) {

						scale = 1 / 255;

					} else if ( outputArray.constructor == Int16Array ) {

						scale = 1 / 32767;

					} else if ( outputArray.constructor === Uint16Array ) {

						scale = 1 / 65535;

					} else {

						throw new Error( 'THREE.GLTFLoader: Unsupported output accessor component type.' );

					}

					var scaled = new Float32Array( outputArray.length );

					for ( var j = 0, jl = outputArray.length; j < jl; j ++ ) {

						scaled[ j ] = outputArray[ j ] * scale;

					}

					outputArray = scaled;

				}

				for ( var j = 0, jl = targetNames.length; j < jl; j ++ ) {

					var track = new TypedKeyframeTrack(
						targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
						inputAccessor.array,
						outputArray,
						interpolation
					);

					// Override interpolation with custom factory method.
					if ( sampler.interpolation === 'CUBICSPLINE' ) {

						track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline( result ) {

							// A CUBICSPLINE keyframe in glTF has three output values for each input value,
							// representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
							// must be divided by three to get the interpolant's sampleSize argument.

							return new GLTFCubicSplineInterpolant( this.times, this.values, this.getValueSize() / 3, result );

						};

						// Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.
						track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;

					}

					tracks.push( track );

				}

			}

			var name = animationDef.name !== undefined ? animationDef.name : 'animation_' + animationIndex;

			return new AnimationClip( name, undefined, tracks );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
	 * @param {number} nodeIndex
	 * @return {Promise<Object3D>}
	 */
	GLTFParser.prototype.loadNode = function ( nodeIndex ) {

		var json = this.json;
		var extensions = this.extensions;
		var parser = this;

		var meshReferences = json.meshReferences;
		var meshUses = json.meshUses;

		var nodeDef = json.nodes[ nodeIndex ];

		return ( function () {

			var pending = [];

			if ( nodeDef.mesh !== undefined ) {

				pending.push( parser.getDependency( 'mesh', nodeDef.mesh ).then( function ( mesh ) {

					var node;

					if ( meshReferences[ nodeDef.mesh ] > 1 ) {

						var instanceNum = meshUses[ nodeDef.mesh ] ++;

						node = mesh.clone();
						node.name += '_instance_' + instanceNum;

					} else {

						node = mesh;

					}

					// if weights are provided on the node, override weights on the mesh.
					if ( nodeDef.weights !== undefined ) {

						node.traverse( function ( o ) {

							if ( ! o.isMesh ) return;

							for ( var i = 0, il = nodeDef.weights.length; i < il; i ++ ) {

								o.morphTargetInfluences[ i ] = nodeDef.weights[ i ];

							}

						} );

					}

					return node;

				} ) );

			}

			if ( nodeDef.camera !== undefined ) {

				pending.push( parser.getDependency( 'camera', nodeDef.camera ) );

			}

			if ( nodeDef.extensions
				&& nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ]
				&& nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ].light !== undefined ) {

				pending.push( parser.getDependency( 'light', nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS_PUNCTUAL ].light ) );

			}

			return Promise.all( pending );

		}() ).then( function ( objects ) {

			var node;

			// .isBone isn't in glTF spec. See .markDefs
			if ( nodeDef.isBone === true ) {

				node = new Bone();

			} else if ( objects.length > 1 ) {

				node = new Group();

			} else if ( objects.length === 1 ) {

				node = objects[ 0 ];

			} else {

				node = new Object3D();

			}

			if ( node !== objects[ 0 ] ) {

				for ( var i = 0, il = objects.length; i < il; i ++ ) {

					node.add( objects[ i ] );

				}

			}

			if ( nodeDef.name !== undefined ) {

				node.userData.name = nodeDef.name;
				node.name = PropertyBinding.sanitizeNodeName( nodeDef.name );

			}

			assignExtrasToUserData( node, nodeDef );

			if ( nodeDef.extensions ) addUnknownExtensionsToUserData( extensions, node, nodeDef );

			if ( nodeDef.matrix !== undefined ) {

				var matrix = new Matrix4();
				matrix.fromArray( nodeDef.matrix );
				node.applyMatrix4( matrix );

			} else {

				if ( nodeDef.translation !== undefined ) {

					node.position.fromArray( nodeDef.translation );

				}

				if ( nodeDef.rotation !== undefined ) {

					node.quaternion.fromArray( nodeDef.rotation );

				}

				if ( nodeDef.scale !== undefined ) {

					node.scale.fromArray( nodeDef.scale );

				}

			}

			return node;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
	 * @param {number} sceneIndex
	 * @return {Promise<Scene>}
	 */
	GLTFParser.prototype.loadScene = function () {

		// scene node hierachy builder

		function buildNodeHierachy( nodeId, parentObject, json, parser ) {

			var nodeDef = json.nodes[ nodeId ];

			return parser.getDependency( 'node', nodeId ).then( function ( node ) {

				if ( nodeDef.skin === undefined ) return node;

				// build skeleton here as well

				var skinEntry;

				return parser.getDependency( 'skin', nodeDef.skin ).then( function ( skin ) {

					skinEntry = skin;

					var pendingJoints = [];

					for ( var i = 0, il = skinEntry.joints.length; i < il; i ++ ) {

						pendingJoints.push( parser.getDependency( 'node', skinEntry.joints[ i ] ) );

					}

					return Promise.all( pendingJoints );

				} ).then( function ( jointNodes ) {

					node.traverse( function ( mesh ) {

						if ( ! mesh.isMesh ) return;

						var bones = [];
						var boneInverses = [];

						for ( var j = 0, jl = jointNodes.length; j < jl; j ++ ) {

							var jointNode = jointNodes[ j ];

							if ( jointNode ) {

								bones.push( jointNode );

								var mat = new Matrix4();

								if ( skinEntry.inverseBindMatrices !== undefined ) {

									mat.fromArray( skinEntry.inverseBindMatrices.array, j * 16 );

								}

								boneInverses.push( mat );

							} else {

								console.warn( 'THREE.GLTFLoader: Joint "%s" could not be found.', skinEntry.joints[ j ] );

							}

						}

						mesh.bind( new Skeleton( bones, boneInverses ), mesh.matrixWorld );

					} );

					return node;

				} );

			} ).then( function ( node ) {

				// build node hierachy

				parentObject.add( node );

				var pending = [];

				if ( nodeDef.children ) {

					var children = nodeDef.children;

					for ( var i = 0, il = children.length; i < il; i ++ ) {

						var child = children[ i ];
						pending.push( buildNodeHierachy( child, node, json, parser ) );

					}

				}

				return Promise.all( pending );

			} );

		}

		return function loadScene( sceneIndex ) {

			var json = this.json;
			var extensions = this.extensions;
			var sceneDef = this.json.scenes[ sceneIndex ];
			var parser = this;

			var scene = new Scene();
			if ( sceneDef.name !== undefined ) scene.name = sceneDef.name;

			assignExtrasToUserData( scene, sceneDef );

			if ( sceneDef.extensions ) addUnknownExtensionsToUserData( extensions, scene, sceneDef );

			var nodeIds = sceneDef.nodes || [];

			var pending = [];

			for ( var i = 0, il = nodeIds.length; i < il; i ++ ) {

				pending.push( buildNodeHierachy( nodeIds[ i ], scene, json, parser ) );

			}

			return Promise.all( pending ).then( function () {

				return scene;

			} );

		};

	}();

	return GLTFLoader;

} )();

/**
 * @author Emmett Lalish / elalish
 *
 * This class generates custom mipmaps for a roughness map by encoding the lost variation in the
 * normal map mip levels as increased roughness in the corresponding roughness mip levels. This
 * helps with rendering accuracy for MeshStandardMaterial, and also helps with anti-aliasing when
 * using PMREM. If the normal map is larger than the roughness map, the roughness map will be
 * enlarged to match the dimensions of the normal map.
 */

var RoughnessMipmapper = ( function () {

	var _mipmapMaterial = _getMipmapMaterial();
	var _scene = new Scene();
	_scene.add( new Mesh( new PlaneBufferGeometry( 2, 2 ), _mipmapMaterial ) );

	var _flatCamera = new OrthographicCamera( 0, 1, 0, 1, 0, 1 );
	var _tempTarget = null;
	var _renderer = null;

	// constructor
	var RoughnessMipmapper = function ( renderer ) {

		_renderer = renderer;
		_renderer.compile( _scene, _flatCamera );

	};

	RoughnessMipmapper.prototype = {

		constructor: RoughnessMipmapper,

		generateMipmaps: function ( material ) {

			var { roughnessMap, normalMap } = material;
			if ( roughnessMap == null || normalMap == null || ! roughnessMap.generateMipmaps ||
                material.userData.roughnessUpdated ) return;

			material.userData.roughnessUpdated = true;

			var width = Math.max( roughnessMap.image.width, normalMap.image.width );
			var height = Math.max( roughnessMap.image.height, normalMap.image.height );
			if ( ! MathUtils.isPowerOfTwo( width ) || ! MathUtils.isPowerOfTwo( height ) ) return;

			var oldTarget = _renderer.getRenderTarget();
			var autoClear = _renderer.autoClear;
			_renderer.autoClear = false;

			if ( _tempTarget == null || _tempTarget.width !== width || _tempTarget.height !== height ) {

				if ( _tempTarget != null ) _tempTarget.dispose();

				_tempTarget = new WebGLRenderTarget( width, height, { depthBuffer: false, stencilBuffer: false } );
				_tempTarget.scissorTest = true;

			}

			if ( width !== roughnessMap.image.width || height !== roughnessMap.image.height ) {

				var newRoughnessTarget = new WebGLRenderTarget( width, height, {
					minFilter: LinearMipMapLinearFilter,
					depthBuffer: false,
					stencilBuffer: false
				} );
				newRoughnessTarget.texture.generateMipmaps = true;
				// Setting the render target causes the memory to be allocated.
				_renderer.setRenderTarget( newRoughnessTarget );
				material.roughnessMap = newRoughnessTarget.texture;
				if ( material.metalnessMap == roughnessMap ) material.metalnessMap = material.roughnessMap;
				if ( material.aoMap == roughnessMap ) material.aoMap = material.roughnessMap;

			}

			_mipmapMaterial.uniforms.roughnessMap.value = roughnessMap;
			_mipmapMaterial.uniforms.normalMap.value = normalMap;

			var position = new Vector2( 0, 0 );
			var texelSize = _mipmapMaterial.uniforms.texelSize.value;
			for ( var mip = 0; width >= 1 && height >= 1;
				++ mip, width /= 2, height /= 2 ) {

				// Rendering to a mip level is not allowed in webGL1. Instead we must set
				// up a secondary texture to write the result to, then copy it back to the
				// proper mipmap level.
				texelSize.set( 1.0 / width, 1.0 / height );
				if ( mip == 0 ) texelSize.set( 0.0, 0.0 );

				_tempTarget.viewport.set( position.x, position.y, width, height );
				_tempTarget.scissor.set( position.x, position.y, width, height );
				_renderer.setRenderTarget( _tempTarget );
				_renderer.render( _scene, _flatCamera );
				_renderer.copyFramebufferToTexture( position, material.roughnessMap, mip );
				_mipmapMaterial.uniforms.roughnessMap.value = material.roughnessMap;

			}

			if ( roughnessMap !== material.roughnessMap ) roughnessMap.dispose();

			_renderer.setRenderTarget( oldTarget );
			_renderer.autoClear = autoClear;

		},

		dispose: function ( ) {

			_mipmapMaterial.dispose();
			_scene.children[ 0 ].geometry.dispose();
			if ( _tempTarget != null ) _tempTarget.dispose();

		}

	};

	function _getMipmapMaterial() {

		var shaderMaterial = new RawShaderMaterial( {

			uniforms: {
				roughnessMap: { value: null },
				normalMap: { value: null },
				texelSize: { value: new Vector2( 1, 1 ) }
			},

			vertexShader: `
precision mediump float;
precision mediump int;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4( position, 1.0 );
}
              `,

			fragmentShader: `
precision mediump float;
precision mediump int;
varying vec2 vUv;
uniform sampler2D roughnessMap;
uniform sampler2D normalMap;
uniform vec2 texelSize;

#define ENVMAP_TYPE_CUBE_UV
vec4 envMapTexelToLinear(vec4 a){return a;}
#include <cube_uv_reflection_fragment>

float roughnessToVariance(float roughness) {
  float variance = 0.0;
  if (roughness >= r1) {
    variance = (r0 - roughness) * (v1 - v0) / (r0 - r1) + v0;
  } else if (roughness >= r4) {
    variance = (r1 - roughness) * (v4 - v1) / (r1 - r4) + v1;
  } else if (roughness >= r5) {
    variance = (r4 - roughness) * (v5 - v4) / (r4 - r5) + v4;
  } else {
    float roughness2 = roughness * roughness;
    variance = 1.79 * roughness2 * roughness2;
  }
  return variance;
}
float varianceToRoughness(float variance) {
  float roughness = 0.0;
  if (variance >= v1) {
    roughness = (v0 - variance) * (r1 - r0) / (v0 - v1) + r0;
  } else if (variance >= v4) {
    roughness = (v1 - variance) * (r4 - r1) / (v1 - v4) + r1;
  } else if (variance >= v5) {
    roughness = (v4 - variance) * (r5 - r4) / (v4 - v5) + r4;
  } else {
    roughness = pow(0.559 * variance, 0.25);// 0.559 = 1.0 / 1.79
  }
  return roughness;
}

void main() {
    gl_FragColor = texture2D(roughnessMap, vUv, -1.0);
    if (texelSize.x == 0.0) return;
    float roughness = gl_FragColor.g;
    float variance = roughnessToVariance(roughness);
    vec3 avgNormal;
    for (float x = -1.0; x < 2.0; x += 2.0) {
    for (float y = -1.0; y < 2.0; y += 2.0) {
        vec2 uv = vUv + vec2(x, y) * 0.25 * texelSize;
        avgNormal += normalize(texture2D(normalMap, uv, -1.0).xyz - 0.5);
    }
    }
    variance += 1.0 - 0.25 * length(avgNormal);
    gl_FragColor.g = varianceToRoughness(variance);
}
              `,

			blending: NoBlending,
			depthTest: false,
			depthWrite: false

		} );

		shaderMaterial.type = 'RoughnessMipmapper';

		return shaderMaterial;

	}

	return RoughnessMipmapper;

} )();

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a, _b;
const $retainerCount = Symbol('retainerCount');
const $recentlyUsed = Symbol('recentlyUsed');
const $evict = Symbol('evict');
const $evictionThreshold = Symbol('evictionThreshold');
const $cache = Symbol('cache');
/**
 * The CacheEvictionPolicy manages the lifecycle for items in a cache,
 * evicting any items outside some threshold bounds in "recently used" order,
 * if they are evictable.
 *
 * Items are considered cached as they are retained. When all retainers
 * of an item release it, that item is considered evictable.
 */
class CacheEvictionPolicy {
    constructor(cache, evictionThreshold = 5) {
        this[_a] = new Map();
        this[_b] = [];
        this[$cache] = cache;
        this[$evictionThreshold] = evictionThreshold;
    }
    /**
     * The eviction threshold is the maximum number of items to hold
     * in cache indefinitely. Items within the threshold (in recently
     * used order) will continue to be cached even if they have zero
     * retainers.
     */
    set evictionThreshold(value) {
        this[$evictionThreshold] = value;
        this[$evict]();
    }
    get evictionThreshold() {
        return this[$evictionThreshold];
    }
    /**
     * A reference to the cache that operates under this policy
     */
    get cache() {
        return this[$cache];
    }
    /**
     * Given an item key, returns the number of retainers of that item
     */
    retainerCount(key) {
        return this[$retainerCount].get(key) || 0;
    }
    /**
     * Resets the internal tracking of cache item retainers. Use only in cases
     * where it is certain that all retained cache items have been accounted for!
     */
    reset() {
        this[$retainerCount].clear();
        this[$recentlyUsed] = [];
    }
    /**
     * Mark a given cache item as retained, where the item is represented
     * by its key. An item can have any number of retainers.
     */
    retain(key) {
        if (!this[$retainerCount].has(key)) {
            this[$retainerCount].set(key, 0);
        }
        this[$retainerCount].set(key, this[$retainerCount].get(key) + 1);
        const recentlyUsedIndex = this[$recentlyUsed].indexOf(key);
        if (recentlyUsedIndex !== -1) {
            this[$recentlyUsed].splice(recentlyUsedIndex, 1);
        }
        this[$recentlyUsed].unshift(key);
        // Evict, in case retaining a new item pushed an evictable item beyond the
        // eviction threshold
        this[$evict]();
    }
    /**
     * Mark a given cache item as released by one of its retainers, where the item
     * is represented by its key. When all retainers of an item have released it,
     * the item is considered evictable.
     */
    release(key) {
        if (this[$retainerCount].has(key)) {
            this[$retainerCount].set(key, Math.max(this[$retainerCount].get(key) - 1, 0));
        }
        this[$evict]();
    }
    [(_a = $retainerCount, _b = $recentlyUsed, $evict)]() {
        if (this[$recentlyUsed].length < this[$evictionThreshold]) {
            return;
        }
        for (let i = this[$recentlyUsed].length - 1; i >= this[$evictionThreshold]; --i) {
            const key = this[$recentlyUsed][i];
            const retainerCount = this[$retainerCount].get(key);
            if (retainerCount === 0) {
                this[$cache].delete(key);
                this[$recentlyUsed].splice(i, 1);
            }
        }
    }
}

/**
 * @author sunag / http://www.sunag.com.br
 */

var SkeletonUtils = {

	retarget: function () {

		var pos = new Vector3(),
			quat = new Quaternion(),
			scale = new Vector3(),
			bindBoneMatrix = new Matrix4(),
			relativeMatrix = new Matrix4(),
			globalMatrix = new Matrix4();

		return function ( target, source, options ) {

			options = options || {};
			options.preserveMatrix = options.preserveMatrix !== undefined ? options.preserveMatrix : true;
			options.preservePosition = options.preservePosition !== undefined ? options.preservePosition : true;
			options.preserveHipPosition = options.preserveHipPosition !== undefined ? options.preserveHipPosition : false;
			options.useTargetMatrix = options.useTargetMatrix !== undefined ? options.useTargetMatrix : false;
			options.hip = options.hip !== undefined ? options.hip : "hip";
			options.names = options.names || {};

			var sourceBones = source.isObject3D ? source.skeleton.bones : this.getBones( source ),
				bones = target.isObject3D ? target.skeleton.bones : this.getBones( target ),
				bindBones,
				bone, name, boneTo,
				bonesPosition, i;

			// reset bones

			if ( target.isObject3D ) {

				target.skeleton.pose();

			} else {

				options.useTargetMatrix = true;
				options.preserveMatrix = false;

			}

			if ( options.preservePosition ) {

				bonesPosition = [];

				for ( i = 0; i < bones.length; i ++ ) {

					bonesPosition.push( bones[ i ].position.clone() );

				}

			}

			if ( options.preserveMatrix ) {

				// reset matrix

				target.updateMatrixWorld();

				target.matrixWorld.identity();

				// reset children matrix

				for ( i = 0; i < target.children.length; ++ i ) {

					target.children[ i ].updateMatrixWorld( true );

				}

			}

			if ( options.offsets ) {

				bindBones = [];

				for ( i = 0; i < bones.length; ++ i ) {

					bone = bones[ i ];
					name = options.names[ bone.name ] || bone.name;

					if ( options.offsets && options.offsets[ name ] ) {

						bone.matrix.multiply( options.offsets[ name ] );

						bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

						bone.updateMatrixWorld();

					}

					bindBones.push( bone.matrixWorld.clone() );

				}

			}

			for ( i = 0; i < bones.length; ++ i ) {

				bone = bones[ i ];
				name = options.names[ bone.name ] || bone.name;

				boneTo = this.getBoneByName( name, sourceBones );

				globalMatrix.copy( bone.matrixWorld );

				if ( boneTo ) {

					boneTo.updateMatrixWorld();

					if ( options.useTargetMatrix ) {

						relativeMatrix.copy( boneTo.matrixWorld );

					} else {

						relativeMatrix.getInverse( target.matrixWorld );
						relativeMatrix.multiply( boneTo.matrixWorld );

					}

					// ignore scale to extract rotation

					scale.setFromMatrixScale( relativeMatrix );
					relativeMatrix.scale( scale.set( 1 / scale.x, 1 / scale.y, 1 / scale.z ) );

					// apply to global matrix

					globalMatrix.makeRotationFromQuaternion( quat.setFromRotationMatrix( relativeMatrix ) );

					if ( target.isObject3D ) {

						var boneIndex = bones.indexOf( bone ),
							wBindMatrix = bindBones ? bindBones[ boneIndex ] : bindBoneMatrix.getInverse( target.skeleton.boneInverses[ boneIndex ] );

						globalMatrix.multiply( wBindMatrix );

					}

					globalMatrix.copyPosition( relativeMatrix );

				}

				if ( bone.parent && bone.parent.isBone ) {

					bone.matrix.getInverse( bone.parent.matrixWorld );
					bone.matrix.multiply( globalMatrix );

				} else {

					bone.matrix.copy( globalMatrix );

				}

				if ( options.preserveHipPosition && name === options.hip ) {

					bone.matrix.setPosition( pos.set( 0, bone.position.y, 0 ) );

				}

				bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

				bone.updateMatrixWorld();

			}

			if ( options.preservePosition ) {

				for ( i = 0; i < bones.length; ++ i ) {

					bone = bones[ i ];
					name = options.names[ bone.name ] || bone.name;

					if ( name !== options.hip ) {

						bone.position.copy( bonesPosition[ i ] );

					}

				}

			}

			if ( options.preserveMatrix ) {

				// restore matrix

				target.updateMatrixWorld( true );

			}

		};

	}(),

	retargetClip: function ( target, source, clip, options ) {

		options = options || {};
		options.useFirstFramePosition = options.useFirstFramePosition !== undefined ? options.useFirstFramePosition : false;
		options.fps = options.fps !== undefined ? options.fps : 30;
		options.names = options.names || [];

		if ( ! source.isObject3D ) {

			source = this.getHelperFromSkeleton( source );

		}

		var numFrames = Math.round( clip.duration * ( options.fps / 1000 ) * 1000 ),
			delta = 1 / options.fps,
			convertedTracks = [],
			mixer = new AnimationMixer( source ),
			bones = this.getBones( target.skeleton ),
			boneDatas = [],
			positionOffset,
			bone, boneTo, boneData,
			name, i, j;

		mixer.clipAction( clip ).play();
		mixer.update( 0 );

		source.updateMatrixWorld();

		for ( i = 0; i < numFrames; ++ i ) {

			var time = i * delta;

			this.retarget( target, source, options );

			for ( j = 0; j < bones.length; ++ j ) {

				name = options.names[ bones[ j ].name ] || bones[ j ].name;

				boneTo = this.getBoneByName( name, source.skeleton );

				if ( boneTo ) {

					bone = bones[ j ];
					boneData = boneDatas[ j ] = boneDatas[ j ] || { bone: bone };

					if ( options.hip === name ) {

						if ( ! boneData.pos ) {

							boneData.pos = {
								times: new Float32Array( numFrames ),
								values: new Float32Array( numFrames * 3 )
							};

						}

						if ( options.useFirstFramePosition ) {

							if ( i === 0 ) {

								positionOffset = bone.position.clone();

							}

							bone.position.sub( positionOffset );

						}

						boneData.pos.times[ i ] = time;

						bone.position.toArray( boneData.pos.values, i * 3 );

					}

					if ( ! boneData.quat ) {

						boneData.quat = {
							times: new Float32Array( numFrames ),
							values: new Float32Array( numFrames * 4 )
						};

					}

					boneData.quat.times[ i ] = time;

					bone.quaternion.toArray( boneData.quat.values, i * 4 );

				}

			}

			mixer.update( delta );

			source.updateMatrixWorld();

		}

		for ( i = 0; i < boneDatas.length; ++ i ) {

			boneData = boneDatas[ i ];

			if ( boneData ) {

				if ( boneData.pos ) {

					convertedTracks.push( new VectorKeyframeTrack(
						".bones[" + boneData.bone.name + "].position",
						boneData.pos.times,
						boneData.pos.values
					) );

				}

				convertedTracks.push( new QuaternionKeyframeTrack(
					".bones[" + boneData.bone.name + "].quaternion",
					boneData.quat.times,
					boneData.quat.values
				) );

			}

		}

		mixer.uncacheAction( clip );

		return new AnimationClip( clip.name, - 1, convertedTracks );

	},

	getHelperFromSkeleton: function ( skeleton ) {

		var source = new SkeletonHelper( skeleton.bones[ 0 ] );
		source.skeleton = skeleton;

		return source;

	},

	getSkeletonOffsets: function () {

		var targetParentPos = new Vector3(),
			targetPos = new Vector3(),
			sourceParentPos = new Vector3(),
			sourcePos = new Vector3(),
			targetDir = new Vector2(),
			sourceDir = new Vector2();

		return function ( target, source, options ) {

			options = options || {};
			options.hip = options.hip !== undefined ? options.hip : "hip";
			options.names = options.names || {};

			if ( ! source.isObject3D ) {

				source = this.getHelperFromSkeleton( source );

			}

			var nameKeys = Object.keys( options.names ),
				nameValues = Object.values( options.names ),
				sourceBones = source.isObject3D ? source.skeleton.bones : this.getBones( source ),
				bones = target.isObject3D ? target.skeleton.bones : this.getBones( target ),
				offsets = [],
				bone, boneTo,
				name, i;

			target.skeleton.pose();

			for ( i = 0; i < bones.length; ++ i ) {

				bone = bones[ i ];
				name = options.names[ bone.name ] || bone.name;

				boneTo = this.getBoneByName( name, sourceBones );

				if ( boneTo && name !== options.hip ) {

					var boneParent = this.getNearestBone( bone.parent, nameKeys ),
						boneToParent = this.getNearestBone( boneTo.parent, nameValues );

					boneParent.updateMatrixWorld();
					boneToParent.updateMatrixWorld();

					targetParentPos.setFromMatrixPosition( boneParent.matrixWorld );
					targetPos.setFromMatrixPosition( bone.matrixWorld );

					sourceParentPos.setFromMatrixPosition( boneToParent.matrixWorld );
					sourcePos.setFromMatrixPosition( boneTo.matrixWorld );

					targetDir.subVectors(
						new Vector2( targetPos.x, targetPos.y ),
						new Vector2( targetParentPos.x, targetParentPos.y )
					).normalize();

					sourceDir.subVectors(
						new Vector2( sourcePos.x, sourcePos.y ),
						new Vector2( sourceParentPos.x, sourceParentPos.y )
					).normalize();

					var laterialAngle = targetDir.angle() - sourceDir.angle();

					var offset = new Matrix4().makeRotationFromEuler(
						new Euler(
							0,
							0,
							laterialAngle
						)
					);

					bone.matrix.multiply( offset );

					bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

					bone.updateMatrixWorld();

					offsets[ name ] = offset;

				}

			}

			return offsets;

		};

	}(),

	renameBones: function ( skeleton, names ) {

		var bones = this.getBones( skeleton );

		for ( var i = 0; i < bones.length; ++ i ) {

			var bone = bones[ i ];

			if ( names[ bone.name ] ) {

				bone.name = names[ bone.name ];

			}

		}

		return this;

	},

	getBones: function ( skeleton ) {

		return Array.isArray( skeleton ) ? skeleton : skeleton.bones;

	},

	getBoneByName: function ( name, skeleton ) {

		for ( var i = 0, bones = this.getBones( skeleton ); i < bones.length; i ++ ) {

			if ( name === bones[ i ].name )

				return bones[ i ];

		}

	},

	getNearestBone: function ( bone, names ) {

		while ( bone.isBone ) {

			if ( names.indexOf( bone.name ) !== - 1 ) {

				return bone;

			}

			bone = bone.parent;

		}

	},

	findBoneTrackData: function ( name, tracks ) {

		var regexp = /\[(.*)\]\.(.*)/,
			result = { name: name };

		for ( var i = 0; i < tracks.length; ++ i ) {

			// 1 is track name
			// 2 is track type
			var trackData = regexp.exec( tracks[ i ].name );

			if ( trackData && name === trackData[ 1 ] ) {

				result[ trackData[ 2 ] ] = i;

			}

		}

		return result;

	},

	getEqualsBonesNames: function ( skeleton, targetSkeleton ) {

		var sourceBones = this.getBones( skeleton ),
			targetBones = this.getBones( targetSkeleton ),
			bones = [];

		search : for ( var i = 0; i < sourceBones.length; i ++ ) {

			var boneName = sourceBones[ i ].name;

			for ( var j = 0; j < targetBones.length; j ++ ) {

				if ( boneName === targetBones[ j ].name ) {

					bones.push( boneName );

					continue search;

				}

			}

		}

		return bones;

	},

	clone: function ( source ) {

		var sourceLookup = new Map();
		var cloneLookup = new Map();

		var clone = source.clone();

		parallelTraverse( source, clone, function ( sourceNode, clonedNode ) {

			sourceLookup.set( clonedNode, sourceNode );
			cloneLookup.set( sourceNode, clonedNode );

		} );

		clone.traverse( function ( node ) {

			if ( ! node.isSkinnedMesh ) return;

			var clonedMesh = node;
			var sourceMesh = sourceLookup.get( node );
			var sourceBones = sourceMesh.skeleton.bones;

			clonedMesh.skeleton = sourceMesh.skeleton.clone();
			clonedMesh.bindMatrix.copy( sourceMesh.bindMatrix );

			clonedMesh.skeleton.bones = sourceBones.map( function ( bone ) {

				return cloneLookup.get( bone );

			} );

			clonedMesh.bind( clonedMesh.skeleton, clonedMesh.bindMatrix );

		} );

		return clone;

	}

};


function parallelTraverse( a, b, callback ) {

	callback( a, b );

	for ( var i = 0; i < a.children.length; i ++ ) {

		parallelTraverse( a.children[ i ], b.children[ i ], callback );

	}

}

/**
 * @license MIT
 * @see https://github.com/mrdoob/three.js/blob/dev/LICENSE
 */
const alphaChunk = /* glsl */ `
#ifdef ALPHATEST

    if ( diffuseColor.a < ALPHATEST ) discard;
    diffuseColor.a = 1.0;

#endif
`;

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Fully clones a parsed GLTF, including correct cloning of any SkinnedMesh
 * objects.
 */
const cloneGltf = (gltf) => {
    const clone = Object.assign(Object.assign({}, gltf), { scene: SkeletonUtils.clone(gltf.scene) });
    /**
     * Creates a clone of the given material, and applies a patch to the
     * shader program.
     */
    const cloneAndPatchMaterial = (material) => {
        const clone = material.clone();
        // This allows us to patch three's materials, on top of patches already
        // made, for instance GLTFLoader patches SpecularGlossiness materials.
        // Unfortunately, three's program cache differentiates SpecGloss materials
        // via onBeforeCompile.toString(), so these two functions do the same thing
        // but look different in order to force a proper recompile.
        const oldOnBeforeCompile = material.onBeforeCompile;
        clone.onBeforeCompile = material.isGLTFSpecularGlossinessMaterial ?
            (shader) => {
                oldOnBeforeCompile(shader, undefined);
                shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_fragment>', alphaChunk);
            } :
            (shader) => {
                shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_fragment>', alphaChunk);
                oldOnBeforeCompile(shader, undefined);
            };
        // This makes shadows better for non-manifold meshes
        clone.shadowSide = FrontSide;
        // This improves transparent rendering and can be removed whenever
        // https://github.com/mrdoob/three.js/pull/18235 finally lands.
        if (clone.transparent) {
            clone.depthWrite = false;
        }
        // This little hack ignores alpha for opaque materials, in order to comply
        // with the glTF spec.
        if (!clone.alphaTest && !clone.transparent) {
            clone.alphaTest = -0.5;
        }
        return clone;
    };
    clone.scene.traverse((node) => {
        // Set a high renderOrder while we're here to ensure the model
        // always renders on top of the skysphere
        node.renderOrder = 1000;
        // Materials aren't cloned when cloning meshes; geometry
        // and materials are copied by reference. This is necessary
        // for the same model to be used twice with different
        // environment maps.
        if (Array.isArray(node.material)) {
            node.material = node.material.map(cloneAndPatchMaterial);
        }
        else if (node.material != null) {
            node.material = cloneAndPatchMaterial(node.material);
        }
    });
    return clone;
};
/**
 * Moves Three.js objects from one parent to another
 */
const moveChildren = (from, to) => {
    while (from.children.length) {
        to.add(from.children.shift());
    }
};
/**
 * Performs a reduction across all the vertices of the input model and all its
 * children. The supplied function takes the reduced value and a vertex and
 * returns the newly reduced value. The value is initialized as zero.
 *
 * Adapted from Three.js, @see https://github.com/mrdoob/three.js/blob/7e0a78beb9317e580d7fa4da9b5b12be051c6feb/src/math/Box3.js#L241
 */
const reduceVertices = (model, func) => {
    let value = 0;
    const vector = new Vector3();
    model.traverse((object) => {
        let i, l;
        object.updateWorldMatrix(false, false);
        let geometry = object.geometry;
        if (geometry !== undefined) {
            if (geometry.isGeometry) {
                let vertices = geometry.vertices;
                for (i = 0, l = vertices.length; i < l; i++) {
                    vector.copy(vertices[i]);
                    vector.applyMatrix4(object.matrixWorld);
                    value = func(value, vector);
                }
            }
            else if (geometry.isBufferGeometry) {
                let attribute = geometry.attributes.position;
                if (attribute !== undefined) {
                    for (i = 0, l = attribute.count; i < l; i++) {
                        vector.fromBufferAttribute(attribute, i)
                            .applyMatrix4(object.matrixWorld);
                        value = func(value, vector);
                    }
                }
            }
        }
    });
    return value;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const deserializeUrl = (url) => (url != null && url !== 'null') ? toFullUrl(url) : null;
const assertIsArCandidate = () => {
    if (IS_WEBXR_AR_CANDIDATE) {
        return;
    }
    const missingApis = [];
    if (!HAS_WEBXR_DEVICE_API) {
        missingApis.push('WebXR Device API');
    }
    if (!HAS_WEBXR_HIT_TEST_API) {
        missingApis.push('WebXR Hit Test API');
    }
    throw new Error(`The following APIs are required for AR, but are missing in this browser: ${missingApis.join(', ')}`);
};
/**
 * Converts a partial URL string to a fully qualified URL string.
 *
 * @param {String} url
 * @return {String}
 */
const toFullUrl = (partialUrl) => {
    const url = new URL(partialUrl, window.location.toString());
    return url.toString();
};
/**
 * Returns a throttled version of a given function that is only invoked at most
 * once within a given threshold of time in milliseconds.
 *
 * The throttled version of the function has a "flush" property that resets the
 * threshold for cases when immediate invokation is desired.
 */
const throttle = (fn, ms) => {
    let timer = null;
    const throttled = (...args) => {
        if (timer != null) {
            return;
        }
        fn(...args);
        timer = self.setTimeout(() => timer = null, ms);
    };
    throttled.flush = () => {
        if (timer != null) {
            self.clearTimeout(timer);
            timer = null;
        }
    };
    return throttled;
};
const debounce = (fn, ms) => {
    let timer = null;
    return (...args) => {
        if (timer != null) {
            self.clearTimeout(timer);
        }
        timer = self.setTimeout(() => {
            timer = null;
            fn(...args);
        }, ms);
    };
};
/**
 * @param {Number} value
 * @param {Number} lowerLimit
 * @param {Number} upperLimit
 * @return {Number} value clamped within lowerLimit..upperLimit
 */
const clamp = (value, lowerLimit, upperLimit) => Math.max(lowerLimit, Math.min(upperLimit, value));
// The DPR we use for a "capped" scenario (see resolveDpr below):
const CAPPED_DEVICE_PIXEL_RATIO = 1;
/**
 * This helper analyzes the layout of the current page to decide if we should
 * use the natural device pixel ratio, or a capped value.
 *
 * We cap DPR if there is no meta viewport (suggesting that user is not
 * consciously specifying how to scale the viewport relative to the device
 * screen size).
 *
 * The rationale is that this condition typically leads to a pathological
 * outcome on mobile devices. When the window dimensions are scaled up on a
 * device with a high DPR, we create a canvas that is much larger than
 * appropriate to accomodate for the pixel density if we naively use the
 * reported DPR.
 *
 * This value needs to be measured in real time, as device pixel ratio can
 * change over time (e.g., when a user zooms the page). Also, in some cases
 * (such as Firefox on Android), the window's innerWidth is initially reported
 * as the same as the screen's availWidth but changes later.
 *
 * A user who specifies a meta viewport, thereby consciously creating scaling
 * conditions where <model-viewer> is slow, will be encouraged to live their
 * best life.
 */
const resolveDpr = (() => {
    // If true, implies that the user is conscious of the viewport scaling
    // relative to the device screen size.
    const HAS_META_VIEWPORT_TAG = (() => {
        const metas = document.head != null ?
            Array.from(document.head.querySelectorAll('meta')) :
            [];
        for (const meta of metas) {
            if (meta.name === 'viewport') {
                return true;
            }
        }
        return false;
    })();
    if (!HAS_META_VIEWPORT_TAG) {
        console.warn('No <meta name="viewport"> detected; <model-viewer> will cap pixel density at 1.');
    }
    return () => HAS_META_VIEWPORT_TAG ? window.devicePixelRatio :
        CAPPED_DEVICE_PIXEL_RATIO;
})();
/**
 * Debug mode is enabled when one of the two following conditions is true:
 *
 *  1. A 'model-viewer-debug-mode' query parameter is present in the current
 *     search string
 *  2. There is a global object ModelViewerElement with a debugMode property set
 *     to true
 */
const isDebugMode = (() => {
    const debugQueryParameterName = 'model-viewer-debug-mode';
    const debugQueryParameter = new RegExp(`[\?&]${debugQueryParameterName}(&|$)`);
    return () => (self.ModelViewerElement &&
        self.ModelViewerElement.debugMode) ||
        (self.location && self.location.search &&
            self.location.search.match(debugQueryParameter));
})();
/**
 * Returns the first key in a Map in iteration order.
 *
 * NOTE(cdata): This is necessary because IE11 does not implement iterator
 * methods of Map, and polymer-build does not polyfill these methods for
 * compatibility and performance reasons. This helper proposes that it is
 * a reasonable compromise to sacrifice a very small amount of runtime
 * performance in IE11 for the sake of code clarity.
 */
const getFirstMapKey = (map) => {
    if (map.keys != null) {
        return map.keys().next().value || null;
    }
    let firstKey = null;
    try {
        map.forEach((_value, key, _map) => {
            firstKey = key;
            // Stop iterating the Map with forEach:
            throw new Error();
        });
    }
    catch (_error) {
    }
    return firstKey;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The Reticle class creates an object that repeatedly calls
 * `xrSession.requestHitTest()` to render a ring along a found
 * horizontal surface.
 */
class Reticle extends Object3D {
    /**
     * @param {XRSession} xrSession
     * @param {THREE.Camera} camera
     */
    constructor(camera) {
        super();
        this.hitTestSource = null;
        this.hitTestSourceRequest = null;
        this._hitMatrix = null;
        this.name = 'Reticle';
        let geometry = new RingGeometry(0.1, 0.11, 24, 1);
        let material = new MeshBasicMaterial({ color: 0xffffff });
        // Orient the geometry so its position is flat on a horizontal surface
        geometry.applyMatrix4(new Matrix4().makeRotationX(MathUtils.degToRad(-90)));
        this.ring = new Mesh(geometry, material);
        this.add(this.ring);
        this.visible = false;
        this.camera = camera;
    }
    get hitMatrix() {
        return this._hitMatrix;
    }
    /**
     * Fires a hit test in the middle of the screen and places the reticle
     * upon the surface if found.
     *
     * @param {XRFRame} frame
     * @param {XRFrameOfReference} frameOfRef
     */
    async update(_session, _frame, _viewerReferenceSpace, _frameOfRef) {
        if (!this.hitTestSourceRequest) {
            this.hitTestSourceRequest =
                _session.requestHitTestSource({ space: _viewerReferenceSpace })
                    .then(hitTestSource => {
                    this.hitTestSource = hitTestSource;
                });
        }
        else if (this.hitTestSource) {
            const hitTestResults = _frame.getHitTestResults(this.hitTestSource);
            if (hitTestResults.length) {
                const hit = hitTestResults[0];
                this._hitMatrix =
                    new Matrix4().fromArray(hit.getPose(_frameOfRef).transform.matrix);
                // Now apply the position from the hitMatrix onto our model
                this.position.setFromMatrixPosition(this._hitMatrix);
                // Rotate the anchor to face the camera
                const targetPos = new Vector3().setFromMatrixPosition(this.camera.matrixWorld);
                const angle = Math.atan2(targetPos.x - this.position.x, targetPos.z - this.position.z);
                this.rotation.set(0, angle, 0);
                this.visible = true;
            }
            else {
                this._hitMatrix = null;
            }
        }
        else {
            this._hitMatrix = null;
        }
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assertContext = (context) => {
    if (context == null) {
        throw new Error('WebGL is not available!');
    }
    return context;
};
const getContext = (canvas, options) => assertContext(canvas.getContext('webgl', options) ||
    canvas.getContext('experimental-webgl', options));
/**
 * Patch the values reported by WebGLRenderingContext's
 * extension store to fix compatibility issues.
 */
const applyExtensionCompatibility = (gl) => {
    const testShaders = {
        // In some Firefox builds (mobile Android on Pixel at least),
        // EXT_shader_texture_lod is reported as being supported, but
        // fails in practice.
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=1451287
        'EXT_shader_texture_lod': `
      #extension GL_EXT_shader_texture_lod : enable
      precision mediump float;
      uniform sampler2D tex;
      void main() {
        gl_FragColor = texture2DLodEXT(tex, vec2(0.0, 0.0), 0.0);
      }`,
    };
    function confirmExtension(gl, name) {
        const shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, testShaders[name]);
        gl.compileShader(shader);
        const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        gl.deleteShader(shader);
        return status;
    }
    const getExtension = gl.getExtension;
    gl.getExtension = (name) => {
        let extension;
        if (testShaders[name]) {
            extension = getExtension.call(gl, name);
            if (extension && !confirmExtension(gl, name)) {
                extension = null;
            }
        }
        else {
            extension = getExtension.call(gl, name);
        }
        return extension;
    };
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$1, _b$1, _c, _d, _e, _f, _g;
const $presentedScene = Symbol('presentedScene');
const $rafId = Symbol('rafId');
const $currentSession = Symbol('currentSession');
const $tick = Symbol('tick');
const $refSpace = Symbol('refSpace');
const $viewerRefSpace = Symbol('viewerRefSpace');
const $resolveCleanup = Symbol('resolveCleanup');
const $outputContext = Symbol('outputContext');
const $onWebXRFrame = Symbol('onWebXRFrame');
const $postSessionCleanup = Symbol('postSessionCleanup');
const matrix4 = new Matrix4();
const vector3 = new Vector3();
class ARRenderer extends EventDispatcher {
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.camera = new PerspectiveCamera();
        this.scene = new Scene();
        this.dolly = new Object3D();
        this.reticle = new Reticle(this.camera);
        this.raycaster = null;
        this[_a$1] = null;
        this[_b$1] = null;
        this[_c] = null;
        this[_d] = null;
        this[_e] = null;
        this[_f] = null;
        this[_g] = null;
        this.threeRenderer = renderer.threeRenderer;
        this.inputContext = renderer.context3D;
        this.camera.matrixAutoUpdate = false;
        this.scene.add(this.reticle);
        this.scene.add(this.dolly);
    }
    initializeRenderer() {
        this.threeRenderer.setPixelRatio(1);
    }
    async resolveARSession() {
        assertIsArCandidate();
        const session = await navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['hit-test'] });
        const gl = assertContext(this.threeRenderer.getContext());
        // `makeXRCompatible` replaced `setCompatibleXRDevice` in Chrome M73 @TODO
        // #293, handle WebXR API changes. WARNING: this can cause a GL context
        // loss according to the spec, though current implementations don't do so.
        await gl.makeXRCompatible();
        this[$outputContext] = gl;
        session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl, { alpha: true }) });
        // The render state update takes effect on the next animation frame. Wait
        // for it so that we get a framebuffer.
        let waitForAnimationFrame = new Promise((resolve, _reject) => {
            session.requestAnimationFrame(() => resolve());
        });
        await waitForAnimationFrame;
        // Redirect rendering to the WebXR offscreen framebuffer.
        // TODO: this method should be added to three.js's exported interface.
        this.threeRenderer
            .setFramebuffer(session.renderState.baseLayer.framebuffer);
        this.threeRenderer.setSize(session.renderState.baseLayer.framebufferWidth, session.renderState.baseLayer.framebufferHeight, false);
        return session;
    }
    /**
     * The currently presented scene, if any
     */
    get presentedScene() {
        return this[$presentedScene];
    }
    /**
     * Resolves to true if the renderer has detected all the necessary qualities
     * to support presentation in AR.
     */
    async supportsPresentation() {
        try {
            assertIsArCandidate();
            return await navigator.xr.isSessionSupported('immersive-ar');
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Present a scene in AR
     */
    async present(scene) {
        if (this.isPresenting) {
            console.warn('Cannot present while a model is already presenting');
        }
        scene.model.scale.set(1, 1, 1);
        this[$presentedScene] = scene;
        this.initializeRenderer();
        this[$currentSession] = await this.resolveARSession();
        this[$currentSession].addEventListener('end', () => {
            this[$postSessionCleanup]();
        }, { once: true });
        this[$refSpace] =
            await this[$currentSession].requestReferenceSpace('local');
        this[$viewerRefSpace] =
            await this[$currentSession].requestReferenceSpace('viewer');
        this[$tick]();
    }
    /**
     * If currently presenting a scene in AR, stops presentation and exits AR.
     */
    async stopPresenting() {
        if (!this.isPresenting) {
            return;
        }
        const cleanupPromise = new Promise((resolve) => {
            this[$resolveCleanup] = resolve;
        });
        try {
            const session = this[$currentSession];
            this[$currentSession] = null;
            session.cancelAnimationFrame(this[$rafId]);
            await session.end();
            await cleanupPromise;
        }
        catch (error) {
            console.warn('Error while trying to end AR session');
            console.warn(error);
            this[$postSessionCleanup]();
        }
    }
    [(_a$1 = $outputContext, _b$1 = $rafId, _c = $currentSession, _d = $refSpace, _e = $viewerRefSpace, _f = $presentedScene, _g = $resolveCleanup, $postSessionCleanup)]() {
        // The offscreen WebXR framebuffer is now invalid, switch
        // back to the default framebuffer for canvas output.
        // TODO: this method should be added to three.js's exported interface.
        this.threeRenderer.setFramebuffer(null);
        // Trigger a parent renderer update. TODO(klausw): are these all
        // necessary and sufficient?
        if (this[$presentedScene] != null) {
            this.dolly.remove(this[$presentedScene]);
            this[$presentedScene].isDirty = true;
        }
        // The renderer's render method automatically updates
        // the device pixel ratio, but only updates the three.js renderer
        // size if there's a size mismatch. Reset the size to force that
        // to refresh.
        this.renderer.setRendererSize(1, 1);
        this[$refSpace] = null;
        this[$presentedScene] = null;
        this.scene.environment = null;
        if (this[$resolveCleanup] != null) {
            this[$resolveCleanup]();
        }
    }
    /**
     * True if a scene is currently in the process of being presented in AR
     */
    get isPresenting() {
        return this[$presentedScene] != null;
    }
    get outputContext() {
        return this[$outputContext];
    }
    async placeModel() {
        if (this[$currentSession] == null) {
            return;
        }
        // NOTE: Currently rays will be cast from the middle of the screen.
        // Eventually we might use input coordinates for this.
        // Just reuse the hit matrix that the reticle has computed.
        if (this.reticle && this.reticle.hitMatrix) {
            const presentedScene = this[$presentedScene];
            const hitMatrix = this.reticle.hitMatrix;
            this.dolly.position.setFromMatrixPosition(hitMatrix);
            // Orient the dolly/model to face the camera
            const camPosition = vector3.setFromMatrixPosition(this.camera.matrix);
            this.dolly.lookAt(camPosition.x, this.dolly.position.y, camPosition.z);
            this.dolly.rotateY(-presentedScene.pivot.rotation.y);
            this.dolly.add(presentedScene);
            this.dispatchEvent({ type: 'modelmove' });
        }
    }
    /**
     * It appears that XRSession's `inputsourceschange` event is not implemented
     * in Chrome Canary as of m72 for 'screen' inputs, which would be preferable
     * since we only need an "select" event, rather than track a pose on every
     * frame (like a 6DOF controller). Due to this bug, on every frame, check to
     * see if an input exists.
     * @see https://bugs.chromium.org/p/chromium/issues/detail?id=913703
     * @see https://immersive-web.github.io/webxr/#xrinputsource-interface
     */
    processXRInput(frame) {
        const { session } = frame;
        // Get current input sources. For now, only 'screen' input is supported,
        // which is only added to the session's active input sources immediately
        // before `selectstart` and removed immediately after `selectend` event.
        // If we have a 'screen' source here, it means the output canvas was tapped.
        const sources = Array.from(session.inputSources)
            .filter(input => input.targetRayMode === 'screen');
        if (sources.length === 0) {
            return;
        }
        const pose = frame.getPose(sources[0].targetRaySpace, this[$refSpace]);
        if (pose) {
            this.placeModel();
        }
    }
    [$tick]() {
        this[$rafId] = this[$currentSession].requestAnimationFrame((time, frame) => this[$onWebXRFrame](time, frame));
    }
    [$onWebXRFrame](_time, frame) {
        const { session } = frame;
        const pose = frame.getViewerPose(this[$refSpace]);
        // TODO: Notify external observers of tick
        // TODO: Note that reticle may be "stabilized"
        this[$tick]();
        if (pose == null) {
            return;
        }
        if (this.scene.environment !== this[$presentedScene].environment) {
            this.scene.environment = this[$presentedScene].environment;
        }
        for (const view of frame.getViewerPose(this[$refSpace]).views) {
            const viewport = session.renderState.baseLayer.getViewport(view);
            this.threeRenderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
            this.camera.projectionMatrix.fromArray(view.projectionMatrix);
            const viewMatrix = matrix4.fromArray(view.transform.inverse.matrix);
            this.camera.matrix.getInverse(viewMatrix);
            this.camera.updateMatrixWorld(true);
            // NOTE: Updating input or the reticle is dependent on the camera's
            // pose, hence updating these elements after camera update but
            // before render.
            this.reticle.update(this[$currentSession], frame, this[$viewerRefSpace], this[$refSpace]);
            this.processXRInput(frame);
            // NOTE: Clearing depth caused issues on Samsung devices
            // @see https://github.com/googlecodelabs/ar-with-webxr/issues/8
            // this.threeRenderer.clearDepth();
            this.threeRenderer.render(this.scene, this.camera);
        }
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This Debugger exposes internal details of the <model-viewer> rendering
 * substructure so that external tools can more easily inspect and operate on
 * them.
 *
 * It also activates shader debugging on the associated GL context. Shader
 * debugging trades performance for useful error information, so it is not
 * recommended to activate this unless needed.
 */
class Debugger {
    constructor(renderer) {
        // Force WebGL shader debugging on:
        renderer.threeRenderer.debug = { checkShaderErrors: true };
        // Announce debug details at microtask timing to give the `Renderer`
        // constructor time to complete its initialization, just to be on the safe
        // side:
        Promise.resolve().then(() => {
            self.dispatchEvent(new CustomEvent('model-viewer-renderer-debug', {
                detail: {
                    renderer,
                    THREE: {
                        ShaderMaterial,
                        Texture,
                        Mesh,
                        Scene,
                        PlaneBufferGeometry,
                        OrthographicCamera,
                        WebGLRenderTarget
                    }
                }
            }));
        });
    }
    addScene(scene) {
        self.dispatchEvent(new CustomEvent('model-viewer-scene-added-debug', { detail: { scene } }));
    }
    removeScene(scene) {
        self.dispatchEvent(new CustomEvent('model-viewer-scene-removed-debug', { detail: { scene } }));
    }
}

/**
 * @author Nikos M. / https://github.com/foo123/
 */

// https://github.com/mrdoob/three.js/issues/5552
// http://en.wikipedia.org/wiki/RGBE_image_format

var RGBELoader = function ( manager ) {

	DataTextureLoader.call( this, manager );

	this.type = UnsignedByteType;

};

RGBELoader.prototype = Object.assign( Object.create( DataTextureLoader.prototype ), {

	constructor: RGBELoader,

	// adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html

	parse: function ( buffer ) {

		var
			/* return codes for rgbe routines */
			//RGBE_RETURN_SUCCESS = 0,
			RGBE_RETURN_FAILURE = - 1,

			/* default error routine.  change this to change error handling */
			rgbe_read_error = 1,
			rgbe_write_error = 2,
			rgbe_format_error = 3,
			rgbe_memory_error = 4,
			rgbe_error = function ( rgbe_error_code, msg ) {

				switch ( rgbe_error_code ) {

					case rgbe_read_error: console.error( "RGBELoader Read Error: " + ( msg || '' ) );
						break;
					case rgbe_write_error: console.error( "RGBELoader Write Error: " + ( msg || '' ) );
						break;
					case rgbe_format_error: console.error( "RGBELoader Bad File Format: " + ( msg || '' ) );
						break;
					default:
					case rgbe_memory_error: console.error( "RGBELoader: Error: " + ( msg || '' ) );

				}
				return RGBE_RETURN_FAILURE;

			},

			/* offsets to red, green, and blue components in a data (float) pixel */
			//RGBE_DATA_RED = 0,
			//RGBE_DATA_GREEN = 1,
			//RGBE_DATA_BLUE = 2,

			/* number of floats per pixel, use 4 since stored in rgba image format */
			//RGBE_DATA_SIZE = 4,

			/* flags indicating which fields in an rgbe_header_info are valid */
			RGBE_VALID_PROGRAMTYPE = 1,
			RGBE_VALID_FORMAT = 2,
			RGBE_VALID_DIMENSIONS = 4,

			NEWLINE = "\n",

			fgets = function ( buffer, lineLimit, consume ) {

				lineLimit = ! lineLimit ? 1024 : lineLimit;
				var p = buffer.pos,
					i = - 1, len = 0, s = '', chunkSize = 128,
					chunk = String.fromCharCode.apply( null, new Uint16Array( buffer.subarray( p, p + chunkSize ) ) )
				;
				while ( ( 0 > ( i = chunk.indexOf( NEWLINE ) ) ) && ( len < lineLimit ) && ( p < buffer.byteLength ) ) {

					s += chunk; len += chunk.length;
					p += chunkSize;
					chunk += String.fromCharCode.apply( null, new Uint16Array( buffer.subarray( p, p + chunkSize ) ) );

				}

				if ( - 1 < i ) {

					/*for (i=l-1; i>=0; i--) {
						byteCode = m.charCodeAt(i);
						if (byteCode > 0x7f && byteCode <= 0x7ff) byteLen++;
						else if (byteCode > 0x7ff && byteCode <= 0xffff) byteLen += 2;
						if (byteCode >= 0xDC00 && byteCode <= 0xDFFF) i--; //trail surrogate
					}*/
					if ( false !== consume ) buffer.pos += len + i + 1;
					return s + chunk.slice( 0, i );

				}
				return false;

			},

			/* minimal header reading.  modify if you want to parse more information */
			RGBE_ReadHeader = function ( buffer ) {

				var line, match,

					// regexes to parse header info fields
					magic_token_re = /^#\?(\S+)$/,
					gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
					exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
					format_re = /^\s*FORMAT=(\S+)\s*$/,
					dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,

					// RGBE format header struct
					header = {

						valid: 0, /* indicate which fields are valid */

						string: '', /* the actual header string */

						comments: '', /* comments found in header */

						programtype: 'RGBE', /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */

						format: '', /* RGBE format, default 32-bit_rle_rgbe */

						gamma: 1.0, /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */

						exposure: 1.0, /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */

						width: 0, height: 0 /* image dimensions, width/height */

					};

				if ( buffer.pos >= buffer.byteLength || ! ( line = fgets( buffer ) ) ) {

					return rgbe_error( rgbe_read_error, "no header found" );

				}
				/* if you want to require the magic token then uncomment the next line */
				if ( ! ( match = line.match( magic_token_re ) ) ) {

					return rgbe_error( rgbe_format_error, "bad initial token" );

				}
				header.valid |= RGBE_VALID_PROGRAMTYPE;
				header.programtype = match[ 1 ];
				header.string += line + "\n";

				while ( true ) {

					line = fgets( buffer );
					if ( false === line ) break;
					header.string += line + "\n";

					if ( '#' === line.charAt( 0 ) ) {

						header.comments += line + "\n";
						continue; // comment line

					}

					if ( match = line.match( gamma_re ) ) {

						header.gamma = parseFloat( match[ 1 ], 10 );

					}
					if ( match = line.match( exposure_re ) ) {

						header.exposure = parseFloat( match[ 1 ], 10 );

					}
					if ( match = line.match( format_re ) ) {

						header.valid |= RGBE_VALID_FORMAT;
						header.format = match[ 1 ];//'32-bit_rle_rgbe';

					}
					if ( match = line.match( dimensions_re ) ) {

						header.valid |= RGBE_VALID_DIMENSIONS;
						header.height = parseInt( match[ 1 ], 10 );
						header.width = parseInt( match[ 2 ], 10 );

					}

					if ( ( header.valid & RGBE_VALID_FORMAT ) && ( header.valid & RGBE_VALID_DIMENSIONS ) ) break;

				}

				if ( ! ( header.valid & RGBE_VALID_FORMAT ) ) {

					return rgbe_error( rgbe_format_error, "missing format specifier" );

				}
				if ( ! ( header.valid & RGBE_VALID_DIMENSIONS ) ) {

					return rgbe_error( rgbe_format_error, "missing image size specifier" );

				}

				return header;

			},

			RGBE_ReadPixels_RLE = function ( buffer, w, h ) {

				var data_rgba, offset, pos, count, byteValue,
					scanline_buffer, ptr, ptr_end, i, l, off, isEncodedRun,
					scanline_width = w, num_scanlines = h, rgbeStart
				;

				if (
					// run length encoding is not allowed so read flat
					( ( scanline_width < 8 ) || ( scanline_width > 0x7fff ) ) ||
					// this file is not run length encoded
					( ( 2 !== buffer[ 0 ] ) || ( 2 !== buffer[ 1 ] ) || ( buffer[ 2 ] & 0x80 ) )
				) {

					// return the flat buffer
					return new Uint8Array( buffer );

				}

				if ( scanline_width !== ( ( buffer[ 2 ] << 8 ) | buffer[ 3 ] ) ) {

					return rgbe_error( rgbe_format_error, "wrong scanline width" );

				}

				data_rgba = new Uint8Array( 4 * w * h );

				if ( ! data_rgba || ! data_rgba.length ) {

					return rgbe_error( rgbe_memory_error, "unable to allocate buffer space" );

				}

				offset = 0; pos = 0; ptr_end = 4 * scanline_width;
				rgbeStart = new Uint8Array( 4 );
				scanline_buffer = new Uint8Array( ptr_end );

				// read in each successive scanline
				while ( ( num_scanlines > 0 ) && ( pos < buffer.byteLength ) ) {

					if ( pos + 4 > buffer.byteLength ) {

						return rgbe_error( rgbe_read_error );

					}

					rgbeStart[ 0 ] = buffer[ pos ++ ];
					rgbeStart[ 1 ] = buffer[ pos ++ ];
					rgbeStart[ 2 ] = buffer[ pos ++ ];
					rgbeStart[ 3 ] = buffer[ pos ++ ];

					if ( ( 2 != rgbeStart[ 0 ] ) || ( 2 != rgbeStart[ 1 ] ) || ( ( ( rgbeStart[ 2 ] << 8 ) | rgbeStart[ 3 ] ) != scanline_width ) ) {

						return rgbe_error( rgbe_format_error, "bad rgbe scanline format" );

					}

					// read each of the four channels for the scanline into the buffer
					// first red, then green, then blue, then exponent
					ptr = 0;
					while ( ( ptr < ptr_end ) && ( pos < buffer.byteLength ) ) {

						count = buffer[ pos ++ ];
						isEncodedRun = count > 128;
						if ( isEncodedRun ) count -= 128;

						if ( ( 0 === count ) || ( ptr + count > ptr_end ) ) {

							return rgbe_error( rgbe_format_error, "bad scanline data" );

						}

						if ( isEncodedRun ) {

							// a (encoded) run of the same value
							byteValue = buffer[ pos ++ ];
							for ( i = 0; i < count; i ++ ) {

								scanline_buffer[ ptr ++ ] = byteValue;

							}
							//ptr += count;

						} else {

							// a literal-run
							scanline_buffer.set( buffer.subarray( pos, pos + count ), ptr );
							ptr += count; pos += count;

						}

					}


					// now convert data from buffer into rgba
					// first red, then green, then blue, then exponent (alpha)
					l = scanline_width; //scanline_buffer.byteLength;
					for ( i = 0; i < l; i ++ ) {

						off = 0;
						data_rgba[ offset ] = scanline_buffer[ i + off ];
						off += scanline_width; //1;
						data_rgba[ offset + 1 ] = scanline_buffer[ i + off ];
						off += scanline_width; //1;
						data_rgba[ offset + 2 ] = scanline_buffer[ i + off ];
						off += scanline_width; //1;
						data_rgba[ offset + 3 ] = scanline_buffer[ i + off ];
						offset += 4;

					}

					num_scanlines --;

				}

				return data_rgba;

			};

		var RGBEByteToRGBFloat = function ( sourceArray, sourceOffset, destArray, destOffset ) {

			var e = sourceArray[ sourceOffset + 3 ];
			var scale = Math.pow( 2.0, e - 128.0 ) / 255.0;

			destArray[ destOffset + 0 ] = sourceArray[ sourceOffset + 0 ] * scale;
			destArray[ destOffset + 1 ] = sourceArray[ sourceOffset + 1 ] * scale;
			destArray[ destOffset + 2 ] = sourceArray[ sourceOffset + 2 ] * scale;

		};

		var RGBEByteToRGBHalf = ( function () {

			// Source: http://gamedev.stackexchange.com/questions/17326/conversion-of-a-number-from-single-precision-floating-point-representation-to-a/17410#17410

			var floatView = new Float32Array( 1 );
			var int32View = new Int32Array( floatView.buffer );

			/* This method is faster than the OpenEXR implementation (very often
			 * used, eg. in Ogre), with the additional benefit of rounding, inspired
			 * by James Tursa?s half-precision code. */
			function toHalf( val ) {

				floatView[ 0 ] = val;
				var x = int32View[ 0 ];

				var bits = ( x >> 16 ) & 0x8000; /* Get the sign */
				var m = ( x >> 12 ) & 0x07ff; /* Keep one extra bit for rounding */
				var e = ( x >> 23 ) & 0xff; /* Using int is faster here */

				/* If zero, or denormal, or exponent underflows too much for a denormal
				 * half, return signed zero. */
				if ( e < 103 ) return bits;

				/* If NaN, return NaN. If Inf or exponent overflow, return Inf. */
				if ( e > 142 ) {

					bits |= 0x7c00;
					/* If exponent was 0xff and one mantissa bit was set, it means NaN,
							 * not Inf, so make sure we set one mantissa bit too. */
					bits |= ( ( e == 255 ) ? 0 : 1 ) && ( x & 0x007fffff );
					return bits;

				}

				/* If exponent underflows but not too much, return a denormal */
				if ( e < 113 ) {

					m |= 0x0800;
					/* Extra rounding may overflow and set mantissa to 0 and exponent
					 * to 1, which is OK. */
					bits |= ( m >> ( 114 - e ) ) + ( ( m >> ( 113 - e ) ) & 1 );
					return bits;

				}

				bits |= ( ( e - 112 ) << 10 ) | ( m >> 1 );
				/* Extra rounding. An overflow will set mantissa to 0 and increment
				 * the exponent, which is OK. */
				bits += m & 1;
				return bits;

			}

			return function ( sourceArray, sourceOffset, destArray, destOffset ) {

				var e = sourceArray[ sourceOffset + 3 ];
				var scale = Math.pow( 2.0, e - 128.0 ) / 255.0;

				destArray[ destOffset + 0 ] = toHalf( sourceArray[ sourceOffset + 0 ] * scale );
				destArray[ destOffset + 1 ] = toHalf( sourceArray[ sourceOffset + 1 ] * scale );
				destArray[ destOffset + 2 ] = toHalf( sourceArray[ sourceOffset + 2 ] * scale );

			};

		} )();

		var byteArray = new Uint8Array( buffer );
		byteArray.pos = 0;
		var rgbe_header_info = RGBE_ReadHeader( byteArray );

		if ( RGBE_RETURN_FAILURE !== rgbe_header_info ) {

			var w = rgbe_header_info.width,
				h = rgbe_header_info.height,
				image_rgba_data = RGBE_ReadPixels_RLE( byteArray.subarray( byteArray.pos ), w, h );

			if ( RGBE_RETURN_FAILURE !== image_rgba_data ) {

				switch ( this.type ) {

					case UnsignedByteType:

						var data = image_rgba_data;
						var format = RGBEFormat; // handled as THREE.RGBAFormat in shaders
						var type = UnsignedByteType;
						break;

					case FloatType:

						var numElements = ( image_rgba_data.length / 4 ) * 3;
						var floatArray = new Float32Array( numElements );

						for ( var j = 0; j < numElements; j ++ ) {

							RGBEByteToRGBFloat( image_rgba_data, j * 4, floatArray, j * 3 );

						}

						var data = floatArray;
						var format = RGBFormat;
						var type = FloatType;
						break;

					case HalfFloatType:

						var numElements = ( image_rgba_data.length / 4 ) * 3;
						var halfArray = new Uint16Array( numElements );

						for ( var j = 0; j < numElements; j ++ ) {

							RGBEByteToRGBHalf( image_rgba_data, j * 4, halfArray, j * 3 );

						}

						var data = halfArray;
						var format = RGBFormat;
						var type = HalfFloatType;
						break;

					default:

						console.error( 'THREE.RGBELoader: unsupported type: ', this.type );
						break;

				}

				return {
					width: w, height: h,
					data: data,
					header: rgbe_header_info.string,
					gamma: rgbe_header_info.gamma,
					exposure: rgbe_header_info.exposure,
					format: format,
					type: type
				};

			}

		}

		return null;

	},

	setDataType: function ( value ) {

		this.type = value;
		return this;

	},

	load: function ( url, onLoad, onProgress, onError ) {

		function onLoadCallback( texture, texData ) {

			switch ( texture.type ) {

				case UnsignedByteType:

					texture.encoding = RGBEEncoding;
					texture.minFilter = NearestFilter;
					texture.magFilter = NearestFilter;
					texture.generateMipmaps = false;
					texture.flipY = true;
					break;

				case FloatType:

					texture.encoding = LinearEncoding;
					texture.minFilter = LinearFilter;
					texture.magFilter = LinearFilter;
					texture.generateMipmaps = false;
					texture.flipY = true;
					break;

				case HalfFloatType:

					texture.encoding = LinearEncoding;
					texture.minFilter = LinearFilter;
					texture.magFilter = LinearFilter;
					texture.generateMipmaps = false;
					texture.flipY = true;
					break;

			}

			if ( onLoad ) onLoad( texture, texData );

		}

		return DataTextureLoader.prototype.load.call( this, url, onLoadCallback, onProgress, onError );

	}

} );

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class EnvironmentScene extends Scene {
    constructor() {
        super();
        this.position.y = -3.5;
        const geometry = new BoxBufferGeometry();
        geometry.deleteAttribute('uv');
        const roomMaterial = new MeshStandardMaterial({ metalness: 0, side: BackSide });
        const boxMaterial = new MeshStandardMaterial({ metalness: 0 });
        const mainLight = new PointLight(0xffffff, 500.0, 28, 2);
        mainLight.position.set(0.418, 16.199, 0.300);
        this.add(mainLight);
        const room = new Mesh(geometry, roomMaterial);
        room.position.set(-0.757, 13.219, 0.717);
        room.scale.set(31.713, 28.305, 28.591);
        this.add(room);
        const box1 = new Mesh(geometry, boxMaterial);
        box1.position.set(-10.906, 2.009, 1.846);
        box1.rotation.set(0, -0.195, 0);
        box1.scale.set(2.328, 7.905, 4.651);
        this.add(box1);
        const box2 = new Mesh(geometry, boxMaterial);
        box2.position.set(-5.607, -0.754, -0.758);
        box2.rotation.set(0, 0.994, 0);
        box2.scale.set(1.970, 1.534, 3.955);
        this.add(box2);
        const box3 = new Mesh(geometry, boxMaterial);
        box3.position.set(6.167, 0.857, 7.803);
        box3.rotation.set(0, 0.561, 0);
        box3.scale.set(3.927, 6.285, 3.687);
        this.add(box3);
        const box4 = new Mesh(geometry, boxMaterial);
        box4.position.set(-2.017, 0.018, 6.124);
        box4.rotation.set(0, 0.333, 0);
        box4.scale.set(2.002, 4.566, 2.064);
        this.add(box4);
        const box5 = new Mesh(geometry, boxMaterial);
        box5.position.set(2.291, -0.756, -2.621);
        box5.rotation.set(0, -0.286, 0);
        box5.scale.set(1.546, 1.552, 1.496);
        this.add(box5);
        const box6 = new Mesh(geometry, boxMaterial);
        box6.position.set(-2.193, -0.369, -5.547);
        box6.rotation.set(0, 0.516, 0);
        box6.scale.set(3.875, 3.487, 2.986);
        this.add(box6);
        // -x right
        const light1 = new Mesh(geometry, this.createAreaLightMaterial(50));
        light1.position.set(-16.116, 14.37, 8.208);
        light1.scale.set(0.1, 2.428, 2.739);
        this.add(light1);
        // -x left
        const light2 = new Mesh(geometry, this.createAreaLightMaterial(50));
        light2.position.set(-16.109, 18.021, -8.207);
        light2.scale.set(0.1, 2.425, 2.751);
        this.add(light2);
        // +x
        const light3 = new Mesh(geometry, this.createAreaLightMaterial(17));
        light3.position.set(14.904, 12.198, -1.832);
        light3.scale.set(0.15, 4.265, 6.331);
        this.add(light3);
        // +z
        const light4 = new Mesh(geometry, this.createAreaLightMaterial(43));
        light4.position.set(-0.462, 8.89, 14.520);
        light4.scale.set(4.38, 5.441, 0.088);
        this.add(light4);
        // -z
        const light5 = new Mesh(geometry, this.createAreaLightMaterial(20));
        light5.position.set(3.235, 11.486, -12.541);
        light5.scale.set(2.5, 2.0, 0.1);
        this.add(light5);
        // +y
        const light6 = new Mesh(geometry, this.createAreaLightMaterial(100));
        light6.position.set(0.0, 20.0, 0.0);
        light6.scale.set(1.0, 0.1, 1.0);
        this.add(light6);
    }
    createAreaLightMaterial(intensity) {
        const material = new MeshBasicMaterial();
        material.color.setScalar(intensity);
        return material;
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$2, _b$2;
const GENERATED_SIGMA = 0.04;
// Enable three's loader cache so we don't create redundant
// Image objects to decode images fetched over the network.
Cache.enabled = true;
const HDR_FILE_RE = /\.hdr$/;
const ldrLoader = new TextureLoader();
const hdrLoader = new RGBELoader();
const $environmentMapCache = Symbol('environmentMapCache');
const $generatedEnvironmentMap = Symbol('generatedEnvironmentMap');
const $PMREMGenerator = Symbol('PMREMGenerator');
const $addMetadata = Symbol('addMetadata');
const $loadEnvironmentMapFromUrl = Symbol('loadEnvironmentMapFromUrl');
const $loadGeneratedEnvironmentMap = Symbol('loadGeneratedEnvironmentMap');
// Attach a `userData` object for arbitrary data on textures that
// originate from TextureUtils, similar to Object3D's userData,
// for help debugging, providing metadata for tests, and semantically
// describe the type of texture within the context of this application.
const userData = {
    url: null,
    // 'Equirectangular', 'CubeUV', 'PMREM'
    mapping: null,
};
class TextureUtils extends EventDispatcher {
    constructor(threeRenderer) {
        super();
        this[_a$2] = null;
        this[_b$2] = new Map();
        this[$PMREMGenerator] = new PMREMGenerator(threeRenderer);
    }
    get pmremGenerator() {
        return this[$PMREMGenerator];
    }
    async load(url, progressCallback = () => { }) {
        try {
            this[$PMREMGenerator].compileEquirectangularShader();
            const isHDR = HDR_FILE_RE.test(url);
            const loader = isHDR ? hdrLoader : ldrLoader;
            const texture = await new Promise((resolve, reject) => loader.load(url, resolve, (event) => {
                progressCallback(event.loaded / event.total * 0.9);
            }, reject));
            progressCallback(1.0);
            this[$addMetadata](texture, url, 'Equirectangular');
            if (isHDR) {
                texture.encoding = RGBEEncoding;
                texture.minFilter = NearestFilter;
                texture.magFilter = NearestFilter;
                texture.flipY = true;
            }
            else {
                texture.encoding = GammaEncoding;
            }
            return texture;
        }
        finally {
            if (progressCallback) {
                progressCallback(1);
            }
        }
    }
    async loadEquirectAsCubeUV(url, progressCallback = () => { }) {
        let equirect = null;
        try {
            equirect = await this.load(url, progressCallback);
            const cubeUV = this[$PMREMGenerator].fromEquirectangular(equirect);
            this[$addMetadata](cubeUV.texture, url, 'CubeUV');
            return cubeUV;
        }
        finally {
            if (equirect != null) {
                equirect.dispose();
            }
        }
    }
    /**
     * Returns a { skybox, environmentMap } object with the targets/textures
     * accordingly. `skybox` is a WebGLRenderCubeTarget, and `environmentMap`
     * is a Texture from a WebGLRenderCubeTarget.
     */
    async generateEnvironmentMapAndSkybox(skyboxUrl = null, environmentMapUrl = null, options = {}) {
        const { progressTracker } = options;
        const updateGenerationProgress = progressTracker != null ? progressTracker.beginActivity() : () => { };
        try {
            let skyboxLoads = Promise.resolve(null);
            let environmentMapLoads;
            // If we have a skybox URL, attempt to load it as a cubemap
            if (!!skyboxUrl) {
                skyboxLoads =
                    this[$loadEnvironmentMapFromUrl](skyboxUrl, progressTracker);
            }
            if (!!environmentMapUrl) {
                // We have an available environment map URL
                environmentMapLoads = this[$loadEnvironmentMapFromUrl](environmentMapUrl, progressTracker);
            }
            else if (!!skyboxUrl) {
                // Fallback to deriving the environment map from an available skybox
                environmentMapLoads = skyboxLoads;
            }
            else {
                // Fallback to generating the environment map
                environmentMapLoads = this[$loadGeneratedEnvironmentMap]();
            }
            let [environmentMap, skybox] = await Promise.all([environmentMapLoads, skyboxLoads]);
            this[$addMetadata](environmentMap.texture, environmentMapUrl, 'PMREM');
            if (skybox != null) {
                this[$addMetadata](skybox.texture, skyboxUrl, 'PMREM');
            }
            return { environmentMap, skybox };
        }
        finally {
            updateGenerationProgress(1.0);
        }
    }
    [(_a$2 = $generatedEnvironmentMap, _b$2 = $environmentMapCache, $addMetadata)](texture, url, mapping) {
        texture.userData = Object.assign(Object.assign({}, userData), ({
            url: url,
            mapping: mapping,
        }));
    }
    /**
     * Loads a WebGLRenderTarget from a given URL. The render target in this
     * case will be assumed to be used as an environment map.
     */
    [$loadEnvironmentMapFromUrl](url, progressTracker) {
        if (!this[$environmentMapCache].has(url)) {
            const progressCallback = progressTracker ? progressTracker.beginActivity() : () => { };
            const environmentMapLoads = this.loadEquirectAsCubeUV(url, progressCallback);
            this[$environmentMapCache].set(url, environmentMapLoads);
        }
        return this[$environmentMapCache].get(url);
    }
    /**
     * Loads a dynamically generated environment map.
     */
    [$loadGeneratedEnvironmentMap]() {
        if (this[$generatedEnvironmentMap] == null) {
            const defaultScene = new EnvironmentScene;
            this[$generatedEnvironmentMap] =
                this[$PMREMGenerator].fromScene(defaultScene, GENERATED_SIGMA);
            defaultScene.dispose();
        }
        return Promise.resolve(this[$generatedEnvironmentMap]);
    }
    async dispose() {
        const allTargetsLoad = [];
        // NOTE(cdata): We would use for-of iteration on the maps here, but
        // IE11 doesn't have the necessary iterator-returning methods. So,
        // disposal of these render targets is kind of convoluted as a result.
        this[$environmentMapCache].forEach((targetLoads) => {
            allTargetsLoad.push(targetLoads);
        });
        this[$environmentMapCache].clear();
        for (const targetLoads of allTargetsLoad) {
            try {
                const target = await targetLoads;
                target.dispose();
            }
            catch (e) {
                // Suppress errors, so that all render targets will be disposed
            }
        }
        if (this[$generatedEnvironmentMap] != null) {
            this[$generatedEnvironmentMap].dispose();
            this[$generatedEnvironmentMap] = null;
        }
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$3, _b$3;
const $arRenderer = Symbol('arRenderer');
const $onWebGLContextLost = Symbol('onWebGLContextLost');
const $webGLContextLostHandler = Symbol('webGLContextLostHandler');
const $singleton = Symbol('singleton');
/**
 * Registers canvases with Canvas2DRenderingContexts and renders them
 * all in the same WebGLRenderingContext, spitting out textures to apply
 * to the canvases. Creates a fullscreen WebGL canvas that is not added
 * to the DOM, and on each frame, renders each registered canvas on a portion
 * of the WebGL canvas, and applies the texture on the registered canvas.
 *
 * In the future, can use ImageBitmapRenderingContext instead of
 * Canvas2DRenderingContext if supported for cheaper transfering of
 * the texture.
 */
class Renderer extends EventDispatcher {
    constructor(options) {
        super();
        this.width = 0;
        this.height = 0;
        this.debugger = null;
        this.scenes = new Set();
        this[_b$3] = (event) => this[$onWebGLContextLost](event);
        const webGlOptions = { alpha: true, antialias: true };
        // Only enable certain options when Web XR capabilities are detected:
        if (IS_WEBXR_AR_CANDIDATE) {
            Object.assign(webGlOptions, { alpha: true, preserveDrawingBuffer: true });
        }
        if (HAS_OFFSCREEN_CANVAS && OFFSCREEN_CANVAS_SUPPORT_BITMAP) {
            this.canvas3D = new OffscreenCanvas(0, 0);
        }
        else {
            this.canvas3D = document.createElement('canvas');
        }
        this.canvas3D.addEventListener('webglcontextlost', this[$webGLContextLostHandler]);
        // Need to support both 'webgl' and 'experimental-webgl' (IE11).
        try {
            this.context3D = getContext(this.canvas3D, webGlOptions);
            // Patch the gl context's extension functions before passing
            // it to three.
            applyExtensionCompatibility(this.context3D);
            this.threeRenderer = new WebGLRenderer({
                canvas: this.canvas3D,
                context: this.context3D,
            });
            this.threeRenderer.autoClear = true;
            this.threeRenderer.outputEncoding = GammaEncoding;
            this.threeRenderer.gammaFactor = 2.2;
            this.threeRenderer.physicallyCorrectLights = true;
            this.threeRenderer.setPixelRatio(resolveDpr());
            this.threeRenderer.shadowMap.enabled = true;
            this.threeRenderer.shadowMap.type = PCFSoftShadowMap;
            this.threeRenderer.shadowMap.autoUpdate = false;
            this.debugger =
                options != null && !!options.debug ? new Debugger(this) : null;
            this.threeRenderer.debug = { checkShaderErrors: !!this.debugger };
            // ACESFilmicToneMapping appears to be the most "saturated",
            // and similar to Filament's gltf-viewer.
            this.threeRenderer.toneMapping = ACESFilmicToneMapping;
        }
        catch (error) {
            this.context3D = null;
            console.warn(error);
        }
        this[$arRenderer] = new ARRenderer(this);
        this.textureUtils =
            this.canRender ? new TextureUtils(this.threeRenderer) : null;
        this.setRendererSize(1, 1);
        this.lastTick = performance.now();
    }
    static get singleton() {
        return this[$singleton];
    }
    static resetSingleton() {
        this[$singleton].dispose();
        this[$singleton] = new Renderer({ debug: isDebugMode() });
    }
    get canRender() {
        return this.threeRenderer != null && this.context3D != null;
    }
    setRendererSize(width, height) {
        if (this.canRender) {
            this.threeRenderer.setSize(width, height, false);
        }
        this.width = width;
        this.height = height;
    }
    registerScene(scene) {
        this.scenes.add(scene);
        if (this.canRender && this.scenes.size > 0) {
            this.threeRenderer.setAnimationLoop((time) => this.render(time));
        }
        if (this.debugger != null) {
            this.debugger.addScene(scene);
        }
    }
    unregisterScene(scene) {
        this.scenes.delete(scene);
        if (this.canRender && this.scenes.size === 0) {
            this.threeRenderer.setAnimationLoop(null);
        }
        if (this.debugger != null) {
            this.debugger.removeScene(scene);
        }
    }
    async supportsPresentation() {
        return this.canRender && this[$arRenderer].supportsPresentation();
    }
    get presentedScene() {
        return this[$arRenderer].presentedScene;
    }
    async present(scene) {
        try {
            return await this[$arRenderer].present(scene);
        }
        catch (error) {
            await this[$arRenderer].stopPresenting();
            throw error;
        }
        finally {
            // NOTE(cdata): Setting width and height to 0 will have the effect of
            // invoking a `setSize` the next time we render in this threeRenderer
            this.width = this.height = 0;
        }
    }
    stopPresenting() {
        return this[$arRenderer].stopPresenting();
    }
    get isPresenting() {
        return this[$arRenderer] != null && this[$arRenderer].isPresenting;
    }
    render(t) {
        if (!this.canRender || this.isPresenting) {
            return;
        }
        const delta = t - this.lastTick;
        const dpr = resolveDpr();
        if (dpr !== this.threeRenderer.getPixelRatio()) {
            this.threeRenderer.setPixelRatio(dpr);
        }
        for (let scene of this.scenes) {
            const { element, width, height, context } = scene;
            element[$tick$1](t, delta);
            if (!scene.visible || !scene.isDirty || scene.paused) {
                continue;
            }
            const camera = scene.getCamera();
            if (width > this.width || height > this.height) {
                const maxWidth = Math.max(width, this.width);
                const maxHeight = Math.max(height, this.height);
                this.setRendererSize(maxWidth, maxHeight);
            }
            const { exposure, shadow } = scene;
            const exposureIsNumber = typeof exposure === 'number' && !self.isNaN(exposure);
            this.threeRenderer.toneMappingExposure =
                exposureIsNumber ? exposure : 1.0;
            const shadowNeedsUpdate = this.threeRenderer.shadowMap.needsUpdate;
            if (shadow != null) {
                this.threeRenderer.shadowMap.needsUpdate =
                    shadowNeedsUpdate || shadow.needsUpdate;
                shadow.needsUpdate = false;
            }
            // Need to set the render target in order to prevent
            // clearing the depth from a different buffer -- possibly
            // from something in
            this.threeRenderer.setRenderTarget(null);
            this.threeRenderer.setViewport(0, 0, width, height);
            this.threeRenderer.render(scene, camera);
            const widthDPR = width * dpr;
            const heightDPR = height * dpr;
            context.clearRect(0, 0, widthDPR, heightDPR);
            context.drawImage(this.threeRenderer.domElement, 0, this.canvas3D.height - heightDPR, widthDPR, heightDPR, 0, 0, widthDPR, heightDPR);
            scene.isDirty = false;
        }
        this.lastTick = t;
    }
    dispose() {
        if (this.textureUtils != null) {
            this.textureUtils.dispose();
        }
        if (this.threeRenderer != null) {
            this.threeRenderer.dispose();
        }
        this.textureUtils = null;
        this.threeRenderer = null;
        this.scenes.clear();
        this.canvas3D.removeEventListener('webglcontextlost', this[$webGLContextLostHandler]);
    }
    [(_a$3 = $singleton, _b$3 = $webGLContextLostHandler, $onWebGLContextLost)](event) {
        this.dispatchEvent({ type: 'contextlost', sourceEvent: event });
    }
}
Renderer[_a$3] = new Renderer({ debug: isDebugMode() });

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$4, _b$4;
/**
 * A helper to Promise-ify a Three.js GLTFLoader
 */
const loadWithLoader = (url, loader, progressCallback = () => { }) => {
    const onProgress = (event) => {
        progressCallback(event.loaded / event.total);
    };
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, onProgress, reject);
    });
};
const $releaseFromCache = Symbol('releaseFromCache');
const cache = new Map();
const preloaded = new Map();
const $evictionPolicy = Symbol('evictionPolicy');
let dracoDecoderLocation;
const dracoLoader = new DRACOLoader();
const $loader = Symbol('loader');
class CachingGLTFLoader {
    constructor() {
        this[_b$4] = new GLTFLoader();
        this.roughnessMipmapper = new RoughnessMipmapper(Renderer.singleton.threeRenderer);
        this[$loader].setDRACOLoader(dracoLoader);
    }
    static setDRACODecoderLocation(url) {
        dracoDecoderLocation = url;
        dracoLoader.setDecoderPath(url);
    }
    static getDRACODecoderLocation() {
        return dracoDecoderLocation;
    }
    static get cache() {
        return cache;
    }
    /** @nocollapse */
    static clearCache() {
        cache.forEach((_value, url) => {
            this.delete(url);
        });
        this[$evictionPolicy].reset();
    }
    static has(url) {
        return cache.has(url);
    }
    /** @nocollapse */
    static async delete(url) {
        if (!this.has(url)) {
            return;
        }
        const gltfLoads = cache.get(url);
        preloaded.delete(url);
        cache.delete(url);
        const gltf = await gltfLoads;
        // Dispose of the cached glTF's materials and geometries:
        gltf.scenes.forEach(scene => {
            scene.traverse(object3D => {
                if (!object3D.isMesh) {
                    return;
                }
                const mesh = object3D;
                const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                materials.forEach(material => {
                    material.dispose();
                });
                mesh.geometry.dispose();
            });
        });
    }
    /**
     * Returns true if the model that corresponds to the specified url is
     * available in our local cache.
     */
    static hasFinishedLoading(url) {
        return !!preloaded.get(url);
    }
    get [(_a$4 = $evictionPolicy, _b$4 = $loader, $evictionPolicy)]() {
        return this.constructor[$evictionPolicy];
    }
    /**
     * Preloads a glTF, populating the cache. Returns a promise that resolves
     * when the cache is populated.
     */
    async preload(url, progressCallback = () => { }) {
        if (!cache.has(url)) {
            cache.set(url, loadWithLoader(url, this[$loader], (progress) => {
                progressCallback(progress * 0.9);
            }));
        }
        await cache.get(url);
        if (progressCallback) {
            progressCallback(1.0);
        }
        preloaded.set(url, true);
    }
    /**
     * Loads a glTF from the specified url and resolves a unique clone of the
     * glTF. If the glTF has already been loaded, makes a clone of the cached
     * copy.
     */
    async load(url, progressCallback = () => { }) {
        await this.preload(url, progressCallback);
        const gltf = await cache.get(url);
        const meshesToDuplicate = [];
        if (gltf.scene != null) {
            gltf.scene.traverse((node) => {
                // Three.js seems to cull some animated models incorrectly. Since we
                // expect to view our whole scene anyway, we turn off the frustum
                // culling optimization here.
                node.frustumCulled = false;
                // Animations for objects without names target their UUID instead. When
                // objects are cloned, they get new UUIDs which the animation can't
                // find. To fix this, we assign their UUID as their name.
                if (!node.name) {
                    node.name = node.uuid;
                }
                if (!node.isMesh) {
                    return;
                }
                node.castShadow = true;
                const mesh = node;
                let transparent = false;
                const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                materials.forEach(material => {
                    if (material.isMeshStandardMaterial) {
                        if (material.transparent && material.side === DoubleSide) {
                            transparent = true;
                            material.side = FrontSide;
                        }
                        this.roughnessMipmapper.generateMipmaps(material);
                    }
                });
                if (transparent) {
                    meshesToDuplicate.push(mesh);
                }
            });
        }
        // We duplicate transparent, double-sided meshes and render the back face
        // before the front face. This creates perfect triangle sorting for all
        // convex meshes. Sorting artifacts can still appear when you can see
        // through more than two layers of a given mesh, but this can usually be
        // mitigated by the author splitting the mesh into mostly convex regions.
        // The performance cost is not too great as the same shader is reused and
        // the same number of fragments are processed; only the vertex shader is run
        // twice. @see https://threejs.org/examples/webgl_materials_physical_transparency.html
        for (const mesh of meshesToDuplicate) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            const duplicateMaterials = materials.map((material) => {
                const backMaterial = material.clone();
                backMaterial.side = BackSide;
                return backMaterial;
            });
            const duplicateMaterial = Array.isArray(mesh.material) ?
                duplicateMaterials :
                duplicateMaterials[0];
            const meshBack = new Mesh(mesh.geometry, duplicateMaterial);
            meshBack.renderOrder = -1;
            mesh.add(meshBack);
        }
        const clone = cloneGltf(gltf);
        const model = clone.scene ? clone.scene : null;
        if (model != null) {
            model.userData.animations = clone.animations; // save animations
            this[$evictionPolicy].retain(url);
            model[$releaseFromCache] = (() => {
                let released = false;
                return () => {
                    if (released) {
                        return;
                    }
                    // We manually dispose cloned materials because Three.js keeps
                    // an internal count of materials using the same program, so it's
                    // safe to dispose of them incrementally. Geometry clones are not
                    // accounted for, so they cannot be disposed of incrementally.
                    model.traverse((object3D) => {
                        if (!object3D.isMesh) {
                            return;
                        }
                        const mesh = object3D;
                        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                        materials.forEach(material => {
                            material.dispose();
                        });
                    });
                    this[$evictionPolicy].release(url);
                    released = true;
                };
            })();
        }
        return model;
    }
}
CachingGLTFLoader[_a$4] = new CacheEvictionPolicy(CachingGLTFLoader);

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$5, _b$5;
const $cancelPendingSourceChange = Symbol('cancelPendingSourceChange');
const $currentScene = Symbol('currentScene');
const DEFAULT_FOV_DEG = 45;
const $loader$1 = Symbol('loader');
/**
 * An Object3D that can swap out its underlying
 * model.
 */
class Model extends Object3D {
    /**
     * Creates a model.
     */
    constructor() {
        super();
        this[_a$5] = null;
        this[_b$5] = new CachingGLTFLoader();
        this.animations = [];
        this.animationsByName = new Map();
        this.currentAnimationAction = null;
        this.modelContainer = new Object3D();
        this.animationNames = [];
        this.boundingBox = new Box3();
        this.size = new Vector3();
        this.idealCameraDistance = 0;
        this.fieldOfViewAspect = 0;
        this.userData = { url: null };
        this.url = null;
        this.name = 'Model';
        this.modelContainer.name = 'ModelContainer';
        this.add(this.modelContainer);
        this.mixer = new AnimationMixer(this.modelContainer);
    }
    get loader() {
        return this[$loader$1];
    }
    /**
     * Returns a boolean indicating whether or not there is a
     * loaded model attached.
     */
    hasModel() {
        return !!this.modelContainer.children.length;
    }
    /**
     * Pass in a THREE.Object3D to be controlled
     * by this model.
     */
    setObject(model) {
        this.clear();
        this.modelContainer.add(model);
        this.updateFraming();
        this.dispatchEvent({ type: 'model-load' });
    }
    async setSource(url, progressCallback) {
        if (!url || url === this.url) {
            if (progressCallback) {
                progressCallback(1);
            }
            return;
        }
        // If we have pending work due to a previous source change in progress,
        // cancel it so that we do not incur a race condition:
        if (this[$cancelPendingSourceChange] != null) {
            this[$cancelPendingSourceChange]();
            this[$cancelPendingSourceChange] = null;
        }
        this.url = url;
        let scene = null;
        try {
            scene = await new Promise(async (resolve, reject) => {
                this[$cancelPendingSourceChange] = () => reject();
                try {
                    const result = await this.loader.load(url, progressCallback);
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
        }
        catch (error) {
            if (error == null) {
                return;
            }
            throw error;
        }
        this.clear();
        this[$currentScene] = scene;
        if (scene != null) {
            moveChildren(scene, this.modelContainer);
        }
        this.modelContainer.traverse(obj => {
            if (obj && obj.type === 'Mesh') {
                obj.castShadow = true;
            }
        });
        const animations = scene ? scene.userData.animations : [];
        const animationsByName = new Map();
        const animationNames = [];
        for (const animation of animations) {
            animationsByName.set(animation.name, animation);
            animationNames.push(animation.name);
        }
        this.animations = animations;
        this.animationsByName = animationsByName;
        this.animationNames = animationNames;
        this.userData.url = url;
        this.updateFraming();
        this.dispatchEvent({ type: 'model-load', url });
    }
    set animationTime(value) {
        if (this.currentAnimationAction != null) {
            this.currentAnimationAction.time = value;
        }
    }
    get animationTime() {
        if (this.currentAnimationAction != null) {
            return this.currentAnimationAction.time;
        }
        return 0;
    }
    get hasActiveAnimation() {
        return this.currentAnimationAction != null;
    }
    /**
     * Plays an animation if there are any associated with the current model.
     * Accepts an optional string name of an animation to play. If no name is
     * provided, or if no animation is found by the given name, always falls back
     * to playing the first animation.
     */
    playAnimation(name = null, crossfadeTime = 0) {
        const { animations } = this;
        if (animations == null || animations.length === 0) {
            console.warn(`Cannot play animation (model does not have any animations)`);
            return;
        }
        let animationClip = null;
        if (name != null) {
            animationClip = this.animationsByName.get(name);
        }
        if (animationClip == null) {
            animationClip = animations[0];
        }
        try {
            const { currentAnimationAction: lastAnimationAction } = this;
            this.currentAnimationAction =
                this.mixer.clipAction(animationClip, this).play();
            this.currentAnimationAction.enabled = true;
            if (lastAnimationAction != null &&
                this.currentAnimationAction !== lastAnimationAction) {
                this.currentAnimationAction.crossFadeFrom(lastAnimationAction, crossfadeTime, false);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    stopAnimation() {
        if (this.currentAnimationAction != null) {
            this.currentAnimationAction.stop();
            this.currentAnimationAction.reset();
            this.currentAnimationAction = null;
        }
        this.mixer.stopAllAction();
    }
    updateAnimation(step) {
        this.mixer.update(step);
    }
    clear() {
        this.url = null;
        this.userData = { url: null };
        // Remove all current children
        if (this[$currentScene] != null) {
            moveChildren(this.modelContainer, this[$currentScene]);
            this[$currentScene][$releaseFromCache]();
            this[$currentScene] = null;
        }
        if (this.currentAnimationAction != null) {
            this.currentAnimationAction.stop();
            this.currentAnimationAction = null;
        }
        this.mixer.stopAllAction();
        this.mixer.uncacheRoot(this);
    }
    /**
     * Calculates the idealCameraDistance and fieldOfViewAspect that allows the 3D
     * object to be framed tightly in a 2D window of any aspect ratio without
     * clipping at any camera orbit. The camera's center target point can be
     * optionally specified. If no center is specified, it defaults to the center
     * of the bounding box, which means asymmetric models will tend to be tight on
     * one side instead of both. Proper choice of center can correct this.
     */
    updateFraming(center = null) {
        this.remove(this.modelContainer);
        if (center == null) {
            this.boundingBox.setFromObject(this.modelContainer);
            this.boundingBox.getSize(this.size);
            center = this.boundingBox.getCenter(new Vector3);
        }
        const radiusSquared = (value, vertex) => {
            return Math.max(value, center.distanceToSquared(vertex));
        };
        const framedRadius = Math.sqrt(reduceVertices(this.modelContainer, radiusSquared));
        const halfFov = (DEFAULT_FOV_DEG / 2) * Math.PI / 180;
        this.idealCameraDistance = framedRadius / Math.sin(halfFov);
        const verticalFov = Math.tan(halfFov);
        const horizontalFov = (value, vertex) => {
            vertex.sub(center);
            const radiusXZ = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
            return Math.max(value, radiusXZ / (this.idealCameraDistance - Math.abs(vertex.y)));
        };
        this.fieldOfViewAspect =
            reduceVertices(this.modelContainer, horizontalFov) / verticalFov;
        this.add(this.modelContainer);
    }
}
_a$5 = $currentScene, _b$5 = $loader$1;

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Nothing within Offset of the bottom of the model casts a shadow
// (this is to avoid having a baked-in shadow plane cast its own shadow).
const OFFSET = 0.001;
const BASE_OPACITY = 0.1;
// The softness [0, 1] of the shadow is mapped to a resolution between
// 2^LOG_MAX_RESOLUTION and 2^LOG_MIN_RESOLUTION.
const LOG_MAX_RESOLUTION = 9;
const LOG_MIN_RESOLUTION = 6;
// Animated models are not in general contained in their bounding box, as this
// is calculated only for their resting pose. We create a cubic shadow volume
// for animated models sized to their largest bounding box dimesion multiplied
// by this scale factor.
const ANIMATION_SCALING = 2;
/**
 * The Shadow class creates a shadow that fits a given model and follows a
 * target. This shadow will follow the model without any updates needed so long
 * as the shadow and model are both parented to the same object (call it the
 * pivot) and this pivot is passed as the target parameter to the shadow's
 * constructor. We also must constrain the pivot to motion within the horizontal
 * plane and call the setRotation() method whenever the pivot's Y-axis rotation
 * changes. For motion outside of the horizontal plane, this.needsUpdate must be
 * set to true.
 *
 * The softness of the shadow is controlled by changing its resolution, making
 * softer shadows faster, but less precise.
 */
class Shadow extends DirectionalLight {
    constructor(model, target, softness) {
        super();
        this.model = model;
        this.shadowMaterial = new ShadowMaterial;
        this.boundingBox = new Box3;
        this.size = new Vector3;
        this.needsUpdate = false;
        // We use the light only to cast a shadow, not to light the scene.
        this.intensity = 0;
        this.castShadow = true;
        this.frustumCulled = false;
        this.floor = new Mesh(new PlaneBufferGeometry, this.shadowMaterial);
        this.floor.rotateX(-Math.PI / 2);
        this.floor.receiveShadow = true;
        this.floor.castShadow = false;
        this.floor.frustumCulled = false;
        this.add(this.floor);
        this.shadow.camera.up.set(0, 0, 1);
        this.target = target;
        this.setModel(model, softness);
    }
    setModel(model, softness) {
        this.model = model;
        const { camera } = this.shadow;
        this.boundingBox.copy(model.boundingBox);
        this.size.copy(model.size);
        const { boundingBox, size } = this;
        if (this.model.animationNames.length > 0) {
            const maxDimension = Math.max(size.x, size.y, size.z) * ANIMATION_SCALING;
            size.y = maxDimension;
            boundingBox.expandByVector(size.subScalar(maxDimension).multiplyScalar(-0.5));
            boundingBox.max.y = boundingBox.min.y + maxDimension;
            size.set(maxDimension, maxDimension, maxDimension);
        }
        const shadowOffset = size.y * OFFSET;
        this.position.y = boundingBox.max.y + shadowOffset;
        boundingBox.getCenter(this.floor.position);
        // Floor plane is up slightly to avoid Z-fighting with baked-in shadows and
        // to stay inside the shadow camera.
        this.floor.position.y -= size.y / 2 + this.position.y - 2 * shadowOffset;
        camera.near = 0;
        camera.far = size.y;
        this.setSoftness(softness);
    }
    setSoftness(softness) {
        const resolution = Math.pow(2, LOG_MAX_RESOLUTION -
            softness * (LOG_MAX_RESOLUTION - LOG_MIN_RESOLUTION));
        this.setMapSize(resolution);
    }
    setMapSize(maxMapSize) {
        const { camera, mapSize, map } = this.shadow;
        const { boundingBox, size } = this;
        if (map != null) {
            map.dispose();
            this.shadow.map = null;
        }
        if (this.model.animationNames.length > 0) {
            maxMapSize *= ANIMATION_SCALING;
        }
        const width = Math.floor(size.x > size.z ? maxMapSize : maxMapSize * size.x / size.z);
        const height = Math.floor(size.x > size.z ? maxMapSize * size.z / size.x : maxMapSize);
        mapSize.set(width, height);
        // These pads account for the softening radius around the shadow.
        const widthPad = 2.5 * size.x / width;
        const heightPad = 2.5 * size.z / height;
        camera.left = -boundingBox.max.x - widthPad;
        camera.right = -boundingBox.min.x + widthPad;
        camera.bottom = boundingBox.min.z - heightPad;
        camera.top = boundingBox.max.z + heightPad;
        this.updateMatrixWorld();
        camera.updateProjectionMatrix();
        this.shadow.updateMatrices(this);
        this.floor.scale.set(size.x + 2 * widthPad, size.z + 2 * heightPad, 1);
        this.needsUpdate = true;
    }
    setIntensity(intensity) {
        this.shadowMaterial.opacity = intensity * BASE_OPACITY;
        if (intensity > 0) {
            this.visible = true;
            this.floor.visible = true;
        }
        else {
            this.visible = false;
            this.floor.visible = false;
        }
    }
    getIntensity() {
        return this.shadowMaterial.opacity / BASE_OPACITY;
    }
    setRotation(radiansY) {
        this.shadow.camera.up.set(Math.sin(radiansY), 0, Math.cos(radiansY));
        this.shadow.updateMatrices(this);
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$6;
const DEFAULT_TAN_FOV = Math.tan((DEFAULT_FOV_DEG / 2) * Math.PI / 180);
const $paused = Symbol('paused');
/**
 * A THREE.Scene object that takes a Model and CanvasHTMLElement and
 * constructs a framed scene based off of the canvas dimensions.
 * Provides lights and cameras to be used in a renderer.
 */
class ModelScene extends Scene {
    constructor({ canvas, element, width, height }) {
        super();
        this[_a$6] = false;
        this.aspect = 1;
        this.shadow = null;
        this.shadowIntensity = 0;
        this.shadowSoftness = 1;
        this.width = 1;
        this.height = 1;
        this.isVisible = false;
        this.isDirty = false;
        this.exposure = 1;
        this.framedFieldOfView = DEFAULT_FOV_DEG;
        // These default camera values are never used, as they are reset once the
        // model is loaded and framing is computed.
        this.camera = new PerspectiveCamera(45, 1, 0.1, 100);
        this.name = 'ModelScene';
        this.element = element;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.model = new Model();
        // These default camera values are never used, as they are reset once the
        // model is loaded and framing is computed.
        this.camera = new PerspectiveCamera(45, 1, 0.1, 100);
        this.camera.name = 'MainCamera';
        this.activeCamera = this.camera;
        this.pivot = new Object3D();
        this.pivot.name = 'Pivot';
        this.pivotCenter = new Vector3;
        this.add(this.pivot);
        this.pivot.add(this.model);
        this.setSize(width, height);
        this.model.addEventListener('model-load', (event) => this.onModelLoad(event));
    }
    get paused() {
        return this[$paused];
    }
    pause() {
        this[$paused] = true;
    }
    resume() {
        this[$paused] = false;
    }
    /**
     * Sets the model via URL.
     */
    async setModelSource(source, progressCallback) {
        try {
            await this.model.setSource(source, progressCallback);
        }
        catch (e) {
            throw new Error(`Could not set model source to '${source}': ${e.message}`);
        }
    }
    /**
     * Receives the size of the 2D canvas element to make according
     * adjustments in the scene.
     */
    setSize(width, height) {
        if (width !== this.width || height !== this.height) {
            this.width = Math.max(width, 1);
            this.height = Math.max(height, 1);
            // In practice, invocations of setSize are throttled at the element level,
            // so no need to throttle here:
            const dpr = resolveDpr();
            this.canvas.width = this.width * dpr;
            this.canvas.height = this.height * dpr;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
            this.aspect = this.width / this.height;
            this.frameModel();
            // Immediately queue a render to happen at microtask timing. This is
            // necessary because setting the width and height of the canvas has the
            // side-effect of clearing it, and also if we wait for the next rAF to
            // render again we might get hit with yet-another-resize, or worse we
            // may not actually be marked as dirty and so render will just not
            // happen. Queuing a render to happen here means we will render twice on
            // a resize frame, but it avoids most of the visual artifacts associated
            // with other potential mitigations for this problem. See discussion in
            // https://github.com/GoogleWebComponents/model-viewer/pull/619 for
            // additional considerations.
            Promise.resolve().then(() => {
                this.element[$renderer].render(performance.now());
            });
        }
    }
    /**
     * Set's the framedFieldOfView based on the aspect ratio of the window in
     * order to keep the model fully visible at any camera orientation.
     */
    frameModel() {
        const vertical = DEFAULT_TAN_FOV *
            Math.max(1, this.model.fieldOfViewAspect / this.aspect);
        this.framedFieldOfView = 2 * Math.atan(vertical) * 180 / Math.PI;
    }
    /**
     * Returns the size of the corresponding canvas element.
     */
    getSize() {
        return { width: this.width, height: this.height };
    }
    /**
     * Returns the current camera.
     */
    getCamera() {
        return this.activeCamera;
    }
    /**
     * Sets the passed in camera to be used for rendering.
     */
    setCamera(camera) {
        this.activeCamera = camera;
    }
    /**
     * Sets the rotation of the model's pivot, around its pivotCenter point.
     */
    setPivotRotation(radiansY) {
        this.pivot.rotation.y = radiansY;
        this.pivot.position.x = -this.pivotCenter.x;
        this.pivot.position.z = -this.pivotCenter.z;
        this.pivot.position.applyAxisAngle(this.pivot.up, radiansY);
        this.pivot.position.x += this.pivotCenter.x;
        this.pivot.position.z += this.pivotCenter.z;
        if (this.shadow != null) {
            this.shadow.setRotation(radiansY);
        }
    }
    /**
     * Gets the current rotation value of the pivot
     */
    getPivotRotation() {
        return this.pivot.rotation.y;
    }
    /**
     * Called when the model's contents have loaded, or changed.
     */
    onModelLoad(event) {
        this.frameModel();
        this.setShadowIntensity(this.shadowIntensity);
        if (this.shadow != null) {
            this.shadow.setModel(this.model, this.shadowSoftness);
        }
        // Uncomment if using showShadowHelper below
        // if (this.children.length > 1) {
        //   (this.children[1] as CameraHelper).update();
        // }
        this.element[$needsRender]();
        this.dispatchEvent({ type: 'model-load', url: event.url });
    }
    /**
     * Sets the shadow's intensity, lazily creating the shadow as necessary.
     */
    setShadowIntensity(shadowIntensity) {
        this.shadowIntensity = shadowIntensity;
        if (shadowIntensity > 0 && this.model.hasModel()) {
            if (this.shadow == null) {
                this.shadow = new Shadow(this.model, this.pivot, this.shadowSoftness);
                this.pivot.add(this.shadow);
                // showShadowHelper(this);
            }
            this.shadow.setIntensity(shadowIntensity);
        }
    }
    /**
     * Sets the shadow's softness by mapping a [0, 1] softness parameter to the
     * shadow's resolution. This involves reallocation, so it should not be
     * changed frequently. Softer shadows are cheaper to render.
     */
    setShadowSoftness(softness) {
        this.shadowSoftness = softness;
        if (this.shadow != null) {
            this.shadow.setSoftness(softness);
        }
    }
}
_a$6 = $paused;

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Converts a base64 string which represents a data url
 * into a Blob of the same contents.
 */
const dataUrlToBlob = async (base64DataUrl) => {
    return new Promise((resolve, reject) => {
        const sliceSize = 512;
        const typeMatch = base64DataUrl.match(/data:(.*);/);
        if (!typeMatch) {
            return reject(new Error(`${base64DataUrl} is not a valid data Url`));
        }
        const type = typeMatch[1];
        const base64 = base64DataUrl.replace(/data:image\/\w+;base64,/, '');
        const byteCharacters = atob(base64);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        resolve(new Blob(byteArrays, { type }));
    });
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$7, _b$6;
const $ongoingActivities = Symbol('ongoingActivities');
const $announceTotalProgress = Symbol('announceTotalProgress');
const $eventDelegate = Symbol('eventDelegate');
const ACTIVITY_PROGRESS_WEIGHT = 0.5;
/**
 * ProgressTracker is an event emitter that helps to track the ongoing progress
 * of many simultaneous actions.
 *
 * ProgressTracker reports progress activity in the form of a progress event.
 * The event.detail.totalProgress value indicates the elapsed progress of all
 * activities being tracked by the ProgressTracker.
 *
 * The value of totalProgress is a number that progresses from 0 to 1. The
 * ProgressTracker allows for the lazy accumulation of tracked actions, so the
 * total progress represents a abstract, non-absolute progress towards the
 * completion of all currently tracked events.
 *
 * When all currently tracked activities are finished, the ProgressTracker
 * emits one final progress event and then resets the list of its currently
 * tracked activities. This means that from an observer's perspective,
 * ongoing activities will accumulate and collectively contribute to the notion
 * of total progress until all currently tracked ongoing activities have
 * completed.
 */
class ProgressTracker {
    constructor() {
        // NOTE(cdata): This eventDelegate hack is a quick trick to let us get the
        // EventTarget interface without implementing or requiring a full polyfill. We
        // should remove this once EventTarget is inheritable everywhere.
        this[_a$7] = document.createDocumentFragment();
        // NOTE(cdata): We declare each of these methods independently here so that we
        // can inherit the correct types from EventTarget's interface. Maybe there is
        // a better way to do this dynamically so that we don't repeat ourselves?
        this.addEventListener = (...args) => this[$eventDelegate].addEventListener(...args);
        this.removeEventListener = (...args) => this[$eventDelegate].removeEventListener(...args);
        this.dispatchEvent = (...args) => this[$eventDelegate].dispatchEvent(...args);
        this[_b$6] = new Set();
    }
    /**
     * The total number of activities currently being tracked.
     */
    get ongoingActivityCount() {
        return this[$ongoingActivities].size;
    }
    /**
     * Registers a new activity to be tracked by the progress tracker. The method
     * returns a special callback that should be invoked whenever new progress is
     * ready to be reported. The progress should be reported as a value between 0
     * and 1, where 0 would represent the beginning of the action and 1 would
     * represent its completion.
     *
     * There is no built-in notion of a time-out for ongoing activities, so once
     * an ongoing activity is begun, it is up to the consumer of this API to
     * update the progress until that activity is no longer ongoing.
     *
     * Progress is only allowed to move forward for any given activity. If a lower
     * progress is reported than the previously reported progress, it will be
     * ignored.
     */
    beginActivity() {
        const activity = { progress: 0 };
        this[$ongoingActivities].add(activity);
        if (this.ongoingActivityCount === 1) {
            // Announce the first progress event (which should always be 0 / 1
            // total progress):
            this[$announceTotalProgress]();
        }
        return (progress) => {
            let nextProgress;
            nextProgress = Math.max(clamp(progress, 0, 1), activity.progress);
            if (nextProgress !== activity.progress) {
                activity.progress = nextProgress;
                this[$announceTotalProgress]();
            }
            return activity.progress;
        };
    }
    [(_a$7 = $eventDelegate, _b$6 = $ongoingActivities, $announceTotalProgress)]() {
        let totalProgress = 0;
        let statusCount = 0;
        let completedActivities = 0;
        for (const activity of this[$ongoingActivities]) {
            const { progress } = activity;
            const compoundWeight = ACTIVITY_PROGRESS_WEIGHT / Math.pow(2, statusCount++);
            totalProgress += progress * compoundWeight;
            if (progress === 1.0) {
                completedActivities++;
            }
        }
        if (completedActivities === this.ongoingActivityCount) {
            totalProgress = 1.0;
            this[$ongoingActivities].clear();
        }
        this.dispatchEvent(new CustomEvent('progress', { detail: { totalProgress } }));
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a$8, _b$7, _c$1, _d$1, _e$1, _f$1, _g$1, _h, _j, _k;
const CLEAR_MODEL_TIMEOUT_MS = 1000;
const FALLBACK_SIZE_UPDATE_THRESHOLD_MS = 50;
const UNSIZED_MEDIA_WIDTH = 300;
const UNSIZED_MEDIA_HEIGHT = 150;
const $updateSize = Symbol('updateSize');
const $loaded = Symbol('loaded');
const $template = Symbol('template');
const $fallbackResizeHandler = Symbol('fallbackResizeHandler');
const $defaultAriaLabel = Symbol('defaultAriaLabel');
const $resizeObserver = Symbol('resizeObserver');
const $intersectionObserver = Symbol('intersectionObserver');
const $lastDpr = Symbol('lastDpr');
const $clearModelTimeout = Symbol('clearModelTimeout');
const $onContextLost = Symbol('onContextLost');
const $contextLostHandler = Symbol('contextLostHandler');
const $isInRenderTree = Symbol('isInRenderTree');
const $ariaLabel = Symbol('ariaLabel');
const $loadedTime = Symbol('loadedTime');
const $updateSource = Symbol('updateSource');
const $markLoaded = Symbol('markLoaded');
const $container = Symbol('container');
const $canvas = Symbol('canvas');
const $scene = Symbol('scene');
const $needsRender = Symbol('needsRender');
const $tick$1 = Symbol('tick');
const $onModelLoad = Symbol('onModelLoad');
const $onResize = Symbol('onResize');
const $renderer = Symbol('renderer');
const $progressTracker = Symbol('progressTracker');
const $getLoaded = Symbol('getLoaded');
const $getModelIsVisible = Symbol('getModelIsVisible');
const toVector3D = (v) => {
    return {
        x: v.x,
        y: v.y,
        z: v.z,
        toString() {
            return `${this.x}m ${this.y}m ${this.z}m`;
        }
    };
};
/**
 * Definition for a basic <model-viewer> element.
 */
class ModelViewerElementBase extends UpdatingElement {
    /**
     * Creates a new ModelViewerElement.
     */
    constructor() {
        super();
        this.alt = null;
        this.src = null;
        this[_a$8] = false;
        this[_b$7] = false;
        this[_c$1] = 0;
        this[_d$1] = resolveDpr();
        this[_e$1] = null;
        this[_f$1] = debounce(() => {
            const boundingRect = this.getBoundingClientRect();
            this[$updateSize](boundingRect);
        }, FALLBACK_SIZE_UPDATE_THRESHOLD_MS);
        this[_g$1] = null;
        this[_h] = null;
        this[_j] = new ProgressTracker();
        this[_k] = (event) => this[$onContextLost](event);
        // NOTE(cdata): It is *very important* to access this template first so that
        // the ShadyCSS template preparation steps happen before element styling in
        // IE11:
        const template = this.constructor.template;
        if (window.ShadyCSS) {
            window.ShadyCSS.styleElement(this, {});
        }
        // NOTE(cdata): The canonical ShadyCSS examples suggest that the Shadow Root
        // should be created after the invocation of ShadyCSS.styleElement
        this.attachShadow({ mode: 'open' });
        const shadowRoot = this.shadowRoot;
        shadowRoot.appendChild(template.content.cloneNode(true));
        this[$container] = shadowRoot.querySelector('.container');
        this[$canvas] = shadowRoot.querySelector('canvas');
        this[$defaultAriaLabel] = this[$canvas].getAttribute('aria-label');
        // Because of potential race conditions related to invoking the constructor
        // we only use the bounding rect to set the initial size if the element is
        // already connected to the document:
        let width, height;
        if (this.isConnected) {
            const rect = this.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
        }
        else {
            width = UNSIZED_MEDIA_WIDTH;
            height = UNSIZED_MEDIA_HEIGHT;
        }
        // Create the underlying ModelScene.
        this[$scene] =
            new ModelScene({ canvas: this[$canvas], element: this, width, height });
        this[$scene].addEventListener('model-load', (event) => {
            this[$markLoaded]();
            this[$onModelLoad](event);
            this.dispatchEvent(new CustomEvent('load', { detail: { url: event.url } }));
        });
        // Update initial size on microtask timing so that subclasses have a
        // chance to initialize
        Promise.resolve().then(() => {
            this[$updateSize](this.getBoundingClientRect(), true);
        });
        if (HAS_RESIZE_OBSERVER) {
            // Set up a resize observer so we can scale our canvas
            // if our <model-viewer> changes
            this[$resizeObserver] = new ResizeObserver((entries) => {
                // Don't resize anything if in AR mode; otherwise the canvas
                // scaling to fullscreen on entering AR will clobber the flat/2d
                // dimensions of the element.
                if (this[$renderer].isPresenting) {
                    return;
                }
                for (let entry of entries) {
                    if (entry.target === this) {
                        this[$updateSize](entry.contentRect);
                    }
                }
            });
        }
        if (HAS_INTERSECTION_OBSERVER) {
            const enterRenderTreeProgress = this[$progressTracker].beginActivity();
            this[$intersectionObserver] = new IntersectionObserver(entries => {
                for (let entry of entries) {
                    if (entry.target === this) {
                        const oldValue = this[$isInRenderTree];
                        this[$isInRenderTree] = this[$scene].visible = entry.isIntersecting;
                        this.requestUpdate($isInRenderTree, oldValue);
                        if (this[$isInRenderTree]) {
                            // Wait a microtask to give other properties a chance to respond
                            // to the state change, then resolve progress on entering the
                            // render tree:
                            Promise.resolve().then(() => {
                                enterRenderTreeProgress(1);
                            });
                        }
                    }
                }
            }, {
                root: null,
                rootMargin: '10px',
                threshold: 0,
            });
        }
        else {
            // If there is no intersection obsever, then all models should be visible
            // at all times:
            this[$isInRenderTree] = this[$scene].visible = true;
            this.requestUpdate($isInRenderTree, false);
        }
    }
    static get is() {
        return 'model-viewer';
    }
    /** @nocollapse */
    static get template() {
        if (!this.hasOwnProperty($template)) {
            this[$template] = makeTemplate(this.is);
        }
        return this[$template];
    }
    /** @export */
    static set modelCacheSize(value) {
        CachingGLTFLoader[$evictionPolicy].evictionThreshold = value;
    }
    /** @export */
    static get modelCacheSize() {
        return CachingGLTFLoader[$evictionPolicy].evictionThreshold;
    }
    /** @export */
    get loaded() {
        return this[$getLoaded]();
    }
    get [(_a$8 = $isInRenderTree, _b$7 = $loaded, _c$1 = $loadedTime, _d$1 = $lastDpr, _e$1 = $clearModelTimeout, _f$1 = $fallbackResizeHandler, _g$1 = $resizeObserver, _h = $intersectionObserver, _j = $progressTracker, _k = $contextLostHandler, $renderer)]() {
        return Renderer.singleton;
    }
    /** @export */
    get modelIsVisible() {
        return this[$getModelIsVisible]();
    }
    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        if (HAS_RESIZE_OBSERVER) {
            this[$resizeObserver].observe(this);
        }
        else {
            self.addEventListener('resize', this[$fallbackResizeHandler]);
        }
        if (HAS_INTERSECTION_OBSERVER) {
            this[$intersectionObserver].observe(this);
        }
        this[$renderer].addEventListener('contextlost', this[$contextLostHandler]);
        this[$renderer].registerScene(this[$scene]);
        this[$scene].isDirty = true;
        if (this[$clearModelTimeout] != null) {
            self.clearTimeout(this[$clearModelTimeout]);
            this[$clearModelTimeout] = null;
            // Force an update in case the model has been evicted from our GLTF cache
            // @see https://lit-element.polymer-project.org/guide/lifecycle#requestupdate
            this.requestUpdate('src', null);
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback && super.disconnectedCallback();
        if (HAS_RESIZE_OBSERVER) {
            this[$resizeObserver].unobserve(this);
        }
        else {
            self.removeEventListener('resize', this[$fallbackResizeHandler]);
        }
        if (HAS_INTERSECTION_OBSERVER) {
            this[$intersectionObserver].unobserve(this);
        }
        this[$renderer].removeEventListener('contextlost', this[$contextLostHandler]);
        this[$renderer].unregisterScene(this[$scene]);
        this[$clearModelTimeout] = self.setTimeout(() => {
            this[$scene].model.clear();
        }, CLEAR_MODEL_TIMEOUT_MS);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        // NOTE(cdata): If a property changes from values A -> B -> A in the space
        // of a microtask, LitElement/UpdatingElement will notify of a change even
        // though the value has effectively not changed, so we need to check to make
        // sure that the value has actually changed before changing the loaded flag.
        if (changedProperties.has('src') &&
            (this.src == null || this.src !== this[$scene].model.url)) {
            this[$loaded] = false;
            this[$loadedTime] = 0;
            this[$updateSource]();
        }
        if (changedProperties.has('alt')) {
            const ariaLabel = this.alt == null ? this[$defaultAriaLabel] : this.alt;
            this[$canvas].setAttribute('aria-label', ariaLabel);
        }
    }
    /** @export */
    toDataURL(type, encoderOptions) {
        return this[$canvas].toDataURL(type, encoderOptions);
    }
    /** @export */
    async toBlob(options) {
        const mimeType = options ? options.mimeType : undefined;
        const qualityArgument = options ? options.qualityArgument : undefined;
        const idealAspect = options ? options.idealAspect : undefined;
        const { width, height, model, aspect } = this[$scene];
        if (idealAspect === true) {
            const idealWidth = model.fieldOfViewAspect > aspect ?
                width :
                Math.round(height * model.fieldOfViewAspect);
            const idealHeight = model.fieldOfViewAspect > aspect ?
                Math.round(width / model.fieldOfViewAspect) :
                height;
            this[$updateSize]({ width: idealWidth, height: idealHeight });
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
        try {
            return new Promise(async (resolve, reject) => {
                if (this[$canvas].msToBlob) {
                    // NOTE: msToBlob only returns image/png
                    // so ensure mimeType is not specified (defaults to image/png)
                    // or is image/png, otherwise fallback to using toDataURL on IE.
                    if (!mimeType || mimeType === 'image/png') {
                        return resolve(this[$canvas].msToBlob());
                    }
                }
                if (!this[$canvas].toBlob) {
                    return resolve(await dataUrlToBlob(this[$canvas].toDataURL(mimeType, qualityArgument)));
                }
                this[$canvas].toBlob((blob) => {
                    if (!blob) {
                        return reject(new Error('Unable to retrieve canvas blob'));
                    }
                    resolve(blob);
                }, mimeType, qualityArgument);
            });
        }
        finally {
            this[$updateSize]({ width, height });
        }
    }
    get [$ariaLabel]() {
        return (this.alt == null || this.alt === 'null') ? this[$defaultAriaLabel] :
            this.alt;
    }
    // NOTE(cdata): Although this may seem extremely redundant, it is required in
    // order to support overloading when TypeScript is compiled to ES5
    // @see https://github.com/Polymer/lit-element/pull/745
    // @see https://github.com/microsoft/TypeScript/issues/338
    [$getLoaded]() {
        return this[$loaded];
    }
    // @see [$getLoaded]
    [$getModelIsVisible]() {
        return true;
    }
    /**
     * Called on initialization and when the resize observer fires.
     */
    [$updateSize]({ width, height }, forceApply = false) {
        const { width: prevWidth, height: prevHeight } = this[$scene].getSize();
        // Round off the pixel size
        const intWidth = parseInt(width, 10);
        const intHeight = parseInt(height, 10);
        this[$container].style.width = `${width}px`;
        this[$container].style.height = `${height}px`;
        if (forceApply || (prevWidth !== intWidth || prevHeight !== intHeight)) {
            this[$onResize]({ width: intWidth, height: intHeight });
        }
    }
    [$tick$1](_time, _delta) {
        const dpr = resolveDpr();
        // There is no standard way to detect when DPR changes on account of zoom.
        // Here we keep a local copy of DPR updated, and when it changes we invoke
        // the fallback resize handler. It might be better to invoke the resize
        // handler directly in this case, but the fallback is debounced which will
        // save us from doing too much work when DPR and window size changes at the
        // same time.
        if (dpr !== this[$lastDpr]) {
            this[$lastDpr] = dpr;
            this[$fallbackResizeHandler]();
        }
    }
    [$markLoaded]() {
        if (this[$loaded]) {
            return;
        }
        this[$loaded] = true;
        this[$loadedTime] = performance.now();
        // Asynchronously invoke `update`:
        this.requestUpdate();
    }
    [$needsRender]() {
        this[$scene].isDirty = true;
    }
    [$onModelLoad](_event) {
        this[$needsRender]();
    }
    [$onResize](e) {
        this[$scene].setSize(e.width, e.height);
        this[$needsRender]();
    }
    [$onContextLost](event) {
        this.dispatchEvent(new CustomEvent('error', { detail: { type: 'webglcontextlost', sourceError: event.sourceEvent } }));
    }
    /**
     * Parses the element for an appropriate source URL and
     * sets the views to use the new model based off of the `preload`
     * attribute.
     */
    async [$updateSource]() {
        const updateSourceProgress = this[$progressTracker].beginActivity();
        const source = this.src;
        try {
            this[$canvas].classList.add('show');
            await this[$scene].setModelSource(source, (progress) => updateSourceProgress(progress * 0.9));
        }
        catch (error) {
            this[$canvas].classList.remove('show');
            this.dispatchEvent(new CustomEvent('error', { detail: error }));
        }
        finally {
            updateSourceProgress(1.0);
        }
    }
}
__decorate([
    property({ type: String })
], ModelViewerElementBase.prototype, "alt", void 0);
__decorate([
    property({ converter: { fromAttribute: deserializeUrl } })
], ModelViewerElementBase.prototype, "src", void 0);

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const MILLISECONDS_PER_SECOND = 1000.0;
const $changeAnimation = Symbol('changeAnimation');
const $paused$1 = Symbol('paused');
const AnimationMixin = (ModelViewerElement) => {
    var _a;
    class AnimationModelViewerElement extends ModelViewerElement {
        constructor() {
            super(...arguments);
            this.autoplay = false;
            this.animationName = undefined;
            this.animationCrossfadeDuration = 300;
            this[_a] = true;
        }
        /**
         * Returns an array
         */
        get availableAnimations() {
            if (this.loaded) {
                return this[$scene].model.animationNames;
            }
            return [];
        }
        get paused() {
            return this[$paused$1];
        }
        get currentTime() {
            return this[$scene].model.animationTime;
        }
        set currentTime(value) {
            this[$scene].model.animationTime = value;
        }
        pause() {
            if (this[$paused$1]) {
                return;
            }
            this[$paused$1] = true;
            this[$renderer].threeRenderer.shadowMap.autoUpdate = false;
            this.dispatchEvent(new CustomEvent('pause'));
        }
        play() {
            if (this[$paused$1] && this.availableAnimations.length > 0) {
                this[$paused$1] = false;
                this[$renderer].threeRenderer.shadowMap.autoUpdate = true;
                if (!this[$scene].model.hasActiveAnimation) {
                    this[$changeAnimation]();
                }
                this.dispatchEvent(new CustomEvent('play'));
            }
        }
        [(_a = $paused$1, $onModelLoad)]() {
            this[$paused$1] = true;
            if (this.autoplay) {
                this[$changeAnimation]();
                this.play();
            }
        }
        [$tick$1](_time, delta) {
            super[$tick$1](_time, delta);
            if (this[$paused$1]) {
                return;
            }
            const { model } = this[$scene];
            model.updateAnimation(delta / MILLISECONDS_PER_SECOND);
            this[$needsRender]();
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('autoplay') && this.autoplay) {
                this.play();
            }
            if (changedProperties.has('animationName')) {
                this[$changeAnimation]();
            }
        }
        async [$updateSource]() {
            // If we are loading a new model, we need to stop the animation of
            // the current one (if any is playing). Otherwise, we might lose
            // the reference to the scene root and running actions start to
            // throw exceptions and/or behave in unexpected ways:
            this[$scene].model.stopAnimation();
            return super[$updateSource]();
        }
        [$changeAnimation]() {
            const { model } = this[$scene];
            model.playAnimation(this.animationName, this.animationCrossfadeDuration / MILLISECONDS_PER_SECOND);
            // If we are currently paused, we need to force a render so that
            // the model updates to the first frame of the new animation
            if (this[$paused$1]) {
                model.updateAnimation(0);
                this[$needsRender]();
            }
        }
    }
    __decorate$1([
        property({ type: Boolean })
    ], AnimationModelViewerElement.prototype, "autoplay", void 0);
    __decorate$1([
        property({ type: String, attribute: 'animation-name' })
    ], AnimationModelViewerElement.prototype, "animationName", void 0);
    __decorate$1([
        property({ type: Number, attribute: 'animation-crossfade-duration' })
    ], AnimationModelViewerElement.prototype, "animationCrossfadeDuration", void 0);
    return AnimationModelViewerElement;
};

/**
 * @author mrdoob / http://mrdoob.com/
 */

var CSS2DObject = function ( element ) {

	Object3D.call( this );

	this.element = element;
	this.element.style.position = 'absolute';

	this.addEventListener( 'removed', function () {

		this.traverse( function ( object ) {

			if ( object.element instanceof Element && object.element.parentNode !== null ) {

				object.element.parentNode.removeChild( object.element );

			}

		} );

	} );

};

CSS2DObject.prototype = Object.create( Object3D.prototype );
CSS2DObject.prototype.constructor = CSS2DObject;

//

var CSS2DRenderer = function () {

	var _this = this;

	var _width, _height;
	var _widthHalf, _heightHalf;

	var vector = new Vector3();
	var viewMatrix = new Matrix4();
	var viewProjectionMatrix = new Matrix4();

	var cache = {
		objects: new WeakMap()
	};

	var domElement = document.createElement( 'div' );
	domElement.style.overflow = 'hidden';

	this.domElement = domElement;

	this.getSize = function () {

		return {
			width: _width,
			height: _height
		};

	};

	this.setSize = function ( width, height ) {

		_width = width;
		_height = height;

		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

	};

	var renderObject = function ( object, scene, camera ) {

		if ( object instanceof CSS2DObject ) {

			object.onBeforeRender( _this, scene, camera );

			vector.setFromMatrixPosition( object.matrixWorld );
			vector.applyMatrix4( viewProjectionMatrix );

			var element = object.element;
			var style = 'translate(-50%,-50%) translate(' + ( vector.x * _widthHalf + _widthHalf ) + 'px,' + ( - vector.y * _heightHalf + _heightHalf ) + 'px)';

			element.style.WebkitTransform = style;
			element.style.MozTransform = style;
			element.style.oTransform = style;
			element.style.transform = style;

			element.style.display = ( object.visible && vector.z >= - 1 && vector.z <= 1 ) ? '' : 'none';

			var objectData = {
				distanceToCameraSquared: getDistanceToSquared( camera, object )
			};

			cache.objects.set( object, objectData );

			if ( element.parentNode !== domElement ) {

				domElement.appendChild( element );

			}

			object.onAfterRender( _this, scene, camera );

		}

		for ( var i = 0, l = object.children.length; i < l; i ++ ) {

			renderObject( object.children[ i ], scene, camera );

		}

	};

	var getDistanceToSquared = function () {

		var a = new Vector3();
		var b = new Vector3();

		return function ( object1, object2 ) {

			a.setFromMatrixPosition( object1.matrixWorld );
			b.setFromMatrixPosition( object2.matrixWorld );

			return a.distanceToSquared( b );

		};

	}();

	var filterAndFlatten = function ( scene ) {

		var result = [];

		scene.traverse( function ( object ) {

			if ( object instanceof CSS2DObject ) result.push( object );

		} );

		return result;

	};

	var zOrder = function ( scene ) {

		var sorted = filterAndFlatten( scene ).sort( function ( a, b ) {

			var distanceA = cache.objects.get( a ).distanceToCameraSquared;
			var distanceB = cache.objects.get( b ).distanceToCameraSquared;

			return distanceA - distanceB;

		} );

		var zMax = sorted.length;

		for ( var i = 0, l = sorted.length; i < l; i ++ ) {

			sorted[ i ].element.style.zIndex = zMax - i;

		}

	};

	this.render = function ( scene, camera ) {

		if ( scene.autoUpdate === true ) scene.updateMatrixWorld();
		if ( camera.parent === null ) camera.updateMatrixWorld();

		viewMatrix.copy( camera.matrixWorldInverse );
		viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, viewMatrix );

		renderObject( scene, scene, camera );
		zOrder( scene );

	};

};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const numberNode = (value, unit) => ({ type: 'number', number: value, unit });
/**
 * Given a string representing a comma-separated set of CSS-like expressions,
 * parses and returns an array of ASTs that correspond to those expressions.
 *
 * Currently supported syntax includes:
 *
 *  - functions (top-level and nested)
 *  - calc() arithmetic operators
 *  - numbers with units
 *  - hexidecimal-encoded colors in 3, 6 or 8 digit form
 *  - idents
 *
 * All syntax is intended to match the parsing rules and semantics of the actual
 * CSS spec as closely as possible.
 *
 * @see https://www.w3.org/TR/CSS2/
 * @see https://www.w3.org/TR/css-values-3/
 */
const parseExpressions = (() => {
    const cache = {};
    const MAX_PARSE_ITERATIONS = 1000; // Arbitrarily large
    return (inputString) => {
        const cacheKey = inputString;
        if (cacheKey in cache) {
            return cache[cacheKey];
        }
        const expressions = [];
        let parseIterations = 0;
        while (inputString) {
            if (++parseIterations > MAX_PARSE_ITERATIONS) {
                // Avoid a potentially infinite loop due to typos:
                inputString = '';
                break;
            }
            const expressionParseResult = parseExpression(inputString);
            const expression = expressionParseResult.nodes[0];
            if (expression == null || expression.terms.length === 0) {
                break;
            }
            expressions.push(expression);
            inputString = expressionParseResult.remainingInput;
        }
        return cache[cacheKey] = expressions;
    };
})();
/**
 * Parse a single expression. For the purposes of our supported syntax, an
 * expression is the set of semantically meaningful terms that appear before the
 * next comma, or between the parens of a function invokation.
 */
const parseExpression = (() => {
    const IS_IDENT_RE = /^(\-\-|[a-z\u0240-\uffff])/i;
    const IS_OPERATOR_RE = /^([\*\+\/]|[\-]\s)/i;
    const IS_EXPRESSION_END_RE = /^[\),]/;
    const FUNCTION_ARGUMENTS_FIRST_TOKEN = '(';
    const HEX_FIRST_TOKEN = '#';
    return (inputString) => {
        const terms = [];
        while (inputString.length) {
            inputString = inputString.trim();
            if (IS_EXPRESSION_END_RE.test(inputString)) {
                break;
            }
            else if (inputString[0] === FUNCTION_ARGUMENTS_FIRST_TOKEN) {
                const { nodes, remainingInput } = parseFunctionArguments(inputString);
                inputString = remainingInput;
                terms.push({
                    type: 'function',
                    name: { type: 'ident', value: 'calc' },
                    arguments: nodes
                });
            }
            else if (IS_IDENT_RE.test(inputString)) {
                const identParseResult = parseIdent(inputString);
                const identNode = identParseResult.nodes[0];
                inputString = identParseResult.remainingInput;
                if (inputString[0] === FUNCTION_ARGUMENTS_FIRST_TOKEN) {
                    const { nodes, remainingInput } = parseFunctionArguments(inputString);
                    terms.push({ type: 'function', name: identNode, arguments: nodes });
                    inputString = remainingInput;
                }
                else {
                    terms.push(identNode);
                }
            }
            else if (IS_OPERATOR_RE.test(inputString)) {
                // Operators are always a single character, so just pluck them out:
                terms.push({ type: 'operator', value: inputString[0] });
                inputString = inputString.slice(1);
            }
            else {
                const { nodes, remainingInput } = inputString[0] === HEX_FIRST_TOKEN ?
                    parseHex(inputString) :
                    parseNumber(inputString);
                // The remaining string may not have had any meaningful content. Exit
                // early if this is the case:
                if (nodes.length === 0) {
                    break;
                }
                terms.push(nodes[0]);
                inputString = remainingInput;
            }
        }
        return { nodes: [{ type: 'expression', terms }], remainingInput: inputString };
    };
})();
/**
 * An ident is something like a function name or the keyword "auto".
 */
const parseIdent = (() => {
    const NOT_IDENT_RE = /[^a-z^0-9^_^\-^\u0240-\uffff]/i;
    return (inputString) => {
        const match = inputString.match(NOT_IDENT_RE);
        const ident = match == null ? inputString : inputString.substr(0, match.index);
        const remainingInput = match == null ? '' : inputString.substr(match.index);
        return { nodes: [{ type: 'ident', value: ident }], remainingInput };
    };
})();
/**
 * Parses a number. A number value can be expressed with an integer or
 * non-integer syntax, and usually includes a unit (but does not strictly
 * require one for our purposes).
 */
const parseNumber = (() => {
    const NOT_VALUE_RE = /[^0-9\.\-]|$/;
    const UNIT_RE = /^[a-z%]+/i;
    const ALLOWED_UNITS = /^(m|mm|cm|rad|deg|[%])$/;
    return (inputString) => {
        const notValueMatch = inputString.match(NOT_VALUE_RE);
        const value = notValueMatch == null ?
            inputString :
            inputString.substr(0, notValueMatch.index);
        inputString = notValueMatch == null ?
            inputString :
            inputString.slice(notValueMatch.index);
        const unitMatch = inputString.match(UNIT_RE);
        let unit = unitMatch != null && unitMatch[0] !== '' ? unitMatch[0] : null;
        const remainingInput = unitMatch == null ? inputString : inputString.slice(unit.length);
        if (unit != null && !ALLOWED_UNITS.test(unit)) {
            unit = null;
        }
        return {
            nodes: [{
                    type: 'number',
                    number: parseFloat(value) || 0,
                    unit: unit
                }],
            remainingInput
        };
    };
})();
/**
 * Parses a hexidecimal-encoded color in 3, 6 or 8 digit form.
 */
const parseHex = (() => {
    // TODO(cdata): right now we don't actually enforce the number of digits
    const HEX_RE = /^[a-f0-9]*/i;
    return (inputString) => {
        inputString = inputString.slice(1).trim();
        const hexMatch = inputString.match(HEX_RE);
        const nodes = hexMatch == null ? [] : [{ type: 'hex', value: hexMatch[0] }];
        return {
            nodes,
            remainingInput: hexMatch == null ? inputString :
                inputString.slice(hexMatch[0].length)
        };
    };
})();
/**
 * Parses arguments passed to a function invokation (e.g., the expressions
 * within a matched set of parens).
 */
const parseFunctionArguments = (inputString) => {
    const expressionNodes = [];
    // Consume the opening paren
    inputString = inputString.slice(1).trim();
    while (inputString.length) {
        const expressionParseResult = parseExpression(inputString);
        expressionNodes.push(expressionParseResult.nodes[0]);
        inputString = expressionParseResult.remainingInput.trim();
        if (inputString[0] === ',') {
            inputString = inputString.slice(1).trim();
        }
        else if (inputString[0] === ')') {
            // Consume the closing paren and stop parsing
            inputString = inputString.slice(1);
            break;
        }
    }
    return { nodes: expressionNodes, remainingInput: inputString };
};
const $visitedTypes = Symbol('visitedTypes');
/**
 * An ASTWalker walks an array of ASTs such as the type produced by
 * parseExpressions and invokes a callback for a configured set of nodes that
 * the user wishes to "visit" during the walk.
 */
class ASTWalker {
    constructor(visitedTypes) {
        this[$visitedTypes] = visitedTypes;
    }
    /**
     * Walk the given set of ASTs, and invoke the provided callback for nodes that
     * match the filtered set that the ASTWalker was constructed with.
     */
    walk(ast, callback) {
        const remaining = ast.slice();
        while (remaining.length) {
            const next = remaining.shift();
            if (this[$visitedTypes].indexOf(next.type) > -1) {
                callback(next);
            }
            switch (next.type) {
                case 'expression':
                    remaining.unshift(...next.terms);
                    break;
                case 'function':
                    remaining.unshift(next.name, ...next.arguments);
                    break;
            }
        }
    }
}
const ZERO = Object.freeze({ type: 'number', number: 0, unit: null });

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Ensures that a given number is expressed in radians. If the number is already
 * in radians, does nothing. If the value is in degrees, converts it to radians.
 * If the value has no specified unit, the unit is assumed to be radians. If the
 * value is not in radians or degrees, the value is resolved as 0 radians.
 *
 * Also accepts a second argument that is a default value to use if the input
 * numberNode number is NaN or Infinity.
 */
const degreesToRadians = (numberNode, fallbackRadianValue = 0) => {
    let { number, unit } = numberNode;
    if (!isFinite(number)) {
        number = fallbackRadianValue;
        unit = 'rad';
    }
    else if (numberNode.unit === 'rad' || numberNode.unit == null) {
        return numberNode;
    }
    const valueIsDegrees = unit === 'deg' && number != null;
    const value = valueIsDegrees ? number : 0;
    const radians = value * Math.PI / 180;
    return { type: 'number', number: radians, unit: 'rad' };
};
/**
 * Converts a given length to meters. Currently supported input units are
 * meters, centimeters and millimeters.
 *
 * Also accepts a second argument that is a default value to use if the input
 * numberNode number is NaN or Infinity.
 */
const lengthToBaseMeters = (numberNode, fallbackMeterValue = 0) => {
    let { number, unit } = numberNode;
    if (!isFinite(number)) {
        number = fallbackMeterValue;
        unit = 'm';
    }
    else if (numberNode.unit === 'm') {
        return numberNode;
    }
    let scale;
    switch (unit) {
        default:
            scale = 1;
            break;
        case 'cm':
            scale = 1 / 100;
            break;
        case 'mm':
            scale = 1 / 1000;
            break;
    }
    const value = scale * number;
    return { type: 'number', number: value, unit: 'm' };
};
/**
 * Normalizes the unit of a given input number so that it is expressed in a
 * preferred unit. For length nodes, the return value will be expressed in
 * meters. For angle nodes, the return value will be expressed in radians.
 *
 * Also takes a fallback number that is used when the number value is not a
 * valid number or when the unit of the given number cannot be normalized.
 */
const normalizeUnit = (() => {
    const identity = (node) => node;
    const unitNormalizers = {
        'rad': identity,
        'deg': degreesToRadians,
        'm': identity,
        'mm': lengthToBaseMeters,
        'cm': lengthToBaseMeters
    };
    return (node, fallback = ZERO) => {
        let { number, unit } = node;
        if (!isFinite(number)) {
            number = fallback.number;
            unit = fallback.unit;
        }
        if (unit == null) {
            return node;
        }
        const normalize = unitNormalizers[unit];
        if (normalize == null) {
            return fallback;
        }
        return normalize(node);
    };
})();

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$9, _b$8, _c$2, _d$2;
const $slot = Symbol('slot');
const $referenceCount = Symbol('referenceCount');
const $updateVisibility = Symbol('updateVisibility');
const $visible = Symbol('visible');
const $onSlotchange = Symbol('onSlotchange');
const $slotchangeHandler = Symbol('slotchangeHandler');
/**
 * The Hotspot object is a reference-counted slot. If decrement() returns true,
 * it should be removed from the tree so it can be garbage-collected.
 */
class Hotspot extends CSS2DObject {
    constructor(config) {
        super(document.createElement('div'));
        this.normal = new Vector3(0, 1, 0);
        this[_a$9] = false;
        this[_b$8] = 1;
        this[_c$2] = document.createElement('slot');
        this[_d$2] = () => this[$onSlotchange]();
        this.element.classList.add('annotation-wrapper');
        this[$slot].name = config.name;
        this[$slot].addEventListener('slotchange', this[$slotchangeHandler]);
        this.element.appendChild(this[$slot]);
        this.updatePosition(config.position);
        this.updateNormal(config.normal);
        this.show();
    }
    /**
     * Sets the hotspot to be in the highly visible foreground state.
     */
    show() {
        if (!this[$visible]) {
            this[$visible] = true;
            this[$updateVisibility]({ notify: true });
        }
    }
    /**
     * Sets the hotspot to be in the diminished background state.
     */
    hide() {
        if (this[$visible]) {
            this[$visible] = false;
            this[$updateVisibility]({ notify: true });
        }
    }
    /**
     * Cleans up the held references of this Hotspot when it is done being used.
     */
    dispose() {
        this[$slot].removeEventListener('slotchange', this[$slotchangeHandler]);
    }
    /**
     * Call this when adding elements to the same slot to keep track.
     */
    increment() {
        this[$referenceCount]++;
    }
    /**
     * Call this when removing elements from the slot; returns true when the slot
     * is unused.
     */
    decrement() {
        if (this[$referenceCount] > 0) {
            --this[$referenceCount];
        }
        return this[$referenceCount] === 0;
    }
    /**
     * Change the position of the hotspot to the input string, in the same format
     * as the data-position attribute.
     */
    updatePosition(position) {
        if (position == null)
            return;
        const positionNodes = parseExpressions(position)[0].terms;
        for (let i = 0; i < 3; ++i) {
            this.position.setComponent(i, normalizeUnit(positionNodes[i]).number);
        }
    }
    /**
     * Change the hotspot's normal to the input string, in the same format as the
     * data-normal attribute.
     */
    updateNormal(normal) {
        if (normal == null)
            return;
        const normalNodes = parseExpressions(normal)[0].terms;
        for (let i = 0; i < 3; ++i) {
            this.normal.setComponent(i, normalizeUnit(normalNodes[i]).number);
        }
    }
    [(_a$9 = $visible, _b$8 = $referenceCount, _c$2 = $slot, _d$2 = $slotchangeHandler, $updateVisibility)]({ notify }) {
        // NOTE: IE11 doesn't support a second arg for classList.toggle
        if (this[$visible]) {
            this.element.classList.remove('hide');
        }
        else {
            this.element.classList.add('hide');
        }
        // NOTE: ShadyDOM doesn't support slot.assignedElements, otherwise we could
        // use that here.
        this[$slot].assignedNodes().forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }
            const element = node;
            // Visibility attribute can be configured per-node in the hotspot:
            const visibilityAttribute = element.dataset.visibilityAttribute;
            if (visibilityAttribute != null) {
                const attributeName = `data-${visibilityAttribute}`;
                // NOTE: IE11 doesn't support toggleAttribute
                if (this[$visible]) {
                    element.setAttribute(attributeName, '');
                }
                else {
                    element.removeAttribute(attributeName);
                }
            }
            if (notify) {
                element.dispatchEvent(new CustomEvent('hotspot-visibility', {
                    detail: {
                        visible: this[$visible],
                    },
                }));
            }
        });
    }
    [$onSlotchange]() {
        this[$updateVisibility]({ notify: false });
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $annotationRenderer = Symbol('annotationRenderer');
const $updateHotspots = Symbol('updateHotspots');
const $hotspotMap = Symbol('hotspotMap');
const $mutationCallback = Symbol('mutationCallback');
const $observer = Symbol('observer');
const $pixelPosition = Symbol('pixelPosition');
const $addHotspot = Symbol('addHotspot');
const $removeHotspot = Symbol('removeHotspot');
const raycaster = new Raycaster();
/**
 * AnnotationMixin implements a declarative API to add hotspots and annotations.
 * Child elements of the <model-viewer> element that have a slot name that
 * begins with "hotspot" and data-position and data-normal attributes in
 * the format of the camera-target attribute will be added to the scene and
 * track the specified model coordinates.
 */
const AnnotationMixin = (ModelViewerElement) => {
    var _a, _b, _c, _d, _e;
    class AnnotationModelViewerElement extends ModelViewerElement {
        constructor(...args) {
            super(...args);
            this[_a] = new CSS2DRenderer();
            this[_b] = new Map();
            this[_c] = (mutations) => {
                mutations.forEach((mutation) => {
                    // NOTE: Be wary that in ShadyDOM cases, the MutationRecord
                    // only has addedNodes and removedNodes (and no other details).
                    if (!(mutation instanceof MutationRecord) ||
                        mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            this[$addHotspot](node);
                        });
                        mutation.removedNodes.forEach((node) => {
                            this[$removeHotspot](node);
                        });
                    }
                });
            };
            this[_d] = new MutationObserver(this[$mutationCallback]);
            this[_e] = new Vector2();
            const { domElement } = this[$annotationRenderer];
            domElement.classList.add('annotation-container');
            this.shadowRoot.querySelector('.container').appendChild(domElement);
        }
        connectedCallback() {
            super.connectedCallback();
            for (let i = 0; i < this.children.length; ++i) {
                this[$addHotspot](this.children[i]);
            }
            const { ShadyDOM } = self;
            if (ShadyDOM == null) {
                this[$observer].observe(this, { childList: true });
            }
            else {
                this[$observer] =
                    ShadyDOM.observeChildren(this, this[$mutationCallback]);
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            const { ShadyDOM } = self;
            if (ShadyDOM == null) {
                this[$observer].disconnect();
            }
            else {
                ShadyDOM.unobserveChildren(this[$observer]);
            }
        }
        /**
         * Since the data-position and data-normal attributes are not observed, use
         * this method to move a hotspot. Keep in mind that all hotspots with the
         * same slot name use a single location and the first definition takes
         * precedence, until updated with this method.
         */
        updateHotspot(config) {
            const hotspot = this[$hotspotMap].get(config.name);
            if (hotspot == null) {
                return;
            }
            hotspot.updatePosition(config.position);
            hotspot.updateNormal(config.normal);
        }
        /**
         * This method returns the world position and normal of the point on the
         * mesh corresponding to the input pixel coordinates given relative to the
         * model-viewer element. The position and normal are returned as strings in
         * the format suitable for putting in a hotspot's data-position and
         * data-normal attributes. If the mesh is not hit, position returns the
         * empty string.
         */
        positionAndNormalFromPoint(pixelX, pixelY) {
            const { width, height } = this[$scene];
            this[$pixelPosition]
                .set(pixelX / width, pixelY / height)
                .multiplyScalar(2)
                .subScalar(1);
            this[$pixelPosition].y *= -1;
            raycaster.setFromCamera(this[$pixelPosition], this[$scene].getCamera());
            const hits = raycaster.intersectObject(this[$scene], true);
            if (hits.length === 0) {
                return null;
            }
            const hit = hits[0];
            if (hit.face == null) {
                return null;
            }
            const worldToPivot = new Matrix4().getInverse(this[$scene].pivot.matrixWorld);
            const position = toVector3D(hit.point.applyMatrix4(worldToPivot));
            const normal = toVector3D(hit.face.normal.applyMatrix4(hit.object.matrixWorld)
                .applyMatrix4(worldToPivot));
            return { position: position, normal: normal };
        }
        [(_a = $annotationRenderer, _b = $hotspotMap, _c = $mutationCallback, _d = $observer, _e = $pixelPosition, $tick$1)](time, delta) {
            super[$tick$1](time, delta);
            this[$updateHotspots]();
            this[$annotationRenderer].render(this[$scene], this[$scene].activeCamera);
        }
        [$onResize](e) {
            super[$onResize](e);
            this[$annotationRenderer].setSize(e.width, e.height);
        }
        [$updateHotspots]() {
            const { children } = this[$scene].pivot;
            for (let i = 0, l = children.length; i < l; i++) {
                const hotspot = children[i];
                if (hotspot instanceof Hotspot) {
                    const view = this[$scene].activeCamera.position.clone();
                    view.sub(hotspot.position);
                    const normalWorld = hotspot.normal.clone().transformDirection(this[$scene].pivot.matrixWorld);
                    if (view.dot(normalWorld) < 0) {
                        hotspot.hide();
                    }
                    else {
                        hotspot.show();
                    }
                }
            }
        }
        [$addHotspot](node) {
            if (!(node instanceof HTMLElement &&
                node.slot.indexOf('hotspot') === 0)) {
                return;
            }
            let hotspot = this[$hotspotMap].get(node.slot);
            if (hotspot != null) {
                hotspot.increment();
            }
            else {
                hotspot = new Hotspot({
                    name: node.slot,
                    position: node.dataset.position,
                    normal: node.dataset.normal,
                });
                this[$hotspotMap].set(node.slot, hotspot);
                this[$scene].pivot.add(hotspot);
            }
        }
        [$removeHotspot](node) {
            if (!(node instanceof HTMLElement)) {
                return;
            }
            const hotspot = this[$hotspotMap].get(node.slot);
            if (!hotspot) {
                return;
            }
            if (hotspot.decrement()) {
                this[$scene].pivot.remove(hotspot);
                this[$hotspotMap].delete(node.slot);
                hotspot.dispose();
            }
        }
    }
    return AnnotationModelViewerElement;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * For our purposes, an enumeration is a fixed set of CSS-expression-compatible
 * names. When serialized, a selected subset of the members may be specified as
 * whitespace-separated strings. An enumeration deserializer is a function that
 * parses a serialized subset of an enumeration and returns any members that are
 * found as a Set.
 *
 * The following example will produce a deserializer for the days of the
 * week:
 *
 * const deserializeDaysOfTheWeek = enumerationDeserializer([
 *   'Monday',
 *   'Tuesday',
 *   'Wednesday',
 *   'Thursday',
 *   'Friday',
 *   'Saturday',
 *   'Sunday'
 * ]);
 */
const enumerationDeserializer = (allowedNames) => (valueString) => {
    try {
        const expressions = parseExpressions(valueString);
        const names = (expressions.length ? expressions[0].terms : [])
            .filter((valueNode) => valueNode && valueNode.type === 'ident')
            .map(valueNode => valueNode.value)
            .filter(name => allowedNames.indexOf(name) > -1);
        // NOTE(cdata): IE11 does not support constructing a Set directly from
        // an iterable, so we need to manually add all the items:
        const result = new Set();
        for (const name of names) {
            result.add(name);
        }
        return result;
    }
    catch (_error) {
    }
    return new Set();
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Takes a URL to a USDZ file and sets the appropriate fields so that Safari
 * iOS can intent to their AR Quick Look.
 */
const openIOSARQuickLook = (() => {
    const anchor = document.createElement('a');
    anchor.setAttribute('rel', 'ar');
    anchor.appendChild(document.createElement('img'));
    return (usdzSrc) => {
        anchor.setAttribute('href', usdzSrc);
        anchor.click();
    };
})();
/**
 * Takes a URL and a title string, and attempts to launch Scene Viewer on the
 * current device.
 */
const openSceneViewer = (() => {
    const anchor = document.createElement('a');
    const linkOrTitle = /(link|title)(=|&)|(\?|&)(link|title)$/;
    const noArViewerSigil = '#model-viewer-no-ar-fallback';
    let fallbackInvoked = false;
    return (gltfSrc, title, arScale) => {
        // If the fallback has ever been invoked this session, bounce early:
        if (fallbackInvoked) {
            return;
        }
        const location = self.location.toString();
        const locationUrl = new URL(location);
        const modelUrl = new URL(gltfSrc);
        const link = encodeURIComponent(location);
        const scheme = modelUrl.protocol.replace(':', '');
        if (modelUrl.search && modelUrl.search.match(linkOrTitle)) {
            console.warn(`The model URL (${modelUrl
                .toString()}) contains a "link" and/or "title" query parameter.
 These parameters are used to configure Scene Viewer and will be duplicated in the URL.
 You should choose different query parameter names if possible!`);
        }
        locationUrl.hash = noArViewerSigil;
        title = encodeURIComponent(title);
        modelUrl.protocol = 'intent://';
        // It's possible for a model URL to have meaningful query parameters
        // already. Sure hope they aren't called 'link' or 'title' though 😅
        modelUrl.search +=
            (modelUrl.search ? '&' : '') + `link=${link}&title=${title}`;
        if (arScale === 'fixed') {
            modelUrl.search += `&resizable=false`;
        }
        const intent = `${modelUrl.toString()}#Intent;scheme=${scheme};package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(locationUrl.toString())};end;`;
        const undoHashChange = () => {
            if (self.location.hash === noArViewerSigil && !fallbackInvoked) {
                fallbackInvoked = true;
                // The new history will be the current URL with a new hash.
                // Go back one step so that we reset to the expected URL.
                // NOTE(cdata): this should not invoke any browser-level navigation
                // because hash-only changes modify the URL in-place without
                // navigating:
                self.history.back();
            }
        };
        self.addEventListener('hashchange', undoHashChange, { once: true });
        anchor.setAttribute('href', intent);
        anchor.click();
    };
})();
const deserializeQuickLookBrowsers = enumerationDeserializer(['safari', 'chrome']);
const ARMode = {
    QUICK_LOOK: 'quick-look',
    AR_VIEWER: 'ar-viewer',
    UNSTABLE_WEBXR: 'unstable-webxr',
    NONE: 'none'
};
const $exitFullscreenButtonContainer = Symbol('exitFullscreenButtonContainer');
const $arButtonContainer = Symbol('arButtonContainer');
const $defaultExitFullscreenButton = Symbol('defaultExitFullscreenButton');
const $enterARWithWebXR = Symbol('enterARWithWebXR');
const $canActivateAR = Symbol('canActivateAR');
const $arMode = Symbol('arMode');
const $canLaunchQuickLook = Symbol('canLaunchQuickLook');
const $quickLookBrowsers = Symbol('quickLookBrowsers');
const $arButtonContainerFallbackClickHandler = Symbol('arButtonContainerFallbackClickHandler');
const $onARButtonContainerFallbackClick = Symbol('onARButtonContainerFallbackClick');
const $arButtonContainerClickHandler = Symbol('arButtonContainerClickHandler');
const $onARButtonContainerClick = Symbol('onARButtonContainerClick');
const $exitFullscreenButtonContainerClickHandler = Symbol('exitFullscreenButtonContainerClickHandler');
const $onExitFullscreenButtonClick = Symbol('onExitFullscreenButtonClick');
const $fullscreenchangeHandler = Symbol('fullscreenHandler');
const $onFullscreenchange = Symbol('onFullscreen');
const ARMixin = (ModelViewerElement) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    class ARModelViewerElement extends ModelViewerElement {
        constructor() {
            super(...arguments);
            this.ar = false;
            this.arScale = 'auto';
            this.unstableWebxr = false;
            this.iosSrc = null;
            this.quickLookBrowsers = 'safari';
            this[_a] = false;
            // TODO: Add this to the shadow root as part of this mixin's
            // implementation:
            this[_b] = this.shadowRoot.querySelector('.ar-button');
            this[_c] = this.shadowRoot.querySelector('.slot.exit-fullscreen-button');
            this[_d] = this.shadowRoot.querySelector('#default-exit-fullscreen-button');
            // NOTE(cdata): We use a second, separate "fallback" click handler in
            // order to work around a regression in how Chrome on Android behaves
            // when requesting fullscreen at the same time as triggering an intent.
            // As of m76, intents could no longer be triggered successfully if they
            // were dispatched in the same handler as the fullscreen request. The
            // workaround is to split both effects into their own event handlers.
            // @see https://github.com/GoogleWebComponents/model-viewer/issues/693
            this[_e] = (event) => this[$onARButtonContainerFallbackClick](event);
            this[_f] = (event) => this[$onARButtonContainerClick](event);
            this[_g] = () => this[$onExitFullscreenButtonClick]();
            this[_h] = () => this[$onFullscreenchange]();
            this[_j] = ARMode.NONE;
            this[_k] = new Set();
        }
        get canActivateAR() {
            return this[$arMode] !== ARMode.NONE;
        }
        /**
         * Activates AR. Note that for any mode that is not WebXR-based, this
         * method most likely has to be called synchronous from a user
         * interaction handler. Otherwise, attempts to activate modes that
         * require user interaction will most likely be ignored.
         */
        async activateAR() {
            switch (this[$arMode]) {
                case ARMode.QUICK_LOOK:
                    openIOSARQuickLook(this.iosSrc);
                    break;
                case ARMode.UNSTABLE_WEBXR:
                    await this[$enterARWithWebXR]();
                    break;
                case ARMode.AR_VIEWER:
                    openSceneViewer(this.src, this.alt || '', this.arScale);
                    break;
                default:
                    console.warn('No AR Mode can be activated. This is probably due to missing \
configuration or device capabilities');
                    break;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            document.addEventListener('fullscreenchange', this[$fullscreenchangeHandler]);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.removeEventListener('fullscreenchange', this[$fullscreenchangeHandler]);
        }
        [(_a = $canActivateAR, _b = $arButtonContainer, _c = $exitFullscreenButtonContainer, _d = $defaultExitFullscreenButton, _e = $arButtonContainerFallbackClickHandler, _f = $arButtonContainerClickHandler, _g = $exitFullscreenButtonContainerClickHandler, _h = $fullscreenchangeHandler, _j = $arMode, _k = $quickLookBrowsers, $onExitFullscreenButtonClick)]() {
            if (document.fullscreenElement === this) {
                document.exitFullscreen();
            }
        }
        [$onFullscreenchange]() {
            const scene = this[$scene];
            const isFullscreen = document.fullscreenElement === this;
            if (isFullscreen) {
                this[$container].classList.add('fullscreen');
            }
            else {
                this[$container].classList.remove('fullscreen');
            }
            if (document.fullscreenElement !== this &&
                this[$renderer].presentedScene === scene) {
                try {
                    this[$renderer].stopPresenting();
                }
                catch (error) {
                    console.warn('Unexpected error while stopping AR presentation');
                    console.error(error);
                }
            }
        }
        async [$enterARWithWebXR]() {
            console.log('Attempting to present in AR...');
            try {
                await this[$renderer].present(this[$scene]);
            }
            catch (error) {
                console.warn('Error while trying to present to AR');
                console.error(error);
            }
        }
        async update(changedProperties) {
            super.update(changedProperties);
            if (changedProperties.has('quickLookBrowsers')) {
                this[$quickLookBrowsers] =
                    deserializeQuickLookBrowsers(this.quickLookBrowsers);
            }
            if (!changedProperties.has('unstableWebxr') &&
                !changedProperties.has('iosSrc') && !changedProperties.has('ar') &&
                !changedProperties.has('src') && !changedProperties.has('alt')) {
                return;
            }
            const unstableWebxrCandidate = this.unstableWebxr &&
                IS_WEBXR_AR_CANDIDATE && await this[$renderer].supportsPresentation();
            const arViewerCandidate = IS_ANDROID && this.ar;
            const iosQuickLookCandidate = IS_IOS && IS_AR_QUICKLOOK_CANDIDATE &&
                this[$canLaunchQuickLook] && !!this.iosSrc;
            const showArButton = unstableWebxrCandidate || arViewerCandidate || iosQuickLookCandidate;
            if (unstableWebxrCandidate) {
                this[$arMode] = ARMode.UNSTABLE_WEBXR;
            }
            else if (arViewerCandidate) {
                this[$arMode] = ARMode.AR_VIEWER;
            }
            else if (iosQuickLookCandidate) {
                this[$arMode] = ARMode.QUICK_LOOK;
            }
            else {
                this[$arMode] = ARMode.NONE;
            }
            if (showArButton) {
                this[$arButtonContainer].classList.add('enabled');
                // NOTE(cdata): The order of the two click handlers on the "ar
                // button container" is important, vital to the workaround described
                // earlier in this file. Reversing their order will cause our Scene
                // Viewer integration to break.
                // @see https://github.com/GoogleWebComponents/model-viewer/issues/693
                this[$arButtonContainer].addEventListener('click', this[$arButtonContainerClickHandler]);
                this[$arButtonContainer].addEventListener('click', this[$arButtonContainerFallbackClickHandler]);
                this[$exitFullscreenButtonContainer].addEventListener('click', this[$exitFullscreenButtonContainerClickHandler]);
            }
            else {
                this[$arButtonContainer].removeEventListener('click', this[$arButtonContainerClickHandler]);
                this[$arButtonContainer].removeEventListener('click', this[$arButtonContainerFallbackClickHandler]);
                this[$exitFullscreenButtonContainer].removeEventListener('click', this[$exitFullscreenButtonContainerClickHandler]);
                this[$arButtonContainer].classList.remove('enabled');
            }
        }
        [$onARButtonContainerFallbackClick](_event) {
            if (this[$arMode] === ARMode.AR_VIEWER) {
                this.requestFullscreen();
            }
        }
        [$onARButtonContainerClick](event) {
            event.preventDefault();
            this.activateAR();
        }
        get [$canLaunchQuickLook]() {
            if (IS_IOS_CHROME) {
                return this[$quickLookBrowsers].has('chrome');
            }
            else if (IS_IOS_SAFARI) {
                return this[$quickLookBrowsers].has('safari');
            }
            return false;
        }
    }
    __decorate$2([
        property({ type: Boolean, attribute: 'ar' })
    ], ARModelViewerElement.prototype, "ar", void 0);
    __decorate$2([
        property({ type: String, attribute: 'ar-scale' })
    ], ARModelViewerElement.prototype, "arScale", void 0);
    __decorate$2([
        property({ type: Boolean, attribute: 'unstable-webxr' })
    ], ARModelViewerElement.prototype, "unstableWebxr", void 0);
    __decorate$2([
        property({ converter: { fromAttribute: deserializeUrl }, attribute: 'ios-src' })
    ], ARModelViewerElement.prototype, "iosSrc", void 0);
    __decorate$2([
        property({ type: String, attribute: 'quick-look-browsers' })
    ], ARModelViewerElement.prototype, "quickLookBrowsers", void 0);
    return ARModelViewerElement;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$a, _b$9, _c$3;
const $evaluate = Symbol('evaluate');
const $lastValue = Symbol('lastValue');
/**
 * An Evaluator is used to derive a computed style from part (or all) of a CSS
 * expression AST. This construct is particularly useful for complex ASTs
 * containing function calls such as calc, var and env. Such styles could be
 * costly to re-evaluate on every frame (and in some cases we may try to do
 * that). The Evaluator construct allows us to mark sub-trees of the AST as
 * constant, so that only the dynamic parts are re-evaluated. It also separates
 * one-time AST preparation work from work that necessarily has to happen upon
 * each evaluation.
 */
class Evaluator {
    constructor() {
        this[_a$a] = null;
    }
    /**
     * An Evaluatable is a NumberNode or an Evaluator that evaluates a NumberNode
     * as the result of invoking its evaluate method. This is mainly used to
     * ensure that CSS function nodes are cast to the corresponding Evaluators
     * that will resolve the result of the function, but is also used to ensure
     * that a percentage nested at arbitrary depth in the expression will always
     * be evaluated against the correct basis.
     */
    static evaluatableFor(node, basis = ZERO) {
        if (node instanceof Evaluator) {
            return node;
        }
        if (node.type === 'number') {
            if (node.unit === '%') {
                return new PercentageEvaluator(node, basis);
            }
            return node;
        }
        switch (node.name.value) {
            case 'calc':
                return new CalcEvaluator(node, basis);
            case 'env':
                return new EnvEvaluator(node);
        }
        return ZERO;
    }
    /**
     * If the input is an Evaluator, returns the result of evaluating it.
     * Otherwise, returns the input.
     *
     * This is a helper to aide in resolving a NumberNode without conditionally
     * checking if the Evaluatable is an Evaluator everywhere.
     */
    static evaluate(evaluatable) {
        if (evaluatable instanceof Evaluator) {
            return evaluatable.evaluate();
        }
        return evaluatable;
    }
    /**
     * If the input is an Evaluator, returns the value of its isConstant property.
     * Returns true for all other input values.
     */
    static isConstant(evaluatable) {
        if (evaluatable instanceof Evaluator) {
            return evaluatable.isConstant;
        }
        return true;
    }
    /**
     * This method applies a set of structured intrinsic metadata to an evaluated
     * result from a parsed CSS-like string of expressions. Intrinsics provide
     * sufficient metadata (e.g., basis values, analogs for keywords) such that
     * omitted values in the input string can be backfilled, and keywords can be
     * converted to concrete numbers.
     *
     * The result of applying intrinsics is a tuple of NumberNode values whose
     * units match the units used by the basis of the intrinsics.
     *
     * The following is a high-level description of how intrinsics are applied:
     *
     *  1. Determine the value of 'auto' for the current term
     *  2. If there is no corresponding input value for this term, substitute the
     *     'auto' value.
     *  3. If the term is an IdentNode, treat it as a keyword and perform the
     *     appropriate substitution.
     *  4. If the term is still null, fallback to the 'auto' value
     *  5. If the term is a percentage, apply it to the basis and return that
     *     value
     *  6. Normalize the unit of the term
     *  7. If the term's unit does not match the basis unit, return the basis
     *     value
     *  8. Return the term as is
     */
    static applyIntrinsics(evaluated, intrinsics) {
        const { basis, keywords } = intrinsics;
        const { auto } = keywords;
        return basis.map((basisNode, index) => {
            // Use an auto value if we have it, otherwise the auto value is the basis:
            const autoSubstituteNode = auto[index] == null ? basisNode : auto[index];
            // If the evaluated nodes do not have a node at the current
            // index, fallback to the "auto" substitute right away:
            let evaluatedNode = evaluated[index] ? evaluated[index] : autoSubstituteNode;
            // Any ident node is considered a keyword:
            if (evaluatedNode.type === 'ident') {
                const keyword = evaluatedNode.value;
                // Substitute any keywords for concrete values first:
                if (keyword in keywords) {
                    evaluatedNode = keywords[keyword][index];
                }
            }
            // If we don't have a NumberNode at this point, fall back to whatever
            // is specified for auto:
            if (evaluatedNode == null || evaluatedNode.type === 'ident') {
                evaluatedNode = autoSubstituteNode;
            }
            // For percentages, we always apply the percentage to the basis value:
            if (evaluatedNode.unit === '%') {
                return numberNode(evaluatedNode.number / 100 * basisNode.number, basisNode.unit);
            }
            // Otherwise, normalize whatever we have:
            evaluatedNode = normalizeUnit(evaluatedNode, basisNode);
            // If the normalized units do not match, return the basis as a fallback:
            if (evaluatedNode.unit !== basisNode.unit) {
                return basisNode;
            }
            // Finally, return the evaluated node with intrinsics applied:
            return evaluatedNode;
        });
    }
    /**
     * If true, the Evaluator will only evaluate its AST one time. If false, the
     * Evaluator will re-evaluate the AST each time that the public evaluate
     * method is invoked.
     */
    get isConstant() {
        return false;
    }
    /**
     * Evaluate the Evaluator and return the result. If the Evaluator is constant,
     * the corresponding AST will only be evaluated once, and the result of
     * evaluating it the first time will be returned on all subsequent
     * evaluations.
     */
    evaluate() {
        if (!this.isConstant || this[$lastValue] == null) {
            this[$lastValue] = this[$evaluate]();
        }
        return this[$lastValue];
    }
}
_a$a = $lastValue;
const $percentage = Symbol('percentage');
const $basis = Symbol('basis');
/**
 * A PercentageEvaluator scales a given basis value by a given percentage value.
 * The evaluated result is always considered to be constant.
 */
class PercentageEvaluator extends Evaluator {
    constructor(percentage, basis) {
        super();
        this[$percentage] = percentage;
        this[$basis] = basis;
    }
    get isConstant() {
        return true;
    }
    [$evaluate]() {
        return numberNode(this[$percentage].number / 100 * this[$basis].number, this[$basis].unit);
    }
}
const $identNode = Symbol('identNode');
/**
 * Evaluator for CSS-like env() functions. Currently, only one environment
 * variable is accepted as an argument for such functions: window-scroll-y.
 *
 * The env() Evaluator is explicitly dynamic because it always refers to
 * external state that changes as the user scrolls, so it should always be
 * re-evaluated to ensure we get the most recent value.
 *
 * Some important notes about this feature include:
 *
 *  - There is no such thing as a "window-scroll-y" CSS environment variable in
 *    any stable browser at the time that this comment is being written.
 *  - The actual CSS env() function accepts a second argument as a fallback for
 *    the case that the specified first argument isn't set; our syntax does not
 *    support this second argument.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/env
 */
class EnvEvaluator extends Evaluator {
    constructor(envFunction) {
        super();
        this[_b$9] = null;
        const identNode = envFunction.arguments.length ? envFunction.arguments[0].terms[0] : null;
        if (identNode != null && identNode.type === 'ident') {
            this[$identNode] = identNode;
        }
    }
    get isConstant() {
        return false;
    }
    ;
    [(_b$9 = $identNode, $evaluate)]() {
        if (this[$identNode] != null) {
            switch (this[$identNode].value) {
                case 'window-scroll-y':
                    const verticalScrollPosition = window.pageYOffset;
                    const verticalScrollMax = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
                    const scrollY = verticalScrollPosition /
                        (verticalScrollMax - window.innerHeight) ||
                        0;
                    return { type: 'number', number: scrollY, unit: null };
            }
        }
        return ZERO;
    }
}
const IS_MULTIPLICATION_RE = /[\*\/]/;
const $evaluator = Symbol('evalutor');
/**
 * Evaluator for CSS-like calc() functions. Our implementation of calc()
 * evaluation currently support nested function calls, an unlimited number of
 * terms, and all four algebraic operators (+, -, * and /).
 *
 * The Evaluator is marked as constant unless the calc expression contains an
 * internal env expression at any depth, in which case it will be marked as
 * dynamic.
 *
 * @see https://www.w3.org/TR/css-values-3/#calc-syntax
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/calc
 */
class CalcEvaluator extends Evaluator {
    constructor(calcFunction, basis = ZERO) {
        super();
        this[_c$3] = null;
        if (calcFunction.arguments.length !== 1) {
            return;
        }
        const terms = calcFunction.arguments[0].terms.slice();
        const secondOrderTerms = [];
        while (terms.length) {
            const term = terms.shift();
            if (secondOrderTerms.length > 0) {
                const previousTerm = secondOrderTerms[secondOrderTerms.length - 1];
                if (previousTerm.type === 'operator' &&
                    IS_MULTIPLICATION_RE.test(previousTerm.value)) {
                    const operator = secondOrderTerms.pop();
                    const leftValue = secondOrderTerms.pop();
                    if (leftValue == null) {
                        return;
                    }
                    secondOrderTerms.push(new OperatorEvaluator(operator, Evaluator.evaluatableFor(leftValue, basis), Evaluator.evaluatableFor(term, basis)));
                    continue;
                }
            }
            secondOrderTerms.push(term.type === 'operator' ? term :
                Evaluator.evaluatableFor(term, basis));
        }
        while (secondOrderTerms.length > 2) {
            const [left, operator, right] = secondOrderTerms.splice(0, 3);
            if (operator.type !== 'operator') {
                return;
            }
            secondOrderTerms.unshift(new OperatorEvaluator(operator, Evaluator.evaluatableFor(left, basis), Evaluator.evaluatableFor(right, basis)));
        }
        // There should only be one combined evaluator at this point:
        if (secondOrderTerms.length === 1) {
            this[$evaluator] = secondOrderTerms[0];
        }
    }
    get isConstant() {
        return this[$evaluator] == null || Evaluator.isConstant(this[$evaluator]);
    }
    [(_c$3 = $evaluator, $evaluate)]() {
        return this[$evaluator] != null ? Evaluator.evaluate(this[$evaluator]) :
            ZERO;
    }
}
const $operator = Symbol('operator');
const $left = Symbol('left');
const $right = Symbol('right');
/**
 * An Evaluator for the operators found inside CSS calc() functions.
 * The evaluator accepts an operator and left/right operands. The operands can
 * be any valid expression term typically allowed inside a CSS calc function.
 *
 * As detail of this implementation, the only supported unit types are angles
 * expressed as radians or degrees, and lengths expressed as meters, centimeters
 * or millimeters.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/calc
 */
class OperatorEvaluator extends Evaluator {
    constructor(operator, left, right) {
        super();
        this[$operator] = operator;
        this[$left] = left;
        this[$right] = right;
    }
    get isConstant() {
        return Evaluator.isConstant(this[$left]) &&
            Evaluator.isConstant(this[$right]);
    }
    [$evaluate]() {
        const leftNode = normalizeUnit(Evaluator.evaluate(this[$left]));
        const rightNode = normalizeUnit(Evaluator.evaluate(this[$right]));
        const { number: leftValue, unit: leftUnit } = leftNode;
        const { number: rightValue, unit: rightUnit } = rightNode;
        // Disallow operations for mismatched normalized units e.g., m and rad:
        if (rightUnit != null && leftUnit != null && rightUnit != leftUnit) {
            return ZERO;
        }
        // NOTE(cdata): rules for calc type checking are defined here
        // https://drafts.csswg.org/css-values-3/#calc-type-checking
        // This is a simplification and may not hold up once we begin to support
        // additional unit types:
        const unit = leftUnit || rightUnit;
        let value;
        switch (this[$operator].value) {
            case '+':
                value = leftValue + rightValue;
                break;
            case '-':
                value = leftValue - rightValue;
                break;
            case '/':
                value = leftValue / rightValue;
                break;
            case '*':
                value = leftValue * rightValue;
                break;
            default:
                return ZERO;
        }
        return { type: 'number', number: value, unit };
    }
}
const $evaluatables = Symbol('evaluatables');
const $intrinsics = Symbol('intrinsics');
/**
 * A VectorEvaluator evaluates a series of numeric terms that usually represent
 * a data structure such as a multi-dimensional vector or a spherical
 *
 * The form of the evaluator's result is determined by the Intrinsics that are
 * given to it when it is constructed. For example, spherical intrinsics would
 * establish two angle terms and a length term, so the result of evaluating the
 * evaluator that is configured with spherical intrinsics is a three element
 * array where the first two elements represent angles in radians and the third
 * element representing a length in meters.
 */
class StyleEvaluator extends Evaluator {
    constructor(expressions, intrinsics) {
        super();
        this[$intrinsics] = intrinsics;
        const firstExpression = expressions[0];
        const terms = firstExpression != null ? firstExpression.terms : [];
        this[$evaluatables] =
            intrinsics.basis.map((basisNode, index) => {
                const term = terms[index];
                if (term == null) {
                    return { type: 'ident', value: 'auto' };
                }
                if (term.type === 'ident') {
                    return term;
                }
                return Evaluator.evaluatableFor(term, basisNode);
            });
    }
    get isConstant() {
        for (const evaluatable of this[$evaluatables]) {
            if (!Evaluator.isConstant(evaluatable)) {
                return false;
            }
        }
        return true;
    }
    [$evaluate]() {
        const evaluated = this[$evaluatables].map(evaluatable => Evaluator.evaluate(evaluatable));
        return Evaluator.applyIntrinsics(evaluated, this[$intrinsics])
            .map(numberNode => numberNode.number);
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$b, _b$a, _c$4, _d$3;
const $instances = Symbol('instances');
const $activateListener = Symbol('activateListener');
const $deactivateListener = Symbol('deactivateListener');
const $notifyInstances = Symbol('notifyInstances');
const $notify = Symbol('notify');
const $scrollCallback = Symbol('callback');
/**
 * This internal helper is intended to work as a reference-counting manager of
 * scroll event listeners. Only one scroll listener is ever registered for all
 * instances of the class, and when the last ScrollObserver "disconnects", that
 * event listener is removed. This spares us from thrashing
 * the {add,remove}EventListener API (the binding cost of these methods has been
 * known to show up in performance anlyses) as well as potential memory leaks.
 */
class ScrollObserver {
    constructor(callback) {
        this[$scrollCallback] = callback;
    }
    static [$notifyInstances]() {
        for (const instance of ScrollObserver[$instances]) {
            instance[$notify]();
        }
    }
    static [(_a$b = $instances, $activateListener)]() {
        window.addEventListener('scroll', this[$notifyInstances], { passive: true });
    }
    static [$deactivateListener]() {
        window.removeEventListener('scroll', this[$notifyInstances]);
    }
    /**
     * Listen for scroll events. The configured callback (passed to the
     * constructor) will be invoked for subsequent global scroll events.
     */
    observe() {
        if (ScrollObserver[$instances].size === 0) {
            ScrollObserver[$activateListener]();
        }
        ScrollObserver[$instances].add(this);
    }
    /**
     * Stop listening for scroll events.
     */
    disconnect() {
        ScrollObserver[$instances].delete(this);
        if (ScrollObserver[$instances].size === 0) {
            ScrollObserver[$deactivateListener]();
        }
    }
    [$notify]() {
        this[$scrollCallback]();
    }
    ;
}
ScrollObserver[_a$b] = new Set();
const $computeStyleCallback = Symbol('computeStyleCallback');
const $astWalker = Symbol('astWalker');
const $dependencies = Symbol('dependencies');
const $scrollHandler = Symbol('scrollHandler');
const $onScroll = Symbol('onScroll');
/**
 * The StyleEffector is configured with a callback that will be invoked at the
 * optimal time that some array of CSS expression ASTs ought to be evaluated.
 *
 * For example, our CSS-like expression syntax supports usage of the env()
 * function to incorporate the current top-level scroll position into a CSS
 * expression: env(window-scroll-y).
 *
 * This "environment variable" will change dynamically as the user scrolls the
 * page. If an AST contains such a usage of env(), we would have to evaluate the
 * AST on every frame in order to be sure that the computed style stays up to
 * date.
 *
 * The StyleEffector spares us from evaluating the expressions on every frame by
 * correlating specific parts of an AST with observers of the external effects
 * that they refer to (if any). So, if the AST contains env(window-scroll-y),
 * the StyleEffector manages the lifetime of a global scroll event listener and
 * notifies the user at the optimal time to evaluate the computed style.
 */
class StyleEffector {
    constructor(callback) {
        this[_b$a] = {};
        this[_c$4] = new ASTWalker(['function']);
        this[_d$3] = () => this[$onScroll]();
        this[$computeStyleCallback] = callback;
    }
    /**
     * Sets the expressions that govern when the StyleEffector callback will be
     * invoked.
     */
    observeEffectsFor(ast) {
        const newDependencies = {};
        const oldDependencies = this[$dependencies];
        this[$astWalker].walk(ast, functionNode => {
            const { name } = functionNode;
            const firstArgument = functionNode.arguments[0];
            const firstTerm = firstArgument.terms[0];
            if (name.value !== 'env' || firstTerm == null ||
                firstTerm.type !== 'ident') {
                return;
            }
            switch (firstTerm.value) {
                case 'window-scroll-y':
                    if (newDependencies['window-scroll'] == null) {
                        const observer = 'window-scroll' in oldDependencies ?
                            oldDependencies['window-scroll'] :
                            new ScrollObserver(this[$scrollHandler]);
                        observer.observe();
                        delete oldDependencies['window-scroll'];
                        newDependencies['window-scroll'] = observer;
                    }
                    break;
            }
        });
        for (const environmentState in oldDependencies) {
            const observer = oldDependencies[environmentState];
            observer.disconnect();
        }
        this[$dependencies] = newDependencies;
    }
    /**
     * Disposes of the StyleEffector by disconnecting all observers of external
     * effects.
     */
    dispose() {
        for (const environmentState in this[$dependencies]) {
            const observer = this[$dependencies][environmentState];
            observer.disconnect();
        }
    }
    [(_b$a = $dependencies, _c$4 = $astWalker, _d$3 = $scrollHandler, $onScroll)]() {
        this[$computeStyleCallback]({ relatedState: 'window-scroll' });
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The @style decorator is responsible for coordinating the conversion of a
 * CSS-like string property value into numbers that can be applied to
 * lower-level constructs. It also can optionally manage the lifecycle of a
 * StyleEffector which allows automatic updates for styles that use env() or
 * var() functions.
 *
 * The decorator is configured with Intrinsics and the property key for a
 * method that handles updates. The named update handler is invoked with the
 * result of parsing and evaluating the raw property string value. The format of
 * the evaluated result is derived from the basis of the configured Intrinsics,
 * and is always an array of numbers of fixed length.
 *
 * NOTE: This decorator depends on the property updating mechanism defined by
 * UpdatingElement as exported by the lit-element module. That means it *must*
 * be used in conjunction with the @property decorator, or equivalent
 * JavaScript.
 *
 * Supported configurations are:
 *
 *  - `intrinsics`: An Intrinsics struct that describes how to interpret a
 * serialized style attribute. For more detail on intrinsics see
 * ./styles/evaluators.ts
 *  - `updateHandler`: A string or Symbol that is the key of a method to be
 * invoked with the result of parsing and evaluating a serialized style string.
 *  - `observeEffects`: Optional, if set to true then styles that use env() will
 * cause their update handlers to be invoked every time the corresponding
 * environment variable changes (even if the style attribute itself remains
 * static).
 */
const style = (config) => {
    const observeEffects = config.observeEffects || false;
    const getIntrinsics = config.intrinsics instanceof Function ?
        config.intrinsics :
        (() => config.intrinsics);
    return (proto, propertyName) => {
        const originalUpdated = proto.updated;
        const originalConnectedCallback = proto.connectedCallback;
        const originalDisconnectedCallback = proto.disconnectedCallback;
        const $styleEffector = Symbol(`${propertyName}StyleEffector`);
        const $styleEvaluator = Symbol(`${propertyName}StyleEvaluator`);
        const $updateEvaluator = Symbol(`${propertyName}UpdateEvaluator`);
        const $evaluateAndSync = Symbol(`${propertyName}EvaluateAndSync`);
        Object.defineProperties(proto, {
            [$styleEffector]: { value: null, writable: true },
            [$styleEvaluator]: { value: null, writable: true },
            [$updateEvaluator]: {
                value: function () {
                    const ast = parseExpressions(this[propertyName]);
                    this[$styleEvaluator] =
                        new StyleEvaluator(ast, getIntrinsics(this));
                    if (this[$styleEffector] == null && observeEffects) {
                        this[$styleEffector] =
                            new StyleEffector(() => this[$evaluateAndSync]());
                    }
                    if (this[$styleEffector] != null) {
                        this[$styleEffector].observeEffectsFor(ast);
                    }
                }
            },
            [$evaluateAndSync]: {
                value: function () {
                    if (this[$styleEvaluator] == null) {
                        return;
                    }
                    const result = this[$styleEvaluator].evaluate();
                    // @see https://github.com/microsoft/TypeScript/pull/30769
                    // @see https://github.com/Microsoft/TypeScript/issues/1863
                    this[config.updateHandler](result);
                }
            },
            updated: {
                value: function (changedProperties) {
                    // Always invoke updates to styles first. This gives a class that
                    // uses this decorator the opportunity to override the effect, or
                    // respond to it, in its own implementation of `updated`.
                    if (changedProperties.has(propertyName)) {
                        this[$updateEvaluator]();
                        this[$evaluateAndSync]();
                    }
                    originalUpdated.call(this, changedProperties);
                }
            },
            connectedCallback: {
                value: function () {
                    originalConnectedCallback.call(this);
                    this.requestUpdate(propertyName, this[propertyName]);
                }
            },
            disconnectedCallback: {
                value: function () {
                    originalDisconnectedCallback.call(this);
                    if (this[$styleEffector] != null) {
                        this[$styleEffector].dispose();
                        this[$styleEffector] = null;
                    }
                }
            }
        });
    };
};

/* @license
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$c, _b$b, _c$5, _d$4, _e$2, _f$2, _g$2, _h$1, _j$1, _k$1, _l, _m, _o, _p, _q, _r, _s;
const DEFAULT_OPTIONS = Object.freeze({
    minimumRadius: 0,
    maximumRadius: Infinity,
    minimumPolarAngle: Math.PI / 8,
    maximumPolarAngle: Math.PI - Math.PI / 8,
    minimumAzimuthalAngle: -Infinity,
    maximumAzimuthalAngle: Infinity,
    minimumFieldOfView: 10,
    maximumFieldOfView: 45,
    eventHandlingBehavior: 'prevent-all',
    interactionPolicy: 'always-allow'
});
const $velocity = Symbol('velocity');
// Internal orbital position state
const $spherical = Symbol('spherical');
const $goalSpherical = Symbol('goalSpherical');
const $thetaDamper = Symbol('thetaDamper');
const $phiDamper = Symbol('phiDamper');
const $radiusDamper = Symbol('radiusDamper');
const $logFov = Symbol('fov');
const $goalLogFov = Symbol('goalLogFov');
const $fovDamper = Symbol('fovDamper');
const $target = Symbol('target');
const $goalTarget = Symbol('goalTarget');
const $targetDamperX = Symbol('targetDamperX');
const $targetDamperY = Symbol('targetDamperY');
const $targetDamperZ = Symbol('targetDamperZ');
const $options = Symbol('options');
const $touchMode = Symbol('touchMode');
const $canInteract = Symbol('canInteract');
const $interactionEnabled = Symbol('interactionEnabled');
const $userAdjustOrbit = Symbol('userAdjustOrbit');
const $isUserChange = Symbol('isUserChange');
const $isStationary = Symbol('isMoving');
const $moveCamera = Symbol('moveCamera');
const $isUserPointing = Symbol('isUserPointing');
// Pointer state
const $pointerIsDown = Symbol('pointerIsDown');
const $lastPointerPosition = Symbol('lastPointerPosition');
const $lastTouches = Symbol('lastTouches');
// Value conversion methods
const $pixelLengthToSphericalAngle = Symbol('pixelLengthToSphericalAngle');
const $twoTouchDistance = Symbol('twoTouchDistance');
const $wrapAngle = Symbol('wrapAngle');
// Event handlers
const $onMouseMove = Symbol('onMouseMove');
const $onMouseDown = Symbol('onMouseDown');
const $onMouseUp = Symbol('onMouseUp');
const $onTouchStart = Symbol('onTouchStart');
const $onTouchEnd = Symbol('onTouchEnd');
const $onTouchMove = Symbol('onTouchMove');
const $onWheel = Symbol('onWheel');
const $onKeyDown = Symbol('onKeyDown');
const $handlePointerMove = Symbol('handlePointerMove');
const $handleSinglePointerMove = Symbol('handleSinglePointerMove');
const $handlePointerDown = Symbol('handlePointerDown');
const $handleSinglePointerDown = Symbol('handleSinglePointerDown');
const $handlePointerUp = Symbol('handlePointerUp');
const $handleWheel = Symbol('handleWheel');
const $handleKey = Symbol('handleKey');
// Constants
const TOUCH_EVENT_RE = /^touch(start|end|move)$/;
const KEYBOARD_ORBIT_INCREMENT = Math.PI / 8;
const ZOOM_SENSITIVITY = 0.1;
const DECAY_MILLISECONDS = 50;
const NATURAL_FREQUENCY = 1 / DECAY_MILLISECONDS;
const NIL_SPEED = 0.0002 * NATURAL_FREQUENCY;
const KeyCode = {
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};
const ChangeSource = {
    USER_INTERACTION: 'user-interaction',
    NONE: 'none'
};
/**
 * The Damper class is a generic second-order critically damped system that does
 * one linear step of the desired length of time. The only parameter is
 * DECAY_MILLISECONDS, which should be adjustable: TODO(#580). This common
 * parameter makes all states converge at the same rate regardless of scale.
 * xNormalization is a number to provide the rough scale of x, such that
 * NIL_SPEED clamping also happens at roughly the same convergence for all
 * states.
 */
class Damper {
    constructor() {
        this[_a$c] = 0;
    }
    update(x, xGoal, timeStepMilliseconds, xNormalization) {
        if (x == null) {
            return xGoal;
        }
        if (x === xGoal && this[$velocity] === 0) {
            return xGoal;
        }
        if (timeStepMilliseconds < 0) {
            return x;
        }
        // Exact solution to a critically damped second-order system, where:
        // acceleration = NATURAL_FREQUENCY * NATURAL_FREQUENCY * (xGoal - x) -
        // 2 * NATURAL_FREQUENCY * this[$velocity];
        const deltaX = (x - xGoal);
        const intermediateVelocity = this[$velocity] + NATURAL_FREQUENCY * deltaX;
        const intermediateX = deltaX + timeStepMilliseconds * intermediateVelocity;
        const decay = Math.exp(-NATURAL_FREQUENCY * timeStepMilliseconds);
        const newVelocity = (intermediateVelocity - NATURAL_FREQUENCY * intermediateX) * decay;
        const acceleration = -NATURAL_FREQUENCY * (newVelocity + intermediateVelocity * decay);
        if (Math.abs(newVelocity) < NIL_SPEED * xNormalization &&
            acceleration * deltaX >= 0) {
            // This ensures the controls settle and stop calling this function instead
            // of asymptotically approaching their goal.
            this[$velocity] = 0;
            return xGoal;
        }
        else {
            this[$velocity] = newVelocity;
            return xGoal + intermediateX * decay;
        }
    }
}
_a$c = $velocity;
/**
 * SmoothControls is a Three.js helper for adding delightful pointer and
 * keyboard-based input to a staged Three.js scene. Its API is very similar to
 * OrbitControls, but it offers more opinionated (subjectively more delightful)
 * defaults, easy extensibility and subjectively better out-of-the-box keyboard
 * support.
 *
 * One important change compared to OrbitControls is that the `update` method
 * of SmoothControls must be invoked on every frame, otherwise the controls
 * will not have an effect.
 *
 * Another notable difference compared to OrbitControls is that SmoothControls
 * does not currently support panning (but probably will in a future revision).
 *
 * Like OrbitControls, SmoothControls assumes that the orientation of the camera
 * has been set in terms of position, rotation and scale, so it is important to
 * ensure that the camera's matrixWorld is in sync before using SmoothControls.
 */
class SmoothControls extends EventDispatcher {
    constructor(camera, element) {
        super();
        this.camera = camera;
        this.element = element;
        this[_b$b] = false;
        this[_c$5] = false;
        this[_d$4] = false;
        this[_e$2] = new Spherical();
        this[_f$2] = new Spherical();
        this[_g$2] = new Damper();
        this[_h$1] = new Damper();
        this[_j$1] = new Damper();
        this[_k$1] = new Damper();
        this[_l] = new Vector3();
        this[_m] = new Vector3();
        this[_o] = new Damper();
        this[_p] = new Damper();
        this[_q] = new Damper();
        this[_r] = false;
        this[_s] = {
            clientX: 0,
            clientY: 0,
        };
        this[$onMouseMove] = (event) => this[$handlePointerMove](event);
        this[$onMouseDown] = (event) => this[$handlePointerDown](event);
        this[$onMouseUp] = (event) => this[$handlePointerUp](event);
        this[$onWheel] = (event) => this[$handleWheel](event);
        this[$onKeyDown] = (event) => this[$handleKey](event);
        this[$onTouchStart] = (event) => this[$handlePointerDown](event);
        this[$onTouchEnd] = (event) => this[$handlePointerUp](event);
        this[$onTouchMove] = (event) => this[$handlePointerMove](event);
        this[$options] = Object.assign({}, DEFAULT_OPTIONS);
        this.setOrbit(0, Math.PI / 2, 1);
        this.setFieldOfView(100);
        this.jumpToGoal();
    }
    get interactionEnabled() {
        return this[$interactionEnabled];
    }
    enableInteraction() {
        if (this[$interactionEnabled] === false) {
            const { element } = this;
            element.addEventListener('mousemove', this[$onMouseMove]);
            element.addEventListener('mousedown', this[$onMouseDown]);
            element.addEventListener('wheel', this[$onWheel]);
            element.addEventListener('keydown', this[$onKeyDown]);
            element.addEventListener('touchstart', this[$onTouchStart]);
            element.addEventListener('touchmove', this[$onTouchMove]);
            self.addEventListener('mouseup', this[$onMouseUp]);
            self.addEventListener('touchend', this[$onTouchEnd]);
            this.element.style.cursor = 'grab';
            this[$interactionEnabled] = true;
        }
    }
    disableInteraction() {
        if (this[$interactionEnabled] === true) {
            const { element } = this;
            element.removeEventListener('mousemove', this[$onMouseMove]);
            element.removeEventListener('mousedown', this[$onMouseDown]);
            element.removeEventListener('wheel', this[$onWheel]);
            element.removeEventListener('keydown', this[$onKeyDown]);
            element.removeEventListener('touchstart', this[$onTouchStart]);
            element.removeEventListener('touchmove', this[$onTouchMove]);
            self.removeEventListener('mouseup', this[$onMouseUp]);
            self.removeEventListener('touchend', this[$onTouchEnd]);
            element.style.cursor = '';
            this[$interactionEnabled] = false;
        }
    }
    /**
     * The options that are currently configured for the controls instance.
     */
    get options() {
        return this[$options];
    }
    /**
     * Copy the spherical values that represent the current camera orbital
     * position relative to the configured target into a provided Spherical
     * instance. If no Spherical is provided, a new Spherical will be allocated
     * to copy the values into. The Spherical that values are copied into is
     * returned.
     */
    getCameraSpherical(target = new Spherical()) {
        return target.copy(this[$spherical]);
    }
    /**
     * Returns the camera's current vertical field of view in degrees.
     */
    getFieldOfView() {
        return this.camera.fov;
    }
    /**
     * Configure the options of the controls. Configured options will be
     * merged with whatever options have already been configured for this
     * controls instance.
     */
    applyOptions(options) {
        Object.assign(this[$options], options);
        // Re-evaluates clamping based on potentially new values for min/max
        // polar, azimuth and radius:
        this.setOrbit();
        this.setFieldOfView(Math.exp(this[$goalLogFov]));
        // Prevent interpolation in the case that any target spherical values
        // changed (preserving OrbitalControls behavior):
        this.jumpToGoal();
    }
    /**
     * Sets the near and far planes of the camera.
     */
    updateNearFar(nearPlane, farPlane) {
        this.camera.near = Math.max(nearPlane, farPlane / 1000);
        this.camera.far = farPlane;
        this.camera.updateProjectionMatrix();
    }
    /**
     * Sets the aspect ratio of the camera
     */
    updateAspect(aspect) {
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }
    /**
     * Set the absolute orbital goal of the camera. The change will be
     * applied over a number of frames depending on configured acceleration and
     * dampening options.
     *
     * Returns true if invoking the method will result in the camera changing
     * position and/or rotation, otherwise false.
     */
    setOrbit(goalTheta = this[$goalSpherical].theta, goalPhi = this[$goalSpherical].phi, goalRadius = this[$goalSpherical].radius) {
        const { minimumAzimuthalAngle, maximumAzimuthalAngle, minimumPolarAngle, maximumPolarAngle, minimumRadius, maximumRadius } = this[$options];
        const { theta, phi, radius } = this[$goalSpherical];
        const nextTheta = clamp(goalTheta, minimumAzimuthalAngle, maximumAzimuthalAngle);
        if (!isFinite(minimumAzimuthalAngle) &&
            !isFinite(maximumAzimuthalAngle)) {
            this[$spherical].theta =
                this[$wrapAngle](this[$spherical].theta - nextTheta) + nextTheta;
        }
        const nextPhi = clamp(goalPhi, minimumPolarAngle, maximumPolarAngle);
        const nextRadius = clamp(goalRadius, minimumRadius, maximumRadius);
        if (nextTheta === theta && nextPhi === phi && nextRadius === radius) {
            return false;
        }
        this[$goalSpherical].theta = nextTheta;
        this[$goalSpherical].phi = nextPhi;
        this[$goalSpherical].radius = nextRadius;
        this[$goalSpherical].makeSafe();
        this[$isUserChange] = false;
        return true;
    }
    /**
     * Subset of setOrbit() above, which only sets the camera's radius.
     */
    setRadius(radius) {
        this[$goalSpherical].radius = radius;
        this.setOrbit();
    }
    /**
     * Sets the goal field of view for the camera
     */
    setFieldOfView(fov) {
        const { minimumFieldOfView, maximumFieldOfView } = this[$options];
        fov = clamp(fov, minimumFieldOfView, maximumFieldOfView);
        this[$goalLogFov] = Math.log(fov);
    }
    /**
     * Sets the target the camera is pointing toward
     */
    setTarget(x, y, z) {
        this[$goalTarget].set(x, y, z);
    }
    /**
     * Returns a copy of the target position the camera is pointed toward
     */
    getTarget() {
        return this[$target].clone();
    }
    /**
     * Adjust the orbital position of the camera relative to its current orbital
     * position. Does not let the theta goal get more than pi ahead of the current
     * theta, which ensures interpolation continues in the direction of the delta.
     */
    adjustOrbit(deltaTheta, deltaPhi, deltaRadius, deltaFov) {
        const { theta, phi, radius } = this[$goalSpherical];
        const dTheta = this[$spherical].theta - theta;
        const dThetaLimit = Math.PI - 0.001;
        const goalTheta = theta - clamp(deltaTheta, -dThetaLimit - dTheta, dThetaLimit - dTheta);
        const goalPhi = phi - deltaPhi;
        const goalRadius = radius + deltaRadius;
        let handled = this.setOrbit(goalTheta, goalPhi, goalRadius);
        if (deltaFov !== 0) {
            const goalLogFov = this[$goalLogFov] + deltaFov;
            this.setFieldOfView(Math.exp(goalLogFov));
            handled = true;
        }
        return handled;
    }
    /**
     * Move the camera instantly instead of accelerating toward the goal
     * parameters.
     */
    jumpToGoal() {
        this.update(0, 100 * DECAY_MILLISECONDS);
    }
    /**
     * Update controls. In most cases, this will result in the camera
     * interpolating its position and rotation until it lines up with the
     * designated goal orbital position.
     *
     * Time and delta are measured in milliseconds.
     */
    update(_time, delta) {
        if (this[$isStationary]()) {
            return;
        }
        const { maximumPolarAngle, maximumRadius, maximumFieldOfView } = this[$options];
        const dTheta = this[$spherical].theta - this[$goalSpherical].theta;
        if (Math.abs(dTheta) > Math.PI &&
            !isFinite(this[$options].minimumAzimuthalAngle) &&
            !isFinite(this[$options].maximumAzimuthalAngle)) {
            this[$spherical].theta -= Math.sign(dTheta) * 2 * Math.PI;
        }
        this[$spherical].theta = this[$thetaDamper].update(this[$spherical].theta, this[$goalSpherical].theta, delta, Math.PI);
        this[$spherical].phi = this[$phiDamper].update(this[$spherical].phi, this[$goalSpherical].phi, delta, maximumPolarAngle);
        this[$spherical].radius = this[$radiusDamper].update(this[$spherical].radius, this[$goalSpherical].radius, delta, maximumRadius);
        this[$logFov] = this[$fovDamper].update(this[$logFov], this[$goalLogFov], delta, maximumFieldOfView);
        this[$target].x = this[$targetDamperX].update(this[$target].x, this[$goalTarget].x, delta, maximumRadius);
        this[$target].y = this[$targetDamperY].update(this[$target].y, this[$goalTarget].y, delta, maximumRadius);
        this[$target].z = this[$targetDamperZ].update(this[$target].z, this[$goalTarget].z, delta, maximumRadius);
        this[$moveCamera]();
    }
    [(_b$b = $interactionEnabled, _c$5 = $isUserChange, _d$4 = $isUserPointing, _e$2 = $spherical, _f$2 = $goalSpherical, _g$2 = $thetaDamper, _h$1 = $phiDamper, _j$1 = $radiusDamper, _k$1 = $fovDamper, _l = $target, _m = $goalTarget, _o = $targetDamperX, _p = $targetDamperY, _q = $targetDamperZ, _r = $pointerIsDown, _s = $lastPointerPosition, $isStationary)]() {
        return this[$goalSpherical].theta === this[$spherical].theta &&
            this[$goalSpherical].phi === this[$spherical].phi &&
            this[$goalSpherical].radius === this[$spherical].radius &&
            this[$goalLogFov] === this[$logFov] &&
            this[$goalTarget].equals(this[$target]);
    }
    [$moveCamera]() {
        // Derive the new camera position from the updated spherical:
        this[$spherical].makeSafe();
        this.camera.position.setFromSpherical(this[$spherical]);
        this.camera.position.add(this[$target]);
        this.camera.setRotationFromEuler(new Euler(this[$spherical].phi - Math.PI / 2, this[$spherical].theta, 0, 'YXZ'));
        if (this.camera.fov !== Math.exp(this[$logFov])) {
            this.camera.fov = Math.exp(this[$logFov]);
            this.camera.updateProjectionMatrix();
        }
        const source = this[$isUserChange] ? ChangeSource.USER_INTERACTION : ChangeSource.NONE;
        this.dispatchEvent({ type: 'change', source });
    }
    get [$canInteract]() {
        if (this[$options].interactionPolicy == 'allow-when-focused') {
            const rootNode = this.element.getRootNode();
            return rootNode.activeElement === this.element;
        }
        return this[$options].interactionPolicy === 'always-allow';
    }
    [$userAdjustOrbit](deltaTheta, deltaPhi, deltaRadius, deltaFov) {
        const handled = this.adjustOrbit(deltaTheta, deltaPhi, deltaRadius, deltaFov);
        this[$isUserChange] = true;
        // Always make sure that an initial event is triggered in case there is
        // contention between user interaction and imperative changes. This initial
        // event will give external observers that chance to observe that
        // interaction occurred at all:
        this.dispatchEvent({ type: 'change', source: ChangeSource.USER_INTERACTION });
        return handled;
    }
    // Wraps to bewteen -pi and pi
    [$wrapAngle](radians) {
        const normalized = (radians + Math.PI) / (2 * Math.PI);
        const wrapped = normalized - Math.floor(normalized);
        return wrapped * 2 * Math.PI - Math.PI;
    }
    [$pixelLengthToSphericalAngle](pixelLength) {
        return 2 * Math.PI * pixelLength / this.element.clientHeight;
    }
    [$twoTouchDistance](touchOne, touchTwo) {
        const { clientX: xOne, clientY: yOne } = touchOne;
        const { clientX: xTwo, clientY: yTwo } = touchTwo;
        const xDelta = xTwo - xOne;
        const yDelta = yTwo - yOne;
        return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
    }
    [$handlePointerMove](event) {
        if (!this[$pointerIsDown] || !this[$canInteract]) {
            return;
        }
        let handled = false;
        // NOTE(cdata): We test event.type as some browsers do not have a global
        // TouchEvent contructor.
        if (TOUCH_EVENT_RE.test(event.type)) {
            const { touches } = event;
            switch (this[$touchMode]) {
                case 'zoom':
                    if (this[$lastTouches].length > 1 && touches.length > 1) {
                        const lastTouchDistance = this[$twoTouchDistance](this[$lastTouches][0], this[$lastTouches][1]);
                        const touchDistance = this[$twoTouchDistance](touches[0], touches[1]);
                        const deltaFov = -1 * ZOOM_SENSITIVITY *
                            (touchDistance - lastTouchDistance) / 10.0;
                        handled = this[$userAdjustOrbit](0, 0, 0, deltaFov);
                    }
                    break;
                case 'rotate':
                    handled = this[$handleSinglePointerMove](touches[0]);
                    break;
            }
            this[$lastTouches] = touches;
        }
        else {
            handled = this[$handleSinglePointerMove](event);
        }
        if ((handled || this[$options].eventHandlingBehavior === 'prevent-all') &&
            event.cancelable) {
            event.preventDefault();
        }
    }
    [$handleSinglePointerMove](pointer) {
        const { clientX, clientY } = pointer;
        const deltaTheta = this[$pixelLengthToSphericalAngle](clientX - this[$lastPointerPosition].clientX);
        const deltaPhi = this[$pixelLengthToSphericalAngle](clientY - this[$lastPointerPosition].clientY);
        this[$lastPointerPosition].clientX = clientX;
        this[$lastPointerPosition].clientY = clientY;
        if (this[$isUserPointing] === false) {
            this[$isUserPointing] = true;
            this.dispatchEvent({ type: 'pointer-change-start', pointer: Object.assign({}, pointer) });
        }
        return this[$userAdjustOrbit](deltaTheta, deltaPhi, 0, 0);
    }
    [$handlePointerDown](event) {
        this[$pointerIsDown] = true;
        this[$isUserPointing] = false;
        if (TOUCH_EVENT_RE.test(event.type)) {
            const { touches } = event;
            switch (touches.length) {
                default:
                case 1:
                    this[$touchMode] = 'rotate';
                    this[$handleSinglePointerDown](touches[0]);
                    break;
                case 2:
                    this[$touchMode] = 'zoom';
                    break;
            }
            this[$lastTouches] = touches;
        }
        else {
            this[$handleSinglePointerDown](event);
        }
    }
    [$handleSinglePointerDown](pointer) {
        this[$lastPointerPosition].clientX = pointer.clientX;
        this[$lastPointerPosition].clientY = pointer.clientY;
        this.element.style.cursor = 'grabbing';
    }
    [$handlePointerUp](_event) {
        this.element.style.cursor = 'grab';
        this[$pointerIsDown] = false;
        if (this[$isUserPointing]) {
            this.dispatchEvent({
                type: 'pointer-change-end',
                pointer: Object.assign({}, this[$lastPointerPosition])
            });
        }
    }
    [$handleWheel](event) {
        if (!this[$canInteract]) {
            return;
        }
        const deltaFov = event.deltaY * ZOOM_SENSITIVITY / 30;
        if ((this[$userAdjustOrbit](0, 0, 0, deltaFov) ||
            this[$options].eventHandlingBehavior === 'prevent-all') &&
            event.cancelable) {
            event.preventDefault();
        }
    }
    [$handleKey](event) {
        // We track if the key is actually one we respond to, so as not to
        // accidentally clober unrelated key inputs when the <model-viewer> has
        // focus and eventHandlingBehavior is set to 'prevent-all'.
        let relevantKey = false;
        let handled = false;
        switch (event.keyCode) {
            case KeyCode.PAGE_UP:
                relevantKey = true;
                handled = this[$userAdjustOrbit](0, 0, 0, ZOOM_SENSITIVITY);
                break;
            case KeyCode.PAGE_DOWN:
                relevantKey = true;
                handled = this[$userAdjustOrbit](0, 0, 0, -1 * ZOOM_SENSITIVITY);
                break;
            case KeyCode.UP:
                relevantKey = true;
                handled = this[$userAdjustOrbit](0, -KEYBOARD_ORBIT_INCREMENT, 0, 0);
                break;
            case KeyCode.DOWN:
                relevantKey = true;
                handled = this[$userAdjustOrbit](0, KEYBOARD_ORBIT_INCREMENT, 0, 0);
                break;
            case KeyCode.LEFT:
                relevantKey = true;
                handled = this[$userAdjustOrbit](-KEYBOARD_ORBIT_INCREMENT, 0, 0, 0);
                break;
            case KeyCode.RIGHT:
                relevantKey = true;
                handled = this[$userAdjustOrbit](KEYBOARD_ORBIT_INCREMENT, 0, 0, 0);
                break;
        }
        if (relevantKey &&
            (handled || this[$options].eventHandlingBehavior === 'prevent-all') &&
            event.cancelable) {
            event.preventDefault();
        }
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Adapted from https://gist.github.com/gre/1650294
const easeInOutQuad = (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
/**
 * Creates a TimingFunction that uses a given ease to interpolate between
 * two configured number values.
 */
const interpolate = (start, end, ease = easeInOutQuad) => (time) => start + (end - start) * ease(time);
/**
 * Creates a TimingFunction that interpolates through a weighted list
 * of other TimingFunctions ("tracks"). Tracks are interpolated in order, and
 * allocated a percentage of the total time based on their relative weight.
 */
const sequence = (tracks, weights) => {
    const totalWeight = weights.reduce((total, weight) => total + weight, 0);
    const ratios = weights.map(weight => weight / totalWeight);
    return (time) => {
        let start = 0;
        let ratio = Infinity;
        let track = () => 0;
        for (let i = 0; i < ratios.length; ++i) {
            ratio = ratios[i];
            track = tracks[i];
            if (time <= (start + ratio)) {
                break;
            }
            start += ratio;
        }
        return track((time - start) / ratio);
    };
};
/**
 * Creates a "timeline" TimingFunction out of an initial value and a series of
 * Keyframes. The timeline function accepts value from 0-1 and returns the
 * current value based on keyframe interpolation across the total number of
 * frames. Frames are only used to indicate the relative length of each keyframe
 * transition, so interpolated values will be computed for fractional frames.
 */
const timeline = (initialValue, keyframes) => {
    const tracks = [];
    const weights = [];
    let lastValue = initialValue;
    for (let i = 0; i < keyframes.length; ++i) {
        const keyframe = keyframes[i];
        const { value, frames } = keyframe;
        const ease = keyframe.ease || easeInOutQuad;
        const track = interpolate(lastValue, value, ease);
        tracks.push(track);
        weights.push(frames);
        lastValue = value;
    }
    return sequence(tracks, weights);
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// NOTE(cdata): The following "animation" timing functions are deliberately
// being used in favor of CSS animations. In Safari 12.1 and 13, CSS animations
// would cause the interaction prompt to glitch unexpectedly
// @see https://github.com/GoogleWebComponents/model-viewer/issues/839
const PROMPT_ANIMATION_TIME = 5000;
// For timing purposes, a "frame" is a timing agnostic relative unit of time
// and a "value" is a target value for the keyframe.
const wiggle = timeline(0, [
    { frames: 6, value: 0 },
    { frames: 5, value: -1 },
    { frames: 1, value: -1 },
    { frames: 8, value: 1 },
    { frames: 1, value: 1 },
    { frames: 5, value: 0 },
    { frames: 12, value: 0 }
]);
const fade = timeline(0, [
    { frames: 2, value: 0 },
    { frames: 1, value: 1 },
    { frames: 5, value: 1 },
    { frames: 1, value: 0 },
    { frames: 4, value: 0 }
]);
const InteractionPromptStrategy = {
    AUTO: 'auto',
    WHEN_FOCUSED: 'when-focused',
    NONE: 'none'
};
const InteractionPromptStyle = {
    BASIC: 'basic',
    WIGGLE: 'wiggle'
};
const InteractionPolicy = {
    ALWAYS_ALLOW: 'always-allow',
    WHEN_FOCUSED: 'allow-when-focused'
};
const DEFAULT_CAMERA_ORBIT = '0deg 75deg 105%';
const DEFAULT_CAMERA_TARGET = 'auto auto auto';
const DEFAULT_FIELD_OF_VIEW = 'auto';
const fieldOfViewIntrinsics = (element) => {
    return {
        basis: [numberNode(element[$zoomAdjustedFieldOfView] * Math.PI / 180, 'rad')],
        keywords: { auto: [null] }
    };
};
const minFieldOfViewIntrinsics = {
    basis: [degreesToRadians(numberNode(10, 'deg'))],
    keywords: { auto: [null] }
};
const maxFieldOfViewIntrinsics = (element) => {
    const scene = element[$scene];
    return {
        basis: [degreesToRadians(numberNode(45, 'deg'))],
        keywords: { auto: [numberNode(scene.framedFieldOfView, 'deg')] }
    };
};
const cameraOrbitIntrinsics = (() => {
    const defaultTerms = parseExpressions(DEFAULT_CAMERA_ORBIT)[0]
        .terms;
    const theta = normalizeUnit(defaultTerms[0]);
    const phi = normalizeUnit(defaultTerms[1]);
    return (element) => {
        const radius = element[$scene].model.idealCameraDistance;
        return {
            basis: [theta, phi, numberNode(radius, 'm')],
            keywords: { auto: [null, null, numberNode(105, '%')] }
        };
    };
})();
const minCameraOrbitIntrinsics = {
    basis: [
        numberNode(-Infinity, 'rad'),
        numberNode(Math.PI / 8, 'rad'),
        numberNode(0, 'm')
    ],
    keywords: { auto: [null, null, null] }
};
const maxCameraOrbitIntrinsics = {
    basis: [
        numberNode(Infinity, 'rad'),
        numberNode(Math.PI - Math.PI / 8, 'rad'),
        numberNode(Infinity, 'm')
    ],
    keywords: { auto: [null, null, null] }
};
const cameraTargetIntrinsics = (element) => {
    const center = element[$scene].model.boundingBox.getCenter(new Vector3);
    return {
        basis: [
            numberNode(center.x, 'm'),
            numberNode(center.y, 'm'),
            numberNode(center.z, 'm')
        ],
        keywords: { auto: [null, null, null] }
    };
};
const HALF_PI = Math.PI / 2.0;
const THIRD_PI = Math.PI / 3.0;
const QUARTER_PI = HALF_PI / 2.0;
const PHI = 2.0 * Math.PI;
const AZIMUTHAL_QUADRANT_LABELS = ['front', 'right', 'back', 'left'];
const POLAR_TRIENT_LABELS = ['upper-', '', 'lower-'];
const DEFAULT_INTERACTION_PROMPT_THRESHOLD = 3000;
const INTERACTION_PROMPT = 'Use mouse, touch or arrow keys to control the camera!';
const $controls = Symbol('controls');
const $promptElement = Symbol('promptElement');
const $promptAnimatedContainer = Symbol('promptAnimatedContainer');
const $deferInteractionPrompt = Symbol('deferInteractionPrompt');
const $updateAria = Symbol('updateAria');
const $updateCameraForRadius = Symbol('updateCameraForRadius');
const $blurHandler = Symbol('blurHandler');
const $focusHandler = Symbol('focusHandler');
const $changeHandler = Symbol('changeHandler');
const $pointerChangeHandler = Symbol('pointerChangeHandler');
const $onBlur = Symbol('onBlur');
const $onFocus = Symbol('onFocus');
const $onChange = Symbol('onChange');
const $onPointerChange = Symbol('onPointerChange');
const $shouldPromptUserToInteract = Symbol('shouldPromptUserToInteract');
const $waitingToPromptUser = Symbol('waitingToPromptUser');
const $userPromptedOnce = Symbol('userPromptedOnce');
const $promptElementVisibleTime = Symbol('promptElementVisibleTime');
const $lastPromptOffset = Symbol('lastPromptOffset');
const $focusedTime = Symbol('focusedTime');
const $zoomAdjustedFieldOfView = Symbol('zoomAdjustedFieldOfView');
const $lastSpherical = Symbol('lastSpherical');
const $jumpCamera = Symbol('jumpCamera');
const $syncCameraOrbit = Symbol('syncCameraOrbit');
const $syncFieldOfView = Symbol('syncFieldOfView');
const $syncCameraTarget = Symbol('syncCameraTarget');
const $syncMinCameraOrbit = Symbol('syncMinCameraOrbit');
const $syncMaxCameraOrbit = Symbol('syncMaxCameraOrbit');
const $syncMinFieldOfView = Symbol('syncMinFieldOfView');
const $syncMaxFieldOfView = Symbol('syncMaxFieldOfView');
const ControlsMixin = (ModelViewerElement) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    class ControlsModelViewerElement extends ModelViewerElement {
        constructor() {
            super(...arguments);
            this.cameraControls = false;
            this.cameraOrbit = DEFAULT_CAMERA_ORBIT;
            this.cameraTarget = DEFAULT_CAMERA_TARGET;
            this.fieldOfView = DEFAULT_FIELD_OF_VIEW;
            this.minCameraOrbit = 'auto';
            this.maxCameraOrbit = 'auto';
            this.minFieldOfView = 'auto';
            this.maxFieldOfView = 'auto';
            this.interactionPromptThreshold = DEFAULT_INTERACTION_PROMPT_THRESHOLD;
            this.interactionPromptStyle = InteractionPromptStyle.WIGGLE;
            this.interactionPrompt = InteractionPromptStrategy.AUTO;
            this.interactionPolicy = InteractionPolicy.ALWAYS_ALLOW;
            this[_a] = this.shadowRoot.querySelector('.interaction-prompt');
            this[_b] = this.shadowRoot.querySelector('.interaction-prompt > .animated-container');
            this[_c] = Infinity;
            this[_d] = 0;
            this[_e] = Infinity;
            this[_f] = false;
            this[_g] = false;
            this[_h] = true;
            this[_j] = new SmoothControls(this[$scene].getCamera(), this[$scene].canvas);
            this[_k] = 0;
            this[_l] = new Spherical();
            this[_m] = false;
            this[_o] = (event) => this[$onChange](event);
            this[_p] = (event) => this[$onPointerChange](event);
            this[_q] = () => this[$onFocus]();
            this[_r] = () => this[$onBlur]();
        }
        getCameraOrbit() {
            const { theta, phi, radius } = this[$lastSpherical];
            return { theta, phi, radius };
        }
        getCameraTarget() {
            return this[$controls].getTarget();
        }
        getFieldOfView() {
            return this[$controls].getFieldOfView();
        }
        jumpCameraToGoal() {
            this[$jumpCamera] = true;
            this.requestUpdate($jumpCamera, false);
        }
        resetInteractionPrompt() {
            this[$lastPromptOffset] = 0;
            this[$promptElementVisibleTime] = Infinity;
            this[$userPromptedOnce] = false;
            this[$waitingToPromptUser] =
                this.interactionPrompt === InteractionPromptStrategy.AUTO &&
                    this.cameraControls;
            this[$shouldPromptUserToInteract] = true;
        }
        connectedCallback() {
            super.connectedCallback();
            this[$controls].addEventListener('change', this[$changeHandler]);
            this[$controls].addEventListener('pointer-change-start', this[$pointerChangeHandler]);
            this[$controls].addEventListener('pointer-change-end', this[$pointerChangeHandler]);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this[$controls].removeEventListener('change', this[$changeHandler]);
            this[$controls].removeEventListener('pointer-change-start', this[$pointerChangeHandler]);
            this[$controls].removeEventListener('pointer-change-end', this[$pointerChangeHandler]);
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            const controls = this[$controls];
            const scene = this[$scene];
            if (changedProperties.has('cameraControls')) {
                if (this.cameraControls) {
                    controls.enableInteraction();
                    if (this.interactionPrompt === InteractionPromptStrategy.AUTO) {
                        this[$waitingToPromptUser] = true;
                    }
                    scene.canvas.addEventListener('focus', this[$focusHandler]);
                    scene.canvas.addEventListener('blur', this[$blurHandler]);
                }
                else {
                    scene.canvas.removeEventListener('focus', this[$focusHandler]);
                    scene.canvas.removeEventListener('blur', this[$blurHandler]);
                    controls.disableInteraction();
                    this[$deferInteractionPrompt]();
                }
            }
            if (changedProperties.has('interactionPrompt') ||
                changedProperties.has('cameraControls') ||
                changedProperties.has('src')) {
                if (this.interactionPrompt === InteractionPromptStrategy.AUTO &&
                    this.cameraControls) {
                    this[$waitingToPromptUser] = true;
                }
                else {
                    this[$deferInteractionPrompt]();
                }
            }
            if (changedProperties.has('interactionPromptStyle')) {
                this[$promptElement].classList.toggle('wiggle', this.interactionPromptStyle === InteractionPromptStyle.WIGGLE);
            }
            if (changedProperties.has('interactionPolicy')) {
                const interactionPolicy = this.interactionPolicy;
                controls.applyOptions({ interactionPolicy });
            }
            if (this[$jumpCamera] === true) {
                Promise.resolve().then(() => {
                    this[$controls].jumpToGoal();
                    this[$jumpCamera] = false;
                });
            }
        }
        [(_a = $promptElement, _b = $promptAnimatedContainer, _c = $focusedTime, _d = $lastPromptOffset, _e = $promptElementVisibleTime, _f = $userPromptedOnce, _g = $waitingToPromptUser, _h = $shouldPromptUserToInteract, _j = $controls, _k = $zoomAdjustedFieldOfView, _l = $lastSpherical, _m = $jumpCamera, _o = $changeHandler, _p = $pointerChangeHandler, _q = $focusHandler, _r = $blurHandler, $syncFieldOfView)](style) {
            this[$controls].setFieldOfView(style[0] * 180 / Math.PI);
        }
        [$syncCameraOrbit](style) {
            this[$updateCameraForRadius](style[2]);
            this[$controls].setOrbit(style[0], style[1], style[2]);
        }
        [$syncMinCameraOrbit](style) {
            this[$controls].applyOptions({
                minimumAzimuthalAngle: style[0],
                minimumPolarAngle: style[1],
                minimumRadius: style[2]
            });
        }
        [$syncMaxCameraOrbit](style) {
            this[$controls].applyOptions({
                maximumAzimuthalAngle: style[0],
                maximumPolarAngle: style[1],
                maximumRadius: style[2]
            });
        }
        [$syncMinFieldOfView](style) {
            this[$controls].applyOptions({ minimumFieldOfView: style[0] * 180 / Math.PI });
        }
        [$syncMaxFieldOfView](style) {
            this[$controls].applyOptions({ maximumFieldOfView: style[0] * 180 / Math.PI });
        }
        [$syncCameraTarget](style) {
            const [x, y, z] = style;
            const scene = this[$scene];
            this[$controls].setTarget(x, y, z);
            // TODO(#837): Mutating scene.pivotCenter should automatically adjust
            // pivot rotation
            scene.pivotCenter.set(x, y, z);
            scene.setPivotRotation(scene.getPivotRotation());
        }
        [$tick$1](time, delta) {
            super[$tick$1](time, delta);
            if (this[$waitingToPromptUser] &&
                this.interactionPrompt !== InteractionPromptStrategy.NONE) {
                const thresholdTime = this.interactionPrompt === InteractionPromptStrategy.AUTO ?
                    this[$loadedTime] :
                    this[$focusedTime];
                if (this.loaded &&
                    time > thresholdTime + this.interactionPromptThreshold) {
                    this[$scene].canvas.setAttribute('aria-label', INTERACTION_PROMPT);
                    // NOTE(cdata): After notifying users that the controls are
                    // available, we flag that the user has been prompted at least
                    // once, and then effectively stop the idle timer. If the camera
                    // orbit changes after this point, the user will never be prompted
                    // again for this particular <model-element> instance:
                    this[$userPromptedOnce] = true;
                    this[$waitingToPromptUser] = false;
                    this[$promptElementVisibleTime] = time;
                    this[$promptElement].classList.add('visible');
                }
            }
            if (isFinite(this[$promptElementVisibleTime]) &&
                this.interactionPromptStyle === InteractionPromptStyle.WIGGLE) {
                const scene = this[$scene];
                const animationTime = ((time - this[$promptElementVisibleTime]) / PROMPT_ANIMATION_TIME) %
                    1;
                const offset = wiggle(animationTime);
                const opacity = fade(animationTime);
                const xOffset = offset * scene.width * 0.05;
                const deltaTheta = (offset - this[$lastPromptOffset]) * Math.PI / 16;
                this[$promptAnimatedContainer].style.transform =
                    `translateX(${xOffset}px)`;
                this[$promptAnimatedContainer].style.opacity = `${opacity}`;
                this[$controls].adjustOrbit(deltaTheta, 0, 0, 0);
                this[$lastPromptOffset] = offset;
                this[$needsRender]();
            }
            this[$controls].update(time, delta);
            const target = this[$controls].getTarget();
            if (!this[$scene].pivotCenter.equals(target)) {
                this[$scene].pivotCenter.copy(target);
                this[$scene].setPivotRotation(this[$scene].getPivotRotation());
            }
        }
        [$deferInteractionPrompt]() {
            // Effectively cancel the timer waiting for user interaction:
            this[$waitingToPromptUser] = false;
            this[$promptElement].classList.remove('visible');
            this[$promptElementVisibleTime] = Infinity;
            // Implicitly there was some reason to defer the prompt. If the user
            // has been prompted at least once already, we no longer need to
            // prompt the user, although if they have never been prompted we
            // should probably prompt them at least once just in case.
            if (this[$userPromptedOnce]) {
                this[$shouldPromptUserToInteract] = false;
            }
        }
        /**
         * Updates the camera's near and far planes to enclose the scene when
         * orbiting at the supplied radius.
         */
        [$updateCameraForRadius](radius) {
            const { idealCameraDistance } = this[$scene].model;
            const maximumRadius = Math.max(idealCameraDistance, radius);
            const near = 0;
            const far = 2 * maximumRadius;
            this[$controls].updateNearFar(near, far);
        }
        [$updateAria]() {
            // NOTE(cdata): It is possible that we might want to record the
            // last spherical when the label actually changed. Right now, the
            // side-effect the current implementation is that we will only
            // announce the first view change that occurs after the element
            // becomes focused.
            const { theta: lastTheta, phi: lastPhi } = this[$lastSpherical];
            const { theta, phi } = this[$controls].getCameraSpherical(this[$lastSpherical]);
            const rootNode = this.getRootNode();
            // Only change the aria-label if <model-viewer> is currently focused:
            if (rootNode != null && rootNode.activeElement === this) {
                const lastAzimuthalQuadrant = (4 + Math.floor(((lastTheta % PHI) + QUARTER_PI) / HALF_PI)) % 4;
                const azimuthalQuadrant = (4 + Math.floor(((theta % PHI) + QUARTER_PI) / HALF_PI)) % 4;
                const lastPolarTrient = Math.floor(lastPhi / THIRD_PI);
                const polarTrient = Math.floor(phi / THIRD_PI);
                if (azimuthalQuadrant !== lastAzimuthalQuadrant ||
                    polarTrient !== lastPolarTrient) {
                    const { canvas } = this[$scene];
                    const azimuthalQuadrantLabel = AZIMUTHAL_QUADRANT_LABELS[azimuthalQuadrant];
                    const polarTrientLabel = POLAR_TRIENT_LABELS[polarTrient];
                    const ariaLabel = `View from stage ${polarTrientLabel}${azimuthalQuadrantLabel}`;
                    canvas.setAttribute('aria-label', ariaLabel);
                }
            }
        }
        [$onResize](event) {
            const controls = this[$controls];
            const oldFramedFieldOfView = this[$scene].framedFieldOfView;
            // The super of $onResize will update the scene's framedFieldOfView, so we
            // compare the before and after to calculate the proper zoom.
            super[$onResize](event);
            const newFramedFieldOfView = this[$scene].framedFieldOfView;
            const zoom = controls.getFieldOfView() / oldFramedFieldOfView;
            this[$zoomAdjustedFieldOfView] = newFramedFieldOfView * zoom;
            controls.updateAspect(this[$scene].aspect);
            this.requestUpdate('maxFieldOfView', this.maxFieldOfView);
            this.requestUpdate('fieldOfView', this.fieldOfView);
            this.jumpCameraToGoal();
        }
        [$onModelLoad](event) {
            super[$onModelLoad](event);
            const { framedFieldOfView } = this[$scene];
            this[$zoomAdjustedFieldOfView] = framedFieldOfView;
            this.requestUpdate('maxFieldOfView', this.maxFieldOfView);
            this.requestUpdate('fieldOfView', this.fieldOfView);
            this.requestUpdate('cameraOrbit', this.cameraOrbit);
            this.requestUpdate('cameraTarget', this.cameraTarget);
            this.jumpCameraToGoal();
        }
        [$onFocus]() {
            const { canvas } = this[$scene];
            if (!isFinite(this[$focusedTime])) {
                this[$focusedTime] = performance.now();
            }
            // NOTE(cdata): On every re-focus, we switch the aria-label back to
            // the original, non-prompt label if appropriate. If the user has
            // already interacted, they no longer need to hear the prompt.
            // Otherwise, they will hear it again after the idle prompt threshold
            // has been crossed.
            const ariaLabel = this[$ariaLabel];
            if (canvas.getAttribute('aria-label') !== ariaLabel) {
                canvas.setAttribute('aria-label', ariaLabel);
            }
            // NOTE(cdata): When focused, if the user has yet to interact with the
            // camera controls (that is, we "should" prompt the user), we begin
            // the idle timer and indicate that we are waiting for it to cross the
            // prompt threshold:
            if (!isFinite(this[$promptElementVisibleTime]) &&
                this[$shouldPromptUserToInteract]) {
                this[$waitingToPromptUser] = true;
            }
        }
        [$onBlur]() {
            this[$waitingToPromptUser] = false;
            this[$promptElement].classList.remove('visible');
            this[$promptElementVisibleTime] = Infinity;
            this[$focusedTime] = Infinity;
        }
        [$onChange]({ source }) {
            this[$updateAria]();
            this[$needsRender]();
            if (source === ChangeSource.USER_INTERACTION) {
                this[$deferInteractionPrompt]();
            }
            this.dispatchEvent(new CustomEvent('camera-change', { detail: { source } }));
        }
        [$onPointerChange](event) {
            if (event.type === 'pointer-change-start') {
                this[$container].classList.add('pointer-tumbling');
            }
            else {
                this[$container].classList.remove('pointer-tumbling');
            }
        }
    }
    __decorate$3([
        property({ type: Boolean, attribute: 'camera-controls' })
    ], ControlsModelViewerElement.prototype, "cameraControls", void 0);
    __decorate$3([
        style({
            intrinsics: cameraOrbitIntrinsics,
            observeEffects: true,
            updateHandler: $syncCameraOrbit
        }),
        property({ type: String, attribute: 'camera-orbit', hasChanged: () => true })
    ], ControlsModelViewerElement.prototype, "cameraOrbit", void 0);
    __decorate$3([
        style({
            intrinsics: cameraTargetIntrinsics,
            observeEffects: true,
            updateHandler: $syncCameraTarget
        }),
        property({ type: String, attribute: 'camera-target', hasChanged: () => true })
    ], ControlsModelViewerElement.prototype, "cameraTarget", void 0);
    __decorate$3([
        style({
            intrinsics: fieldOfViewIntrinsics,
            observeEffects: true,
            updateHandler: $syncFieldOfView
        }),
        property({ type: String, attribute: 'field-of-view', hasChanged: () => true })
    ], ControlsModelViewerElement.prototype, "fieldOfView", void 0);
    __decorate$3([
        style({
            intrinsics: minCameraOrbitIntrinsics,
            updateHandler: $syncMinCameraOrbit
        }),
        property({ type: String, attribute: 'min-camera-orbit', hasChanged: () => true })
    ], ControlsModelViewerElement.prototype, "minCameraOrbit", void 0);
    __decorate$3([
        style({
            intrinsics: maxCameraOrbitIntrinsics,
            updateHandler: $syncMaxCameraOrbit
        }),
        property({ type: String, attribute: 'max-camera-orbit', hasChanged: () => true })
    ], ControlsModelViewerElement.prototype, "maxCameraOrbit", void 0);
    __decorate$3([
        style({
            intrinsics: minFieldOfViewIntrinsics,
            updateHandler: $syncMinFieldOfView
        }),
        property({ type: String, attribute: 'min-field-of-view', hasChanged: () => true })
    ], ControlsModelViewerElement.prototype, "minFieldOfView", void 0);
    __decorate$3([
        style({
            intrinsics: maxFieldOfViewIntrinsics,
            updateHandler: $syncMaxFieldOfView
        }),
        property({ type: String, attribute: 'max-field-of-view', hasChanged: () => true })
    ], ControlsModelViewerElement.prototype, "maxFieldOfView", void 0);
    __decorate$3([
        property({ type: Number, attribute: 'interaction-prompt-threshold' })
    ], ControlsModelViewerElement.prototype, "interactionPromptThreshold", void 0);
    __decorate$3([
        property({ type: String, attribute: 'interaction-prompt-style' })
    ], ControlsModelViewerElement.prototype, "interactionPromptStyle", void 0);
    __decorate$3([
        property({ type: String, attribute: 'interaction-prompt' })
    ], ControlsModelViewerElement.prototype, "interactionPrompt", void 0);
    __decorate$3([
        property({ type: String, attribute: 'interaction-policy' })
    ], ControlsModelViewerElement.prototype, "interactionPolicy", void 0);
    return ControlsModelViewerElement;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const DEFAULT_SHADOW_INTENSITY = 0.0;
const DEFAULT_SHADOW_SOFTNESS = 1.0;
const DEFAULT_EXPOSURE = 1.0;
const $currentEnvironmentMap = Symbol('currentEnvironmentMap');
const $applyEnvironmentMap = Symbol('applyEnvironmentMap');
const $updateEnvironment = Symbol('updateEnvironment');
const $cancelEnvironmentUpdate = Symbol('cancelEnvironmentUpdate');
const EnvironmentMixin = (ModelViewerElement) => {
    var _a, _b;
    class EnvironmentModelViewerElement extends ModelViewerElement {
        constructor() {
            super(...arguments);
            this.environmentImage = null;
            this.skyboxImage = null;
            this.shadowIntensity = DEFAULT_SHADOW_INTENSITY;
            this.shadowSoftness = DEFAULT_SHADOW_SOFTNESS;
            this.exposure = DEFAULT_EXPOSURE;
            this[_a] = null;
            this[_b] = null;
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('shadowIntensity')) {
                this[$scene].setShadowIntensity(this.shadowIntensity);
                this[$needsRender]();
            }
            if (changedProperties.has('shadowSoftness')) {
                this[$scene].setShadowSoftness(this.shadowSoftness);
                this[$needsRender]();
            }
            if (changedProperties.has('exposure')) {
                this[$scene].exposure = this.exposure;
                this[$needsRender]();
            }
            if (changedProperties.has('environmentImage') ||
                changedProperties.has('skyboxImage') ||
                changedProperties.has('experimentalPmrem') ||
                changedProperties.has($isInRenderTree)) {
                this[$updateEnvironment]();
            }
        }
        [(_a = $currentEnvironmentMap, _b = $cancelEnvironmentUpdate, $onModelLoad)](event) {
            super[$onModelLoad](event);
            if (this[$currentEnvironmentMap] != null) {
                this[$applyEnvironmentMap](this[$currentEnvironmentMap]);
            }
        }
        async [$updateEnvironment]() {
            if (!this[$isInRenderTree]) {
                return;
            }
            const { skyboxImage, environmentImage } = this;
            if (this[$cancelEnvironmentUpdate] != null) {
                this[$cancelEnvironmentUpdate]();
                this[$cancelEnvironmentUpdate] = null;
            }
            const { textureUtils } = this[$renderer];
            if (textureUtils == null) {
                return;
            }
            try {
                const { environmentMap, skybox } = await new Promise(async (resolve, reject) => {
                    const texturesLoad = textureUtils.generateEnvironmentMapAndSkybox(skyboxImage, environmentImage, { progressTracker: this[$progressTracker] });
                    this[$cancelEnvironmentUpdate] = () => reject(texturesLoad);
                    resolve(await texturesLoad);
                });
                if (skybox != null) {
                    this[$scene].background = skybox.texture;
                }
                else {
                    this[$scene].background = null;
                }
                this[$applyEnvironmentMap](environmentMap.texture);
                this[$scene].model.dispatchEvent({ type: 'envmap-update' });
            }
            catch (errorOrPromise) {
                if (errorOrPromise instanceof Error) {
                    this[$applyEnvironmentMap](null);
                    throw errorOrPromise;
                }
                const { environmentMap, skybox } = await errorOrPromise;
                if (environmentMap != null) {
                    environmentMap.dispose();
                }
                if (skybox != null) {
                    skybox.dispose();
                }
            }
        }
        /**
         * Sets the Model to use the provided environment map,
         * or `null` if the Model should remove its' environment map.
         */
        [$applyEnvironmentMap](environmentMap) {
            this[$currentEnvironmentMap] = environmentMap;
            this[$scene].environment = this[$currentEnvironmentMap];
            this.dispatchEvent(new CustomEvent('environment-change'));
            this[$needsRender]();
        }
    }
    __decorate$4([
        property({
            type: String,
            attribute: 'environment-image',
            converter: { fromAttribute: deserializeUrl }
        })
    ], EnvironmentModelViewerElement.prototype, "environmentImage", void 0);
    __decorate$4([
        property({
            type: String,
            attribute: 'skybox-image',
            converter: { fromAttribute: deserializeUrl }
        })
    ], EnvironmentModelViewerElement.prototype, "skyboxImage", void 0);
    __decorate$4([
        property({ type: Number, attribute: 'shadow-intensity' })
    ], EnvironmentModelViewerElement.prototype, "shadowIntensity", void 0);
    __decorate$4([
        property({ type: Number, attribute: 'shadow-softness' })
    ], EnvironmentModelViewerElement.prototype, "shadowSoftness", void 0);
    __decorate$4([
        property({
            type: Number,
        })
    ], EnvironmentModelViewerElement.prototype, "exposure", void 0);
    return EnvironmentModelViewerElement;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$d, _b$c;
const INITIAL_STATUS_ANNOUNCEMENT = 'This page includes one or more 3D models that are loading';
const FINISHED_LOADING_ANNOUNCEMENT = 'All 3D models in the page have loaded';
const UPDATE_STATUS_DEBOUNCE_MS = 100;
const $modelViewerStatusInstance = Symbol('modelViewerStatusInstance');
const $updateStatus = Symbol('updateStatus');
/**
 * The LoadingStatusAnnouncer manages announcements of loading status across
 * all <model-viewer> elements in the document at any given time. As new
 * <model-viewer> elements are connected to the document, they are registered
 * with a LoadingStatusAnnouncer singleton. As they are disconnected, the are
 * also unregistered. Announcements are made to indicate the following
 * conditions:
 *
 *  1. There are <model-viewer> elements that have yet to finish loading
 *  2. All <model-viewer> elements in the page have finished attempting to load
 */
class LoadingStatusAnnouncer extends EventDispatcher {
    constructor() {
        super();
        /**
         * The "status" instance is the <model-viewer> instance currently designated
         * to announce the loading status of all <model-viewer> elements in the
         * document at any given time. It might change as <model-viewer> elements are
         * attached or detached over time.
         */
        this[_a$d] = null;
        this.registeredInstanceStatuses = new Map();
        this.loadingPromises = [];
        /**
         * This element is a node that floats around the document as the status
         * instance changes (see above). It is a singleton that represents the loading
         * status for all <model-viewer> elements currently in the page. It has its
         * role attribute set to "status", which causes screen readers to announce
         * any changes to its text content.
         *
         * @see https://www.w3.org/TR/wai-aria-1.1/#status
         */
        this.statusElement = document.createElement('p');
        this.statusUpdateInProgress = false;
        this[_b$c] = debounce(() => this.updateStatus(), UPDATE_STATUS_DEBOUNCE_MS);
        const { statusElement } = this;
        const { style } = statusElement;
        statusElement.setAttribute('role', 'status');
        statusElement.classList.add('screen-reader-only');
        style.top = style.left = '0';
        style.pointerEvents = 'none';
    }
    /**
     * Register a <model-viewer> element with the announcer. If it is not yet
     * loaded, its loading status will be tracked by the announcer.
     */
    registerInstance(modelViewer) {
        if (this.registeredInstanceStatuses.has(modelViewer)) {
            return;
        }
        let onUnregistered = () => { };
        const loadShouldBeMeasured = modelViewer.loaded === false && !!modelViewer.src;
        const loadAttemptCompletes = new Promise((resolve) => {
            if (!loadShouldBeMeasured) {
                resolve();
                return;
            }
            const resolveHandler = () => {
                resolve();
                modelViewer.removeEventListener('load', resolveHandler);
                modelViewer.removeEventListener('error', resolveHandler);
            };
            modelViewer.addEventListener('load', resolveHandler);
            modelViewer.addEventListener('error', resolveHandler);
            onUnregistered = resolveHandler;
        });
        this.registeredInstanceStatuses.set(modelViewer, { onUnregistered });
        this.loadingPromises.push(loadAttemptCompletes);
        if (this.modelViewerStatusInstance == null) {
            this.modelViewerStatusInstance = modelViewer;
        }
    }
    /**
     * Unregister a <model-viewer> element with the announcer. Its loading status
     * will no longer be tracked by the announcer.
     */
    unregisterInstance(modelViewer) {
        if (!this.registeredInstanceStatuses.has(modelViewer)) {
            return;
        }
        const statuses = this.registeredInstanceStatuses;
        const instanceStatus = statuses.get(modelViewer);
        statuses.delete(modelViewer);
        instanceStatus.onUnregistered();
        if (this.modelViewerStatusInstance === modelViewer) {
            this.modelViewerStatusInstance = statuses.size > 0 ?
                getFirstMapKey(statuses) :
                null;
        }
    }
    get modelViewerStatusInstance() {
        return this[$modelViewerStatusInstance];
    }
    set modelViewerStatusInstance(value) {
        const currentInstance = this[$modelViewerStatusInstance];
        if (currentInstance === value) {
            return;
        }
        const { statusElement } = this;
        if (value != null && value.shadowRoot != null) {
            value.shadowRoot.appendChild(statusElement);
        }
        else if (statusElement.parentNode != null) {
            statusElement.parentNode.removeChild(statusElement);
        }
        this[$modelViewerStatusInstance] = value;
        this[$updateStatus]();
    }
    async updateStatus() {
        if (this.statusUpdateInProgress || this.loadingPromises.length === 0) {
            return;
        }
        this.statusElement.textContent = INITIAL_STATUS_ANNOUNCEMENT;
        this.statusUpdateInProgress = true;
        this.dispatchEvent({ type: 'initial-status-announced' });
        while (this.loadingPromises.length) {
            const { loadingPromises } = this;
            this.loadingPromises = [];
            await Promise.all(loadingPromises);
        }
        this.statusElement.textContent = FINISHED_LOADING_ANNOUNCEMENT;
        this.statusUpdateInProgress = false;
        this.dispatchEvent({ type: 'finished-loading-announced' });
    }
}
_a$d = $modelViewerStatusInstance, _b$c = $updateStatus;

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const PROGRESS_BAR_UPDATE_THRESHOLD = 100;
const PROGRESS_MASK_BASE_OPACITY = 0.2;
const ANNOUNCE_MODEL_VISIBILITY_DEBOUNCE_THRESHOLD = 0;
const DEFAULT_DRACO_DECODER_LOCATION = 'https://www.gstatic.com/draco/versioned/decoders/1.3.5/';
const SPACE_KEY = 32;
const ENTER_KEY = 13;
const RevealStrategy = {
    AUTO: 'auto',
    INTERACTION: 'interaction'
};
const PosterDismissalSource = {
    INTERACTION: 'interaction'
};
const loader = new CachingGLTFLoader();
const loadingStatusAnnouncer = new LoadingStatusAnnouncer();
const $defaultProgressBarElement = Symbol('defaultProgressBarElement');
const $defaultProgressMaskElement = Symbol('defaultProgressMaskElement');
const $posterContainerElement = Symbol('posterContainerElement');
const $defaultPosterElement = Symbol('defaultPosterElement');
const $posterDismissalSource = Symbol('posterDismissalSource');
const $announceModelVisibility = Symbol('announceModelVisibility');
const $modelIsReadyForReveal = Symbol('modelIsReadyForReveal');
const $shouldAttemptPreload = Symbol('shouldAttemptPreload');
const $shouldRevealModel = Symbol('shouldRevealModel');
const $showPoster = Symbol('showPoster');
const $hidePoster = Symbol('hidePoster');
const $modelIsVisible = Symbol('modelIsVisible');
const $preloadAttempted = Symbol('preloadAttempted');
const $sourceUpdated = Symbol('sourceUpdated');
const $updateLoadingAndVisibility = Symbol('updateLoadingAndVisibility');
const $updateProgressBar = Symbol('updateProgressBar');
const $lastReportedProgress = Symbol('lastReportedProgress');
const $ariaLabelCallToAction = Symbol('ariaLabelCallToAction');
const $clickHandler = Symbol('clickHandler');
const $keydownHandler = Symbol('keydownHandler');
const $progressHandler = Symbol('processHandler');
const $onClick = Symbol('onClick');
const $onKeydown = Symbol('onKeydown');
const $onProgress = Symbol('onProgress');
/**
 * LoadingMixin implements features related to lazy loading, as well as
 * presentation details related to the pre-load / pre-render presentation of a
 * <model-viewer>
 *
 * This mixin implements support for models with DRACO-compressed meshes.
 * The DRACO decoder will be loaded on-demand if a glTF that uses the DRACO mesh
 * compression extension is encountered.
 *
 * By default, the DRACO decoder will be loaded from a Google CDN. It is
 * possible to customize where the decoder is loaded from by defining a global
 * configuration option for `<model-viewer>` like so:
 *
 * ```html
 * <script>
 * ModelViewerElement = self.ModelViewerElement || {};
 * ModelViewerElement.dracoDecoderLocation =
 *     'http://example.com/location/of/draco/decoder/files/';
 * </script>
 * ```
 *
 * Note that the above configuration strategy must be performed *before* the
 * first `<model-viewer>` element is created in the browser. The configuration
 * can be done anywhere, but the easiest way to ensure it is done at the right
 * time is to do it in the `<head>` of the HTML document. This is the
 * recommended way to set the location because it is most compatible with
 * scenarios where the `<model-viewer>` library is lazily loaded.
 *
 * If you absolutely have to set the DRACO decoder location *after* the first
 * `<model-viewer>` element is created, you can do it this way:
 *
 * ```html
 * <script>
 * const ModelViewerElement = customElements.get('model-viewer');
 * ModelViewerElement.dracoDecoderLocation =
 *     'http://example.com/location/of/draco/decoder/files/';
 * </script>
 * ```
 *
 * Note that the above configuration approach will not work until *after*
 * `<model-viewer>` is defined in the browser. Also note that this configuration
 * *must* be set *before* the first DRACO model is fully loaded.
 *
 * It is recommended that users who intend to take advantage of DRACO mesh
 * compression consider whether or not it is acceptable for their use case to
 * have code side-loaded from a Google CDN. If it is not acceptable, then the
 * location must be customized before loading any DRACO models in order to cause
 * the decoder to be loaded from an alternative, acceptable location.
 */
const LoadingMixin = (ModelViewerElement) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    class LoadingModelViewerElement extends ModelViewerElement {
        constructor(...args) {
            super(...args);
            /**
             * A URL pointing to the image to use as a poster in scenarios where the
             * <model-viewer> is not ready to reveal a rendered model to the viewer.
             */
            this.poster = null;
            /**
             * An enumerable attribute describing under what conditions the
             * <model-viewer> should reveal a model to the viewer.
             *
             * The default value is "auto". The only supported alternative value as
             * of now is "interaction".
             */
            this.reveal = RevealStrategy.AUTO;
            /**
             * If true, a configured model file will be aggressively loaded, even if
             * the <model-viewer> is only configured to reveal upon interaction.
             */
            this.preload = false;
            this[_a] = false;
            this[_b] = false;
            this[_c] = false;
            this[_d] = 0;
            this[_e] = null;
            // TODO: Add this to the shadow root as part of this mixin's
            // implementation:
            this[_f] = this.shadowRoot.querySelector('.slot.poster');
            this[_g] = this.shadowRoot.querySelector('#default-poster');
            this[_h] = this.shadowRoot.querySelector('#default-progress-bar > .bar');
            this[_j] = this.shadowRoot.querySelector('#default-progress-bar > .mask');
            this[_k] = this[$defaultPosterElement].getAttribute('aria-label');
            this[_l] = () => this[$onClick]();
            this[_m] = (event) => this[$onKeydown](event);
            this[_o] = (event) => this[$onProgress](event);
            this[_p] = debounce((visible) => {
                this.dispatchEvent(new CustomEvent('model-visibility', { detail: { visible } }));
            }, ANNOUNCE_MODEL_VISIBILITY_DEBOUNCE_THRESHOLD);
            this[_q] = throttle((progress) => {
                const parentNode = this[$defaultProgressBarElement].parentNode;
                requestAnimationFrame(() => {
                    this[$defaultProgressMaskElement].style.opacity =
                        `${(1.0 - progress) * PROGRESS_MASK_BASE_OPACITY}`;
                    this[$defaultProgressBarElement].style.transform =
                        `scaleX(${progress})`;
                    if (progress === 0) {
                        // NOTE(cdata): We remove and re-append the progress bar in this
                        // condition so that the progress bar does not appear to
                        // transition backwards from the right when we reset to 0 (or
                        // otherwise <1) progress after having already reached 1 progress
                        // previously.
                        parentNode.removeChild(this[$defaultProgressBarElement]);
                        parentNode.appendChild(this[$defaultProgressBarElement]);
                    }
                    // NOTE(cdata): IE11 does not properly respect the second parameter
                    // of classList.toggle, which this implementation originally used.
                    // @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11865865/
                    if (progress === 1.0) {
                        this[$defaultProgressBarElement].classList.add('hide');
                    }
                    else {
                        this[$defaultProgressBarElement].classList.remove('hide');
                    }
                });
            }, PROGRESS_BAR_UPDATE_THRESHOLD);
            const ModelViewerElement = self.ModelViewerElement || {};
            const dracoDecoderLocation = ModelViewerElement.dracoDecoderLocation ||
                DEFAULT_DRACO_DECODER_LOCATION;
            CachingGLTFLoader.setDRACODecoderLocation(dracoDecoderLocation);
        }
        static set dracoDecoderLocation(value) {
            CachingGLTFLoader.setDRACODecoderLocation(value);
        }
        static get dracoDecoderLocation() {
            return CachingGLTFLoader.getDRACODecoderLocation();
        }
        /**
         * If provided, the callback will be passed each resource URL before a
         * request is sent. The callback may return the original URL, or a new URL
         * to override loading behavior. This behavior can be used to load assets
         * from .ZIP files, drag-and-drop APIs, and Data URIs.
         */
        static mapURLs(callback) {
            loader[$loader].manager.setURLModifier(callback);
        }
        /**
         * Dismisses the poster, causing the model to load and render if
         * necessary. This is currently effectively the same as interacting with
         * the poster via user input.
         */
        dismissPoster() {
            this[$posterDismissalSource] = PosterDismissalSource.INTERACTION;
            this.requestUpdate();
        }
        connectedCallback() {
            super.connectedCallback();
            // Fired when a user first clicks the model element. Used to
            // change the visibility of a poster image, or start loading
            // a model.
            this[$posterContainerElement].addEventListener('click', this[$clickHandler]);
            this[$posterContainerElement].addEventListener('keydown', this[$keydownHandler]);
            this[$progressTracker].addEventListener('progress', this[$progressHandler]);
            loadingStatusAnnouncer.registerInstance(this);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this[$posterContainerElement].removeEventListener('click', this[$clickHandler]);
            this[$posterContainerElement].removeEventListener('keydown', this[$keydownHandler]);
            this[$progressTracker].removeEventListener('progress', this[$progressHandler]);
            loadingStatusAnnouncer.unregisterInstance(this);
        }
        async updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('poster') && this.poster != null) {
                this[$defaultPosterElement].style.backgroundImage =
                    `url(${this.poster})`;
            }
            if (changedProperties.has('src')) {
                if (!this[$modelIsReadyForReveal]) {
                    this[$lastReportedProgress] = 0;
                }
                this[$posterDismissalSource] = null;
                this[$preloadAttempted] = false;
                this[$sourceUpdated] = false;
            }
            if (changedProperties.has('alt')) {
                this[$defaultPosterElement].setAttribute('aria-label', `${this[$ariaLabel]}. ${this[$ariaLabelCallToAction]}`);
            }
            this[$updateLoadingAndVisibility]();
        }
        [(_a = $modelIsVisible, _b = $preloadAttempted, _c = $sourceUpdated, _d = $lastReportedProgress, _e = $posterDismissalSource, _f = $posterContainerElement, _g = $defaultPosterElement, _h = $defaultProgressBarElement, _j = $defaultProgressMaskElement, _k = $ariaLabelCallToAction, _l = $clickHandler, _m = $keydownHandler, _o = $progressHandler, _p = $announceModelVisibility, _q = $updateProgressBar, $onClick)]() {
            this[$posterDismissalSource] = PosterDismissalSource.INTERACTION;
            this.requestUpdate();
        }
        [$onKeydown](event) {
            switch (event.keyCode) {
                // NOTE(cdata): Links and buttons can typically be activated with
                // both spacebar and enter to produce a synthetic click action
                case SPACE_KEY:
                case ENTER_KEY:
                    this[$posterDismissalSource] = PosterDismissalSource.INTERACTION;
                    break;
            }
            this.requestUpdate();
        }
        [$onProgress](event) {
            const progress = event.detail.totalProgress;
            this.requestUpdate();
            if (progress === 1.0) {
                this[$updateProgressBar].flush();
            }
            this[$updateProgressBar](progress);
            this.dispatchEvent(new CustomEvent('progress', { detail: { totalProgress: progress } }));
            this[$lastReportedProgress] =
                Math.max(progress, this[$lastReportedProgress]);
        }
        get [$modelIsReadyForReveal]() {
            const { src } = this;
            return !!src && CachingGLTFLoader.hasFinishedLoading(src) &&
                this[$lastReportedProgress] === 1.0 && this[$shouldRevealModel];
        }
        get [$shouldRevealModel]() {
            return this.reveal === RevealStrategy.AUTO ||
                !!this[$posterDismissalSource];
        }
        get [$shouldAttemptPreload]() {
            const { src } = this;
            return !!src && (this.preload || this[$shouldRevealModel]) &&
                this[$isInRenderTree];
        }
        async [$updateLoadingAndVisibility]() {
            if (this[$shouldAttemptPreload] && !this[$preloadAttempted]) {
                this[$preloadAttempted] = true;
                const updatePreloadProgress = this[$progressTracker].beginActivity();
                try {
                    const src = this.src;
                    const detail = { url: src };
                    await loader.preload(src, updatePreloadProgress);
                    this.dispatchEvent(new CustomEvent('preload', { detail }));
                }
                catch (error) {
                    this.dispatchEvent(new CustomEvent('error', { detail: { type: 'loadfailure', sourceError: error } }));
                }
                finally {
                    updatePreloadProgress(1.0);
                    this.requestUpdate();
                }
            }
            if (this[$modelIsReadyForReveal]) {
                await this[$updateSource]();
            }
            else {
                this[$showPoster]();
            }
        }
        [$showPoster]() {
            const posterContainerElement = this[$posterContainerElement];
            const defaultPosterElement = this[$defaultPosterElement];
            const posterContainerOpacity = parseFloat(self.getComputedStyle(posterContainerElement).opacity);
            defaultPosterElement.removeAttribute('tabindex');
            defaultPosterElement.removeAttribute('aria-hidden');
            posterContainerElement.classList.add('show');
            if (posterContainerOpacity < 1.0) {
                posterContainerElement.addEventListener('transitionend', () => {
                    this[$modelIsVisible] = false;
                    this[$announceModelVisibility](false);
                }, { once: true });
            }
        }
        [$hidePoster]() {
            const posterContainerElement = this[$posterContainerElement];
            const defaultPosterElement = this[$defaultPosterElement];
            if (posterContainerElement.classList.contains('show')) {
                posterContainerElement.classList.remove('show');
                // We might need to forward focus to our internal canvas, but that
                // cannot happen until the poster has completely transitioned away
                posterContainerElement.addEventListener('transitionend', () => {
                    this[$announceModelVisibility](true);
                    requestAnimationFrame(() => {
                        this[$modelIsVisible] = true;
                        const root = this.getRootNode();
                        // If the <model-viewer> is still focused, forward the focus to
                        // the canvas that has just been revealed
                        if (root &&
                            root.activeElement === this) {
                            this[$canvas].focus();
                        }
                        // Ensure that the poster is no longer focusable or visible to
                        // screen readers
                        defaultPosterElement.setAttribute('aria-hidden', 'true');
                        defaultPosterElement.tabIndex = -1;
                    });
                }, { once: true });
            }
        }
        [$getModelIsVisible]() {
            return super[$getModelIsVisible]() || this[$modelIsVisible];
        }
        [$getLoaded]() {
            const src = this.src;
            return super[$getLoaded]() ||
                !!(src && CachingGLTFLoader.hasFinishedLoading(src));
        }
        async [$updateSource]() {
            if (this[$modelIsReadyForReveal] && !this[$sourceUpdated]) {
                this[$sourceUpdated] = true;
                await super[$updateSource]();
                this[$hidePoster]();
            }
        }
    }
    __decorate$5([
        property({ converter: { fromAttribute: deserializeUrl } })
    ], LoadingModelViewerElement.prototype, "poster", void 0);
    __decorate$5([
        property({ type: String })
    ], LoadingModelViewerElement.prototype, "reveal", void 0);
    __decorate$5([
        property({ type: Boolean })
    ], LoadingModelViewerElement.prototype, "preload", void 0);
    return LoadingModelViewerElement;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const $showMlModel = Symbol('showMlModel');
const $hideMlModel = Symbol('hideMlModel');
const $isHeliosBrowser = Symbol('isHeliosBrowser');
const $mlModel = Symbol('mlModel');
// NOTE(cdata): In tests, this seemed to line the hologram up with the scale of
// an inline rendering in WebGL. Probably needs some tweaking, and possibly even
// user-configuration, before we perfect this:
const DEFAULT_HOLOGRAM_INLINE_SCALE = 0.65;
// NOTE(cdata): This probably needs to scale proportionally with the dimensions
// of the inline model, but we need more experimentation to decide how that
// should work:
const DEFAULT_HOLOGRAM_Z_OFFSET = '150px';
/**
 * In order to use Magic Leap support, please include prismatic.js in your
 * page. If you do not include prismatic.js, Magic Leap support will not work.
 *
 * @see https://www.npmjs.com/package/@magicleap/prismatic
 */
const MagicLeapMixin = (ModelViewerElement) => {
    var _a, _b;
    class MagicLeapModelViewerElement extends ModelViewerElement {
        constructor() {
            super(...arguments);
            this.magicLeap = false;
            // NOTE(cdata): Check at construction time because the check is cheap
            // and it makes testing easier
            this[_a] = self.mlWorld != null;
            this[_b] = null;
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (!this[$isHeliosBrowser]) {
                return;
            }
            if (!(changedProperties.has('magicLeap') ||
                changedProperties.has('src'))) {
                return;
            }
            const scene = this[$scene];
            if (this.magicLeap) {
                const hasMlModel = !!customElements.get('ml-model');
                if (!hasMlModel) {
                    console.warn('<ml-model> is not registered. Is prismatic.js loaded?');
                }
                scene.pause();
                this[$container].setAttribute('style', 'display: none;');
                this[$showMlModel]();
                if (changedProperties.has('src') && this.src &&
                    this.src !== this[$mlModel].getAttribute('src')) {
                    this[$mlModel].setAttribute('src', this.src);
                }
            }
            else {
                this[$hideMlModel]();
                scene.resume();
                this[$container].removeAttribute('style');
            }
        }
        [(_a = $isHeliosBrowser, _b = $mlModel, $showMlModel)]() {
            if (this[$mlModel] == null) {
                this[$mlModel] = document.createElement('ml-model');
                this[$mlModel].setAttribute('style', 'display: block; top: 0; left: 0; width: 100%; height: 100%');
                // @see https://creator.magicleap.com/learn/guides/prismatic-getting-started
                this[$mlModel].setAttribute('model-scale', `${DEFAULT_HOLOGRAM_INLINE_SCALE} ${DEFAULT_HOLOGRAM_INLINE_SCALE} ${DEFAULT_HOLOGRAM_INLINE_SCALE}`);
                this[$mlModel].setAttribute('z-offset', DEFAULT_HOLOGRAM_Z_OFFSET);
                this[$mlModel].setAttribute('extractable', 'true');
                this[$mlModel].setAttribute('extracted-scale', '1');
                this[$mlModel].setAttribute('environment-lighting', 'color-intensity: 5;');
                if (this.src != null) {
                    this[$mlModel].setAttribute('src', this.src);
                }
            }
            this.shadowRoot.appendChild(this[$mlModel]);
        }
        [$hideMlModel]() {
            if (this[$mlModel] == null) {
                return;
            }
            if (this[$mlModel].parentNode != null) {
                this[$mlModel].parentNode.removeChild(this[$mlModel]);
            }
        }
    }
    __decorate$6([
        property({ type: Boolean, attribute: 'magic-leap' })
    ], MagicLeapModelViewerElement.prototype, "magicLeap", void 0);
    return MagicLeapModelViewerElement;
};

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Adapted from WorkerDOM
 * @see https://github.com/ampproject/worker-dom/blob/master/src/worker-thread/index.amp.ts
 */
const ALLOWLISTED_GLOBALS = {
    Array: true,
    ArrayBuffer: true,
    BigInt: true,
    BigInt64Array: true,
    BigUint64Array: true,
    Boolean: true,
    Cache: true,
    CustomEvent: true,
    DataView: true,
    Date: true,
    Error: true,
    EvalError: true,
    Event: true,
    EventTarget: true,
    Float32Array: true,
    Float64Array: true,
    Function: true,
    Infinity: true,
    Int16Array: true,
    Int32Array: true,
    Int8Array: true,
    Intl: true,
    JSON: true,
    Map: true,
    Math: true,
    MessagePort: true,
    MessageEvent: true,
    MessageChannel: true,
    NaN: true,
    Number: true,
    Object: true,
    Promise: true,
    Proxy: true,
    RangeError: true,
    ReferenceError: true,
    Reflect: true,
    RegExp: true,
    Set: true,
    String: true,
    Symbol: true,
    SyntaxError: true,
    TextDecoder: true,
    TextEncoder: true,
    TypeError: true,
    URIError: true,
    URL: true,
    Uint16Array: true,
    Uint32Array: true,
    Uint8Array: true,
    Uint8ClampedArray: true,
    WeakMap: true,
    WeakSet: true,
    WebAssembly: true,
    atob: true,
    addEventListener: true,
    removeEventListener: true,
    btoa: true,
    caches: true,
    clearInterval: true,
    clearTimeout: true,
    console: true,
    decodeURI: true,
    decodeURIComponent: true,
    document: true,
    encodeURI: true,
    encodeURIComponent: true,
    escape: true,
    fetch: true,
    indexedDB: true,
    isFinite: true,
    isNaN: true,
    location: true,
    navigator: true,
    onerror: true,
    onrejectionhandled: true,
    onunhandledrejection: true,
    parseFloat: true,
    parseInt: true,
    performance: true,
    postMessage: true,
    requestAnimationFrame: true,
    cancelAnimationFrame: true,
    self: true,
    setTimeout: true,
    setInterval: true,
    unescape: true,
};

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A constructor factory for a Material class. The Material is defined based on
 * a provided implementation for all specified 3DOM scene graph element types.
 *
 * The sole reason for using this factory pattern is to enable sound type
 * checking while also providing for the ability to stringify the factory so
 * that it can be part of a runtime-generated Worker script.
 *
 * @see ../api.ts
 */
function defineMaterial(ThreeDOMElement) {
    const $pbrMetallicRoughness = Symbol('pbrMetallicRoughness');
    const $kernel = Symbol('kernel');
    const $name = Symbol('name');
    /**
     * A Material represents a live material in the backing scene graph. Its
     * primary purpose is to give the user write access to discrete properties
     * (for example, the base color factor) of the backing material.
     */
    class Material extends ThreeDOMElement {
        constructor(kernel, serialized) {
            super(kernel, serialized);
            this[$kernel] = kernel;
            if (serialized.name != null) {
                this[$name] = serialized.name;
            }
            this[$pbrMetallicRoughness] = kernel.deserialize('pbr-metallic-roughness', serialized.pbrMetallicRoughness);
        }
        /**
         * The PBR properties that are assigned to this material, if any.
         */
        get pbrMetallicRoughness() {
            return this[$pbrMetallicRoughness];
        }
    }
    return Material;
}

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The protocol between 3DOM execution contexts is strictly defined.
 * Only specific types of messages are allowed, and their types are
 * all included in the ThreeDOMMessageType map.
 */
const ThreeDOMMessageType = {
    // === Host -> Scene Graph ===
    // Used when the host execution context and scene graph execution context
    // are negotiating a connection
    HANDSHAKE: 1,
    // A message that indicates that a custom script is meant to be imported
    // into the scene graph execution context
    IMPORT_SCRIPT: 2,
    // A notification from the host execution context that the main Model has
    // changed, including the sparse, serialized scene graph of the new Model
    MODEL_CHANGE: 3,
    // A notification that confirms or denies a request from the scene graph
    // context to mutate the scene graph
    MUTATION_RESULT: 4,
    // === Scene Graph => Host ===
    // Notification sent to the host execution context to indicate that the
    // scene graph execution context has finished initializing
    CONTEXT_INITIALIZED: 5,
    // A request from the scene graph execution context to mutate some detail
    // of the backing host scene graph
    MUTATE: 6
};

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A constructor factory for a ModelKernel class. The ModelKernel is defined
 * based on a provided implementation for all specified 3DOM scene graph
 * element types.
 *
 * The sole reason for using this factory pattern is to enable sound type
 * checking while also providing for the ability to stringify the factory so
 * that it can be part of a runtime-generated Worker script.
 */
function defineModelKernel(Model, Material, PBRMetallicRoughness) {
    var _a, _b, _c, _d, _e, _f;
    const constructorsByType = {
        'model': Model,
        'material': Material,
        'pbr-metallic-roughness': PBRMetallicRoughness
    };
    const $onMessageEvent = Symbol('onMessageEvent');
    const $messageEventHandler = Symbol('messageEventHandler');
    const $port = Symbol('port');
    const $model = Symbol('model');
    const $elementsByLocalId = Symbol('elementsByLocalId');
    const $localIdsByElement = Symbol('localIdsByElement');
    const $elementsByType = Symbol('elementsByType');
    const $pendingMutations = Symbol('pendingMutations');
    const $nextMutationId = Symbol('nextMutationId');
    /**
     * A ModelKernel is the core business logic implementation for a distinct
     * Model that has been exposed to a script execution context. The ModelKernel
     * is an internal detail, and should never be explicitly exposed to users of
     * a Model.
     *
     * The ModelKernel primarily handles deserializing scene graph elements, and
     * communicating mutations from the 3DOM execution context to the host
     * execution context where the backing scene graph lives.
     *
     * A ModelKernel also maintains a comprehensive map of elements by type to
     * assist scene graph elements in querying for their contemporaries.
     */
    class ModelKernel {
        constructor(port, serialized) {
            this[_a] = new Map();
            this[_b] = new Map();
            this[_c] = new Map();
            this[_d] = (event) => this[$onMessageEvent](event);
            this[_e] = new Map();
            this[_f] = 0;
            const types = Object.keys(constructorsByType);
            for (const type of types) {
                this[$elementsByType].set(type, new Set());
            }
            this[$port] = port;
            this[$port].addEventListener('message', this[$messageEventHandler]);
            this[$port].start();
            this[$model] = this.deserialize('model', serialized);
        }
        /**
         * The root scene graph element, a Model, that is the entrypoint for the
         * entire scene graph that is backed by this kernel.
         */
        get model() {
            return this[$model];
        }
        /**
         * Mutate a property of a property of a given scene graph element. All
         * direct mutations of the scene graph are considered asynchronous. This
         * method returns a Promise that resolves when the mutation has been
         * successfully applied to the backing scene graph, and rejects if the
         * mutation failed or is otherwise not allowed.
         *
         * TODO(#1006): How to validate values?
         */
        async mutate(element, property, value) {
            if (!this[$localIdsByElement].has(element)) {
                throw new Error('Cannot mutate unknown element');
            }
            const id = this[$localIdsByElement].get(element);
            return new Promise((resolve, reject) => {
                const mutationId = this[$nextMutationId]++;
                // TODO(#1006): Validate mutations before sending to host context:
                this[$port].postMessage({
                    type: ThreeDOMMessageType.MUTATE,
                    id,
                    property,
                    value,
                    mutationId,
                });
                // TODO(#1011): Add timeout to reject this mutation:
                this[$pendingMutations].set(mutationId, {
                    resolve,
                    reject,
                });
            });
        }
        /**
         * Deserializes a JSON representation of a scene graph element into a live
         * element that is backed by this ModelKernel.
         */
        deserialize(type, serialized) {
            if (!(type in constructorsByType)) {
                throw new Error(`Cannot deserialize unknown type: ${type}`);
            }
            const { id } = serialized;
            const ElementConstructor = constructorsByType[type];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const element = new ElementConstructor(this, serialized);
            this[$elementsByLocalId].set(id, element);
            this[$localIdsByElement].set(element, id);
            // We know that the all accepted types have been pre-populated in the
            // [$elementsByType] map:
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this[$elementsByType].get(type).add(element);
            return element;
        }
        /**
         * Look up all scene graph elements given a type string. Type strings
         * are lower-cased, hyphenated versions of the constructor names of their
         * corresponding classes. For example, a query for 'pbr-metallic-roughness'
         * element types will yield the list of PBRMetallicRoughness elements in
         * sparse tree order.
         */
        getElementsByType(type) {
            if (!this[$elementsByType].has(type)) {
                return [];
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return Array.from(this[$elementsByType].get(type));
        }
        /**
         * Deactivate the ModelKernel. This has the effect of blocking all future
         * mutations to the scene graph. Once deactivated, a ModelKernel cannot be
         * reactivated.
         *
         * The ModelKernel should be deactivated before it is disposed of, or else
         * it will leak in memory.
         */
        deactivate() {
            this[$port].close();
            this[$port].removeEventListener('message', this[$messageEventHandler]);
        }
        [(_a = $elementsByLocalId, _b = $localIdsByElement, _c = $elementsByType, _d = $messageEventHandler, _e = $pendingMutations, _f = $nextMutationId, $onMessageEvent)](event) {
            const { data } = event;
            switch (data && data.type) {
                case ThreeDOMMessageType.MUTATION_RESULT: {
                    const message = data;
                    const { applied, mutationId } = message;
                    const pendingMutation = this[$pendingMutations].get(mutationId);
                    this[$pendingMutations].delete(mutationId);
                    if (pendingMutation != null) {
                        applied ? pendingMutation.resolve() : pendingMutation.reject();
                    }
                    break;
                }
            }
        }
    }
    return ModelKernel;
}

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A constructor factory for a Model class. The Model is defined based on a
 * provided implementation for all specified 3DOM scene graph element types.
 *
 * The sole reason for using this factory pattern is to enable sound type
 * checking while also providing for the ability to stringify the factory so
 * that it can be part of a runtime-generated Worker script.
 *
 * @see ../api.ts
 */
function defineModel(ThreeDOMElement) {
    var _a;
    const $materials = Symbol('material');
    const $kernel = Symbol('kernel');
    /**
     * A Model is the root element of a 3DOM scene graph. It is considered the
     * element of provenance for all other elements that participate in the same
     * graph. All other elements in the graph can be accessed in from the Model
     * in some fashion.
     */
    class Model extends ThreeDOMElement {
        constructor(kernel, serialized) {
            super(kernel);
            this[_a] = Object.freeze([]);
            this[$kernel] = kernel;
            for (const material of serialized.materials) {
                this[$kernel].deserialize('material', material);
            }
        }
        /**
         * The set of Material elements in the graph, in sparse traversal order.
         * Note that this set will include any Materials that are not part of the
         * currently activate scene.
         *
         * TODO(#1002): This value needs to be sensitive to scene graph order
         */
        get materials() {
            return this[$kernel].getElementsByType('material');
        }
        /**
         * A Model has no owner model; it owns itself.
         */
        get ownerModel() {
            return undefined;
        }
    }
    _a = $materials;
    return Model;
}

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A constructor factory for a PBRMetallicRoughness class. The
 * PBRMetallicRoughness is defined based on a provided implementation for all
 * specified 3DOM scene graph element types.
 *
 * The sole reason for using this factory pattern is to enable sound type
 * checking while also providing for the ability to stringify the factory so
 * that it can be part of a runtime-generated Worker script.
 *
 * @see ../api.ts
 */
function definePBRMetallicRoughness(ThreeDOMElement) {
    const $kernel = Symbol('kernel');
    const $baseColorFactor = Symbol('baseColorFactor');
    /**
     * PBRMetallicRoughness exposes the PBR properties for a given Material.
     */
    class PBRMetallicRoughness extends ThreeDOMElement {
        constructor(kernel, serialized) {
            super(kernel, serialized);
            this[$kernel] = kernel;
            this[$baseColorFactor] =
                Object.freeze(serialized.baseColorFactor);
        }
        /**
         * The base color factor of the material in RGBA format.
         */
        get baseColorFactor() {
            return this[$baseColorFactor];
        }
        /**
         * Set the base color factor of the material.
         * Requires the material-properties capability.
         *
         * @see ../api.ts
         */
        async setBaseColorFactor(color) {
            await this[$kernel].mutate(this, 'baseColorFactor', color);
            this[$baseColorFactor] = Object.freeze(color);
        }
    }
    return PBRMetallicRoughness;
}

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A constructor factory for a ThreeDOMElement class. The ThreeDOMElement is
 * defined based on a provided implementation for all specified 3DOM scene graph
 * element types.
 *
 * The sole reason for using this factory pattern is to enable sound type
 * checking while also providing for the ability to stringify the factory so
 * that it can be part of a runtime-generated Worker script.
 *
 * @see ../api.ts
 */
function defineThreeDOMElement() {
    const $ownerModel = Symbol('ownerModel');
    /**
     * The basic implementation for all 3DOM scene graph participants.
     * Scene graph nodes are distinguished by their "owner" Model. All scene
     * graph nodes have an owner Model associated with them except for the
     * sole Model in the scene graph, whose ownerModel property is not defined.
     */
    class ThreeDOMElement {
        constructor(kernel) {
            if (kernel == null) {
                throw new Error('Illegal constructor');
            }
            this[$ownerModel] = kernel.model;
        }
        /**
         * The Model of provenance for this scene graph element, or undefined if
         * element is itself a Model.
         */
        get ownerModel() {
            return this[$ownerModel];
        }
    }
    return ThreeDOMElement;
}

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const generateAPI = () => `${defineModelKernel.toString()}
${defineThreeDOMElement.toString()}
${defineModel.toString()}
${defineMaterial.toString()}
${definePBRMetallicRoughness.toString()}

var ThreeDOMElement = defineThreeDOMElement();
var Model = defineModel(ThreeDOMElement);
var Material = defineMaterial(ThreeDOMElement);
var PBRMetallicRoughness = definePBRMetallicRoughness(ThreeDOMElement);

var ModelKernel = defineModelKernel(
  Model,
  Material,
  PBRMetallicRoughness
);

// Populate the global scope with constructors
// so that author code can use instanceof checks
self.ThreeDOMElement = ThreeDOMElement;
self.Model = Model;
self.Material = Material;
self.PBRMetallicRoughness = PBRMetallicRoughness;`;

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Given a 3DOM execution context, patch any methods that give write access
 * to otherwise configurable material properties so that they are automatically
 * rejected when invoked.
 */
function filterMaterialProperties() {
    const errorMessage = 'Capability "material-properties" not allowed';
    Object.defineProperty(this.PBRMetallicRoughness.prototype, 'setBaseColorFactor', {
        value: () => {
            throw new Error(errorMessage);
        },
        configurable: false,
        writable: false
    });
}
/**
 * Given a 3DOM execution context, patch any methods, classes or other APIs
 * related to Web Messaging so that they throw or are otherwise rendered
 * impotent.
 *
 * TODO(#1001): We probably need to crawl up the prototype chain on this one
 */
function filterMessaging() {
    const errorMessage = 'Capability "messaging" not allowed';
    const rejectInvocation = () => {
        throw new Error(errorMessage);
    };
    const originalAddEventListener = this.addEventListener;
    Object.defineProperties(this, {
        postMessage: { value: rejectInvocation, configurable: false },
        MessageChannel: { value: rejectInvocation, configurable: false },
        MessageEvent: { value: rejectInvocation, configurable: false },
        onmessage: {
            set() {
                rejectInvocation();
            },
            configurable: false,
        },
        addEventListener: {
            value: function (type, listener, options) {
                if (type === 'message') {
                    rejectInvocation();
                }
                originalAddEventListener.call(this, type, listener, options);
            },
            configurable: false
        }
    });
}
/**
 * Given a 3DOM execution context, patch the global Fetch API so that any
 * attempts to perform network operations are immediately rejected.
 */
function filterFetch() {
    Object.defineProperties(this, {
        fetch: {
            value: () => {
                throw new Error('Capability "fetch" not allowed');
            },
            configurable: false
        }
    });
}
const capabilityFilterMap = {
    'messaging': filterMessaging,
    'material-properties': filterMaterialProperties,
    'fetch': filterFetch
};
/**
 * Given a list of 3DOM capability strings, this factory produces a script
 * fragment that patches the global execution context so that any omitted
 * capabilities are explicitly disallowed.
 */
const generateCapabilityFilter = (capabilities) => {
    const filtersToApply = Object.keys(capabilityFilterMap);
    const capabilityFilters = [];
    for (const capability of filtersToApply) {
        // Skip filters that are allowed by the list of capabilities
        if (capabilities.indexOf(capability) > -1) {
            continue;
        }
        const filter = capabilityFilterMap[capability];
        capabilityFilters.push(`(${filter.toString()}).call(self);`);
    }
    return capabilityFilters.join('\n');
};

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Adapted from WorkerDOM
 * NOTE: The context could also be DedicatedWorkerGlobalScope, but the
 * TypeScript WebWorker lib seems to conflict with the dom lib
 *
 * @see https://github.com/ampproject/worker-dom/blob/master/src/worker-thread/index.amp.ts
 */
function patchContext(context, allowList) {
    // Crawl up the prototype chain until we get to EventTarget so that we
    // don't go overboard deleting fundamental properties of things:
    while (context && context.constructor !== EventTarget) {
        Object.getOwnPropertyNames(context).forEach((property) => {
            // eslint-disable-next-line no-prototype-builtins
            if (allowList.hasOwnProperty(property) && allowList[property] === true) {
                // Skip allowed property
                return;
            }
            try {
                delete context[property];
            }
            catch (e) {
                console.warn(e);
            }
        });
        context = Object.getPrototypeOf(context);
    }
}
/**
 * Given an "allow" list that maps context property names to booleans (true for
 * allowed, false for disallowed), this factory produces a script chunk that
 * can patch the global context so that only allowed properties/APIs are
 * available.
 *
 * Disallowed properties are deleted on the global context and its prototype
 * chain. Omiting a property from the allow list is tantamount to disallowing
 * it.
 */
const generateContextPatch = (allowList) => `(${patchContext.toString()})(self, ${JSON.stringify(allowList)});`;

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A function that will be stringified and appended the a runtime-generated
 * execution context script to initialize the scene graph execution context.
 *
 * The sole reason for using this pattern is to enable sound type
 * checking while also providing for the ability to stringify the factory so
 * that it can be part of a runtime-generated Worker script.
 */
function initialize(ModelKernel, preservedContext) {
    let currentKernel = null;
    preservedContext.addEventListener('message', (event) => {
        const { data } = event;
        if (data && data.type && data.type === ThreeDOMMessageType.HANDSHAKE) {
            const globalPort = event.ports[0];
            globalPort.addEventListener('message', (event) => {
                const { data } = event;
                if (data && data.type) {
                    switch (data.type) {
                        // Instantiate a new ModelKernel, and notify the execution context
                        // of the new Model with a 'model-change' event:
                        case ThreeDOMMessageType.MODEL_CHANGE: {
                            const previousModel = currentKernel != null ? currentKernel.model : undefined;
                            const serialized = data.model;
                            const port = event.ports[0];
                            if (currentKernel != null) {
                                currentKernel.deactivate();
                            }
                            else if (serialized == null) {
                                // Do not proceed if transitioning from null to null
                                break;
                            }
                            if (serialized != null) {
                                currentKernel = new ModelKernel(port, serialized);
                                this.model = currentKernel.model;
                            }
                            else {
                                currentKernel = null;
                                this.model = undefined;
                            }
                            const modelChangeEvent = new Event('model-change');
                            modelChangeEvent.previousModel = previousModel;
                            modelChangeEvent.model = this.model;
                            this.dispatchEvent(modelChangeEvent);
                            break;
                        }
                        // Import an external script into the execution context:
                        case ThreeDOMMessageType.IMPORT_SCRIPT: {
                            const url = data.url;
                            if (url) {
                                preservedContext.importScripts(url);
                            }
                            break;
                        }
                    }
                }
            });
            globalPort.start();
            // Notify the host execution context that the scene graph execution
            // is ready:
            globalPort.postMessage({ type: ThreeDOMMessageType.CONTEXT_INITIALIZED });
        }
    });
}
/**
 * A factory that produces a stringified initializer function.
 */
const generateInitializer = () => initialize.toString();

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$e, _b$d;
const $modelGraft = Symbol('modelGraft');
const $port = Symbol('port');
const $messageEventHandler = Symbol('messageEventHandler');
const $onMessageEvent = Symbol('onMessageEvent');
/**
 * A ModelGraftManipulator is an internal construct intended to consolidate
 * any mutations that operate on the backing scene graph. It can be thought
 * of as a host execution context counterpart to the ModelKernel in the scene
 * graph execution context.
 */
class ModelGraftManipulator {
    constructor(modelGraft, port) {
        this[_a$e] = (event) => this[$onMessageEvent](event);
        this[$modelGraft] = modelGraft;
        this[$port] = port;
        this[$port].addEventListener('message', this[$messageEventHandler]);
        this[$port].start();
    }
    /**
     * Clean up internal state so that the ModelGraftManipulator can be properly
     * garbage collected.
     */
    dispose() {
        this[$port].removeEventListener('message', this[$messageEventHandler]);
        this[$port].close();
    }
    [(_a$e = $messageEventHandler, $onMessageEvent)](event) {
        const { data } = event;
        if (data && data.type) {
            if (data.type === ThreeDOMMessageType.MUTATE) {
                let applied = false;
                const { mutationId } = data;
                try {
                    this[$modelGraft].mutate(data.id, data.property, data.value);
                    applied = true;
                }
                finally {
                    this[$port].postMessage({ type: ThreeDOMMessageType.MUTATION_RESULT, applied, mutationId });
                }
            }
        }
    }
}
const ALL_CAPABILITIES = Object.freeze(['messaging', 'material-properties', 'fetch']);
/**
 * Constructs and returns a string representing a fully-formed scene graph
 * execution context script, including context patching, capabilities and
 * scene graph API constructs.
 */
const generateContextScriptSource = (capabilities = ALL_CAPABILITIES) => {
    return `;(function() {
var ThreeDOMMessageType = ${JSON.stringify(ThreeDOMMessageType)};

var preservedContext = {
  postMessage: self.postMessage.bind(self),
  addEventListener: self.addEventListener.bind(self),
  importScripts: self.importScripts.bind(self)
};

${generateContextPatch(ALLOWLISTED_GLOBALS)}
${generateAPI()}
${generateCapabilityFilter(capabilities)}
${generateInitializer()}

initialize.call(self, ModelKernel, preservedContext);

})();`;
};
const $worker = Symbol('worker');
const $workerInitializes = Symbol('workerInitializes');
const $modelGraftManipulator = Symbol('modelGraftManipulator');
/**
 * A ThreeDOMExecutionContext is created in the host execution context that
 * wishes to invoke scripts in a specially crafted and carefully isolated
 * script context, referred to as the scene graph execution context. For
 * practical implementation purposes, the scene graph execution context is
 * a Worker whose global scope has been heavily patched before any custom
 * script is subsequently invoked in it.
 *
 * The ThreeDOMExecutionContext must be given a set of allowed capabilities
 * when it is created. The allowed capabilities cannot be changed after the
 * scene graph execution context has been established.
 */
class ThreeDOMExecutionContext extends EventTarget {
    constructor(capabilities) {
        super();
        this[_b$d] = null;
        const contextScriptSource = generateContextScriptSource(capabilities);
        const url = URL.createObjectURL(new Blob([contextScriptSource], { type: 'text/javascript' }));
        this[$worker] = new Worker(url);
        this[$workerInitializes] = new Promise((resolve) => {
            const { port1, port2 } = new MessageChannel();
            const onMessageEvent = (event) => {
                if (event.data &&
                    event.data.type === ThreeDOMMessageType.CONTEXT_INITIALIZED) {
                    port1.removeEventListener('message', onMessageEvent);
                    resolve(port1);
                }
            };
            this[$worker].postMessage({ type: ThreeDOMMessageType.HANDSHAKE }, [port2]);
            port1.addEventListener('message', onMessageEvent);
            port1.start();
        });
    }
    get worker() {
        return this[$worker];
    }
    async changeModel(modelGraft) {
        const port = await this[$workerInitializes];
        const { port1, port2 } = new MessageChannel();
        port.postMessage({
            type: ThreeDOMMessageType.MODEL_CHANGE,
            model: modelGraft != null && modelGraft.model != null ?
                modelGraft.model.toJSON() :
                null
        }, [port2]);
        const modelGraftManipulator = this[$modelGraftManipulator];
        if (modelGraftManipulator != null) {
            modelGraftManipulator.dispose();
            this[$modelGraftManipulator] = null;
        }
        if (modelGraft != null) {
            this[$modelGraftManipulator] =
                new ModelGraftManipulator(modelGraft, port1);
        }
    }
    /**
     * Evaluate an arbitrary chunk of script in the scene graph execution context.
     * The script is guaranteed to be evaluated after the scene graph execution
     * context is fully initialized. It is not guaranteed to be evaluated before
     * or after a Model is made available in the scene graph execution context.
     *
     * Note that web browsers do not universally support module scripts ("ESM") in
     * Workers, so for now all scripts must be valid non-module scripts.
     */
    async eval(scriptSource) {
        const port = await this[$workerInitializes];
        const url = URL.createObjectURL(new Blob([scriptSource], { type: 'text/javascript' }));
        port.postMessage({ type: ThreeDOMMessageType.IMPORT_SCRIPT, url });
    }
    /**
     * Terminates the scene graph execution context, closes the designated
     * messaging port and generally cleans up the ThreeDOMExecutionContext
     * so that it can be properly garbage collected.
     */
    async terminate() {
        this[$worker].terminate();
        const modelGraftManipulator = this[$modelGraftManipulator];
        if (modelGraftManipulator != null) {
            modelGraftManipulator.dispose();
            this[$modelGraftManipulator] = null;
        }
        const port = await this[$workerInitializes];
        port.close();
    }
}
_b$d = $modelGraftManipulator;

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Produces a "locally" unique ID. This ID is only guaranteed to be unique
 * over the lifetime of the function and in the current execution context.
 */
const getLocallyUniqueId = (() => {
    let id = 0;
    return () => id++;
})();

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$f;
const $relatedObject = Symbol('relatedObject');
const $graft = Symbol('graft');
const $id = Symbol('id');
/**
 * A SerializableThreeDOMElement is the common primitive of all scene graph
 * elements that have been facaded in the host execution context. It adds
 * a common interface to these elements in support of convenient
 * serializability.
 */
class ThreeDOMElement {
    constructor(graft, relatedObject) {
        this[_a$f] = getLocallyUniqueId();
        this[$relatedObject] = relatedObject;
        this[$graft] = graft;
        graft.adopt(this);
    }
    /**
     * The Model of provenance for this scene graph element.
     */
    get ownerModel() {
        return this[$graft].model;
    }
    /**
     * The unique ID that marks this element. In generally, an ID should only be
     * considered unique to the element in the context of its scene graph. These
     * IDs are not guaranteed to be stable across script executions.
     */
    get internalID() {
        return this[$id];
    }
    /**
     * Some (but not all) scene graph elements may have an optional name. The
     * Object3D.prototype.name property is sometimes auto-generated by Three.js.
     * We only want to expose a name that is set in the source glTF, so Three.js
     * generated names are ignored.
     */
    get name() {
        const relatedObject = this[$relatedObject];
        if (relatedObject.isObject3D ||
            relatedObject.isMaterial) {
            return relatedObject.userData ?
                relatedObject.userData.name :
                null;
        }
        return null;
    }
    /**
     * The backing Three.js scene graph construct for this element.
     */
    get relatedObject() {
        return this[$relatedObject];
    }
    toJSON() {
        const serialized = { id: this[$id] };
        const { name } = this;
        if (name != null) {
            serialized.name = name;
        }
        return serialized;
    }
}
_a$f = $id;

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $threeMaterial = Symbol('threeMaterial');
/**
 * GraftPBRMetallicRoughness
 * @see https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#pbrmetallicroughness
 */
class PBRMetallicRoughness extends ThreeDOMElement {
    get [$threeMaterial]() {
        return this[$relatedObject];
    }
    constructor(graft, material) {
        super(graft, material);
    }
    get baseColorFactor() {
        const material = this[$threeMaterial];
        if (material.color) {
            return [...material.color.toArray(), material.opacity];
        }
        else {
            return [1, 1, 1, 1];
        }
    }
    set baseColorFactor(value) {
        this[$threeMaterial].color.fromArray(value);
        this[$threeMaterial].opacity = value[3];
    }
    toJSON() {
        const serialized = super.toJSON();
        serialized.baseColorFactor = this.baseColorFactor;
        return serialized;
    }
}

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $pbrMetallicRoughness = Symbol('pbrMetallicRoughness');
/**
 * GraftMaterial
 * @see https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#material
 */
class Material extends ThreeDOMElement {
    constructor(graft, material) {
        super(graft, material);
        this[$pbrMetallicRoughness] = new PBRMetallicRoughness(graft, material);
    }
    get pbrMetallicRoughness() {
        return this[$pbrMetallicRoughness];
    }
    toJSON() {
        const serialized = super.toJSON();
        serialized.pbrMetallicRoughness = this.pbrMetallicRoughness.toJSON();
        return serialized;
    }
}

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$g, _b$e;
const $modelUri = Symbol('modelUri');
const $gltf = Symbol('gltf');
const $materials = Symbol('materials');
/**
 * A Model facades the top-level GLTF object returned by Three.js' GLTFLoader.
 * Currently, the model only bothers itself with the materials in the Three.js
 * scene graph.
 */
class Model$1 extends ThreeDOMElement {
    constructor(graft, modelUri, gltf) {
        super(graft, gltf);
        this[_a$g] = '';
        this[_b$e] = [];
        this[$modelUri] = modelUri;
        this[$gltf] = gltf;
        const visitedMaterials = new Set();
        gltf.scene.traverse((object3D) => {
            const maybeMesh = object3D;
            let meshMaterials = [];
            if (maybeMesh.isMesh && maybeMesh.material != null) {
                meshMaterials = Array.isArray(maybeMesh.material) ?
                    maybeMesh.material :
                    [maybeMesh.material];
            }
            for (const material of meshMaterials) {
                if (visitedMaterials.has(material)) {
                    continue;
                }
                this[$materials].push(new Material(graft, material));
                visitedMaterials.add(material);
            }
        });
    }
    /**
     * A flat list of all unique materials found in this scene graph. Materials
     * are listed in the order they appear during pre-order, depth-first traveral
     * of the scene graph.
     *
     * TODO(#1003): How do we handle non-active scenes?
     */
    get materials() {
        return this[$materials];
    }
    toJSON() {
        const serialized = super.toJSON();
        serialized.modelUri = this[$modelUri];
        serialized.materials =
            this[$materials].map((material) => material.toJSON());
        return serialized;
    }
}
_a$g = $modelUri, _b$e = $materials;

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$h;
const $model = Symbol('model');
const $elementsByInternalId = Symbol('elementsByInternalId');
/**
 * ModelGraft
 *
 * This is a coordination primitive between a scene graph as represented by the
 * output for Three.js' GLTFLoader and a counterpart 3DOM facade. Since this is
 * the Three.js-specific implementation of the facade, the input is a GLTF-like
 * object whose keys refer to Three.js-specific constructs (e.g., gltf.scene is
 * a THREE.Scene).
 *
 * When created, the ModelGraft produces a Model that can be traversed and
 * manipulated to mutate the Three.js scene graph synchronously (but
 * indirectly). The benefit of this is that mutations to the Three.js scene can
 * be performed in a Three.js-agnostic fashion that is potentially portable to
 * alternative rendering backends.
 *
 * The scene graph representation produced by the ModelGraft is designed to
 * match the structures described in the glTF 2.0 spec as closely as possible.
 * Where there are deviations, it is usually for the purpose of making
 * synchronization easier, or else for ergonomics. For example, in glTF 2.0, the
 * graph is a series of flat arrays where nodes cross-reference each other by
 * index to represent hierarchy, but in a Model nodes have array members
 * containing refrences to their hierarchical children.
 *
 * An important goal of ModelGraft is to enable a scene in one JavaScript
 * context to be manipulated by script in a remote context, such as a distant
 * worker thread or even a different process. So, every node in the graph
 * is able to be serialized, and the serialized form includes an ID that is
 * locally unique to the ModelGraft instance that the node came from so that
 * the remote context can refer back to it. A ModelGraft can be thought of as
 * the host execution context counterpart to the ModelKernel in the scene graph
 * execution context.
 */
class ModelGraft extends EventTarget {
    constructor(modelUri, gltf) {
        super();
        this[_a$h] = new Map();
        this[$model] = new Model$1(this, modelUri, gltf);
    }
    get model() {
        return this[$model];
    }
    getElementByInternalId(id) {
        const element = this[$elementsByInternalId].get(id);
        if (element == null) {
            return null;
        }
        return element;
    }
    adopt(element) {
        this[$elementsByInternalId].set(element.internalID, element);
    }
    mutate(id, property, value) {
        // TODO(#1005): Manipulations probably need to be validated against
        // allowed capabilities here. We already do this on the scene graph
        // execution context side, but it would be safer to do it on both sides
        const element = this.getElementByInternalId(id);
        if (element != null && property in element) {
            element[property] = value;
            this.dispatchEvent(new CustomEvent('mutation', { detail: { element: element } }));
        }
    }
}
_a$h = $elementsByInternalId;

/* @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const SCENE_GRAPH_SCRIPT_TYPE = 'experimental-scene-graph-worklet';
const VALID_CAPABILITIES = new Set(['messaging', 'fetch', 'material-properties']);
const $onChildListMutation = Symbol('onChildListMutation');
const $childListMutationHandler = Symbol('childListMutationHandler');
const $mutationObserver = Symbol('mutationObserver');
const $createExecutionContext = Symbol('createExecutionContext');
const $onScriptElementAdded = Symbol('onScriptElementAdded');
const $executionContext = Symbol('executionContext');
const $updateExecutionContextModel = Symbol('updateExecutionContextModel');
const $modelGraft$1 = Symbol('modelGraft');
const $onModelGraftMutation = Symbol('onModelGraftMutation');
const $modelGraftMutationHandler = Symbol('modelGraftMutationHandler');
/**
 * SceneGraphMixin manages a `<model-viewer>` integration with the 3DOM library
 * in order to support custom scripts that operate on the <model-viewer> scene
 * graph.
 *
 * When applied, users can specify a special `<script>` type that can be added
 * as a child of `<model-viewer>`. The script will be invoked in a special
 * Web Worker, conventionally referred to as a "scene graph worklet."
 *
 * Script on the browser main thread can communicate with the scene graph
 * worklet via `modelViewer.worklet` using `postMessage`, much like they would
 * with any other Web Worker.
 *
 * Scene graph worklet scripts must be bestowed capabilities by the author of
 * the `<model-viewer>` markup. The three capabilities currently available
 * include:
 *
 *  - `messaging`: The ability to communicate with other contexts via
 *    `postMessage` and `MessageChannel`
 *  - `fetch`: Access to the global `fetch` method for network operations
 *  - `material-properties`: The ability to manipulate the basic properties of
 *    a Material and its associated constructs in the scene graph
 *
 * A trivial example of creating a scene graph worklet that can manipulate
 * material properties looks like this:
 *
 * ```html
 * <model-viewer>
 *   <script type="experimental-scene-graph-worklet"
 *       allow="material-properties">
 *
 *     console.log('Hello from the scene graph worklet!');
 *
 *     self.addEventListener('model-change', () => {
 *       model.materials[0].pbrMetallicRoughness
 *         .setBaseColorFactor([1, 0, 0, 1]);
 *     });
 *
 *   </script>
 * </model-viewer>
 * ```
 *
 * Only one worklet is allowed per `<model-viewer>` at a time. If a new worklet
 * script is appended to a `<model-viewer>` with a running worklet, a new
 * worklet will be created and the previous one will be terminated. If there
 * is more than one worklet script at HTML parse time, the last one in tree
 * order will be used.
 *
 * When a worklet is created, `<model-viewer>` will dispatch a 'worklet-created'
 * event. At the time that this event is dispatched, the worklet will be created
 * but the model is not guaranteed to have been made available to the worklet.
 */
const SceneGraphMixin = (ModelViewerElement) => {
    var _a, _b, _c, _d;
    var _e;
    class SceneGraphModelViewerElement extends ModelViewerElement {
        constructor() {
            super(...arguments);
            this[_e] = null;
            this[_a] = (records) => this[$onChildListMutation](records);
            this[_b] = (event) => this[$onModelGraftMutation](event);
            this[_c] = new MutationObserver(this[$childListMutationHandler]);
            this[_d] = null;
        }
        /**
         * A reference to the active worklet if one exists, or else `null`. A
         * worklet is not created until a scene graph worklet script has been
         * detected as a child of this `<model-viewer>`.
         */
        get worklet() {
            const executionContext = this[$executionContext];
            return executionContext != null ? executionContext.worker : null;
        }
        connectedCallback() {
            super.connectedCallback();
            this[$mutationObserver].observe(this, { childList: true });
            const script = this.querySelector(`script[type="${SCENE_GRAPH_SCRIPT_TYPE}"]:last-of-type`);
            if (script != null && script.textContent) {
                this[$onScriptElementAdded](script);
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this[$mutationObserver].disconnect();
            if (this[$executionContext] != null) {
                this[$executionContext].terminate();
                this[$executionContext] = null;
            }
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has($modelGraft$1)) {
                const oldModelGraft = changedProperties.get($modelGraft$1);
                if (oldModelGraft != null) {
                    oldModelGraft.removeEventListener('mutation', this[$modelGraftMutationHandler]);
                }
                const modelGraft = this[$modelGraft$1];
                if (modelGraft != null) {
                    modelGraft.addEventListener('mutation', this[$modelGraftMutationHandler]);
                }
            }
        }
        [(_e = $modelGraft$1, _a = $childListMutationHandler, _b = $modelGraftMutationHandler, _c = $mutationObserver, _d = $executionContext, $onModelLoad)](event) {
            super[$onModelLoad](event);
            this[$updateExecutionContextModel]();
        }
        [$onChildListMutation](records) {
            if (this.parentNode == null) {
                // Ignore a lazily reported list of mutations if we are detached from
                // the document...
                return;
            }
            let lastScriptElement = null;
            for (const record of records) {
                for (const node of Array.from(record.addedNodes)) {
                    if (node instanceof HTMLScriptElement && node.textContent &&
                        node.getAttribute('type') === SCENE_GRAPH_SCRIPT_TYPE) {
                        lastScriptElement = node;
                    }
                }
            }
            if (lastScriptElement != null) {
                this[$onScriptElementAdded](lastScriptElement);
            }
        }
        [$onScriptElementAdded](script) {
            if (!script.textContent ||
                script.getAttribute('type') !== SCENE_GRAPH_SCRIPT_TYPE) {
                return;
            }
            const allowString = script.getAttribute('allow') || '';
            const allowList = allowString.split(';')
                .map((fragment) => fragment.trim())
                .filter((capability) => VALID_CAPABILITIES.has(capability));
            this[$createExecutionContext](script.textContent, allowList);
        }
        [$createExecutionContext](scriptSource, capabilities) {
            const executionContext = this[$executionContext];
            if (executionContext != null) {
                executionContext.terminate();
            }
            this[$executionContext] = new ThreeDOMExecutionContext(capabilities);
            this[$executionContext].eval(scriptSource);
            this.dispatchEvent(new CustomEvent('worklet-created', { detail: { worklet: this.worklet } }));
            this[$updateExecutionContextModel]();
        }
        [$updateExecutionContextModel]() {
            const executionContext = this[$executionContext];
            if (executionContext == null || this.parentNode == null) {
                // Ignore if we don't have a 3DOM script to run, or if we are currently
                // detached from the document
                return;
            }
            const scene = this[$scene];
            const modelGraft = this.loaded ?
                // TODO: Use a proper GLTF artifact as cached by the loader for this:
                new ModelGraft(scene.model.url || '', {
                    scene: scene,
                    scenes: [scene],
                    animations: [],
                    cameras: [],
                    parser: {},
                    asset: {},
                    userData: {}
                }) :
                null;
            executionContext.changeModel(modelGraft);
            this[$modelGraft$1] = modelGraft;
        }
        [$onModelGraftMutation](_event) {
            this[$needsRender]();
        }
    }
    __decorate$7([
        property({ type: Object })
    ], SceneGraphModelViewerElement.prototype, _e, void 0);
    return SceneGraphModelViewerElement;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $time = Symbol('time');
const $duration = Symbol('duration');
/**
 * The Timer class can be used power delays and animations
 */
class Timer {
    /**
     * Creates a new timer
     *
     * @param duration the total duration for the timer
     */
    constructor(duration) {
        this[$duration] = duration;
        this[$time] = 0;
    }
    /**
     * total time incremented by the tick method. time is initialized to 0
     */
    get time() {
        return this[$time];
    }
    /**
     * a calculation of `time / duration` which can be used for animations
     */
    get timeScale() {
        return this[$time] / this[$duration];
    }
    /**
     * duration of the timer
     */
    get duration() {
        return this[$duration];
    }
    /**
     * whether the timer has run fully or stop has been called
     */
    get hasStopped() {
        return this[$time] >= this[$duration];
    }
    /**
     * reset the time back to 0
     */
    reset() {
        this[$time] = 0;
    }
    /**
     * sets time to duration meaning the timer has completed and hasStopped will
     * return true
     */
    stop() {
        this[$time] = this[$duration];
    }
    /**
     * pass deltaTime to the tick method to tick/increment the timer forward
     *
     * @param deltaTime delta time since last tick was called
     */
    tick(deltaTime) {
        this[$time] += deltaTime;
        if (this.time >= this[$duration]) {
            this[$time] = this[$duration];
        }
    }
}

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// How much the model will rotate per
// second in radians:
const ROTATION_SPEED = Math.PI / 32;
const AUTO_ROTATE_DELAY_DEFAULT = 3000;
const $autoRotateTimer = Symbol('autoRotateTimer');
const $cameraChangeHandler = Symbol('cameraChangeHandler');
const $onCameraChange = Symbol('onCameraChange');
const StagingMixin = (ModelViewerElement) => {
    var _a, _b;
    class StagingModelViewerElement extends ModelViewerElement {
        constructor() {
            super(...arguments);
            this.autoRotate = false;
            this.autoRotateDelay = AUTO_ROTATE_DELAY_DEFAULT;
            this[_a] = new Timer(this.autoRotateDelay);
            this[_b] = (event) => this[$onCameraChange](event);
        }
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener('camera-change', this[$cameraChangeHandler]);
            this[$autoRotateTimer].stop();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeEventListener('camera-change', this[$cameraChangeHandler]);
            this[$autoRotateTimer].stop();
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (changedProperties.has('autoRotate')) {
                this[$needsRender]();
            }
            if (changedProperties.has('autoRotateDelay')) {
                const timer = new Timer(this.autoRotateDelay);
                timer.tick(this[$autoRotateTimer].time);
                if (timer.hasStopped) {
                    timer.reset();
                }
                this[$autoRotateTimer] = timer;
            }
        }
        [(_a = $autoRotateTimer, _b = $cameraChangeHandler, $tick$1)](time, delta) {
            super[$tick$1](time, delta);
            if (!this.autoRotate || !this.modelIsVisible) {
                return;
            }
            this[$autoRotateTimer].tick(delta);
            if (this[$autoRotateTimer].hasStopped) {
                this[$scene].setPivotRotation(this[$scene].getPivotRotation() + ROTATION_SPEED * delta * 0.001);
                this[$needsRender]();
            }
        }
        [$onCameraChange](event) {
            if (!this.autoRotate) {
                return;
            }
            if (event.detail.source === 'user-interaction') {
                this[$autoRotateTimer].reset();
            }
        }
        get turntableRotation() {
            return this[$scene].getPivotRotation();
        }
        resetTurntableRotation() {
            this[$scene].setPivotRotation(0);
            this[$needsRender]();
        }
    }
    __decorate$8([
        property({ type: Boolean, attribute: 'auto-rotate' })
    ], StagingModelViewerElement.prototype, "autoRotate", void 0);
    __decorate$8([
        property({ type: Number, attribute: 'auto-rotate-delay' })
    ], StagingModelViewerElement.prototype, "autoRotateDelay", void 0);
    return StagingModelViewerElement;
};

/**
 * This mixin function is designed to be applied to a class that inherits
 * from HTMLElement. It makes it easy for a custom element to coordinate with
 * the :focus-visible polyfill.
 *
 * NOTE(cdata): The code here was adapted from an example proposed with the
 * introduction of ShadowDOM support in the :focus-visible polyfill.
 *
 * @see https://github.com/WICG/focus-visible/pull/196
 * @param {Function} SuperClass The base class implementation to decorate with
 * implementation that coordinates with the :focus-visible polyfill
 */
const FocusVisiblePolyfillMixin = (SuperClass) => {
    var _a;
    const coordinateWithPolyfill = (instance) => {
        // If there is no shadow root, there is no need to coordinate with
        // the polyfill. If we already coordinated with the polyfill, we can
        // skip subsequent invokcations:
        if (instance.shadowRoot == null ||
            instance.hasAttribute('data-js-focus-visible')) {
            return () => { };
        }
        // The polyfill might already be loaded. If so, we can apply it to
        // the shadow root immediately:
        if (self.applyFocusVisiblePolyfill) {
            self.applyFocusVisiblePolyfill(instance.shadowRoot);
        }
        else {
            const coordinationHandler = () => {
                self.applyFocusVisiblePolyfill(instance.shadowRoot);
            };
            // Otherwise, wait for the polyfill to be loaded lazily. It might
            // never be loaded, but if it is then we can apply it to the
            // shadow root at the appropriate time by waiting for the ready
            // event:
            self.addEventListener('focus-visible-polyfill-ready', coordinationHandler, { once: true });
            return () => {
                self.removeEventListener('focus-visible-polyfill-ready', coordinationHandler);
            };
        }
        return () => { };
    };
    const $endPolyfillCoordination = Symbol('endPolyfillCoordination');
    // IE11 doesn't natively support custom elements or JavaScript class
    // syntax The mixin implementation assumes that the user will take the
    // appropriate steps to support both:
    class FocusVisibleCoordinator extends SuperClass {
        constructor() {
            super(...arguments);
            this[_a] = null;
        }
        // Attempt to coordinate with the polyfill when connected to the
        // document:
        connectedCallback() {
            super.connectedCallback && super.connectedCallback();
            if (this[$endPolyfillCoordination] == null) {
                this[$endPolyfillCoordination] = coordinateWithPolyfill(this);
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback();
            // It's important to remove the polyfill event listener when we
            // disconnect, otherwise we will leak the whole element via window:
            if (this[$endPolyfillCoordination] != null) {
                this[$endPolyfillCoordination]();
                this[$endPolyfillCoordination] = null;
            }
        }
    }
    _a = $endPolyfillCoordination;
    return FocusVisibleCoordinator;
};

/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Uncomment these lines to export PMREM textures in Glitch:
// export {default as TextureUtils} from './three-components/TextureUtils';
// export * from 'three';
const ModelViewerElement = SceneGraphMixin(MagicLeapMixin(AnnotationMixin(StagingMixin(EnvironmentMixin(ControlsMixin(ARMixin(LoadingMixin(AnimationMixin(FocusVisiblePolyfillMixin(ModelViewerElementBase))))))))));
customElements.define('model-viewer', ModelViewerElement);

export { ModelViewerElement };
