/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var ReactDOM = __webpack_require__(5);
	var React = __webpack_require__(5);
	var index_1 = __webpack_require__(6);
	var editor_1 = __webpack_require__(9);
	var Router_1 = __webpack_require__(8);
	var routes_1 = __webpack_require__(7);
	var viewer_1 = __webpack_require__(62);
	var uploader_1 = __webpack_require__(68);
	var index_2 = __webpack_require__(19);
	index_2.Atom;
	ReactDOM.render(React.createElement(Router_1.Router, {pages: [
	    { route: routes_1.indexRoute, handler: index_1.Index },
	    { route: routes_1.uploadRoute, handler: uploader_1.Upload },
	    { route: routes_1.postRoute, handler: viewer_1.Viewer, resolver: viewer_1.Viewer.load },
	    { route: routes_1.editorRoute, handler: editor_1.Editor, resolver: editor_1.Editor.load },
	]}), document.querySelector('#main'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	!function (global) {
	    var doc = document;
	    /**-------------------------------------**
	     * Globals
	     **-------------------------------------**/
	    var DEBUG_MODE = false;
	    var id = 1;
	    var htmlElement = doc.documentElement;
	    function ReactTag(){}
	    function ReactComponent(){}
	    function ReactArray(){}
	    function ReactText(){}
	
	    function debugVNode(node) {
	        node.id = id++;
	    }
	
	    var currentComponent = null;
	
	    // for performance purposes
	    var VTag = new ReactTag();
	    var VText = new ReactText()
	    var VComponent = new ReactComponent();
	    var VArray = new ReactArray();
	
	    var constProps = {
	        checked: 'checked',
	        controls: 'controls',
	        id: 'id',
	        loop: 'loop',
	        multiple: 'multiple',
	        muted: 'muted',
	        readOnly: 'readOnly',
	        selected: 'selected',
	        srcDoc: 'srcdoc',
	        value: 'value'
	    };
	    var allAttrs = "accept,accessKey,action,allowFullScreen,allowTransparency,alt,async,autoComplete,autoPlay,capture,cellPadding,cellSpacing,charSet,challenge,checked,classID,cols,colSpan,content,contentEditable,contextMenu,controls,coords,crossOrigin,data,dateTime,default,defer,dir,disabled,download,draggable,encType,form,formAction,formEncType,formMethod,formNoValidate,formTarget,frameBorder,headers,height,hidden,high,href,hrefLang,icon,id,inputMode,integrity,is,keyParams,keyType,kind,label,lang,list,loop,low,manifest,marginHeight,marginWidth,max,maxLength,media,mediaGroup,method,min,minLength,multiple,muted,name,nonce,noValidate,open,optimum,pattern,placeholder,poster,preload,radioGroup,readOnly,rel,required,reversed,role,rows,rowSpan,sandbox,scope,scoped,scrolling,seamless,selected,shape,size,sizes,span,spellCheck,src,srcDoc,srcLang,srcSet,start,step,summary,tabIndex,target,title,type,useMap,value,width,wmode,wrap,about,datatype,inlist,prefix,property,resource,typeof,vocab,autoCapitalize,autoCorrect,autoSave,color,itemProp,itemScope,itemType,itemID,itemRef,results,security,unselectable,cx,cy,d,dx,dy,fill,fx,fy,gradientTransform,gradientUnits,offset,opacity,patternContentUnits,patternUnits,points,preserveAspectRatio,r,rx,ry,spreadMethod,stroke,transform,version,viewBox,x1,x2,x,y1,y2,y".split(',')
	    var fastAttrs = {"acceptCharset":"accept-charset","className":"class","htmlFor":"for","httpEquiv":"http-equiv","clipPath":"clip-path","fillOpacity":"fill-opacity","fontFamily":"font-family","fontSize":"font-size","markerEnd":"marker-end","markerMid":"marker-mid","markerStart":"marker-start","stopColor":"stop-color","stopOpacity":"stop-opacity","strokeDasharray":"stroke-dasharray","strokeLinecap":"stroke-linecap","strokeOpacity":"stroke-opacity","strokeWidth":"stroke-width","textAnchor":"text-anchor"};
	    for (var i = 0; i < allAttrs.length; i++)
	        if (!constProps[allAttrs[i]])
	            fastAttrs[allAttrs[i]] = allAttrs[i];
	    //var ss = []; var obj = {}; for (var i in DOMProperty.properties){ if (i == 'style') continue; var attr = DOMProperty.properties[i].attributeName; if (i.toLowerCase() == attr.toLowerCase()) ss.push(i); else obj[i] = attr } ss.join(',')
	
	    var xLinkNS = 'http://www.w3.org/1999/xlink';
	    var xLinkAttrs = {"xlinkActuate":"xlink:actuate","xlinkArcrole":"xlink:arcrole","xlinkHref":"xlink:href","xlinkRole":"xlink:role","xlinkShow":"xlink:show","xlinkTitle":"xlink:title","xlinkType":"xlink:type"};
	    var xmlNS = 'http://www.w3.org/XML/1998/namespace';
	    var xmlAttrs = {"xmlBase":"xml:base","xmlLang":"xml:lang","xmlSpace":"xml:space"};
	
	
	    const svgElements = {
	        circle: 'circle',
	        clipPath: 'clipPath',
	        defs: 'defs',
	        ellipse: 'ellipse',
	        g: 'g',
	        image: 'image',
	        line: 'line',
	        linearGradient: 'linearGradient',
	        mask: 'mask',
	        path: 'path',
	        pattern: 'pattern',
	        polygon: 'polygon',
	        polyline: 'polyline',
	        radialGradient: 'radialGradient',
	        rect: 'rect',
	        stop: 'stop',
	        svg: 'svg',
	        text: 'text',
	        tspan: 'tspan',
	    }
	
	
	    //noinspection JSUnusedLocalSymbols
	    var isUnitlessNumber = {
	        boxFlex: true,
	        boxFlexGroup: true,
	        columnCount: true,
	        flex: true,
	        flexGrow: true,
	        flexPositive: true,
	        flexShrink: true,
	        flexNegative: true,
	        fontWeight: true,
	        lineClamp: true,
	        lineHeight: true,
	        opacity: true,
	        order: true,
	        orphans: true,
	        widows: true,
	        zIndex: true,
	        zoom: true,
	
	        // SVG-related properties
	        fillOpacity: true,
	        strokeDashoffset: true,
	        strokeOpacity: true,
	        strokeWidth: true
	    };
	
	    var constEvents = {
	        onClick: 'onclick',
	        onDblClick: 'ondblclick',
	
	        onMouseDown: 'onmousedown',
	        onMouseUp: 'onmouseup',
	        onMouseMove: 'onmousemove',
	        onMouseEnter: 'onmouseenter',
	        onMouseLeave: 'onmouseleave',
	        onMouseOver: 'onmouseover',
	        onMouseOut: 'onmouseout',
	
	        onTouchStart: 'ontouchstart',
	        onTouchEnd: 'ontouchend',
	        onTouchMove: 'ontouchmove',
	        onTouchCancel: 'ontouchcancel',
	        onTouchLeave: 'ontouchleave',
	
	        onContextMenu: 'oncontextmenu',
	
	        onInput: 'oninput',
	        onFocus: 'onfocus',
	        onChange: 'onchange',
	
	        onKeyDown: 'onkeydown',
	        onKeyPress: 'onkeypress',
	        onKeyUp: 'onkeyup'
	    };
	
	    var topEvents = {
	        onClick: 'click',
	        onDblClick: 'dblclick',
	
	        onMouseDown: 'mousedown',
	        onMouseUp: 'mouseup',
	        onMouseMove: 'mousemove',
	        onMouseEnter: 'mouseenter',
	        onMouseLeave: 'mouseleave',
	        onMouseOver: 'mouseover',
	        onMouseOut: 'mouseout'
	    };
	    var topEventsMap = {};
	    for (var i in topEvents)
	        topEventsMap[topEvents[i]] = 0;
	
	
	    const svgNS = 'http://www.w3.org/2000/svg';
	
	    /**
	     * VTagTuple[type, node, tag, key, attrsHash, attrsLen, constAttrsLen, ...attrs, ...children]
	     **/
	    // 0/*type*/
	    // 1/*node*/
	    // 2/*tag*/
	    // 3/*key*/
	    // 4/*refT*/
	    // 5/*ownerT*/
	    // 6/*attrsHash*/
	    // 7/*attrsLen*/
	    // 8/*constAttrsLen*/
	    // 9/*attrsStartPos*/
	
	    /**
	     * VTextTuple[type, node, value]
	     */
	    // 0/*type*/
	    // 1/*nodeText*/
	    // 2/*text*/
	
	    /**
	     * VArrayTuple[type, parentNode, keyMap, sourceArray, ...values]
	     */
	    // 0/*type*/
	    // 1/*parentNodeArr*/
	    // 2/*keymap*/
	    // 3/*sourceArray*/
	    // 4/*arrayFirstNode*/
	
	    /**
	     * VChildren[type, parentNode, refComponent, ...values]
	     */
	    // 0/*type*/
	    // 1/*parentNodeChild*/
	    // 2/*refComponent*/
	    // 3/*VChildrenFirstNode*/
	
	    /**
	     * VComponentTuple[type, parentNode, Ctor, key, ref, instance, children, props, propsChildren?]
	     */
	    // 0/*type*/
	    // 1/*parentNode*/
	    // 2/*Ctor*/
	    // 3/*keyCmp*/
	    // 4/*ref*/
	    // 5/*ownerC*/
	    // 6/*instance*/
	    // 7/*children*/
	    // 8/*props*/
	    // 9/*propsChildren*/
	
	
	    /**-------------------------------------**
	     * Creating
	     **-------------------------------------**/
	    function create(vdom, rootNode, before, parentComponent, renderToParent) {
	        if (DEBUG_MODE) {
	            debugVNode(vdom);
	        }
	
	        if (vdom[0/*type*/] == VText) {
	            if (renderToParent && vdom[2/*text*/]) {
	                rootNode.textContent = vdom[2/*text*/];
	                vdom[1/*nodeText*/] = rootNode.firstChild;
	            } else {
	                vdom[1/*nodeText*/] = doc.createTextNode(vdom[2/*text*/]);
	                rootNode.insertBefore(vdom[1/*nodeText*/], before);
	            }
	        }
	        else if (vdom[0/*type*/] == VTag) {
	            // isSvg
	            if (typeof svgElements[vdom[2/*tag*/]] == 'string') {
	                var node = doc.createElementNS(svgNS, vdom[2/*tag*/]);
	            } else {
	                var node = doc.createElement(vdom[2/*tag*/]);
	            }
	            vdom[1/*node*/] = rootNode.insertBefore(node, before);
	            var attrsStart = 9/*attrsStartPos*/;
	            var attrsEnd = 9/*attrsStartPos*/ + vdom[7/*attrsLen*/] * 2;
	            for (var i = attrsStart; i < attrsEnd; i += 2) {
	                handleAttr(vdom[i], vdom[i + 1], null, node, vdom);
	            }
	            var start = 9/*attrsStartPos*/ + vdom[7/*attrsLen*/] * 2;
	            var end = vdom.length;
	            var childRenderToParent = end - start == 1;
	            for (var i = start; i < end; i++) {
	                vdom[i] = create(norm(vdom[i]), node, null, parentComponent, childRenderToParent);
	            }
	
	            if (vdom[4/*refT*/]) {
	                setRef(vdom);
	            }
	        }
	        else if (vdom[0/*type*/] == VArray) {
	            vdom[1/*parentNodeArr*/] = rootNode;
	            //iterate source array
	            var sourceArray = vdom[3/*sourceArray*/];
	            var keyMap = vdom[2/*keymap*/] = {};
	            for (i = 0; i < sourceArray.length; i++) {
	                var vdomPos = i + 4/*arrayFirstNode*/;
	                var child = norm(sourceArray[i]);
	                vdom[vdomPos] = create(child, rootNode, before, parentComponent);
	                var key = getKey(child);
	                if (key != null) {
	                    keyMap[key] = vdomPos;
	                }
	            }
	            vdom[3/*sourceArray*/] = null;
	        }
	        else if (vdom[0/*type*/] == VComponent) {
	            vdom = createComponent(vdom, rootNode, before, parentComponent);
	        }
	        return vdom;
	    }
	
	    function createComponent(vdom, rootNode, before, parentComponent) {
	        var Constructor = vdom[2/*Ctor*/];
	        vdom[1/*parentNode*/] = rootNode;
	        var props = vdom[8/*props*/];
	        if (!Constructor.prototype || !Constructor.prototype.render) {
	            var children = norm(Constructor(props));
	            vdom[7/*children*/] = create(children, vdom[1/*parentNode*/], before, parentComponent);
	        }
	        else {
	            if (Constructor.defaultProps) {
	                setDefaultProps(props, Constructor.defaultProps);
	            } else {
	                Constructor.defaultProps = void 0;
	            }
	            var component = vdom[6/*instance*/] = new Constructor(props);
	            var prevComponent = currentComponent;
	            currentComponent = component;
	            component.node = vdom;
	            component._internalParentComponent = parentComponent;
	            if (component.componentWillMount) {
	                component.componentWillMount();
	            }
	            var children = norm(component.render());
	            component._internalContext = component.getChildContext ? component.getChildContext() : null;
	            vdom[7/*children*/] = create(children, vdom[1/*parentNode*/], before, component);
	            if (component.componentDidMount) {
	                component.componentDidMount();
	            }
	            currentComponent = prevComponent;
	        }
	        if (vdom[4/*ref*/]) {
	            setRef(vdom);
	        }
	        return vdom;
	    }
	
	
	    /**-------------------------------------**
	     * Updating
	     **-------------------------------------**/
	    function update(old, vdom, parentComponent) {
	        var type = vdom[0/*type*/];
	        if (DEBUG_MODE && !vdom.id) {
	            debugVNode(vdom);
	        }
	        // don't update the same node
	        // happens when we use {this.props.children}
	        if (vdom === old) {
	            return vdom;
	        }
	        if (type !== old[0/*type*/]) {
	            return replace(old, vdom, parentComponent);
	        }
	        else if (type == VText) {
	            return updateText(old, vdom);
	        }
	        else if (type == VTag) {
	            return updateTag(old, vdom, parentComponent);
	        }
	        else if (type == VArray) {
	            return updateArray(old, vdom, parentComponent);
	        }
	        else if (type == VComponent) {
	            return updateComponent(old, vdom, parentComponent);
	        }
	    }
	
	    function updateText(old, vdom) {
	        vdom[1/*nodeText*/] = old[1/*nodeText*/];
	        if (vdom[2/*text*/] !== old[2/*text*/]) {
	            vdom[1/*nodeText*/].textContent = vdom[2/*text*/];
	        }
	        return vdom;
	    }
	
	    function updateTag(old, vdom, parentComponent) {
	        var node = vdom[1/*node*/] = old[1/*node*/];
	        if (vdom[2/*tag*/] !== old[2/*tag*/]) {
	            return replace(old, vdom, parentComponent);
	        }
	        var attrsStart = 9/*attrsStartPos*/ + vdom[8/*constAttrsLen*/] * 2;
	        var attrsEnd = 9/*attrsStartPos*/ + vdom[7/*attrsLen*/] * 2;
	        var oldAttrsEnd = 9/*attrsStartPos*/ + old[7/*attrsLen*/] * 2;
	        var vdomLen = vdom.length;
	        var oldLen = old.length;
	        var childLen = vdomLen - attrsEnd;
	        var oldChildLen = oldLen - oldAttrsEnd;
	        if (childLen !== oldChildLen) {
	            return replace(old, vdom, parentComponent);
	        }
	        if (vdom[6/*attrsHash*/] === old[6/*attrsHash*/] && attrsEnd === oldAttrsEnd) {
	            for (var i = attrsStart; i < attrsEnd; i += 2) {
	                handleAttr(vdom[i], vdom[i + 1], old[i + 1], node, vdom);
	            }
	            for (var i = attrsEnd; i < vdomLen; i++) {
	                vdom[i] = update(old[i], norm(vdom[i]), parentComponent);
	            }
	        } else {
	            handleAttrs(vdom, old, attrsEnd, oldAttrsEnd);
	            for (var i = 0; i < childLen; i++) {
	                vdom[attrsEnd + i] = update(old[oldAttrsEnd + i], norm(vdom[attrsEnd + i]), parentComponent);
	            }
	        }
	        if (old[4/*refT*/] != vdom[4/*refT*/] || old[5/*ownerT*/] != vdom[5/*ownerT*/]) {
	            setRef(vdom);
	        }
	        return vdom;
	    }
	
	    function updateComponent(old, vdom, parentComponent) {
	        var Ctor = vdom[2/*Ctor*/];
	        if (old[2/*Ctor*/] !== Ctor) {
	            vdom = replace(old, vdom, parentComponent);
	        }
	        else {
	            vdom[1/*parentNode*/] = old[1/*parentNode*/];
	            var component = vdom[6/*instance*/] = old[6/*instance*/];
	            if (!component) {
	                //noinspection JSDuplicatedDeclaration
	                var children = norm(Ctor());
	                vdom[7/*children*/] = update(old[7/*children*/], children, parentComponent);
	            }
	            else {
	                var prevComponent = currentComponent;
	                currentComponent = component;
	
	                if (component._internalParentComponent !== parentComponent) {
	                    component._internalParentComponent = parentComponent;
	                }
	                if (component._context) {
	                    component._context = null;
	                }
	                var props = vdom[8/*props*/];
	                if (Ctor.defaultProps) {
	                    setDefaultProps(props, Ctor.defaultProps);
	                }
	                if (component.componentWillReceiveProps) {
	                    component.componentWillReceiveProps(props);
	                }
	                var shouldUpdate = true;
	                if (component.shouldComponentUpdate) {
	                    shouldUpdate = component.shouldComponentUpdate(props, component.state);
	                }
	
	                if (shouldUpdate) {
	                    if (component.componentWillUpdate) {
	                        component.componentWillUpdate(props, component.state);
	                    }
	                    component.props = vdom[8/*props*/] = props;
	                    var children = norm(component.render());
	                    component._internalContext = component.getChildContext ? component.getChildContext() : null;
	                    // because child component can still updates
	                    vdom[7/*children*/] = update(component.node[7/*children*/], children, component);
	                    // vdom[7/*children*/] = update(old[7/*children*/], children, component, component);
	                    component.node = vdom;
	                    if (component.componentDidUpdate) {
	                        component.componentDidUpdate(props, component.state);
	                    }
	                } else {
	                    vdom[7/*children*/] = old[7/*children*/];
	                    component.node = vdom;
	                }
	                currentComponent = prevComponent;
	            }
	            if (old[4/*ref*/] != vdom[4/*ref*/] || old[5/*ownerC*/] != vdom[5/*ownerC*/]) {
	                setRef(vdom, old);
	            }
	        }
	        return vdom;
	    }
	
	    function updateArray(old, vdom, parentComponent) {
	        var rootNode = vdom[1/*parentNodeArr*/] = old[1/*parentNodeArr*/];
	        var keyMap = vdom[2/*keymap*/] = old[2/*keymap*/];
	        var oldLen = old.length;
	        var sourceArray = vdom[3/*sourceArray*/];
	        //todo:maybe slow speed
	        var lastNextNode = getChildNode(old, true).nextSibling;
	        var inserts = null;
	
	        var fitCount = 0;
	        for (var i = 4/*arrayFirstNode*/; i < vdom.length; i++) {
	            var newChild = vdom[i] = norm(sourceArray[i - 4/*arrayFirstNode*/]);
	            var oldChild = oldLen > i ? old[i] : null;
	            var newKey = getKey(newChild);
	            if (newKey != null) {
	                var fitPos = keyMap[newKey];
	            }
	            else {
	                if (oldChild && getKey(oldChild) == null) {
	                    fitPos = i;
	                }
	                else {
	                    fitPos = null;
	                }
	            }
	
	            if (fitPos != null) {
	                oldChild = old[fitPos];
	                if (!oldChild) {
	                    throw new Error('duplicate key: ' + newKey);
	                }
	                fitCount++;
	                vdom[i] = update(oldChild, newChild, parentComponent);
	                if (fitPos !== i) {
	                    if (inserts == null) {
	                        inserts = [];
	                    }
	                    inserts.push(i);
	                }
	                old[fitPos] = null;
	            }
	            else {
	                if (inserts == null) {
	                    inserts = [];
	                }
	                inserts.push(i);
	            }
	            if (newKey != null) {
	                keyMap[newKey] = i;
	            }
	        }
	        vdom[3/*sourceArray*/] = null;
	
	        var oldLenFull = oldLen - 4/*arrayFirstNode*/;
	        if (oldLenFull > fitCount) {
	            for (i = 4/*arrayFirstNode*/; i < oldLen; i++) {
	                oldChild = old[i];
	                if (oldChild) {
	                    var key = getKey(oldChild);
	                    if (key != null) {
	                        keyMap[key] = null;
	                    }
	                    remove(rootNode, oldChild, true);
	                    if (oldLenFull == ++fitCount) {
	                        break;
	                    }
	                }
	            }
	        }
	
	        if (inserts) {
	            for (i = inserts.length - 1; i >= 0; i--) {
	                var pos = inserts[i];
	                var child = vdom[pos];
	
	                if (pos == vdom.length - 1) {
	                    var beforeChild = lastNextNode;
	                }
	                else {
	                    beforeChild = getChildNode(vdom[pos + 1], false);
	                }
	
	                if (isRendered(child)) {
	                    move(rootNode, child, beforeChild);
	                }
	                else {
	                    child = vdom[pos] = create(child, rootNode, beforeChild, parentComponent);
	                }
	            }
	        }
	        return vdom;
	    }
	
	    function setRef(vdom) {
	        var topComponent;
	        var ref;
	        var val;
	        if (vdom[0/*type*/] == VTag) {
	            topComponent = vdom[5/*ownerT*/];
	            ref = vdom[4/*refT*/];
	            val = vdom[1/*node*/];
	        }
	        else {
	            topComponent = vdom[5/*ownerC*/];
	            ref = vdom[4/*ref*/];
	            val = vdom[6/*instance*/];
	        }
	        if (typeof ref == 'function') {
	            ref(val);
	        }
	        else {
	            if (!topComponent.refs) {
	                topComponent.refs = {};
	            }
	            topComponent.refs[ref] = val;
	        }
	    }
	
	    function setDefaultProps(props, defaultProps) {
	        for (var prop in defaultProps) {
	            if (typeof props[prop] == 'undefined') {
	                props[prop] = defaultProps[prop];
	            }
	        }
	    }
	
	
	
	
	    /**-------------------------------------**
	     * Attrs
	     **-------------------------------------**/
	    function setStyle(node, oldStyles, newStyles) {
	        var val;
	        var styleNode = node.style;
	        for (prop in newStyles) {
	            val = newStyles[prop];
	            if (oldStyles && oldStyles[prop] === val) {
	                continue;
	            }
	            if (val == +val && typeof isUnitlessNumber[prop] == 'undefined') {
	                val = val + 'px';
	            }
	            styleNode[prop] = val;
	        }
	        if (oldStyles) {
	            for (var prop in oldStyles) {
	                if (typeof newStyles[prop] === 'undefined') {
	                    styleNode[prop] = null;
	                }
	            }
	        }
	    }
	
	    function handleAttr(attr, val, oldVal, node, vdom) {
	        var normAttr;
	        if (val === oldVal) {
	            return;
	        }
	        if ((normAttr = fastAttrs[attr]) || (attr[4] == '-' && attr.substr(0, 5) == 'data-' && (normAttr = attr))) {
	            if (val == null || val === false) {
	                if (oldVal) {
	                    node.removeAttribute(normAttr);
	                }
	            }
	            else {
	                node.setAttribute(normAttr, val);
	            }
	        }
	        else if (normAttr = constProps[attr]) {
	            node[normAttr] = val;
	        }
	        else if ((normAttr = constEvents[attr]) || (attr[0] == 'o' && attr[1] == 'n' && (normAttr = attr.toLowerCase()) && (normAttr in doc && normAttr.substr(0, 2) == 'on'))) {
	            var topEventName = topEvents[attr];
	            if (topEventName) {
	                setTopEvent(node, topEventName, val);
	            }
	            else {
	                node[normAttr] = val;
	            }
	        }
	        else if (attr === 'style') {
	            setStyle(node, oldVal, val);
	        }
	        else if (attr === 'dangerouslySetInnerHTML') {
	            if (!oldVal || oldVal.__html !== val.html) {
	                node.innerHTML = val.__html;
	            }
	        }
	        else if ((normAttr = xLinkAttrs[attr]) || (normAttr = xmlAttrs[attr])) {
	            var ns = normAttr[5] == ':' ? xLinkNS : xmlNS;
	            if (val == null || val === false) {
	                if (oldVal) {
	                    node.removeAttributeNS(ns, normAttr);
	                }
	            }
	            else {
	                node.setAttributeNS(ns, normAttr, val);
	            }
	        }
	    }
	
	    function handleAttrs(vdom, old, newEnd, oldEnd) {
	        var newProp, newPropVal, oldProp, oldPropVal, node = vdom[1/*node*/];
	        var max = oldEnd > newEnd ? oldEnd : newEnd;
	        for (var i = 9/*attrsStartPos*/; i < max; i += 2) {
	            if (i < newEnd) {
	                newProp = vdom[i];
	                newPropVal = vdom[i + 1];
	            } else {
	                newProp = null;
	                newPropVal = null;
	            }
	            if (i < oldEnd) {
	                oldProp = old[i];
	                oldPropVal = old[i + 1];
	            } else {
	                oldProp = null;
	                oldPropVal = null;
	            }
	            if (newProp !== oldProp) {
	                if (oldProp) {
	                    //check old is deleted
	                    var found = false;
	                    for (var j = 9/*attrsStartPos*/; j < newEnd; j += 2) {
	                        if (vdom[j] == oldProp) {
	                            found = true;
	                            break;
	                        }
	                    }
	                    if (!found) {
	                        handleAttr(oldProp, null, oldPropVal, node, vdom);
	                    }
	
	                }
	                if (newProp) {
	                    var found = -1;
	                    for (var j = 9/*attrsStartPos*/; j < oldEnd; j += 2) {
	                        if (old[j] == newProp) {
	                            found = j;
	                            break;
	                        }
	                    }
	                    if (found > -1) {
	                        handleAttr(newProp, newPropVal, old[found + 1], node, vdom);
	                    } else {
	                        handleAttr(newProp, newPropVal, null, node, vdom);
	                    }
	                }
	            }
	            else {
	                handleAttr(newProp, newPropVal, oldPropVal, node, vdom);
	            }
	        }
	    }
	
	    function stopPropagation() {
	        this.propagationStopped = true;
	    }
	
	    function stopImmediatePropagation() {
	        this.propagationStopped = true;
	    }
	
	    function topEvent(event) {
	        var dom = event.target;
	        event.stopPropagation = stopPropagation;
	        event.stopImmediatePropagation = stopImmediatePropagation;
	        event.propagationStopped = false;
	        do {
	            if (event.propagationStopped) {
	                break;
	            }
	            if (dom._events) {
	                var callback = dom._events[event.type];
	                if (callback) {
	                    callback.call(dom, event);
	                }
	            }
	        } while (dom = dom.parentNode);
	    }
	
	    function setTopEvent(dom, eventName, callback) {
	        if (!dom._events) {
	            dom._events = {};
	        }
	        if (callback) {
	            dom._events[eventName] = callback;
	            if (topEventsMap[eventName]++ === 0) {
	                htmlElement.addEventListener(eventName, topEvent);
	            }
	        }
	        else {
	            dom._events[eventName] = null;
	            if (--topEventsMap[eventName] === 0) {
	                htmlElement.removeEventListener(eventName, topEvent);
	            }
	        }
	    }
	
	
	
	    /**-------------------------------------**
	     * Move, Remove, Replace
	     **-------------------------------------**/
	    function replace(old, vdom, parentComponent) {
	        var type = old[0/*type*/];
	        if (type == VComponent) {
	            var parentNode = old[1/*parentNode*/];
	            var before = getChildNode(old, false);
	        }
	        else if (type == VArray) {
	            var parentNode = old[1/*parentNodeArr*/];
	            var before = getChildNode(old, false);
	        }
	        else if (type == VTag) {
	            parentNode = old[1/*node*/].parentNode;
	            before = old[1/*node*/];
	        }
	        else if (type == VText) {
	            parentNode = old[1/*nodeText*/].parentNode;
	            before = old[1/*nodeText*/];
	        }
	        vdom = create(vdom, parentNode, before, parentComponent);
	        remove(parentNode, old, true);
	        return vdom;
	    }
	
	    function remove(parentNode, vdom, removeFromDom) {
	        var type = vdom[0/*type*/];
	        if (type == VComponent || type == VArray) {
	            if (type == VArray) {
	                for (var i = 4/*arrayFirstNode*/; i < vdom.length; i++) {
	                    remove(vdom[1/*parentNodeArr*/], vdom[i], removeFromDom);
	                }
	            }
	            else if (type == VComponent) {
	                if (vdom[6/*instance*/].componentWillUnmount) {
	                    vdom[6/*instance*/].componentWillUnmount();
	                }
	                remove(vdom[1/*parentNode*/], vdom[7/*children*/], removeFromDom);
	            }
	        }
	        else {
	            if (type == VTag) {
	                for (i = 9/*attrsStartPos*/ + vdom[7/*attrsLen*/] * 2; i < vdom.length; i++) {
	                    remove(vdom[1/*node*/], vdom[i], false);
	                }
	                if (removeFromDom) {
	                    parentNode.removeChild(vdom[1/*node*/]);
	                }
	            }
	            if (type == VText && removeFromDom) {
	                parentNode.removeChild(vdom[1/*nodeText*/]);
	            }
	        }
	    }
	
	    function move(parentNode, vdom, beforeChild) {
	        var node = getChildNode(vdom, false);
	        if (node.nextSibling !== beforeChild) {
	            parentNode.insertBefore(node, beforeChild);
	        }
	    }
	
	
	    /**-------------------------------------**
	     * Utils
	     **-------------------------------------**/
	    function norm(vdom) {
	        if (typeof vdom == 'number' || typeof vdom == 'string') {
	            return makeText(vdom);
	        }
	        if (typeof vdom == 'boolean' || vdom == null) {
	            return makeText('');
	        }
	        var type = vdom[0/*type*/];
	        if (!type || (type !== VTag && type !== VText && type !== VComponent && type !== VArray)) {
	            if (vdom.constructor == Array) {
	                return makeVArray(vdom);
	            }
	            return makeText('');
	        }
	        if (type == VComponent) {
	            //convertComponentToTag
	            if (typeof vdom[2/*Ctor*/] == 'string') {
	                var children = normChildren(vdom[8/*props*/].children);
	                return makeTag(vdom[2/*Ctor*/], vdom[8/*props*/], children, 0, children.length, vdom[5/*ownerC*/]);
	            }
	        }
	        return vdom;
	    }
	
	    // [], null, false, "223", undefined, {}, ["xT", ...],
	    function normChildren(vdom) {
	        if (typeof vdom == 'number' || typeof vdom == 'string' || typeof vdom == 'boolean' || vdom == null) {
	            return [vdom];
	        }
	        var type = vdom[0/*type*/];
	        if (type === VTag || type === VText || type === VComponent || type === VArray) {
	            return [vdom];
	        }
	        if (vdom.constructor == Array) {
	            return vdom;
	        }
	        return [vdom];
	    }
	
	    var propsHashCounter = 1;
	
	    function makeAttrs(vdom, attrs, ownerComponent) {
	        var pCount = 0;
	        var k = 9/*attrsStartPos*/;
	        var key, ref;
	        for (var p in attrs) {
	            if (p === 'children') {
	                continue;
	            }
	            if (p === 'key') {
	                key = attrs[p];
	                continue;
	            }
	            if (p === 'ref') {
	                ref = attrs[p];
	                continue;
	            }
	            vdom[k++] = p;
	            vdom[k++] = attrs[p];
	            pCount++;
	        }
	        vdom[3/*key*/] = key;
	        vdom[4/*refT*/] = ref;
	        vdom[5/*ownerT*/] = ref ? ownerComponent : null;
	        return pCount;
	    }
	
	    function makeTag(tag, attrs, childrenArray, from, to, ownerComponent) {
	        var childrenLen = to - from;
	        if (childrenLen < 0) {
	            childrenLen = 0;
	        }
	        if (childrenLen == 0) {
	            if (attrs && attrs.children) {
	                childrenArray = normChildren(attrs.children);
	                from = 0;
	                to = childrenArray.length;
	            }
	        }
	        // var newVdom = new Array(9/*attrsStartPos*/ + 2 + to - from); // min tag array len
	        var vdom = [];
	        vdom[8/*constAttrsLen*/] = 0;
	        vdom[0/*type*/] = VTag;
	        vdom[1/*node*/] = null;
	        vdom[2/*tag*/] = tag;
	        var pCount = attrs ? makeAttrs(vdom, attrs, ownerComponent) : 0;
	        var k = 9/*attrsStartPos*/ + pCount * 2;
	        vdom[6/*attrsHash*/] = propsHashCounter++;
	        vdom[7/*attrsLen*/] = pCount;
	
	        if (childrenLen) {
	            // pre create array slots
	            vdom.length = k + childrenLen;
	            // vdom[k + childrenLen - 1] = null;
	        }
	        if (childrenArray) {
	            for (var i = from; i < to; i++) {
	                vdom[k++] = childrenArray[i];
	            }
	        }
	        if (DEBUG_MODE) {
	            debugVNode(vdom);
	        }
	        return vdom;
	    }
	
	    function makeComponent(Ctor, props, childrenArray, ownerComponent) {
	        var key = null;
	        var ref = null;
	        var newProps = {children: childrenArray};
	        if (props) {
	            for (var p in props) {
	                if (p === 'children') {
	                    if (childrenArray == null) {
	                        newProps.children = props.children;
	                    }
	                    continue;
	                }
	                if (p === 'key') {
	                    key = props[p];
	                    continue;
	                }
	                if (p === 'ref') {
	                    ref = props[p];
	                    continue;
	                }
	                newProps[p] = props[p];
	            }
	        }
	        var vdom = [VComponent, null, Ctor, key, ref, ref ? ownerComponent : null, null, null, newProps];
	        if (DEBUG_MODE) {
	            debugVNode(vdom);
	        }
	        return vdom;
	    }
	
	    function makeVArray(array) {
	        var length = array.length;
	        if (length === 0) {
	            return [VText, null, ''];
	        }
	        var p = new Array(length + 4/*arrayFirstNode*/);
	        p[0/*type*/] = VArray;
	        p[3/*sourceArray*/] = array;
	        if (DEBUG_MODE) {
	            debugVNode(p);
	        }
	        return p;
	    }
	
	    function makeText(text) {
	        var vdom = [VText, null, text];
	        if (DEBUG_MODE) {
	            debugVNode(vdom);
	        }
	        return vdom;
	    }
	
	    function getKey(vdom) {
	        if (vdom[0/*type*/] == VTag) {
	            return vdom[3/*key*/];
	        }
	        else if (vdom[0/*type*/] == VComponent) {
	            return vdom[3/*keyCmp*/];
	        }
	        return null;
	    }
	
	    function getRef(vdom) {
	        if (vdom[0/*type*/] == VComponent) {
	            return vdom[4/*ref*/]
	        }
	        else if (vdom[0/*type*/] == VTag) {
	            return vdom[4/*refT*/]
	        }
	    }
	
	    function getProps(vdom) {
	        if (vdom[0/*type*/] == VComponent) {
	            return vdom[8/*props*/];
	        }
	        else if (vdom[0/*type*/] == VTag) {
	            var attrsStart = 9/*attrsStartPos*/;
	            var attrsEnd = 9/*attrsStartPos*/ + vdom[7/*attrsLen*/] * 2;
	            var props = {};
	            if (attrsEnd - attrsStart > 0) {
	                for (var i = attrsStart; i < attrsEnd; i += 2) {
	                    props[vdom[i]] = vdom[i + 1];
	                }
	            }
	            return props;
	        }
	    }
	
	    function getChildren(vdom){
	        var children;
	        var type = vdom[0/*type*/];
	        if (type == VComponent) {
	            children = vdom[8/*props*/] ? vdom[8/*props*/].children : null;
	        }
	        else if (type == VTag) {
	            children = vdom.slice(9/*attrsStartPos*/ + vdom[7/*attrsLen*/] * 2);
	        }
	        else if (type == VArray){
	            children = vdom.slice(4/*arrayFirstNode*/);
	        }
	        return children;
	    }
	
	    function getTag(vdom){
	        return vdom[0/*type*/] == VComponent ? vdom[2/*Ctor*/] : vdom[2/*tag*/];
	    }
	
	    function getChildNode(vdom, isLast) {
	        while (true) {
	            var type = vdom[0/*type*/];
	            if (type == VArray) {
	                vdom = vdom[isLast ? vdom.length - 1 : 4/*arrayFirstNode*/];
	            }
	            else if (type == VComponent) {
	                vdom = vdom[7/*children*/];
	            }
	            else if (type == VTag) {
	                return vdom[1/*node*/];
	            }
	            else if (type == VText) {
	                return vdom[1/*nodeText*/];
	            }
	        }
	    }
	
	    function isRendered(vdom) {
	        var type = vdom[0/*type*/];
	        if (type == VArray) {
	            return vdom[1/*parentNodeArr*/] != null;
	        }
	        else if (type == VComponent) {
	            return vdom[1/*parentNode*/] != null;
	        }
	        else if (type == VTag) {
	            return vdom[1/*node*/] != null;
	        }
	        else if (type == VText) {
	            return vdom[1/*nodeText*/] != null;
	        }
	    }
	
	    /**-------------------------------------**
	     * Component
	     **-------------------------------------**/
	    function Component(props) {
	        this.props = props;
	        this.node = null;
	        this.state = null;
	
	        this._context = null;
	        this._internalContext = null;
	        this._internalParentComponent = null;
	    }
	
	    var ComponentProto = Component.prototype;
	    ComponentProto.componentWillMount = null;
	    ComponentProto.componentDidMount = null;
	    ComponentProto.componentWillUpdate = null;
	    ComponentProto.componentDidUpdate = null;
	    ComponentProto.componentWillReceiveProps = null;
	    ComponentProto.componentWillUnmount = null;
	    ComponentProto.shouldComponentUpdate = null;
	    ComponentProto.getChildContext = null;
	
	    var queue = [];
	    var isUpdating = false;
	
	    function runQueue() {
	        if (!isUpdating && queue.length > 0) {
	            isUpdating = true;
	            var task = queue.shift();
	            if (task.type == 'update') {
	                var component = task.component;
	                var prevComponent = currentComponent;
	                currentComponent = component;
	                var nextProps = component.props;
	                var nextState = task.nextState;
	
	                var shouldUpdate = true;
	                if (!task.force && component.shouldComponentUpdate) {
	                    shouldUpdate = component.shouldComponentUpdate(nextProps, nextState);
	                }
	
	                if (shouldUpdate) {
	                    if (component.componentWillUpdate) {
	                        component.componentWillUpdate(nextProps, nextState);
	                    }
	                    component.state = nextState;
	                    component._internalContext = typeof component.getChildContext == 'function' ? component.getChildContext() : null;
	                    var children = norm(component.render());
	                    component.node[7/*children*/] = update(component.node[7/*children*/], children, component);
	                    if (component.componentDidUpdate) {
	                        component.componentDidUpdate(nextProps, nextState);
	                    }
	                }
	                currentComponent = prevComponent;
	            }
	            isUpdating = false;
	            runQueue();
	            if (task.callback) {
	                task.callback();
	            }
	        }
	    }
	
	    ComponentProto.setState = function (state, callback) {
	        if (state && this.state) {
	            for (var key in this.state) {
	                if (!(key in state)) {
	                    state[key] = this.state[key];
	                }
	            }
	        }
	        queue.push({type: 'update', force: false, nextState: state, component: this, callback: callback});
	        runQueue();
	    };
	    ComponentProto.render = function () {
	        return null;
	    };
	    ComponentProto.getChildContext = null;
	    ComponentProto.forceUpdate = function (callback) {
	        queue.push({type: 'update', force: true, nextState: this.state, component: this, callback: callback});
	        runQueue();
	    };
	
	    function getContext() {
	        if (!this._context) {
	            var parentComponent = this;
	            var context = {};
	            var parents = [];
	            while (parentComponent = parentComponent._internalParentComponent) {
	                parents.push(parentComponent._internalContext);
	            }
	            for (var i = 0; i < parents.length; i++) {
	                parentComponent = parents[i];
	                for (var prop in parentComponent) {
	                    context[prop] = parentComponent[prop];
	                }
	            }
	            this._context = context;
	        }
	        return this._context;
	    }
	
	    Object.defineProperty(ComponentProto, 'context', {
	        get: getContext
	    });
	
	    /**-------------------------------------**
	     * Top Level
	     **-------------------------------------**/
	    function createElement(tag, attrs, child) {
	        var argLen = arguments.length;
	        if (typeof tag == 'function') {
	            var children;
	            if (argLen > 2) {
	                children = new Array(argLen - 2);
	                for (var i = 2; i < argLen; i++) {
	                    children[i - 2] = arguments[i];
	                }
	            } else {
	                children = null;
	            }
	            return makeComponent(tag, attrs, children, currentComponent);
	        }
	        var vdom = makeTag(tag, attrs, null, 2, argLen, currentComponent);
	        if (argLen) {
	            var shift = vdom.length - argLen;
	            for (var i = 2; i < argLen; i++) {
	                vdom[shift + i] = arguments[i];
	            }
	        }
	        return vdom;
	    }
	
	    function render(vdom, rootNode) {
	        isUpdating = true;
	        if (typeof rootNode._vdom == 'undefined') {
	            vdom = rootNode._vdom = create(norm(vdom), rootNode, null, null);
	        }
	        else {
	            var old = rootNode._vdom;
	            vdom = rootNode._vdom = update(old, norm(vdom), null);
	        }
	        isUpdating = false;
	        runQueue();
	        return vdom[0/*type*/] == VComponent ? vdom[6/*instance*/] : vdom[1/*node*/];
	    }
	
	    function renderDummy(vdom){
	        doc = dummyDoc;
	        var rootNode = dummyNode;
	        isUpdating = true;
	        if (typeof rootNode._vdom == 'undefined') {
	            vdom = rootNode._vdom = create(norm(vdom), rootNode, null, null);
	        }
	        else {
	            var old = rootNode._vdom;
	            vdom = rootNode._vdom = update(old, norm(vdom), null);
	        }
	        isUpdating = false;
	        runQueue();
	        return vdom[0/*type*/] == VComponent ? vdom[6/*instance*/] : vdom[1/*node*/];
	    }
	
	    var propType = function () {return propType};
	    propType.isRequired = function () {}
	    const PropTypes = {
	        array: propType,
	        bool: propType,
	        func: propType,
	        number: propType,
	        object: propType,
	        string: propType,
	        any: propType,
	        arrayOf: propType,
	        element: propType,
	        instanceOf: propType,
	        node: propType,
	        objectOf: propType,
	        oneOf: propType,
	        oneOfType: propType,
	        shape: propType
	    };
	
	    function findDOMNode(vdom) {
	        return vdom;
	    }
	
	    function cloneElement(vdom, props) {
	        var vprops = getProps(vdom);
	        for (var i in props){
	            vprops[i] = props[i];
	        }
	        return makeComponent(getTag(vdom), vprops, getChildren(vdom));
	    }
	
	    function isValidElement(element) {
	        return element && typeof element == 'object' && (element[0/*type*/] == VTag || element[0/*type*/] == VComponent);
	    }
	
	    function createClass(specification) {
	        var defaultProps = specification.getDefaultProps ? specification.getDefaultProps() : null;
	        var componentProps = {};
	        for (var p in specification) {
	            if (p != 'getDefaultProps' && p != 'getInitialState' && p != 'statics'
	                && p != 'componentWillMount' && p != 'componentDidMount' && p != 'componentWillReceiveProps'
	                && p != 'shouldComponentUpdate' && p != 'componentWillUpdate' && p != 'componentDidUpdate'
	                && p != 'componentWillUnmount' && p != 'render' && p != 'propTypes' && p != 'displayName') {
	                componentProps[p] = specification[p];
	            }
	        }
	        if (!specification.getInitialState) {
	            specification.getInitialState = null;
	        }
	
	        function Comp(props) {
	            this.state = specification.getInitialState ? specification.getInitialState() : null;
	            this.props = props;
	            this.node = null;
	            for (var p in componentProps) {
	                var val = componentProps[p];
	                this[p] = typeof val == 'function' ? val.bind(this) : val;
	            }
	
	            this._internalContext = null;
	            this._internalParentComponent = null;
	        }
	
	        for (var method in ComponentProto) {
	            Comp.prototype[method] = ComponentProto[method];
	        }
	        Comp.prototype.componentWillMount = specification.componentWillMount;
	        Comp.prototype.componentDidMount = specification.componentDidMount;
	        Comp.prototype.componentWillReceiveProps = specification.componentWillReceiveProps;
	        Comp.prototype.shouldComponentUpdate = specification.shouldComponentUpdate;
	        Comp.prototype.componentWillUpdate = specification.componentWillUpdate;
	        Comp.prototype.componentDidUpdate = specification.componentDidUpdate;
	        Comp.prototype.componentWillUnmount = specification.componentWillUnmount;
	        Comp.prototype.render = specification.render;
	        Object.defineProperty(Comp.prototype, 'context', {get: getContext});
	        Comp.displayName = specification.displayName;
	        Comp.propTypes = specification.propTypes;
	        Comp.defaultProps = defaultProps;
	        if (specification.statics) {
	            for (var i in specification.statics) {
	                Comp[i] = specification.statics[i];
	            }
	        }
	        return Comp;
	    }
	
	    function unmountComponentAtNode(container) {
	        render(null, container);
	    }
	
	    function createFactory(type) {
	        return createElement.bind(null, type);
	    }
	
	    function spread(from) {
	        for (var i = 1, len = arguments.length; i < len; i++) {
	            var arg = arguments[i];
	            for (var prop in arg) {
	                from[prop] = arg[prop];
	            }
	        }
	        return from;
	    }
	
	    const Children = {
	        map: function (children, fn, thisArg) {
	            return Children.toArray(children).map(fn, thisArg);
	        },
	        forEach: function (children, fn, thisArg) {
	            return Children.toArray(children).forEach(fn, thisArg);
	        },
	        count: function (children) {
	            return Children.toArray(children).length;
	        },
	        toArray: function (children) {
	            if (children == null) {
	                return [];
	            }
	            var vdom = norm(children);
	            var ret = [];
	            var type = vdom[0/*type*/];
	            if (type == VArray) {
	                var start = 4/*arrayFirstNode*/;
	                for (var i = start; i < vdom.length; i++) {
	                    ret = ret.concat(Children.toArray(vdom[i]));
	                }
	                return ret;
	            }
	            var tag = getTag(vdom);
	            var childs = getChildren(vdom);
	            var props = getProps(vdom);
	            props.children = childs;
	            var obj = vdom.slice();
	            obj.type = tag;
	            obj.key = getKey(vdom);
	            obj.ref = getRef(vdom);
	            obj.props = props;
	            return [obj];
	        },
	        only: function (children) {
	            if (!isValidElement(children)) {
	                throw new Error('onlyChild must be passed a children with exactly one child.');
	            }
	            return children;
	        }
	    };
	
	    /**-------------------------------------**
	     * Export
	     **-------------------------------------**/
	    module.exports = {
	        Component: Component,
	        findDOMNode: findDOMNode,
	        createElement: createElement,
	        render: render,
	        renderDummy: renderDummy,
	        PropTypes: PropTypes,
	        cloneElement: cloneElement,
	        isValidElement: isValidElement,
	        createClass: createClass,
	        unmountComponentAtNode: unmountComponentAtNode,
	        createFactory: createFactory,
	        Children: Children,
	        TagType: VTag,
	        ComponentType: VComponent,
	        ArrayType: VArray,
	        TextType: VText,
	        __spread: spread
	    };
	    if (typeof window == 'object') {
	        window.__FRC = VComponent;
	        window.__FRT = VTag;
	        window.__FRt = VText;
	        window.__FRA = VArray;
	    }
	    function dummy(){return dummyNode;}
	    var dummyNode = {
	        firstChild: null,
	        parentNode: null,
	        textContent: '',
	        setAttribute: dummy,
	        addEventListener: dummy,
	        removeEventListener: dummy,
	        insertBefore: dummy,
	        removeChild: dummy
	    };
	    dummyNode.firstChild = dummyNode;
	    dummyNode.parentNode = dummyNode;
	    var dummyDoc = {
	        documentElement: dummyNode,
	        appendChild: dummy,
	        insertBefore: dummy,
	        createElement: dummy,
	        createElementNS: dummy,
	        createTextNode: dummy
	    }
	}();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var routes_1 = __webpack_require__(7);
	var Index = (function (_super) {
	    __extends(Index, _super);
	    function Index() {
	        _super.apply(this, arguments);
	    }
	    Index.prototype.render = function () {
	        return React.createElement("div", null, 
	            React.createElement("a", {onClick: function () { return routes_1.uploadRoute.goto({}); }}, "Upload")
	        );
	    };
	    return Index;
	}(React.Component));
	exports.Index = Index;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Router_1 = __webpack_require__(8);
	exports.indexRoute = new Router_1.Route('/');
	exports.uploadRoute = new Router_1.Route('/upload');
	exports.postRoute = new Router_1.Route('/post/:id');
	exports.editorRoute = new Router_1.Route('/editor/:id');


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var scrollData = {};
	var activeUrl;
	var exclMark = false;
	var html5History = false; //typeof history.pushState == 'function' ? true : false;
	var activeRouter;
	var resolving = false;
	function go(url, isBack, replaceCurrent) {
	    if (isBack === void 0) { isBack = false; }
	    if (replaceCurrent === void 0) { replaceCurrent = false; }
	    if (resolving) {
	        return Promise.resolve();
	    }
	    if (html5History) {
	        history.pushState(null, null, url);
	    }
	    else {
	        url = url.split('#').pop();
	        if (url.indexOf('http:') === 0) {
	            url = '/';
	        }
	        location.hash = (exclMark ? '!' : '') + url;
	    }
	    if (!isBack) {
	        scrollData[location.href] = 0;
	    }
	    return activeRouter.changeUrl(isBack, replaceCurrent);
	}
	exports.go = go;
	exports.stack = [];
	function goBack(defaultUrl) {
	    if (resolving) {
	        return Promise.resolve();
	    }
	    exports.stack.pop();
	    var url = exports.stack.pop();
	    if (url) {
	        return go(url, true);
	    }
	    else {
	        return go(defaultUrl, true);
	    }
	}
	exports.goBack = goBack;
	var Router = (function (_super) {
	    __extends(Router, _super);
	    function Router(props) {
	        _super.call(this, props);
	        this.routes = this.props.pages;
	        this.saveScroll = false;
	        activeRouter = this;
	    }
	    Router.prototype.hideMenu = function () {
	        document.body.classList.remove('js-menu-opened');
	    };
	    Router.prototype.changeUrl = function (isBack, replaceCurrent) {
	        var _this = this;
	        if (isBack === void 0) { isBack = false; }
	        if (replaceCurrent === void 0) { replaceCurrent = false; }
	        var currentUrl = location.href;
	        if (activeUrl == currentUrl) {
	            this.hideMenu();
	            return Promise.resolve();
	        }
	        resolving = true;
	        this.saveScroll = false;
	        activeUrl = currentUrl;
	        if (replaceCurrent) {
	            exports.stack.pop();
	        }
	        exports.stack.push(activeUrl);
	        //console.log("changeUrl", stack);
	        this.changeRoute();
	        //debugger;
	        if (this.activePage.resolver) {
	            var promise = this.activePage.resolver(this.activePage.params);
	        }
	        else {
	            promise = Promise.resolve(null);
	        }
	        promise.then(function (data) {
	            _this.activePage.resolved = data;
	            _this.activePage.url = activeUrl;
	            _this.forceUpdate();
	            resolving = false;
	        }, function (callback) {
	            resolving = false;
	            if (typeof callback == 'function') {
	                callback();
	            }
	        });
	        return promise;
	    };
	    Router.prototype.changeRoute = function () {
	        var url = '';
	        if (html5History) {
	            url = location.pathname;
	        }
	        else {
	            url = location.hash.substr(1);
	            if (exclMark && url[0] == '!') {
	                url = url.substring(1);
	            }
	        }
	        this.activePage = this.emptyPage;
	        for (var i = 0; i < this.routes.length; i++) {
	            var routeItem = this.routes[i];
	            var params = routeItem.route.check(url);
	            if (params) {
	                this.activePage = routeItem;
	                this.activePage.params = params;
	            }
	        }
	    };
	    Router.prototype.componentWillReceiveProps = function () {
	        this.changeRoute();
	    };
	    Router.prototype.componentDidMount = function () {
	        var _this = this;
	        //console.log("componentDidMount");
	        window.addEventListener(html5History ? 'popstate' : 'hashchange', function () {
	            _this.changeUrl();
	        });
	        window.addEventListener('scroll', function () {
	            if (_this.saveScroll) {
	                scrollData[activeUrl] = window.scrollY;
	            }
	        });
	        this.changeUrl();
	    };
	    Router.prototype.componentDidUpdate = function () {
	        window.scrollTo(0, scrollData[activeUrl] || 0);
	        this.saveScroll = true;
	    };
	    Router.prototype.render = function () {
	        return React.createElement("div", {className: "router"}, this.activePage
	            ? React.createElement(this.activePage.handler, { resolved: this.activePage.resolved, params: this.activePage.params })
	            : null);
	    };
	    return Router;
	}(React.Component));
	exports.Router = Router;
	var Route = (function () {
	    function Route(url) {
	        url = '/' + url.replace(/(^\/+|\/+$)/g, '');
	        url = url === '/' ? url : url + '/';
	        this.url = url;
	        var v;
	        var reg = /:([^\/]+)/g;
	        var names = [];
	        while (v = reg.exec(url))
	            names.push(v[1]);
	        this.names = names;
	        this.regexp = new RegExp('^' + url.replace(/(:([^\/]+))/g, '([^\/]+)') + '?$');
	    }
	    Route.prototype.check = function (url) {
	        var m;
	        if (m = this.regexp.exec(url)) {
	            var params = {};
	            for (var j = 0; j < this.names.length; j++) {
	                params[this.names[j]] = m[j + 1];
	            }
	            return params;
	        }
	        return null;
	    };
	    Route.prototype.toUrl = function (params) {
	        var url = this.url;
	        for (var key in params) {
	            url = url.replace(new RegExp(':' + key + '(/|$)'), params[key] + '$1');
	        }
	        return url;
	    };
	    Route.prototype.goto = function (params, replaceCurrent, e) {
	        if (replaceCurrent === void 0) { replaceCurrent = false; }
	        if (e) {
	            e.preventDefault();
	        }
	        return go(this.toUrl(params), null, replaceCurrent);
	    };
	    return Route;
	}());
	exports.Route = Route;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	var post_1 = __webpack_require__(10);
	var editor_model_1 = __webpack_require__(12);
	var thumbs_1 = __webpack_require__(20);
	var timeline_1 = __webpack_require__(24);
	var timeline_connector_1 = __webpack_require__(30);
	var audio_player_1 = __webpack_require__(34);
	var time_allocate_1 = __webpack_require__(38);
	var editor_text_1 = __webpack_require__(39);
	var config_1 = __webpack_require__(21);
	__webpack_require__(45);
	var toolbar_1 = __webpack_require__(47);
	var editor_title_1 = __webpack_require__(56);
	var editor_tags_1 = __webpack_require__(59);
	var prop_1 = __webpack_require__(11);
	var autowatch_1 = __webpack_require__(42);
	var Editor = (function (_super) {
	    __extends(Editor, _super);
	    function Editor() {
	        _super.apply(this, arguments);
	        this.model = this.props.resolved;
	        this.audioPlayer = new audio_player_1.AudioPlayer();
	    }
	    Editor.load = function (params) {
	        return post_1.PostModel.fetch(params.id).then(function (data) { return new editor_model_1.EditorModel().fromPostModel(data); });
	    };
	    Editor.prototype.componentDidMount = function () {
	        var _this = this;
	        window.editorHistory = this.model.history;
	        var data = this.model.postModel.data;
	        var enAudio = data.mediaFiles[data.post.enAudio];
	        var url = config_1.config.baseUrl + '/' + enAudio.url;
	        this.audioPlayer.loadSound(url).then(function () {
	            _this.forceUpdate();
	        });
	    };
	    Editor.prototype.render = function () {
	        var _this = this;
	        var postModel = this.model.postModel;
	        // const positions = this.model.postModel.lines.map(line => (line.en.start + line.en.dur / 2) / this.model.resizeKoef);
	        var positions = this.model.lines.map(function (line) { return (line.en.start + line.en.dur / 2) / _this.model.resizeKoef; });
	        // console.log(positions, positions2);
	        var renderLines = new time_allocate_1.LineAllocator(positions, 50).allocateRenderLines();
	        return React.createElement("div", {className: "editor"}, 
	            React.createElement("div", {className: "editor-main"}, 
	                React.createElement(editor_title_1.EditorTitle, {model: this.model}), 
	                React.createElement(editor_tags_1.EditorTags, {model: this.model}), 
	                React.createElement(editor_text_1.EditorText, {model: this.model, renderLines: renderLines})), 
	            this.audioPlayer.soundLoaded ?
	                React.createElement("div", null, 
	                    React.createElement(timeline_1.Timeline, {resizeKoef: this.model.resizeKoef, player: this.audioPlayer}), 
	                    React.createElement(timeline_connector_1.TimelineConnector, {lines: this.model.lines, lineH: this.model.lineH, resizeKoef: this.model.resizeKoef, player: this.audioPlayer, history: this.model.history, renderLines: renderLines})) : null, 
	            React.createElement(thumbs_1.Thumbs, {postModel: postModel, resizeKoef: this.model.resizeKoef}), 
	            React.createElement(toolbar_1.EditorToolbar, {model: this.model}));
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], Editor.prototype, "model", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], Editor.prototype, "audioPlayer", void 0);
	    Editor = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], Editor);
	    return Editor;
	}(React.Component));
	exports.Editor = Editor;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var prop_1 = __webpack_require__(11);
	var PostModel = (function () {
	    function PostModel(data) {
	        this.data = data;
	        this.lines = this.getLines();
	    }
	    PostModel.prototype.getLines = function () {
	        var data = this.data;
	        var shiftEnSubs = data.mediaFiles[data.post.enSub].shiftTime * 100;
	        var shiftRuSubs = data.mediaFiles[data.post.ruSub].shiftTime * 100;
	        var shiftEnAudio = data.mediaFiles[data.post.enAudio].shiftTime * 100;
	        var shiftRuAudio = data.mediaFiles[data.post.ruAudio].shiftTime * 100;
	        return data.lines.filter(function (line) { return Boolean(data.textLines[line.en]); }).map(function (line) {
	            var en = data.textLines[line.en];
	            var ru = data.textLines[line.ru];
	            if (en) {
	                en.start -= shiftEnAudio - shiftEnSubs;
	            }
	            if (ru && shiftRuAudio) {
	                ru.start -= shiftRuAudio - shiftRuSubs;
	            }
	            return {
	                en: en,
	                ru: ru,
	                speaker: line.speaker
	            };
	        });
	    };
	    PostModel.fetch = function (id) {
	        return fetch('http://localhost:1335/v1/post/' + id).then(function (data) { return data.json(); }).then(function (data) {
	            return new PostModel(data.data);
	        });
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Array)
	    ], PostModel.prototype, "lines", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], PostModel.prototype, "data", void 0);
	    return PostModel;
	}());
	exports.PostModel = PostModel;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	exports.prop = function (proto, prop, descriptor) {
	    var _prop = ('_' + prop).substr(0);
	    var fieldName = proto.constructor.name + '.' + prop;
	    var getFn = new Function("\n            var atom = this." + _prop + ";\n            if (atom) {\n                return atom.get();\n            }\n            else {\n                atom = this." + _prop + " = new AtomGlob().prop('" + fieldName + "', null);\n                return atom.get();\n            }\n            ");
	    var setFn = new Function('value', "\n            var atom = this." + _prop + ";\n            if (atom) {\n                atom.set(value);\n            }\n            else {\n                this." + _prop + " = new AtomGlob().prop('" + fieldName + "', value);\n            }\n            ");
	    if (descriptor && descriptor.get) {
	        proto[_prop + 'Getter'] = descriptor.get;
	        var getterFn = new Function("\n            var atom = this." + _prop + ";\n            if (atom) {\n                return atom.getWithCalc();\n            }\n            else {\n                atom = this." + _prop + " = new AtomGlob().getter('" + fieldName + "', this, this." + _prop + "Getter);\n                return atom.getWithCalc();\n            }\n            ");
	        return {
	            set: void 0,
	            get: getterFn
	        };
	    }
	    return {
	        set: setFn,
	        get: getFn
	    };
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var lang_1 = __webpack_require__(13);
	var post_1 = __webpack_require__(10);
	var history_1 = __webpack_require__(14);
	var line_1 = __webpack_require__(15);
	var editor_text_model_1 = __webpack_require__(16);
	var editor_speakerlist_model_1 = __webpack_require__(17);
	var prop_1 = __webpack_require__(11);
	var historyTitle = 'title';
	var historyTags = 'tags';
	var EditorModel = (function () {
	    function EditorModel() {
	        var _this = this;
	        this.lines = [];
	        this.history = new history_1.EditorHistory()
	            .listen(historyTitle, this.historySetTitle)
	            .listen(historyTags, this.historySetTags);
	        this.resizeKoef = 4;
	        this.lineH = 50;
	        this.title = '';
	        this.tags = '';
	        this.historySetTitle = function (data, isRedo) {
	            _this.title = isRedo ? data.newValue : data.oldValue;
	        };
	        this.historySetTags = function (data, isRedo) {
	            _this.tags = isRedo ? data.newValue : data.oldValue;
	        };
	    }
	    EditorModel.prototype.setTitle = function (title) {
	        this.history.add(new history_1.EditorHistoryStringData({
	            type: historyTitle,
	            newValue: title,
	            oldValue: this.title,
	        }));
	        this.title = title;
	    };
	    EditorModel.prototype.setTags = function (tags) {
	        this.history.add(new history_1.EditorHistoryStringData({
	            type: historyTags,
	            newValue: tags,
	            oldValue: this.tags,
	        }));
	        this.tags = tags;
	    };
	    EditorModel.prototype.fromPostModel = function (postModel) {
	        this.postModel = postModel;
	        this.lines = this.postModel.lines.map(function (line) {
	            return new EditorLine(new EditorTextLine(lang_1.Lang.EN, line.en.start, line.en.dur, line.en ? line.en.text.split(/\s+/).map(function (w) { return new EditorWord(w); }) : []), new EditorTextLine(lang_1.Lang.RU, line.ru.start, line.ru.dur, line.ru ? line.ru.text.split(/\s+/).map(function (w) { return new EditorWord(w); }) : []));
	        });
	        this.textModel = new editor_text_model_1.EditorTextModel(this);
	        this.speakers = new editor_speakerlist_model_1.EditorSpeakerList(this);
	        return this;
	    };
	    EditorModel.prototype.save = function () {
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', post_1.PostModel)
	    ], EditorModel.prototype, "postModel", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Array)
	    ], EditorModel.prototype, "lines", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorModel.prototype, "history", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorModel.prototype, "resizeKoef", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorModel.prototype, "lineH", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorModel.prototype, "title", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorModel.prototype, "tags", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', editor_speakerlist_model_1.EditorSpeakerList)
	    ], EditorModel.prototype, "speakers", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', editor_text_model_1.EditorTextModel)
	    ], EditorModel.prototype, "textModel", void 0);
	    return EditorModel;
	}());
	exports.EditorModel = EditorModel;
	var EditorLine = (function (_super) {
	    __extends(EditorLine, _super);
	    function EditorLine(en, ru) {
	        if (en === void 0) { en = null; }
	        if (ru === void 0) { ru = null; }
	        _super.call(this);
	        this.en = null;
	        this.ru = null;
	        this.en = en ? en : new EditorTextLine(lang_1.Lang.EN, null, null, null);
	        this.ru = ru ? ru : new EditorTextLine(lang_1.Lang.RU, null, null, null);
	    }
	    EditorLine.prototype.getTextLine = function (lang) {
	        return lang == lang_1.Lang.EN ? this.en : this.ru;
	    };
	    EditorLine.prototype.isEmpty = function () {
	        return this.en.isEmpty() && this.ru.isEmpty();
	    };
	    EditorLine.prototype.setTextLine = function (lang, textLine) {
	        if (lang == lang_1.Lang.EN) {
	            this.en = textLine;
	        }
	        else {
	            this.ru = textLine;
	        }
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', EditorTextLine)
	    ], EditorLine.prototype, "en", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', EditorTextLine)
	    ], EditorLine.prototype, "ru", void 0);
	    return EditorLine;
	}(line_1.Line));
	exports.EditorLine = EditorLine;
	var EditorTextLine = (function () {
	    function EditorTextLine(lang, start, dur, words) {
	        this.lang = lang;
	        this.start = start;
	        this.dur = dur;
	        this.setWords(words);
	    }
	    EditorTextLine.prototype.getWord = function (i) {
	        return this.words[i];
	    };
	    EditorTextLine.prototype.isEmpty = function () {
	        return this.getWord(0).isEmpty;
	    };
	    EditorTextLine.prototype.setWords = function (words) {
	        if (!words) {
	            words = [];
	        }
	        words = words.filter(function (w) { return w.word.trim() != ''; });
	        if (words.length == 0) {
	            words = [new EditorWord(null)];
	        }
	        this.words = words;
	        return this;
	    };
	    EditorTextLine.prototype.getText = function () {
	        return this.words.map(function (w) { return w.word; }).join(' ');
	    };
	    EditorTextLine.prototype.setText = function (text) {
	        return this.setWords(text.split(/\s+/).map(function (w) { return new EditorWord(w); }));
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Array)
	    ], EditorTextLine.prototype, "words", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Number)
	    ], EditorTextLine.prototype, "lang", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Number)
	    ], EditorTextLine.prototype, "start", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Number)
	    ], EditorTextLine.prototype, "dur", void 0);
	    return EditorTextLine;
	}());
	exports.EditorTextLine = EditorTextLine;
	var EditorWord = (function () {
	    function EditorWord(word, span) {
	        if (span === void 0) { span = null; }
	        this.isEmpty = false;
	        this.word = word;
	        this.span = span;
	        if (word == null) {
	            this.isEmpty = true;
	            this.word = '\u00A0';
	        }
	    }
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorWord.prototype, "isEmpty", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', String)
	    ], EditorWord.prototype, "word", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Element)
	    ], EditorWord.prototype, "span", void 0);
	    return EditorWord;
	}());
	exports.EditorWord = EditorWord;
	var EditorSelection = (function () {
	    function EditorSelection(lines) {
	        this.lines = lines;
	    }
	    EditorSelection.prototype.set = function (linePos, lang, wordPos) {
	        this.setLine(linePos);
	        this.setLang(lang);
	        this.setWord(wordPos);
	    };
	    EditorSelection.prototype.setLine = function (linePos) {
	        this.linePos = linePos;
	        this.line = this.lines[linePos];
	    };
	    EditorSelection.prototype.setLang = function (lang) {
	        this.lang = lang;
	        this.textLine = this.line.getTextLine(lang);
	    };
	    EditorSelection.prototype.invertLang = function () {
	        this.setLang(this.lang == lang_1.Lang.EN ? lang_1.Lang.RU : lang_1.Lang.EN);
	    };
	    EditorSelection.prototype.setWord = function (wordPos) {
	        this.wordPos = wordPos;
	        this.word = this.textLine.getWord(wordPos);
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', EditorLine)
	    ], EditorSelection.prototype, "line", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Number)
	    ], EditorSelection.prototype, "linePos", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', EditorTextLine)
	    ], EditorSelection.prototype, "textLine", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Number)
	    ], EditorSelection.prototype, "lang", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', EditorWord)
	    ], EditorSelection.prototype, "word", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Number)
	    ], EditorSelection.prototype, "wordPos", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Array)
	    ], EditorSelection.prototype, "lines", void 0);
	    return EditorSelection;
	}());
	exports.EditorSelection = EditorSelection;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	(function (Lang) {
	    Lang[Lang["EN"] = 100] = "EN";
	    Lang[Lang["RU"] = 200] = "RU";
	})(exports.Lang || (exports.Lang = {}));
	var Lang = exports.Lang;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EditorHistoryData = (function () {
	    function EditorHistoryData(json) {
	        var anyJson = json;
	        for (var i in json) {
	            this[i] = anyJson[i];
	        }
	    }
	    return EditorHistoryData;
	}());
	exports.EditorHistoryData = EditorHistoryData;
	var EditorHistoryStringData = (function (_super) {
	    __extends(EditorHistoryStringData, _super);
	    function EditorHistoryStringData() {
	        _super.apply(this, arguments);
	    }
	    return EditorHistoryStringData;
	}(EditorHistoryData));
	exports.EditorHistoryStringData = EditorHistoryStringData;
	var EditorHistory = (function () {
	    function EditorHistory() {
	        this.listeners = [];
	        this.items = [];
	        this.pos = -1;
	    }
	    EditorHistory.prototype.add = function (item) {
	        this.pos++;
	        this.items[this.pos] = item;
	        this.items.length = this.pos + 1;
	    };
	    EditorHistory.prototype.listen = function (type, callback) {
	        this.listeners.push({ type: type, callback: callback });
	        return this;
	    };
	    EditorHistory.prototype.callListeners = function (data, isRedo) {
	        for (var i = 0; i < this.listeners.length; i++) {
	            var listener = this.listeners[i];
	            if (!listener.type || listener.type == data.type) {
	                listener.callback(data, isRedo);
	            }
	        }
	    };
	    EditorHistory.prototype.undo = function () {
	        if (this.pos >= 0) {
	            var item = this.items[this.pos];
	            this.callListeners(item, false);
	            this.pos--;
	            return item;
	        }
	        return null;
	    };
	    EditorHistory.prototype.redo = function () {
	        if (this.pos < this.items.length - 1) {
	            this.pos++;
	            var item = this.items[this.pos];
	            this.callListeners(item, true);
	            return item;
	        }
	        return null;
	    };
	    return EditorHistory;
	}());
	exports.EditorHistory = EditorHistory;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var prop_1 = __webpack_require__(11);
	var Line = (function () {
	    function Line() {
	    }
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], Line.prototype, "en", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], Line.prototype, "ru", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', String)
	    ], Line.prototype, "speaker", void 0);
	    return Line;
	}());
	exports.Line = Line;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var lang_1 = __webpack_require__(13);
	var history_1 = __webpack_require__(14);
	var editor_model_1 = __webpack_require__(12);
	var prop_1 = __webpack_require__(11);
	var historySplit = 'split';
	var historySplitMove = 'split-move';
	var historyJoin = 'join';
	var historyJoinMove = 'join-move';
	var historySpeaker = 'speaker';
	var historyTextLine = 'text-line';
	var HistoryText = (function (_super) {
	    __extends(HistoryText, _super);
	    function HistoryText() {
	        _super.apply(this, arguments);
	    }
	    return HistoryText;
	}(history_1.EditorHistoryData));
	var HistoryTextSpeaker = (function (_super) {
	    __extends(HistoryTextSpeaker, _super);
	    function HistoryTextSpeaker() {
	        _super.apply(this, arguments);
	        this.type = historySpeaker;
	    }
	    return HistoryTextSpeaker;
	}(history_1.EditorHistoryData));
	var HistoryTextWords = (function (_super) {
	    __extends(HistoryTextWords, _super);
	    function HistoryTextWords() {
	        _super.apply(this, arguments);
	        this.type = historyTextLine;
	    }
	    return HistoryTextWords;
	}(history_1.EditorHistoryData));
	var EditorTextModel = (function () {
	    function EditorTextModel(editorModel) {
	        var _this = this;
	        this.historySetTextLine = function (data, isRedo) {
	            _this.lines[data.linePos].getTextLine(data.lang).setText(isRedo ? data.newValue : data.oldValue);
	        };
	        this.historySetSpeaker = function (data, isRedo) {
	            _this.lines[data.linePos].speaker = isRedo ? data.newValue : data.oldValue;
	        };
	        this.historyJoin = function (data, isRedo) {
	            _this.selection.set(data.linePos, data.lang, data.wordPos);
	            _this.splitIntoNewLine();
	            //todo: redo
	        };
	        this.historyJoinMove = function (data, isRedo) {
	            _this.selection.set(data.linePos, data.lang, data.wordPos);
	            _this.splitWithMove();
	            //todo: redo
	        };
	        this.historySplit = function (data, isRedo) {
	            _this.selection.set(data.linePos, data.lang, data.wordPos);
	            _this.joinLine();
	            //todo: redo
	        };
	        this.historySplitMove = function (data, isRedo) {
	            _this.selection.set(data.linePos, data.lang, data.wordPos);
	            _this.joinLineWithMove();
	            //todo: redo
	        };
	        this.editorModel = editorModel;
	        this.lines = editorModel.lines;
	        this.selection = new editor_model_1.EditorSelection(this.editorModel.lines);
	        this.history = this.editorModel.history
	            .listen(historySpeaker, this.historySetSpeaker)
	            .listen(historyTextLine, this.historySetTextLine)
	            .listen(historySplit, this.historySplit)
	            .listen(historySplitMove, this.historySplitMove)
	            .listen(historyJoin, this.historyJoin)
	            .listen(historyJoinMove, this.historyJoinMove);
	    }
	    EditorTextModel.prototype.findClosestNextWord = function (currWord, nextTextLine) {
	        var currRect = currWord.span.getBoundingClientRect();
	        var currPos = currRect.left + currRect.width / 2;
	        return nextTextLine.words.map(function (w, i) {
	            var rect = w.span.getBoundingClientRect();
	            var pos = rect.left + rect.width / 2;
	            return { word: w, pos: i, diff: Math.abs(currPos - pos) };
	        }).sort(function (a, b) { return a.diff < b.diff ? -1 : 1; }).shift().pos;
	    };
	    EditorTextModel.prototype.splitWithMove = function () {
	        var sel = this.selection;
	        var currentTextLine = sel.textLine;
	        var halfDur = currentTextLine.dur / 2;
	        var origWords = currentTextLine.words.slice();
	        var oldDur = currentTextLine.dur;
	        var lastLine = this.lines[this.lines.length - 1];
	        if (!lastLine.getTextLine(sel.lang).isEmpty()) {
	            this.lines.push(new editor_model_1.EditorLine());
	        }
	        for (var i = this.lines.length - 1; i > sel.linePos; i--) {
	            this.lines[i].setTextLine(sel.lang, this.lines[i - 1].getTextLine(sel.lang));
	        }
	        sel.line.setTextLine(sel.lang, new editor_model_1.EditorTextLine(sel.lang, currentTextLine.start, halfDur, origWords.slice(0, sel.wordPos)));
	        var prevTextLine = sel.textLine;
	        //currentTextLine.start += currentTextLine.dur;
	        var nextLinePos = sel.linePos + 1;
	        var newLine = this.lines[nextLinePos];
	        var selTextLine = newLine.getTextLine(sel.lang);
	        selTextLine.setWords(origWords.slice(sel.wordPos));
	        selTextLine.start = currentTextLine.start + halfDur;
	        selTextLine.dur = halfDur;
	        this.selection.set(nextLinePos, sel.lang, 0);
	        /* return new EditorHistoryTimeline({
	         type: EditorHistoryTimeline.type,
	         lineN: nextLinePos - 1,
	         lang: sel.lang,
	         oldStart: prevTextLine.start,
	         oldDur: oldDur,
	         newStart: prevTextLine.start,
	         newDur: prevTextLine.dur
	         });*/
	        /*new EditorHistoryTimeline({
	         type: EditorHistoryTimeline.type,
	         lineN: nextLinePos,
	         lang: sel.lang,
	         oldStart: 0,
	         oldDur: 0,
	         newStart: selTextLine.start,
	         newDur: selTextLine.dur
	         });*/
	        return new HistoryText({
	            type: historySplitMove,
	            lang: sel.lang,
	            linePos: nextLinePos,
	            wordPos: 0
	        });
	    };
	    EditorTextModel.prototype.splitIntoNewLine = function () {
	        var sel = this.selection;
	        var origWords = sel.textLine.words.slice();
	        var currentTextLine = sel.textLine;
	        currentTextLine.setWords(origWords.slice(0, sel.wordPos));
	        var nextLinePos = sel.linePos + 1;
	        var nextLine = this.lines[nextLinePos];
	        if (!nextLine.getTextLine(sel.lang).isEmpty()) {
	            nextLine = new editor_model_1.EditorLine();
	            this.lines.splice(nextLinePos, 0, nextLine);
	        }
	        var nextTextLine = nextLine.getTextLine(sel.lang);
	        nextTextLine.setWords(origWords.slice(sel.wordPos));
	        nextTextLine.start = currentTextLine.start + currentTextLine.dur / 2;
	        currentTextLine.dur /= 2;
	        nextTextLine.dur = currentTextLine.dur;
	        this.selection.set(nextLinePos, sel.lang, 0);
	        return new HistoryText({
	            type: historySplit,
	            lang: sel.lang,
	            linePos: nextLinePos,
	            wordPos: 0
	        });
	    };
	    EditorTextModel.prototype.joinLine = function () {
	        var sel = this.selection;
	        var currentTextLine = sel.textLine;
	        var origWords = currentTextLine.words.slice();
	        if (sel.linePos < 1) {
	            return null;
	        }
	        var prevLinePos = sel.linePos - 1;
	        var prevLine = this.lines[prevLinePos];
	        var prevTextLine = prevLine.getTextLine(sel.lang);
	        var prevWords = prevTextLine.words;
	        var newWords = prevWords.concat(origWords);
	        var textLine = new editor_model_1.EditorTextLine(sel.lang, prevTextLine.start, currentTextLine.start - prevTextLine.start + currentTextLine.dur, newWords);
	        prevLine.setTextLine(sel.lang, textLine);
	        sel.textLine.setWords(null);
	        if (sel.line.isEmpty()) {
	            this.lines.splice(sel.linePos, 1);
	        }
	        var newWordPos = prevWords.length - (prevWords[0].isEmpty ? 1 : 0);
	        this.selection.set(prevLinePos, sel.lang, newWordPos);
	        return new HistoryText({
	            type: historyJoin,
	            lang: sel.lang,
	            linePos: prevLinePos,
	            wordPos: newWordPos
	        });
	    };
	    EditorTextModel.prototype.joinLineWithMove = function () {
	        var lang = this.selection.lang;
	        var linePos = this.selection.linePos;
	        var undo = this.joinLine();
	        if (undo) {
	            for (var i = linePos + 1; i < this.lines.length; i++) {
	                this.lines[i - 1].setTextLine(lang, this.lines[i].getTextLine(lang));
	            }
	            var lastLine = this.lines[this.lines.length - 1];
	            lastLine.setTextLine(lang, new editor_model_1.EditorTextLine(lang, null, null, null));
	            if (lastLine.isEmpty()) {
	                this.lines.pop();
	            }
	            undo.type = historyJoinMove;
	            return undo;
	        }
	    };
	    EditorTextModel.prototype.up = function () {
	        if (this.selection.lang == lang_1.Lang.EN) {
	            if (this.selection.linePos <= 0) {
	                return false;
	            }
	            this.selection.setLine(this.selection.linePos - 1);
	        }
	        this.selection.invertLang();
	        this.selection.setWord(this.findClosestNextWord(this.selection.word, this.selection.textLine));
	        return true;
	    };
	    EditorTextModel.prototype.down = function () {
	        if (this.selection.lang == lang_1.Lang.RU) {
	            if (this.selection.linePos >= this.lines.length - 1) {
	                return false;
	            }
	            this.selection.setLine(this.selection.linePos + 1);
	        }
	        this.selection.invertLang();
	        this.selection.setWord(this.findClosestNextWord(this.selection.word, this.selection.textLine));
	        return true;
	    };
	    EditorTextModel.prototype.left = function () {
	        if (this.selection.wordPos <= 0) {
	            return false;
	        }
	        this.selection.setWord(this.selection.wordPos - 1);
	        return true;
	    };
	    ;
	    EditorTextModel.prototype.right = function () {
	        if (this.selection.wordPos >= this.selection.textLine.words.length - 1) {
	            return false;
	        }
	        this.selection.setWord(this.selection.wordPos + 1);
	        return true;
	    };
	    ;
	    EditorTextModel.prototype.setSpeaker = function (pos, speaker) {
	        this.history.add(new HistoryTextSpeaker({
	            type: null,
	            linePos: pos,
	            oldValue: this.lines[pos].speaker,
	            newValue: speaker,
	        }));
	        this.lines[pos].speaker = speaker;
	    };
	    EditorTextModel.prototype.setWords = function (pos, lang, text) {
	        var textLine = this.lines[pos].getTextLine(lang);
	        this.history.add(new HistoryTextWords({
	            type: null,
	            linePos: pos,
	            lang: lang,
	            oldValue: textLine.getText(),
	            newValue: text,
	        }));
	        textLine.setText(text);
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', editor_model_1.EditorModel)
	    ], EditorTextModel.prototype, "editorModel", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Array)
	    ], EditorTextModel.prototype, "lines", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', editor_model_1.EditorSelection)
	    ], EditorTextModel.prototype, "selection", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', history_1.EditorHistory)
	    ], EditorTextModel.prototype, "history", void 0);
	    return EditorTextModel;
	}());
	exports.EditorTextModel = EditorTextModel;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var history_1 = __webpack_require__(14);
	var prop_1 = __webpack_require__(11);
	var base_array_1 = __webpack_require__(18);
	var SpeakersListHistoryType;
	(function (SpeakersListHistoryType) {
	    SpeakersListHistoryType[SpeakersListHistoryType["ADD"] = 1] = "ADD";
	    SpeakersListHistoryType[SpeakersListHistoryType["CHANGE"] = 2] = "CHANGE";
	    SpeakersListHistoryType[SpeakersListHistoryType["REMOVE"] = 3] = "REMOVE";
	})(SpeakersListHistoryType || (SpeakersListHistoryType = {}));
	var historySpeakerList = 'speaker-list';
	var HistorySpeakersList = (function (_super) {
	    __extends(HistorySpeakersList, _super);
	    function HistorySpeakersList() {
	        _super.apply(this, arguments);
	        this.type = historySpeakerList;
	    }
	    return HistorySpeakersList;
	}(history_1.EditorHistoryData));
	var EditorSpeakerList = (function () {
	    function EditorSpeakerList(model) {
	        var _this = this;
	        this.model = model;
	        this.list = new base_array_1.BaseArray([]);
	        this.onHistory = function (data, isRedo) {
	            if (data.subtype == SpeakersListHistoryType.ADD) {
	                if (isRedo) {
	                    _this.list.push(data.speaker);
	                }
	                else {
	                    _this.list.pop();
	                }
	            }
	            else if (data.subtype == SpeakersListHistoryType.CHANGE) {
	                _this.list.set(data.pos, isRedo ? data.speaker : data.oldVal);
	                if (isRedo) {
	                    _this.renameLineSpeakers(data.oldVal, data.speaker);
	                }
	                else {
	                    _this.renameLineSpeakers(data.speaker, data.oldVal);
	                }
	            }
	            else if (data.subtype == SpeakersListHistoryType.REMOVE) {
	                if (isRedo) {
	                    _this.list.splice(data.pos, 1);
	                    _this.removeLineSpeakers(data.oldVal);
	                }
	                else {
	                    _this.list.splice(data.pos, 0, data.oldVal);
	                    _this.restoreLineSpeakers(data.affectLines, data.oldVal);
	                }
	            }
	        };
	        this.model.history.listen(historySpeakerList, this.onHistory);
	    }
	    EditorSpeakerList.prototype.remove = function (pos) {
	        var oldVal = this.list.get(pos);
	        this.model.history.add(new HistorySpeakersList({
	            type: null,
	            subtype: SpeakersListHistoryType.REMOVE,
	            oldVal: this.list.get(pos),
	            pos: pos,
	            speaker: null,
	            affectLines: this.removeLineSpeakers(oldVal)
	        }));
	        this.list.splice(pos, 1);
	    };
	    EditorSpeakerList.prototype.save = function (pos, speaker) {
	        var oldVal = this.list.get(pos);
	        var isAdd = pos == this.list.length;
	        this.model.history.add(new HistorySpeakersList({
	            type: null,
	            subtype: isAdd ? SpeakersListHistoryType.ADD : SpeakersListHistoryType.CHANGE,
	            oldVal: oldVal,
	            pos: pos,
	            speaker: speaker,
	            affectLines: null,
	        }));
	        if (isAdd) {
	            this.list.push(speaker);
	        }
	        else {
	            this.list.set(pos, speaker);
	            this.renameLineSpeakers(oldVal, speaker);
	        }
	    };
	    EditorSpeakerList.prototype.renameLineSpeakers = function (from, to) {
	        for (var i = 0; i < this.model.lines.length; i++) {
	            var line = this.model.lines[i];
	            if (line.speaker == from) {
	                line.speaker = to;
	            }
	        }
	    };
	    EditorSpeakerList.prototype.removeLineSpeakers = function (speaker) {
	        var affectLines = [];
	        for (var i = 0; i < this.model.lines.length; i++) {
	            var line = this.model.lines[i];
	            if (line.speaker == speaker) {
	                line.speaker = null;
	                affectLines.push(i);
	            }
	        }
	        return affectLines;
	    };
	    EditorSpeakerList.prototype.restoreLineSpeakers = function (lines, speaker) {
	        for (var i = 0; i < lines.length; i++) {
	            var line = this.model.lines[lines[i]];
	            line.speaker = speaker;
	        }
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorSpeakerList.prototype, "list", void 0);
	    return EditorSpeakerList;
	}());
	exports.EditorSpeakerList = EditorSpeakerList;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var index_1 = __webpack_require__(19);
	var prop_1 = __webpack_require__(11);
	var BaseArray = (function () {
	    function BaseArray(items) {
	        this.atom = index_1.Atom.getAtom(this.getAtomCallback, this);
	        this.items = items || [];
	    }
	    Object.defineProperty(BaseArray.prototype, "length", {
	        get: function () {
	            return this.items.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseArray.prototype.getAtomCallback = function () {
	        return this.items;
	    };
	    BaseArray.prototype.mutate = function () {
	        this.atom.change();
	    };
	    BaseArray.prototype.push = function () {
	        var items = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            items[_i - 0] = arguments[_i];
	        }
	        var result = (_a = this.items).push.apply(_a, items);
	        this.mutate();
	        return result;
	        var _a;
	    };
	    BaseArray.prototype.set = function (index, value) {
	        this.items[index] = value;
	        this.mutate();
	    };
	    BaseArray.prototype.get = function (index) {
	        return this.items[index];
	    };
	    BaseArray.prototype.pop = function () {
	        var result = this.items.pop();
	        this.mutate();
	        return result;
	    };
	    BaseArray.prototype.reverse = function () {
	        var result = this.items.reverse();
	        this.mutate();
	        return result;
	    };
	    BaseArray.prototype.shift = function () {
	        var result = this.items.shift();
	        this.mutate();
	        return result;
	    };
	    BaseArray.prototype.sort = function (compareFn) {
	        var result = this.items.sort(compareFn);
	        this.mutate();
	        return result;
	    };
	    BaseArray.prototype.splice = function (start, deleteCount) {
	        var items = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            items[_i - 2] = arguments[_i];
	        }
	        var result = (_a = this.items).splice.apply(_a, [start, deleteCount].concat(items));
	        this.mutate();
	        return result;
	        var _a;
	    };
	    BaseArray.prototype.unshift = function () {
	        var items = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            items[_i - 0] = arguments[_i];
	        }
	        var result = (_a = this.items).unshift.apply(_a, items);
	        this.mutate();
	        return result;
	        var _a;
	    };
	    BaseArray.prototype.concat = function () {
	        var items = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            items[_i - 0] = arguments[_i];
	        }
	        return (_a = this.items).concat.apply(_a, items);
	        var _a;
	    };
	    BaseArray.prototype.join = function (separator) {
	        return this.items.join(separator);
	    };
	    BaseArray.prototype.slice = function (start, end) {
	        return this.items.slice(start, end);
	    };
	    BaseArray.prototype.indexOf = function (searchElement, fromIndex) {
	        return this.items.indexOf(searchElement, fromIndex);
	    };
	    BaseArray.prototype.lastIndexOf = function (searchElement, fromIndex) {
	        return this.items.lastIndexOf(searchElement, fromIndex);
	    };
	    BaseArray.prototype.every = function (callbackfn, thisArg) {
	        return this.items.every(callbackfn, thisArg);
	    };
	    BaseArray.prototype.some = function (callbackfn, thisArg) {
	        return this.items.some(callbackfn, thisArg);
	    };
	    BaseArray.prototype.forEach = function (callbackfn, thisArg) {
	        return this.items.forEach(callbackfn, thisArg);
	    };
	    BaseArray.prototype.map = function (callbackfn, thisArg) {
	        return this.items.map(callbackfn, thisArg);
	    };
	    BaseArray.prototype.filter = function (callbackfn, thisArg) {
	        return this.items.filter(callbackfn, thisArg);
	    };
	    BaseArray.prototype.reduce = function (callbackfn, initialValue) {
	        return this.items.reduce(callbackfn, initialValue);
	    };
	    BaseArray.prototype.reduceRight = function (callbackfn, initialValue) {
	        return this.items.reduceRight(callbackfn, initialValue);
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Array)
	    ], BaseArray.prototype, "items", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], BaseArray.prototype, "length", null);
	    return BaseArray;
	}());
	exports.BaseArray = BaseArray;


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var promise = window.Promise.resolve();
	function runMicroTask(callback) {
	    promise.then(callback);
	}
	(function (AtomStatus) {
	    AtomStatus[AtomStatus["PROP"] = 1] = "PROP";
	    AtomStatus[AtomStatus["GETTER_NO_VAL"] = 2] = "GETTER_NO_VAL";
	    AtomStatus[AtomStatus["GETTER"] = 3] = "GETTER";
	    AtomStatus[AtomStatus["DESTROYED"] = -1] = "DESTROYED";
	})(exports.AtomStatus || (exports.AtomStatus = {}));
	var AtomStatus = exports.AtomStatus;
	(function (AtomAffectStatus) {
	    AtomAffectStatus[AtomAffectStatus["NEEDCALC"] = 1] = "NEEDCALC";
	    AtomAffectStatus[AtomAffectStatus["CALC"] = 5] = "CALC";
	    AtomAffectStatus[AtomAffectStatus["NEEDNOT_CALC"] = 10] = "NEEDNOT_CALC";
	    AtomAffectStatus[AtomAffectStatus["WAIT_PARENT_CALC"] = 30] = "WAIT_PARENT_CALC";
	})(exports.AtomAffectStatus || (exports.AtomAffectStatus = {}));
	var AtomAffectStatus = exports.AtomAffectStatus;
	(function (TaskType) {
	    TaskType[TaskType["CHANGE"] = 10] = "CHANGE";
	    TaskType[TaskType["CLEAR_MASTERS"] = 20] = "CLEAR_MASTERS";
	    TaskType[TaskType["DESTROY"] = 50] = "DESTROY";
	    TaskType[TaskType["MODIFY"] = 100] = "MODIFY";
	})(exports.TaskType || (exports.TaskType = {}));
	var TaskType = exports.TaskType;
	var TaskList = (function () {
	    function TaskList(taskRunner) {
	        this.taskRunner = taskRunner;
	        this.pos = 0;
	        this.donePos = 0;
	        this.asyncRunned = false;
	        this.size = 30000;
	        this.queue = new Array(this.size);
	    }
	    Object.defineProperty(TaskList.prototype, "list", {
	        get: function () {
	            var items = [];
	            for (var i = this.donePos; i < this.pos; i += 3) {
	                var pos = i % this.size;
	                var type = this.queue[pos];
	                items.push({ type: type, atom: this.queue[pos + 1], slave: this.queue[pos + 2] });
	            }
	            return items;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TaskList.prototype.addTask = function (taskType, atom, param) {
	        if (!this.asyncRunned) {
	            this.asyncRunned = true;
	            runMicroTask(this.taskRunner);
	        }
	        var pos = this.pos % this.size;
	        this.queue[pos] = taskType;
	        this.queue[pos + 1] = atom;
	        if (param) {
	            this.queue[pos + 2] = param;
	        }
	        this.pos += 3;
	    };
	    TaskList.prototype.iterateUndone = function (callback) {
	        if (this.pos - this.donePos > this.size) {
	            throw new Error('Out of range');
	        }
	        for (var i = this.donePos; i < this.pos; i += 3) {
	            var pos = i % this.size;
	            var type = this.queue[pos];
	            callback(type, this.queue[pos + 1], type == TaskType.MODIFY ? this.queue[pos + 2] : null, i == this.pos - 3);
	            this.donePos += 3;
	        }
	        this.asyncRunned = false;
	    };
	    return TaskList;
	}());
	exports.TaskList = TaskList;
	var Atom = (function () {
	    function Atom() {
	        this.id = ++Atom.atomId;
	    }
	    Atom.debugAtom = function (name) {
	        if (!Atom.debugAtoms) {
	            Atom.debugAtoms = {};
	        }
	        Atom.debugAtoms[name] = true;
	    };
	    Atom.debug = function () {
	        debugger;
	    };
	    Atom.prototype.prop = function (field, value) {
	        this.value = value;
	        this.field = field;
	        this.slaves = null;
	        this.status = AtomStatus.PROP;
	        return this;
	    };
	    Atom.prototype.getter = function (field, owner, calcFn) {
	        this.value = null;
	        this.field = field;
	        this.slaves = null;
	        this.calcFn = calcFn;
	        this.owner = owner;
	        this.masters = [];
	        this.status = AtomStatus.GETTER_NO_VAL;
	        return this;
	    };
	    Atom.prototype.getWithCalc = function () {
	        if (this.status === AtomStatus.GETTER_NO_VAL) {
	            this.calc();
	        }
	        return this.get();
	    };
	    Atom.prototype.getWithForceCalc = function () {
	        this.calc();
	        return this.get();
	    };
	    Atom.prototype.get = function () {
	        //this.checkForDestroy();
	        var activeSlave = Atom.activeSlave;
	        if (activeSlave) {
	            var activeSlaveMasters = activeSlave.masters;
	            var len = activeSlaveMasters.length;
	            var shared = Atom.shared;
	            // if find self in activeSlave masters exit
	            var k = shared.k;
	            for (var i = 0; i < len; i++) {
	                if (activeSlaveMasters[i] === this) {
	                    shared[i] = k;
	                    return this.value;
	                }
	            }
	            // if find self in added list exit
	            var sharedLen = shared.len;
	            for (var j = len; j < sharedLen; j++) {
	                if (shared[j] === this) {
	                    return this.value;
	                }
	            }
	            // add self to added list
	            shared[shared.len++] = this;
	        }
	        return this.value;
	    };
	    Atom.prototype.set = function (value) {
	        this.checkForDestroy();
	        if (this.value !== value) {
	            this.value = value;
	            this.change();
	        }
	    };
	    Atom.prototype.change = function () {
	        this.checkForDestroy();
	        Atom.scheduledTasks.addTask(TaskType.CHANGE, this);
	    };
	    Atom.prototype.destroy = function () {
	        this.checkForDestroy();
	        if (Atom.debugAtoms && (Atom.debugAtoms[this.field] || Atom.debugAtoms[this.id])) {
	            Atom.debug();
	        }
	        this.status = AtomStatus.DESTROYED;
	        Atom.scheduledTasks.addTask(TaskType.DESTROY, this);
	    };
	    Atom.prototype.realDestroy = function () {
	        this.clearMasters();
	        this.clearSlaves();
	        // this.value = null;
	        this.owner = null;
	        this.calcFn = null;
	    };
	    Atom.getAtom = function (callback, thisArg) {
	        var prevShared = Atom.shared;
	        var oldActiveSlave = Atom.activeSlave;
	        Atom.activeSlave = Atom.serviceAtom;
	        Atom.shared = Atom.sharedCachePos === -1 ? Atom.getShared() : Atom.sharedCache[Atom.sharedCachePos--];
	        Atom.shared.len = 0;
	        callback.call(thisArg);
	        if (!Atom.shared.len) {
	            throw new Error('Atom not found');
	        }
	        var atom = Atom.shared[0];
	        Atom.shared = prevShared;
	        Atom.activeSlave = oldActiveSlave;
	        return atom;
	    };
	    Atom.prototype.setSelfToActiveSlave = function (slave) {
	        this.checkForDestroy();
	        if (!slave.masters) {
	            slave.masters = [];
	        }
	        slave.masters[this.id] = this;
	        if (!this.slaves) {
	            this.slaves = [];
	        }
	        this.slaves[slave.id] = slave;
	    };
	    Atom.prototype.checkForDestroy = function () {
	        if (this.status == AtomStatus.DESTROYED) {
	            throw new Error('Try to use destroyed atom');
	        }
	    };
	    Atom.getShared = function () {
	        var a = [];
	        a.k = 0;
	        a.len = 0;
	        return a;
	    };
	    Atom.prototype.calc = function () {
	        var oldActiveSlave = Atom.activeSlave;
	        Atom.activeSlave = this;
	        var prevShared = Atom.shared;
	        Atom.shared = Atom.sharedCachePos === -1 ? Atom.getShared() : Atom.sharedCache[Atom.sharedCachePos--];
	        Atom.shared.len = this.masters.length;
	        Atom.shared.k++;
	        var oldValue = this.value;
	        this.value = this.calcFn.call(this.owner);
	        Atom.scheduledTasks.addTask(TaskType.MODIFY, this, Atom.shared);
	        // this.applyModify(Atom.shared);
	        Atom.shared = prevShared;
	        Atom.activeSlave = oldActiveSlave;
	        this.status = AtomStatus.GETTER;
	        // console.info(this.field, this.id);
	        return oldValue !== this.value;
	    };
	    Atom.prototype.applyModify = function (shared) {
	        var k = shared.k;
	        var masters = this.masters;
	        var len = masters.length;
	        // find and remove old masters
	        var removeCount = 0;
	        for (var i = 0; i < len; i++) {
	            if (removeCount > 0) {
	                masters[i - removeCount] = masters[i];
	            }
	            if (shared[i] !== k) {
	                this.removeSelfFromList(masters[i].slaves);
	                removeCount++;
	            }
	        }
	        for (i = 0; i < removeCount; i++) {
	            masters.pop();
	        }
	        for (i = len; i < shared.len; i++) {
	            var atom = shared[i];
	            masters.push(atom);
	            if (!atom.slaves) {
	                atom.slaves = [];
	            }
	            atom.slaves.push(this);
	        }
	        Atom.sharedCache[++Atom.sharedCachePos] = shared;
	    };
	    Atom.prototype.clearMasters = function () {
	        var masters = this.masters;
	        if (masters) {
	            for (var i = 0, len = masters.length; i < len; i++) {
	                this.removeSelfFromList(masters[i].slaves);
	            }
	            this.masters = null;
	        }
	    };
	    Atom.prototype.clearSlaves = function () {
	        var slaves = this.slaves;
	        if (slaves) {
	            for (var i = 0, len = slaves.length; i < len; i++) {
	                this.removeSelfFromList(slaves[i].masters);
	            }
	            this.slaves = null;
	        }
	    };
	    Atom.prototype.removeSelfFromList = function (items) {
	        var found = false;
	        for (var i = 0, len = items.length; i < len; i++) {
	            if (found) {
	                items[i - 1] = items[i];
	            }
	            else if (items[i] === this) {
	                found = true;
	            }
	        }
	        if (found) {
	            items.pop();
	        }
	    };
	    Atom.prototype.affect = function (affectAtoms) {
	        affectAtoms[this.id] = 1;
	        var slaves = this.slaves;
	        if (slaves) {
	            for (var i = 0, len = slaves.length; i < len; i++) {
	                slaves[i].affect(affectAtoms);
	            }
	        }
	    };
	    Atom.prototype.needToRecalc = function (affectAtoms) {
	        if (this.status == AtomStatus.DESTROYED) {
	            return AtomAffectStatus.NEEDNOT_CALC;
	        }
	        var status = AtomAffectStatus.NEEDNOT_CALC;
	        var masters = this.masters;
	        if (masters) {
	            for (var i = 0, len = masters.length; i < len; i++) {
	                var master = masters[i];
	                var masterAffectStatus = affectAtoms[master.id];
	                if (masterAffectStatus === AtomAffectStatus.NEEDCALC) {
	                    return AtomAffectStatus.WAIT_PARENT_CALC;
	                }
	                if (masterAffectStatus === AtomAffectStatus.CALC) {
	                    status = AtomAffectStatus.CALC;
	                }
	            }
	        }
	        return status;
	    };
	    Atom.prototype.update = function (topLevel, affectAtoms) {
	        if (affectAtoms[this.id] === AtomAffectStatus.CALC) {
	            return;
	        }
	        var status = topLevel ? AtomAffectStatus.CALC : this.needToRecalc(affectAtoms);
	        if (status === AtomAffectStatus.WAIT_PARENT_CALC) {
	            return;
	        }
	        if (status === AtomAffectStatus.CALC && this.status === AtomStatus.GETTER) {
	            this.calc();
	        }
	        affectAtoms[this.id] = status;
	        if (this.slaves) {
	            for (var i = 0; i < this.slaves.length; i++) {
	                this.slaves[i].update(false, affectAtoms);
	            }
	        }
	    };
	    Atom.batchUpdate = function (changeAtoms) {
	        // Atom.affectAtoms = {};
	        var affectAtoms = {};
	        for (var i = 0; i < changeAtoms.length; i++) {
	            changeAtoms[i].affect(affectAtoms);
	        }
	        for (var i = 0; i < changeAtoms.length; i++) {
	            changeAtoms[i].update(true, affectAtoms);
	        }
	    };
	    Atom.updateScheduled = function () {
	        // console.log("start schedule runner");
	        var changeAtoms;
	        var prevType;
	        var sc = Atom.scheduledTasks;
	        if (sc.pos - sc.donePos > sc.size) {
	            throw new Error('Out of range');
	        }
	        for (var i = sc.donePos; i < sc.pos; i += 3) {
	            var pos = i % sc.size;
	            var type = sc.queue[pos];
	            var atom = sc.queue[pos + 1];
	            var param = type == TaskType.MODIFY ? sc.queue[pos + 2] : null;
	            var isLast = i == sc.pos - 3;
	            if (type == TaskType.CHANGE) {
	                if (!changeAtoms) {
	                    changeAtoms = [];
	                }
	                changeAtoms.push(atom);
	                if (isLast) {
	                    Atom.batchUpdate(changeAtoms);
	                    changeAtoms = [];
	                }
	            }
	            else if (prevType == TaskType.CHANGE) {
	                Atom.batchUpdate(changeAtoms);
	                changeAtoms = null;
	            }
	            if (type == TaskType.MODIFY) {
	                atom.applyModify(param);
	            }
	            else if (type == TaskType.DESTROY) {
	                atom.realDestroy();
	            }
	            prevType = type;
	            sc.donePos += 3;
	        }
	        sc.asyncRunned = false;
	    };
	    Atom.activeSlave = null;
	    Atom.atomId = 0;
	    Atom.debugAtoms = null;
	    Atom.serviceAtom = new Atom().getter('private', null, null);
	    Atom.shared = null;
	    Atom.sharedCache = [];
	    Atom.sharedCachePos = -1;
	    Atom.scheduledTasks = new TaskList(Atom.updateScheduled);
	    return Atom;
	}());
	exports.Atom = Atom;
	window.AtomGlob = Atom;
	window.debugAtom = Atom.debugAtom;
	/*
	const a1 = new Atom().prop('a1', 1);
	const a2 = new Atom().prop('a2', 2);
	const a3 = new Atom().prop('a3', 3);
	const a4 = new Atom().prop('a4', 4);
	const a5 = new Atom().prop('a5', 5);
	const a6 = new Atom().prop('a6', 6);
	const a7 = new Atom().prop('a7', 7);
	const a8 = new Atom().prop('a8', 8);
	const a9 = new Atom().prop('a9', 9);
	const a0 = new Atom().prop('a0', 0);
	
	const b1 = new Atom().prop('a1', 1);
	const b2 = new Atom().prop('a2', 2);
	const b3 = new Atom().prop('a3', 3);
	const b4 = new Atom().prop('a4', 4);
	const b5 = new Atom().prop('a5', 5);
	const b6 = new Atom().prop('a6', 6);
	const b7 = new Atom().prop('a7', 7);
	const b8 = new Atom().prop('a8', 8);
	const b9 = new Atom().prop('a9', 9);
	const b0 = new Atom().prop('a0', 0);
	
	let x = 0;
	const sum = new Atom().getter('sum', {}, () => {
	    a1.get();
	    a2.get();
	    a3.get();
	    a4.get();
	    a5.get();
	    a6.get();
	    a7.get();
	    a8.get();
	    a9.get();
	    a0.get();
	    //
	    // return x++ % 2 == 0 ? a.get() : b.get();
	});*/
	/*
	function abc() {
	    console.time('perf');
	    for (var i = 0; i < 1000000; i++) {
	        sum.calc();
	        // Atom.updateScheduled();
	    }
	    console.timeEnd('perf');
	}
	*/
	// abc();
	/*
	
	 const a = new Atom().prop('a', '[A]');
	 const b = new Atom().prop('b', '[B]');
	 const c = new Atom().prop('c', '[C]');
	
	 let x = 0;
	 const sum = new Atom().getter('sum', null, () => {
	 c.get();
	 return x++ % 2 == 0 ? a.get() : b.get();
	 });
	 sum.get();
	 Atom.updateScheduled();
	
	 a.set('[A1]');
	 Atom.updateScheduled();
	
	 b.set('[B1]');
	 Atom.updateScheduled();
	 */
	/*
	
	 const render = new Atom().getter('render', null, () => {
	 x++;
	 const val = (x % 2 == 0 ? b.get() : (a.get() + sum.get()));
	 console.log('render', val);
	 })
	 render.get();
	 a.set('[A1]');
	 setTimeout(() => {
	 a.set('[A0]');
	 setTimeout(() => {
	 a.set('[Ax]');
	 });
	 });
	 */


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var config_1 = __webpack_require__(21);
	__webpack_require__(22);
	var Thumbs = (function (_super) {
	    __extends(Thumbs, _super);
	    function Thumbs() {
	        _super.apply(this, arguments);
	    }
	    Thumbs.prototype.timeToY = function (time) {
	        return time * 100 / this.props.resizeKoef;
	    };
	    Thumbs.prototype.render = function () {
	        var data = this.props.postModel.data;
	        var video = data.mediaFiles[data.post.video];
	        var enAudio = data.mediaFiles[data.post.enAudio];
	        var shiftVideoY = this.timeToY(video.shiftTime);
	        var shiftAudioY = this.timeToY(enAudio.shiftTime);
	        var durationY = this.timeToY(enAudio.duration);
	        var thumbImg = config_1.config.baseUrl + '/' + data.mediaFiles[data.post.thumbs].url;
	        var thumbWidth = 400;
	        var thumbHeight = 200;
	        var thumbsPerLine = 20;
	        var thumbShift = -thumbHeight / 2;
	        var thumbCountPerSecond = 1 / 8;
	        var thumbsCount = durationY / thumbHeight | 0;
	        var thumbsItems = [];
	        var thumbK = thumbHeight / durationY * enAudio.duration;
	        for (var i = 0; i < thumbsCount; i++) {
	            var k = Math.round(i * thumbK * thumbCountPerSecond);
	            thumbsItems.push({
	                top: i * thumbHeight + thumbShift + shiftAudioY - shiftVideoY,
	                imgTop: (k / thumbsPerLine | 0) * thumbHeight,
	                imgLeft: (k % thumbsPerLine) * thumbWidth,
	            });
	        }
	        return React.createElement("div", {className: "thumbs"}, thumbsItems.map(function (thumb, i) {
	            return React.createElement("div", {className: "thumb", key: i, style: { top: thumb.top, background: "url(" + thumbImg + ") " + -thumb.imgLeft + "px " + -thumb.imgTop + "px" }});
	        }));
	    };
	    return Thumbs;
	}(React.Component));
	exports.Thumbs = Thumbs;


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	exports.config = {
	    db: {
	        user: 'root',
	        password: '',
	        name: 'wordstep'
	    },
	    dir: '/Users/cody/Downloads/lingo/',
	    baseUrl: 'http://localhost:1335'
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var audio_selection_1 = __webpack_require__(25);
	__webpack_require__(28);
	var Timeline = (function (_super) {
	    __extends(Timeline, _super);
	    function Timeline() {
	        _super.apply(this, arguments);
	    }
	    Timeline.prototype.timeToY = function (time) {
	        return time * 100 / this.props.resizeKoef;
	    };
	    Timeline.prototype.componentDidMount = function () {
	        this.props.player.applySpectrogramToCanvas(this.refs['spectrogram']);
	    };
	    Timeline.prototype.render = function () {
	        var durationY = this.timeToY(this.props.player.duration);
	        return React.createElement("div", {className: "timeline", ref: "timeline"}, 
	            React.createElement("canvas", {className: "spectrogram", ref: "spectrogram", style: { height: durationY }}), 
	            React.createElement(audio_selection_1.AudioSelection, {pxPerSec: 100 / this.props.resizeKoef, player: this.props.player}));
	    };
	    return Timeline;
	}(React.Component));
	exports.Timeline = Timeline;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	__webpack_require__(26);
	var AudioSelectionData = (function () {
	    function AudioSelectionData() {
	        this.start = 0;
	        this.end = 0;
	    }
	    return AudioSelectionData;
	}());
	exports.AudioSelectionData = AudioSelectionData;
	var audioSelection = new AudioSelectionData();
	function setAudioSelection(start, end) {
	    audioSelection.start = start;
	    audioSelection.end = end;
	}
	var AudioSelection = (function (_super) {
	    __extends(AudioSelection, _super);
	    function AudioSelection() {
	        _super.apply(this, arguments);
	        this.selecting = false;
	        this.offsetTop = 0;
	        this.startY = 0;
	        this.endY = 0;
	        this.audioRate = 1;
	    }
	    AudioSelection.prototype.pxToTime = function (px) {
	        return px / this.props.pxPerSec;
	    };
	    AudioSelection.prototype.timeToPx = function (time) {
	        return this.props.pxPerSec * time;
	    };
	    AudioSelection.prototype.setAudioSelection = function () {
	        var startTime = this.pxToTime(this.startY);
	        var endTime = this.pxToTime(this.endY);
	        if (endTime <= startTime) {
	            setAudioSelection(endTime, startTime);
	        }
	        else {
	            setAudioSelection(startTime, endTime);
	        }
	        this.forceUpdate();
	    };
	    AudioSelection.prototype.selectStart = function (e) {
	        e.preventDefault();
	        this.selecting = true;
	        this.startY = (e.pageY - this.offsetTop);
	        this.endY = this.startY;
	        this.setAudioSelection();
	        this.stop();
	    };
	    AudioSelection.prototype.selectMove = function (e) {
	        if (this.selecting) {
	            this.endY = (e.pageY - this.offsetTop);
	            this.setAudioSelection();
	        }
	    };
	    AudioSelection.prototype.selectEnd = function (e) {
	        if (this.selecting) {
	            this.selecting = false;
	            this.play();
	            this.forceUpdate();
	        }
	    };
	    AudioSelection.prototype.play = function () {
	        this.startCurrentTime();
	        this.props.player.player.play(audioSelection.start, audioSelection.end - audioSelection.start);
	        console.log('play', audioSelection.start, audioSelection.end - audioSelection.start);
	    };
	    AudioSelection.prototype.stop = function () {
	        this.stopCurrentTime();
	        this.props.player.player.stop();
	    };
	    AudioSelection.prototype.startCurrentTime = function () {
	        var dur = (audioSelection.end - audioSelection.start);
	        this.currentTime.style.transition = '';
	        this.currentTime.style.transform = "translateY(" + this.timeToPx(audioSelection.start) + "px)";
	        //noinspection BadExpressionStatementJS
	        this.currentTime.offsetHeight; //force reflow
	        this.currentTime.style.transition = 'all linear';
	        this.currentTime.style.transform = "translateY(" + this.timeToPx(audioSelection.end) + "px)";
	        this.currentTime.style.transitionDuration = dur / this.audioRate + 's';
	    };
	    AudioSelection.prototype.stopCurrentTime = function () {
	        this.currentTime.style.transition = '';
	    };
	    AudioSelection.prototype.componentDidMount = function () {
	        var _this = this;
	        this.el = this.refs['audioSelection'];
	        var root = this.refs['root'];
	        this.currentTime = this.refs['currentTime'];
	        this.offsetTop = this.el.parentNode.offsetTop;
	        root.addEventListener('mousedown', function (e) { return _this.selectStart(e); });
	        document.addEventListener('mousemove', function (e) { return _this.selectMove(e); });
	        document.addEventListener('mouseup', function (e) { return _this.selectEnd(e); });
	    };
	    AudioSelection.prototype.render = function () {
	        return React.createElement("div", {className: "audio-selection-wrapper", ref: "root", style: { height: this.timeToPx(this.props.player.duration) }}, 
	            React.createElement("div", {className: "audio-selection", ref: "audioSelection", style: { top: this.timeToPx(audioSelection.start), height: this.timeToPx(audioSelection.end - audioSelection.start) }}), 
	            React.createElement("div", {className: "current-time", ref: "currentTime"}));
	    };
	    return AudioSelection;
	}(React.Component));
	exports.AudioSelection = AudioSelection;


/***/ },
/* 26 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 27 */,
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var svg_path_generator_1 = __webpack_require__(31);
	var history_1 = __webpack_require__(14);
	var lang_1 = __webpack_require__(13);
	__webpack_require__(32);
	var HistoryTimeline = (function (_super) {
	    __extends(HistoryTimeline, _super);
	    function HistoryTimeline() {
	        _super.apply(this, arguments);
	    }
	    HistoryTimeline.type = 'timeline';
	    return HistoryTimeline;
	}(history_1.EditorHistoryData));
	exports.HistoryTimeline = HistoryTimeline;
	var TimelineConnector = (function (_super) {
	    __extends(TimelineConnector, _super);
	    function TimelineConnector() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.activeLine = -1;
	        this.activeLineStart = 0;
	        this.activeLineDur = 0;
	        this.activeIsTop = false;
	        this.y = 0;
	        this.moveResizeKoef = 1 / 2;
	        this.historyListen = function (data, isRedo) {
	            var textLine = _this.props.lines[data.lineN].en;
	            textLine.start = isRedo ? data.newStart : data.oldStart;
	            textLine.dur = isRedo ? data.newDur : data.oldDur;
	            _this.forceUpdate();
	        };
	    }
	    TimelineConnector.prototype.timeToY = function (time) {
	        return time * 100 / this.props.resizeKoef;
	    };
	    TimelineConnector.prototype.playTextLine = function (textLine) {
	        //todo: audioselection
	        this.props.player.player.play(textLine.start / 100, textLine.dur / 100, false, function () {
	            // console.log("EEEEnd");
	        });
	    };
	    TimelineConnector.prototype.onMouseDown = function (e, lineN, isTop) {
	        var textLine = this.props.lines[lineN].en;
	        this.activeIsTop = isTop;
	        this.activeLine = lineN;
	        this.activeLineStart = textLine.start;
	        this.activeLineDur = textLine.dur;
	        this.y = e.pageY;
	        e.preventDefault();
	        document.body.classList.add('resizing');
	    };
	    TimelineConnector.prototype.componentDidMount = function () {
	        var _this = this;
	        this.props.history.listen(HistoryTimeline.type, this.historyListen);
	        document.addEventListener("mousemove", function (e) {
	            if (_this.activeLine > -1) {
	                var textLine = _this.props.lines[_this.activeLine].en;
	                // console.log((this.y - e.offsetY));
	                var diff = (_this.y - e.pageY) * _this.props.resizeKoef * _this.moveResizeKoef;
	                var minH = 20 * _this.props.resizeKoef;
	                if (_this.activeIsTop) {
	                    if (_this.activeLineStart - diff < 0) {
	                        diff = _this.activeLineStart;
	                    }
	                    if (_this.activeLineDur + diff < minH) {
	                        diff = -(_this.activeLineDur - minH);
	                    }
	                    textLine.start = _this.activeLineStart - diff;
	                    textLine.dur = _this.activeLineDur + diff;
	                }
	                else {
	                    textLine.dur = _this.activeLineDur - diff > minH ? _this.activeLineDur - diff : minH;
	                }
	                _this.forceUpdate();
	            }
	        });
	        document.addEventListener("mouseup", function (e) {
	            if (_this.activeLine > -1) {
	                var textLine = _this.props.lines[_this.activeLine].en;
	                _this.playTextLine(textLine);
	                document.body.classList.remove('resizing');
	                if (_this.activeLineStart != textLine.start || _this.activeLineDur != textLine.dur) {
	                    _this.props.history.add(new HistoryTimeline({
	                        lineN: _this.activeLine,
	                        lang: lang_1.Lang.EN,
	                        type: HistoryTimeline.type,
	                        oldStart: _this.activeLineStart,
	                        oldDur: _this.activeLineDur,
	                        newStart: textLine.start,
	                        newDur: textLine.dur,
	                    }));
	                }
	                _this.activeLine = -1;
	                _this.forceUpdate();
	            }
	        });
	    };
	    TimelineConnector.prototype.render = function () {
	        var _this = this;
	        var connectorWidth = 50;
	        var svgWidth = 100;
	        var svgHeight = this.timeToY(this.props.player.duration);
	        var lineH = this.props.lineH;
	        var halfLineH = lineH / 2;
	        var resizeKoef = this.props.resizeKoef;
	        return React.createElement("svg", {className: "timeline-connector", width: svgWidth, height: svgHeight}, this.props.renderLines.map(function (pos, i) {
	            var textLine = _this.props.lines[i].en;
	            if (textLine) {
	                var tl = textLine.start / resizeKoef;
	                var bl = (textLine.start + textLine.dur) / resizeKoef;
	                var tr = pos - halfLineH;
	                var br = pos + halfLineH;
	                var color = 'hsla(' + (textLine.start) + ', 50%,60%, 1)';
	                return React.createElement("g", {key: i, className: i == _this.activeLine ? 'resizing' : ''}, 
	                    React.createElement("path", {onClick: function () { return _this.playTextLine(textLine); }, fill: color, d: svg_path_generator_1.svgPathGenerator(tl, bl, tr, br, connectorWidth)}), 
	                    React.createElement("rect", {onMouseDown: function (e) { return _this.onMouseDown(e, i, true); }, className: "top", y: tl}), 
	                    React.createElement("rect", {onMouseDown: function (e) { return _this.onMouseDown(e, i, false); }, className: "bottom", y: bl - 20}));
	            }
	            return null;
	        }));
	    };
	    return TimelineConnector;
	}(React.Component));
	exports.TimelineConnector = TimelineConnector;


/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	function svgPathGenerator(topLeft, bottomLeft, topRight, bottomRight, width) {
	    var bx = width / 2;
	    var path = '';
	    path += 'M0,' + topLeft + ' ';
	    path += 'C' + bx + ',' + topLeft + ' ';
	    path += bx + ',' + topRight + ' ';
	    path += width + ',' + topRight + ' ';
	    path += 'L' + width + ',' + bottomRight + ' ';
	    path += 'C' + bx + ',' + bottomRight + ' ';
	    path += bx + ',' + bottomLeft + ' ';
	    path += '0,' + bottomLeft + 'Z';
	    return path;
	}
	exports.svgPathGenerator = svgPathGenerator;


/***/ },
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */,
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FFT_1 = __webpack_require__(35);
	var SoundLoader_1 = __webpack_require__(36);
	var Play_1 = __webpack_require__(37);
	var audioContext = new AudioContext();
	var AudioPlayer = (function () {
	    function AudioPlayer() {
	        this.currentTime = 0;
	        this.duration = 0;
	        this.player = new Play_1.Play(audioContext);
	        this.soundLoaded = false;
	    }
	    AudioPlayer.prototype.loadSound = function (url) {
	        var _this = this;
	        return new SoundLoader_1.SoundLoader(audioContext).fromUrl(url).then(function (audioBuffer) {
	            _this.audioBuffer = audioBuffer;
	            _this.duration = audioBuffer.duration;
	            _this.player.setAudio(audioBuffer);
	            _this.spectrogramData = _this.process(audioBuffer, 128);
	            // this.spectrogram.process(audioBuffer);
	            _this.soundLoaded = true;
	        });
	    };
	    AudioPlayer.prototype.applySpectrogramToCanvas = function (canvas) {
	        var data = this.spectrogramData;
	        var ctx = canvas.getContext('2d');
	        var timeLen = data.length;
	        var valsLen = data[0].length;
	        canvas.width = valsLen;
	        canvas.height = timeLen;
	        var imd = new ImageData(valsLen, timeLen);
	        var imdd = imd.data;
	        for (var i = 0; i < timeLen; i++) {
	            var vals = data[i];
	            for (var j = 0; j < valsLen; j++) {
	                var val = 255 - vals[j] * 5;
	                var pos = (i * valsLen + valsLen - j) * 4;
	                imdd[pos + 0] = val;
	                imdd[pos + 1] = val;
	                imdd[pos + 2] = val;
	                imdd[pos + 3] = 255;
	            }
	        }
	        ctx.putImageData(imd, 0, 0);
	        return imd;
	    };
	    AudioPlayer.prototype.process = function (audioBuffer, fftSize) {
	        var data = [];
	        var koef = 30;
	        var bufferSize = fftSize;
	        var bufferDataSize = fftSize * koef;
	        var fft = new FFT_1.FFT(bufferSize, 0);
	        var signal = audioBuffer.getChannelData(0);
	        var bufferSignal = new Float32Array(bufferSize);
	        var k = 0;
	        while (signal.length > k + bufferDataSize) {
	            var bb = signal.subarray(k, k + bufferDataSize);
	            var kk = new Float32Array(bufferSize);
	            for (var i = 0; i < bb.length; i += koef) {
	                kk[i / koef | 0] = bb[i];
	            }
	            bufferSignal.set(kk);
	            k += bufferDataSize;
	            fft.forward(bufferSignal);
	            var spectrum = fft.spectrum;
	            var arr = new Uint8ClampedArray(spectrum.length);
	            for (var j = 0; j < spectrum.length; j++) {
	                // equalize, attenuates low freqs and boosts highs
	                //arr[j] = spectrum[j] * -1 * Math.log((bufferSize / 2 - j) * (0.5 / bufferSize / 2)) * bufferSize | 0;
	                arr[j] = spectrum[j] * 5000;
	            }
	            data.push(arr);
	        }
	        return data;
	    };
	    return AudioPlayer;
	}());
	exports.AudioPlayer = AudioPlayer;


/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	var TWO_PI = 2 * Math.PI;
	/**
	 * FFT is a class for calculating the Discrete Fourier Transform of a signal
	 * with the Fast Fourier Transform algorithm.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed. Must be power of 2
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */
	var FFT = (function () {
	    function FFT(bufferSize, sampleRate) {
	        this.fourierTransform(bufferSize, sampleRate);
	        this.reverseTable = new Uint32Array(bufferSize);
	        var limit = 1;
	        var bit = bufferSize >> 1;
	        while (limit < bufferSize) {
	            for (var i = 0; i < limit; i++) {
	                this.reverseTable[i + limit] = this.reverseTable[i] + bit;
	            }
	            limit = limit << 1;
	            bit = bit >> 1;
	        }
	        this.sinTable = new Float32Array(bufferSize);
	        this.cosTable = new Float32Array(bufferSize);
	        for (i = 0; i < bufferSize; i++) {
	            this.sinTable[i] = Math.sin(-Math.PI / i);
	            this.cosTable[i] = Math.cos(-Math.PI / i);
	        }
	    }
	    FFT.prototype.fourierTransform = function (bufferSize, sampleRate) {
	        this.bufferSize = bufferSize;
	        this.sampleRate = sampleRate;
	        this.bandwidth = 2 / bufferSize * sampleRate / 2;
	        this.spectrum = new Float32Array(bufferSize / 2);
	        this.real = new Float32Array(bufferSize);
	        this.imag = new Float32Array(bufferSize);
	        this.peakBand = 0;
	        this.peak = 0;
	    };
	    /**
	     * Calculates the *middle* frequency of an FFT band.
	     *
	     * @param {Number} index The index of the FFT band.
	     *
	     * @returns The middle frequency in Hz.
	     */
	    FFT.prototype.getBandFrequency = function (index) {
	        return this.bandwidth * index + this.bandwidth / 2;
	    };
	    ;
	    FFT.prototype.calculateSpectrum = function () {
	        var spectrum = this.spectrum, real = this.real, imag = this.imag, bSi = 2 / this.bufferSize, sqrt = Math.sqrt;
	        for (var i = 0, N = this.bufferSize / 2; i < N; i++) {
	            var rval = real[i];
	            var ival = imag[i];
	            var mag = bSi * sqrt(rval * rval + ival * ival);
	            if (mag > this.peak) {
	                this.peakBand = i;
	                this.peak = mag;
	            }
	            spectrum[i] = mag;
	        }
	    };
	    ;
	    /**
	     * Performs a forward transform on the sample buffer.
	     * Converts a time domain signal to frequency domain spectra.
	     *
	     * @param {Array} buffer The sample buffer. Buffer Length must be power of 2
	     *
	     * @returns The frequency spectrum array
	     */
	    FFT.prototype.forward = function (buffer) {
	        // Locally scope variables for speed up
	        var bufferSize = this.bufferSize, cosTable = this.cosTable, sinTable = this.sinTable, reverseTable = this.reverseTable, real = this.real, imag = this.imag, spectrum = this.spectrum;
	        var k = Math.floor(Math.log(bufferSize) / Math.LN2);
	        if (Math.pow(2, k) !== bufferSize) {
	            throw "Invalid buffer size, must be a power of 2.";
	        }
	        if (bufferSize !== buffer.length) {
	            throw "Supplied buffer is not the same size as defined FFT. FFT Size: " + bufferSize + " Buffer Size: " + buffer.length;
	        }
	        var halfSize = 1;
	        for (i = 0; i < bufferSize; i++) {
	            real[i] = buffer[reverseTable[i]];
	            imag[i] = 0;
	        }
	        while (halfSize < bufferSize) {
	            //phaseShiftStepReal = Math.cos(-Math.PI/halfSize);
	            //phaseShiftStepImag = Math.sin(-Math.PI/halfSize);
	            var phaseShiftStepReal = cosTable[halfSize];
	            var phaseShiftStepImag = sinTable[halfSize];
	            var currentPhaseShiftReal = 1;
	            var currentPhaseShiftImag = 0;
	            for (var fftStep = 0; fftStep < halfSize; fftStep++) {
	                var i = fftStep;
	                while (i < bufferSize) {
	                    var off = i + halfSize;
	                    var tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
	                    var ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);
	                    real[off] = real[i] - tr;
	                    imag[off] = imag[i] - ti;
	                    real[i] += tr;
	                    imag[i] += ti;
	                    i += halfSize << 1;
	                }
	                var tmpReal = currentPhaseShiftReal;
	                currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
	                currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
	            }
	            halfSize = halfSize << 1;
	        }
	        return this.calculateSpectrum();
	    };
	    ;
	    return FFT;
	}());
	exports.FFT = FFT;
	/**
	 * RFFT is a class for calculating the Discrete Fourier Transform of a signal
	 * with the Fast Fourier Transform algorithm.
	 *
	 * This method currently only contains a forward transform but is highly optimized.
	 *
	 * @param {Number} bufferSize The size of the sample buffer to be computed. Must be power of 2
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 *
	 * @constructor
	 */
	// Window functions
	var WindowType;
	(function (WindowType) {
	    WindowType[WindowType["BARTLETT"] = 1] = "BARTLETT";
	    WindowType[WindowType["BARTLETTHANN"] = 2] = "BARTLETTHANN";
	    WindowType[WindowType["BLACKMAN"] = 3] = "BLACKMAN";
	    WindowType[WindowType["COSINE"] = 4] = "COSINE";
	    WindowType[WindowType["GAUSS"] = 5] = "GAUSS";
	    WindowType[WindowType["HAMMING"] = 6] = "HAMMING";
	    WindowType[WindowType["HANN"] = 7] = "HANN";
	    WindowType[WindowType["LANCZOS"] = 8] = "LANCZOS";
	    WindowType[WindowType["RECTANGULAR"] = 9] = "RECTANGULAR";
	    WindowType[WindowType["TRIANGULAR"] = 10] = "TRIANGULAR";
	})(WindowType || (WindowType = {}));
	var WindowFunction = (function () {
	    function WindowFunction(type, alpha) {
	        this.alpha = alpha;
	        switch (type) {
	            case WindowType.BARTLETT:
	                this.func = WindowFunction.Bartlett;
	                break;
	            case WindowType.BARTLETTHANN:
	                this.func = WindowFunction.BartlettHann;
	                break;
	            case WindowType.BLACKMAN:
	                this.func = WindowFunction.Blackman;
	                this.alpha = this.alpha || 0.16;
	                break;
	            case WindowType.COSINE:
	                this.func = WindowFunction.Cosine;
	                break;
	            case WindowType.GAUSS:
	                this.func = WindowFunction.Gauss;
	                this.alpha = this.alpha || 0.25;
	                break;
	            case WindowType.HAMMING:
	                this.func = WindowFunction.Hamming;
	                break;
	            case WindowType.HANN:
	                this.func = WindowFunction.Hann;
	                break;
	            case WindowType.LANCZOS:
	                this.func = WindowFunction.Lanczos;
	                break;
	            case WindowType.RECTANGULAR:
	                this.func = WindowFunction.Rectangular;
	                break;
	            case WindowType.TRIANGULAR:
	                this.func = WindowFunction.Triangular;
	                break;
	        }
	    }
	    WindowFunction.prototype.process = function (buffer) {
	        var length = buffer.length;
	        for (var i = 0; i < length; i++) {
	            buffer[i] *= this.func(length, i, this.alpha);
	        }
	        return buffer;
	    };
	    WindowFunction.Bartlett = function (length, index) {
	        return 2 / (length - 1) * ((length - 1) / 2 - Math.abs(index - (length - 1) / 2));
	    };
	    ;
	    WindowFunction.BartlettHann = function (length, index) {
	        return 0.62 - 0.48 * Math.abs(index / (length - 1) - 0.5) - 0.38 * Math.cos(TWO_PI * index / (length - 1));
	    };
	    ;
	    WindowFunction.Blackman = function (length, index, alpha) {
	        var a0 = (1 - alpha) / 2;
	        var a1 = 0.5;
	        var a2 = alpha / 2;
	        return a0 - a1 * Math.cos(TWO_PI * index / (length - 1)) + a2 * Math.cos(4 * Math.PI * index / (length - 1));
	    };
	    ;
	    WindowFunction.Cosine = function (length, index) {
	        return Math.cos(Math.PI * index / (length - 1) - Math.PI / 2);
	    };
	    ;
	    WindowFunction.Gauss = function (length, index, alpha) {
	        return Math.pow(Math.E, -0.5 * Math.pow((index - (length - 1) / 2) / (alpha * (length - 1) / 2), 2));
	    };
	    ;
	    WindowFunction.Hamming = function (length, index) {
	        return 0.54 - 0.46 * Math.cos(TWO_PI * index / (length - 1));
	    };
	    ;
	    WindowFunction.Hann = function (length, index) {
	        return 0.5 * (1 - Math.cos(TWO_PI * index / (length - 1)));
	    };
	    ;
	    WindowFunction.Lanczos = function (length, index) {
	        var x = 2 * index / (length - 1) - 1;
	        return Math.sin(Math.PI * x) / (Math.PI * x);
	    };
	    ;
	    WindowFunction.Rectangular = function (length, index) {
	        return 1;
	    };
	    ;
	    WindowFunction.Triangular = function (length, index) {
	        return 2 / length * (length / 2 - Math.abs(index - (length - 1) / 2));
	    };
	    ;
	    return WindowFunction;
	}());


/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	var SoundLoader = (function () {
	    function SoundLoader(audioContext) {
	        this.audioContext = audioContext;
	    }
	    SoundLoader.prototype.parseAudio = function (arrayBuffer) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.audioContext.decodeAudioData(arrayBuffer, resolve, reject);
	        });
	    };
	    SoundLoader.prototype.fromFileInput = function (inputFile) {
	        var _this = this;
	        var files = inputFile.files; // FileList object
	        var file = files[0];
	        var reader = new FileReader();
	        reader.readAsArrayBuffer(file);
	        return new Promise(function (resolve, reject) {
	            reader.onload = function () {
	                _this.parseAudio(reader.result).then(resolve, reject);
	            };
	        });
	    };
	    SoundLoader.prototype.fromUrl = function (url) {
	        var _this = this;
	        var request = new XMLHttpRequest();
	        request.open('GET', url, true);
	        request.responseType = 'arraybuffer';
	        request.send();
	        return new Promise(function (resolve, reject) {
	            request.onload = function () {
	                _this.parseAudio(request.response).then(resolve, reject);
	            };
	        });
	    };
	    return SoundLoader;
	}());
	exports.SoundLoader = SoundLoader;


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	var Play = (function () {
	    function Play(audioContext) {
	        var _this = this;
	        this.audioContext = audioContext;
	        this.startPlayTime = 0;
	        this.start = 0;
	        this.dur = 0;
	        this.state = 1 /* STOPPING */;
	        this.onEnded = function () {
	            _this.state = 1 /* STOPPING */;
	        };
	    }
	    Play.prototype.setAudio = function (audioBuffer) {
	        this.audioBuffer = audioBuffer;
	    };
	    Play.prototype.cutAudioBuffer = function (start, end) {
	        start = start * this.audioBuffer.sampleRate | 0;
	        end = end * this.audioBuffer.sampleRate | 0;
	        var len = end - start;
	        var numberOfChannels = this.audioBuffer.numberOfChannels;
	        var buff = this.audioContext.createBuffer(numberOfChannels, len, this.audioBuffer.sampleRate);
	        for (var i = 0; i < numberOfChannels; i++) {
	            var channel = this.audioBuffer.getChannelData(i);
	            var sourceChannel = buff.getChannelData(i);
	            sourceChannel.set(channel.subarray(start, end));
	        }
	        return buff;
	    };
	    Play.prototype.play = function (start, dur, loop, onEnded) {
	        var _this = this;
	        if (loop === void 0) { loop = false; }
	        this.state = 0 /* PLAYING */;
	        this.stop();
	        this.playSource = this.audioContext.createBufferSource();
	        this.playSource.buffer = this.cutAudioBuffer(start, start + dur);
	        this.playSource.connect(this.audioContext.destination);
	        this.playSource.onended = function () { return _this.stop(); };
	        if (!this.audioBuffer) {
	            throw new Error('audioBuffer is empty');
	        }
	        this.start = start;
	        this.dur = dur;
	        this.startPlayTime = this.audioContext.currentTime;
	        this.playSource.start(0);
	        this.playSource.loop = loop;
	        this.playSource.onended = this.onEnded;
	        if (onEnded) {
	            this.playSource.addEventListener('ended', onEnded);
	        }
	    };
	    Play.prototype.stop = function () {
	        if (this.playSource) {
	            this.playSource.stop();
	            this.playSource.onended = null;
	        }
	        this.playSource = null;
	    };
	    Play.prototype.getState = function () {
	        return this.state;
	    };
	    Play.prototype.getCurrentTime = function () {
	        var currTime = this.audioContext.currentTime - this.startPlayTime;
	        var playDur = this.dur;
	        return this.start + (this.playSource ? currTime % playDur : 0);
	    };
	    return Play;
	}());
	exports.Play = Play;


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	function generateRandomTimestamps(count) {
	    if (count === void 0) { count = 50; }
	    var last;
	    var ab = [];
	    for (var i = 0; i < count; i++) {
	        var item = last + Math.random() * 70 | 0;
	        ab.push(item);
	        last = item;
	    }
	    return ab;
	}
	exports.generateRandomTimestamps = generateRandomTimestamps;
	var debug = false;
	// ab = [0, 10, 20, 30, 40, 110, 120, 130, 360, 370, 380, 390, 400, 510, 520, 530, 540, 550, 560, 570, 700, 800, 910, 920, 930]
	// ab = [0, 1035, 1056, 1091, 1105, 1119, 1176, 1201, 1218, 1291]
	// ab = [0, 100, 200, 200, 200, 200, 200, 200, 200, 200, 200];
	var LineAllocator = (function () {
	    function LineAllocator(positions, lineHeight) {
	        this.positions = positions;
	        this.lineHeight = lineHeight;
	    }
	    LineAllocator.prototype.moveGroup = function (start, end, moveSize) {
	        for (var j = start; j <= end; j++) {
	            var renderY = this.render[j];
	            if (debug) {
	                console.log('move', {
	                    j: j,
	                    lineTop: this.positions[j],
	                    lineRender: renderY,
	                    lineAfterRender: renderY - moveSize
	                });
	            }
	            this.render[j] -= moveSize;
	        }
	        return moveSize * (end - start + 1);
	    };
	    LineAllocator.prototype.fitToUp = function (startPos) {
	        var lastRenderY = this.render[startPos];
	        var groupWeight = lastRenderY - this.positions[startPos];
	        var groupSize = 1;
	        var groupEndPos = startPos;
	        for (var i = startPos - 1; i >= 0; i--) {
	            var y = this.positions[i];
	            var renderY = this.render[i];
	            var bottomSpaceSize = (lastRenderY - renderY) - this.lineHeight;
	            // we have a space
	            if (bottomSpaceSize > 0) {
	                var needSpace = groupWeight / groupSize;
	                var isNeedSpaceFit = bottomSpaceSize > needSpace;
	                var moveSize = Math.min(needSpace, bottomSpaceSize);
	                if (debug) {
	                    console.log('found space', {
	                        lineTop: y,
	                        lineRender: renderY,
	                        i: i,
	                        isNeedSpaceFit: isNeedSpaceFit,
	                        moveSize: moveSize,
	                        groupWeight: groupWeight,
	                        groupSize: groupSize,
	                        groupEndPos: groupEndPos,
	                        bottomSpaceSize: bottomSpaceSize,
	                        needSpace: needSpace,
	                        lines: this.render.slice()
	                    });
	                }
	                if (moveSize > 1) {
	                    groupWeight -= this.moveGroup(i + 1, groupEndPos, moveSize);
	                }
	                if (isNeedSpaceFit) {
	                    if (Math.abs(groupWeight) > 1) {
	                        console.error('break', { groupWeight: groupWeight });
	                    }
	                    if (debug) {
	                        if (groupWeight != 0) {
	                        }
	                        else {
	                            console.log('break', { groupWeight: groupWeight });
	                        }
	                    }
	                    break;
	                }
	                else {
	                    if (debug) {
	                        console.log('end of group', { groupWeight: groupWeight });
	                    }
	                }
	            }
	            groupWeight += renderY - y;
	            groupSize++;
	            lastRenderY = renderY;
	            if (debug) {
	                console.log('iter', { groupWeight: groupWeight, groupSize: groupSize, lnRY: renderY, lnY: y });
	            }
	        }
	    };
	    LineAllocator.prototype.allocateRenderLines = function () {
	        this.render = new Array(this.positions.length);
	        var lastTop = -Infinity;
	        for (var k = 0; k < this.positions.length; k++) {
	            this.render[k] = Math.max(this.positions[k], lastTop + this.lineHeight);
	            this.fitToUp(k);
	            lastTop = this.render[k];
	            if (debug) {
	                console.log('after insert', { k: k, lastTop: lastTop });
	            }
	        }
	        return this.render;
	    };
	    return LineAllocator;
	}());
	exports.LineAllocator = LineAllocator;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	var classNames = __webpack_require__(40);
	var lang_1 = __webpack_require__(13);
	var editor_key_handler_1 = __webpack_require__(41);
	__webpack_require__(43);
	var prop_1 = __webpack_require__(11);
	var autowatch_1 = __webpack_require__(42);
	var User = (function () {
	    function User() {
	    }
	    Object.defineProperty(User.prototype, "fullName", {
	        get: function () {
	            return this.firstName + ' ' + this.lastName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', String)
	    ], User.prototype, "firstName", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', String)
	    ], User.prototype, "lastName", void 0);
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], User.prototype, "fullName", null);
	    return User;
	}());
	var user = new User();
	user.firstName = "John";
	user.lastName = "Miller";
	window.user = user;
	var Cmp = (function () {
	    function Cmp() {
	    }
	    Cmp.prototype.render = function () {
	        console.log(user.fullName);
	    };
	    Cmp.prototype.forceUpdate = function () {
	        this.render();
	    };
	    Cmp = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], Cmp);
	    return Cmp;
	}());
	new Cmp().render();
	var EditorText = (function (_super) {
	    __extends(EditorText, _super);
	    function EditorText() {
	        _super.apply(this, arguments);
	        this.model = this.props.model;
	    }
	    EditorText.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", {className: "editor-text"}, 
	            React.createElement(editor_key_handler_1.EditorKeyHandler, {model: this.model}), 
	            this.model.lines.map(function (line, linePos) {
	                return React.createElement("div", {className: "line", key: linePos, style: { top: _this.props.renderLines[linePos] }}, 
	                    React.createElement(Speakers, {model: _this.model, linePos: linePos}), 
	                    React.createElement(TextLine, {model: _this.model, line: line, linePos: linePos, lang: lang_1.Lang.EN}), 
	                    React.createElement(TextLine, {model: _this.model, line: line, linePos: linePos, lang: lang_1.Lang.RU}));
	            }));
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorText.prototype, "model", void 0);
	    EditorText = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], EditorText);
	    return EditorText;
	}(React.Component));
	exports.EditorText = EditorText;
	var Speakers = (function (_super) {
	    __extends(Speakers, _super);
	    function Speakers() {
	        _super.apply(this, arguments);
	    }
	    Speakers.prototype.setSpeaker = function (pos, speaker) {
	        console.log(pos, speaker);
	        this.props.model.textModel.setSpeaker(pos, speaker);
	    };
	    Speakers.prototype.render = function () {
	        var _this = this;
	        var line = this.props.model.lines[this.props.linePos];
	        return React.createElement("div", {className: "speakers"}, this.props.model.speakers.list.map(function (speaker) {
	            return React.createElement("div", {key: speaker, className: classNames("speaker", { 'selected': speaker == line.speaker }), onClick: function () { return _this.setSpeaker(_this.props.linePos, speaker); }}, speaker);
	        }));
	    };
	    Speakers = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], Speakers);
	    return Speakers;
	}(React.Component));
	var TextLine = (function (_super) {
	    __extends(TextLine, _super);
	    function TextLine() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.onTextLineClick = function () {
	            _this.props.model.textModel.selection.set(_this.props.linePos, _this.props.lang, 0);
	            //this.selectedWordPos = 0;
	        };
	        this.editMode = false;
	        this.onEdit = function () {
	            _this.editMode = true;
	        };
	        this.onSave = function () {
	            _this.editMode = false;
	            _this.props.model.textModel.setWords(_this.props.linePos, _this.props.lang, _this.refs['input'].value);
	        };
	        this.onCancel = function () {
	            _this.editMode = false;
	        };
	    }
	    TextLine.prototype.spanClassName = function (textLine, word) {
	        return classNames({ 'selected': this.props.model.textModel.selection.word == word && this.props.model.textModel.selection.textLine == textLine });
	    };
	    TextLine.prototype.setWordNode = function (word, node) {
	        word.span = node;
	    };
	    TextLine.prototype.onWordClick = function (e, linePos, lang, wordPos) {
	        this.props.model.textModel.selection.set(linePos, lang, wordPos);
	        e.preventDefault();
	        e.stopPropagation();
	    };
	    TextLine.prototype.render = function () {
	        var _this = this;
	        var line = this.props.line;
	        var linePos = this.props.linePos;
	        var lang = this.props.lang;
	        var textLine = lang == lang_1.Lang.RU ? line.ru : line.en; // todo
	        return React.createElement("div", {className: "textline ru", onClick: this.onTextLineClick}, 
	            React.createElement("span", {onClick: this.onEdit, className: "textline-editbutton"}, "Edit"), 
	            this.editMode ?
	                React.createElement("div", {className: "textline-edit"}, 
	                    React.createElement("input", {type: "text", ref: "input", value: textLine.getText()}), 
	                    React.createElement("button", {onClick: this.onSave}, "Save"), 
	                    React.createElement("button", {onClick: this.onCancel}, "Cancel"))
	                :
	                    textLine.words.map(function (w, wordPos) {
	                        return React.createElement("span", {className: _this.spanClassName(textLine, w), key: wordPos, ref: function (node) { return _this.setWordNode(w, node); }, onClick: function (e) { return _this.onWordClick(e, linePos, _this.props.lang, wordPos); }}, w.word);
	                    }));
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], TextLine.prototype, "editMode", void 0);
	    TextLine = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], TextLine);
	    return TextLine;
	}(React.Component));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	var autowatch_1 = __webpack_require__(42);
	var KeyCodes;
	(function (KeyCodes) {
	    KeyCodes[KeyCodes["ENTER"] = 13] = "ENTER";
	    KeyCodes[KeyCodes["BACKSPACE"] = 8] = "BACKSPACE";
	    KeyCodes[KeyCodes["UP"] = 38] = "UP";
	    KeyCodes[KeyCodes["DOWN"] = 40] = "DOWN";
	    KeyCodes[KeyCodes["RIGHT"] = 39] = "RIGHT";
	    KeyCodes[KeyCodes["LEFT"] = 37] = "LEFT";
	    KeyCodes[KeyCodes["Z"] = 90] = "Z";
	})(KeyCodes || (KeyCodes = {}));
	var EditorKeyHandler = (function (_super) {
	    __extends(EditorKeyHandler, _super);
	    function EditorKeyHandler() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.keyHandler = function (e) {
	            var model = _this.props.model;
	            var handled = false;
	            if (!model.textModel.selection.line || !model.textModel.selection.textLine) {
	                model.textModel.selection.set(0, 0, 0);
	            }
	            var keyCode = e.keyCode;
	            var isCtrl = e.metaKey || e.ctrlKey;
	            if (keyCode == KeyCodes.ENTER) {
	                if (e.shiftKey) {
	                    model.history.add(model.textModel.splitIntoNewLine());
	                }
	                else {
	                    model.history.add(model.textModel.splitWithMove());
	                }
	                handled = true;
	            }
	            if (keyCode == KeyCodes.BACKSPACE) {
	                if (e.shiftKey) {
	                    model.history.add(model.textModel.joinLine());
	                }
	                else {
	                    model.history.add(model.textModel.joinLineWithMove());
	                }
	                handled = true;
	            }
	            if (keyCode == KeyCodes.Z && isCtrl) {
	                model.history.undo();
	                handled = true;
	            }
	            if (keyCode == KeyCodes.LEFT) {
	                model.textModel.left();
	                handled = true;
	            }
	            if (keyCode == KeyCodes.RIGHT) {
	                model.textModel.right();
	                handled = true;
	            }
	            if (keyCode == KeyCodes.UP) {
	                model.textModel.up();
	                handled = true;
	            }
	            if (keyCode == KeyCodes.DOWN) {
	                model.textModel.down();
	                handled = true;
	            }
	            if (handled) {
	                e.preventDefault();
	                _this.scroll();
	            }
	        };
	    }
	    EditorKeyHandler.prototype.scroll = function () {
	        var wordSpan = this.props.model.textModel.selection.word.span;
	        var rect = wordSpan.getBoundingClientRect();
	        if (rect.top < 0) {
	            wordSpan.scrollIntoView(true);
	        }
	        if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
	            wordSpan.scrollIntoView(false);
	        }
	    };
	    EditorKeyHandler.prototype.componentDidMount = function () {
	        document.addEventListener('keydown', this.keyHandler);
	    };
	    EditorKeyHandler.prototype.render = function () {
	        return null;
	    };
	    EditorKeyHandler = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], EditorKeyHandler);
	    return EditorKeyHandler;
	}(React.Component));
	exports.EditorKeyHandler = EditorKeyHandler;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var index_1 = __webpack_require__(19);
	var ComponentAtom = (function (_super) {
	    __extends(ComponentAtom, _super);
	    function ComponentAtom(cmp) {
	        _super.call(this);
	        this.getter(cmp.constructor.name + '.render', cmp, cmp.mainRender);
	        this.cmp = cmp;
	    }
	    ComponentAtom.prototype.update = function (topLevel, affectAtoms) {
	        if (affectAtoms[this.id] === index_1.AtomAffectStatus.CALC) {
	            return;
	        }
	        var status = topLevel ? index_1.AtomAffectStatus.CALC : this.needToRecalc(affectAtoms);
	        if (status === index_1.AtomAffectStatus.WAIT_PARENT_CALC) {
	            return;
	        }
	        if (index_1.Atom.debugAtoms && (index_1.Atom.debugAtoms[this.field] || index_1.Atom.debugAtoms[this.id])) {
	            index_1.Atom.debug();
	        }
	        if (status === index_1.AtomAffectStatus.CALC && this.status === index_1.AtomStatus.GETTER) {
	            this.cmp.forceUpdate();
	        }
	        affectAtoms[this.id] = status;
	    };
	    return ComponentAtom;
	}(index_1.Atom));
	exports.autowatch = function (cls) {
	    cls.prototype.componentAtom = null;
	    cls.prototype.mainRender = cls.prototype.render;
	    cls.prototype.shouldComponentUpdate = function (nextProps) {
	        for (var prop in nextProps) {
	            if (this.props[prop] !== nextProps[prop]) {
	                return true;
	            }
	        }
	        for (var prop in this.props) {
	            if (this.props[prop] !== nextProps[prop]) {
	                return true;
	            }
	        }
	        return false;
	    };
	    cls.prototype.componentWillUnmount = function () {
	        this.componentAtom.destroy();
	    };
	    cls.prototype.render = function () {
	        if (this.componentAtom) {
	            return this.componentAtom.getWithForceCalc();
	        }
	        else {
	            return (this.componentAtom = new ComponentAtom(this)).getWithForceCalc();
	        }
	    };
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 44 */,
/* 45 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 46 */,
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	var speakers_1 = __webpack_require__(48);
	__webpack_require__(54);
	var autowatch_1 = __webpack_require__(42);
	var EditorToolbar = (function (_super) {
	    __extends(EditorToolbar, _super);
	    function EditorToolbar() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.onSave = function () {
	            return _this.props.model.save();
	        };
	        this.onUndo = function () {
	            _this.props.model.history.undo();
	        };
	        this.onRedo = function () {
	            _this.props.model.history.redo();
	        };
	    }
	    EditorToolbar.prototype.render = function () {
	        return React.createElement("div", {className: "editor-toolbar"}, 
	            React.createElement("button", {onClick: this.onSave}, "Save"), 
	            React.createElement("div", null, 
	                React.createElement("button", {onClick: this.onUndo}, "Undo"), 
	                React.createElement("button", {onClick: this.onRedo}, "Redo")), 
	            React.createElement(speakers_1.EditorToolbarSpeakers, {model: this.props.model}));
	    };
	    EditorToolbar = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], EditorToolbar);
	    return EditorToolbar;
	}(React.Component));
	exports.EditorToolbar = EditorToolbar;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	var speaker_1 = __webpack_require__(49);
	__webpack_require__(52);
	var autowatch_1 = __webpack_require__(42);
	var EditorToolbarSpeakers = (function (_super) {
	    __extends(EditorToolbarSpeakers, _super);
	    function EditorToolbarSpeakers() {
	        _super.apply(this, arguments);
	    }
	    EditorToolbarSpeakers.prototype.render = function () {
	        var model = this.props.model;
	        return React.createElement("div", {className: "speakers"}, 
	            React.createElement("h3", null, "Speakers"), 
	            model.speakers.list.map(function (speaker, pos) {
	                return React.createElement(speaker_1.EditorToolbarSpeaker, {key: speaker, model: model, speaker: speaker, pos: pos});
	            }), 
	            React.createElement(speaker_1.EditorToolbarSpeaker, {model: model, speaker: "", addMode: true, pos: model.speakers.list.length}));
	    };
	    EditorToolbarSpeakers = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], EditorToolbarSpeakers);
	    return EditorToolbarSpeakers;
	}(React.Component));
	exports.EditorToolbarSpeakers = EditorToolbarSpeakers;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	__webpack_require__(50);
	var prop_1 = __webpack_require__(11);
	var autowatch_1 = __webpack_require__(42);
	var EditorToolbarSpeaker = (function (_super) {
	    __extends(EditorToolbarSpeaker, _super);
	    function EditorToolbarSpeaker() {
	        _super.apply(this, arguments);
	        this.editMode = false;
	    }
	    EditorToolbarSpeaker.prototype.onRemove = function (pos) {
	        this.props.model.speakers.remove(pos);
	    };
	    EditorToolbarSpeaker.prototype.onEdit = function () {
	        this.editMode = true;
	    };
	    EditorToolbarSpeaker.prototype.onSave = function (pos) {
	        this.editMode = false;
	        this.props.model.speakers.save(pos, this.refs['speaker'].value);
	    };
	    EditorToolbarSpeaker.prototype.onCancel = function () {
	        this.editMode = false;
	    };
	    EditorToolbarSpeaker.prototype.render = function () {
	        var _this = this;
	        var speaker = this.props.speaker;
	        var pos = this.props.pos;
	        return React.createElement("div", {className: "speaker"}, 
	            speaker, 
	            this.editMode ?
	                React.createElement("div", null, 
	                    React.createElement("input", {type: "text", ref: 'speaker', value: speaker}), 
	                    React.createElement("button", {onClick: function () { return _this.onCancel(); }}, "Cancel"), 
	                    React.createElement("button", {onClick: function () { return _this.onSave(pos); }}, "Save"))
	                :
	                    React.createElement("button", {onClick: function () { return _this.onEdit(); }}, this.props.addMode ? 'Add' : 'Edit'), 
	            this.props.addMode ? null
	                : React.createElement("button", {onClick: function () { return _this.onRemove(pos); }}, "X"));
	    };
	    __decorate([
	        prop_1.prop, 
	        __metadata('design:type', Object)
	    ], EditorToolbarSpeaker.prototype, "editMode", void 0);
	    EditorToolbarSpeaker = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], EditorToolbarSpeaker);
	    return EditorToolbarSpeaker;
	}(React.Component));
	exports.EditorToolbarSpeaker = EditorToolbarSpeaker;


/***/ },
/* 50 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 51 */,
/* 52 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 53 */,
/* 54 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 55 */,
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	__webpack_require__(57);
	var autowatch_1 = __webpack_require__(42);
	var EditorTitle = (function (_super) {
	    __extends(EditorTitle, _super);
	    function EditorTitle() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.onChange = function () {
	            _this.props.model.setTitle(_this.refs['input'].value);
	        };
	    }
	    EditorTitle.prototype.render = function () {
	        return React.createElement("div", {className: "editor-title"}, 
	            React.createElement("input", {type: "text", onChange: this.onChange, ref: "input", value: this.props.model.title})
	        );
	    };
	    EditorTitle = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], EditorTitle);
	    return EditorTitle;
	}(React.Component));
	exports.EditorTitle = EditorTitle;


/***/ },
/* 57 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 58 */,
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var React = __webpack_require__(5);
	__webpack_require__(60);
	var autowatch_1 = __webpack_require__(42);
	var EditorTags = (function (_super) {
	    __extends(EditorTags, _super);
	    function EditorTags() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.onChange = function () {
	            _this.props.model.setTags(_this.refs['input'].value);
	        };
	    }
	    EditorTags.prototype.render = function () {
	        return React.createElement("div", {className: "editor-tags"}, 
	            React.createElement("input", {type: "text", onChange: this.onChange, ref: "input", value: this.props.model.tags})
	        );
	    };
	    EditorTags = __decorate([
	        autowatch_1.autowatch, 
	        __metadata('design:paramtypes', [])
	    ], EditorTags);
	    return EditorTags;
	}(React.Component));
	exports.EditorTags = EditorTags;


/***/ },
/* 60 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 61 */,
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var post_1 = __webpack_require__(10);
	var thumbs_1 = __webpack_require__(20);
	var timeline_1 = __webpack_require__(24);
	var timeline_connector_1 = __webpack_require__(30);
	var time_allocate_1 = __webpack_require__(38);
	var subtitles_1 = __webpack_require__(63);
	var audio_player_1 = __webpack_require__(34);
	var config_1 = __webpack_require__(21);
	var history_1 = __webpack_require__(14);
	__webpack_require__(66);
	var Viewer = (function (_super) {
	    __extends(Viewer, _super);
	    function Viewer() {
	        _super.apply(this, arguments);
	        this.audioPlayer = new audio_player_1.AudioPlayer();
	        this.history = new history_1.EditorHistory();
	    }
	    Viewer.load = function (params) {
	        return post_1.PostModel.fetch(params.id);
	    };
	    Viewer.prototype.componentDidMount = function () {
	        var _this = this;
	        window.editorHistory = this.history;
	        var data = this.props.resolved.data;
	        var enAudio = data.mediaFiles[data.post.enAudio];
	        var url = config_1.config.baseUrl + '/' + enAudio.url;
	        this.audioPlayer.loadSound(url).then(function () {
	            _this.forceUpdate();
	        });
	    };
	    Viewer.prototype.render = function () {
	        var _this = this;
	        var postModel = this.props.resolved;
	        var lineH = 50;
	        var resizeKoef = 4;
	        var positions = postModel.lines.map(function (line) { return (line.en.start + line.en.dur / 2) / resizeKoef; });
	        var renderLines = new time_allocate_1.LineAllocator(positions, 50).allocateRenderLines();
	        return React.createElement("div", null, 
	            React.createElement("div", {className: "toolbar"}, 
	                React.createElement("button", {onClick: function () { return _this.history.undo(); }}, "Undo"), 
	                React.createElement("button", {onClick: function () { return _this.history.redo(); }}, "Redo")), 
	            this.audioPlayer.soundLoaded ?
	                React.createElement("div", null, 
	                    React.createElement(timeline_1.Timeline, {resizeKoef: resizeKoef, player: this.audioPlayer}), 
	                    React.createElement(timeline_connector_1.TimelineConnector, {lines: postModel.lines, lineH: lineH, resizeKoef: resizeKoef, player: this.audioPlayer, history: this.history, renderLines: renderLines})) : null, 
	            React.createElement(thumbs_1.Thumbs, {postModel: postModel, resizeKoef: resizeKoef}), 
	            React.createElement(subtitles_1.Subtitles, {postModel: postModel, player: this.audioPlayer, resizeKoef: resizeKoef, renderLines: renderLines}));
	    };
	    return Viewer;
	}(React.Component));
	exports.Viewer = Viewer;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var classNames = __webpack_require__(40);
	__webpack_require__(64);
	var Subtitles = (function (_super) {
	    __extends(Subtitles, _super);
	    function Subtitles() {
	        _super.apply(this, arguments);
	        this.duration = 0;
	        this.openedRuTextLines = [];
	        this.playingLine = -1;
	    }
	    Subtitles.prototype.timeToY = function (time) {
	        return time * 100 / this.props.resizeKoef;
	    };
	    Subtitles.prototype.showRuTextLine = function (i) {
	        this.openedRuTextLines[i] = true;
	        this.forceUpdate();
	    };
	    Subtitles.prototype.hideRuTextLine = function (i) {
	        this.openedRuTextLines[i] = false;
	        this.forceUpdate();
	    };
	    Subtitles.prototype.componentDidMount = function () {
	        var _this = this;
	        setInterval(function () {
	            var playingLine = -1;
	            if (_this.props.player.player.getState() == 0 /* PLAYING */) {
	                for (var i = 0; i < _this.props.postModel.lines.length; i++) {
	                    var line = _this.props.postModel.lines[i];
	                    if (_this.isSelected(line.en)) {
	                        playingLine = i;
	                        break;
	                    }
	                }
	            }
	            if (_this.playingLine !== playingLine) {
	                _this.playingLine = playingLine;
	                _this.forceUpdate();
	            }
	        }, 10);
	    };
	    Subtitles.prototype.isSelected = function (textLine) {
	        var currentTime = this.props.player.player.getCurrentTime();
	        return ((textLine.start) / 100) <= currentTime && currentTime <= (textLine.start + textLine.dur) / 100;
	    };
	    Subtitles.prototype.render = function () {
	        var _this = this;
	        var durationY = this.timeToY(this.duration);
	        return React.createElement("div", {className: "subtitles"}, this.props.postModel.lines.map(function (line, i) {
	            return React.createElement("div", {className: classNames("line", { playing: _this.playingLine == i, selected: _this.isSelected(line.en) }), onMouseDown: function () { return _this.showRuTextLine(i); }, onMouseUp: function () { return _this.hideRuTextLine(i); }, style: { top: _this.props.renderLines[i] }}, 
	                React.createElement("div", {className: "en"}, line.en ? line.en.text : ''), 
	                _this.openedRuTextLines[i] ?
	                    React.createElement("div", {className: "ru"}, line.ru ? line.ru.text : '') : null);
	        }));
	    };
	    return Subtitles;
	}(React.Component));
	exports.Subtitles = Subtitles;


/***/ },
/* 64 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 65 */,
/* 66 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 67 */,
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(69);
	var React = __webpack_require__(5);
	var media_types_1 = __webpack_require__(71);
	var routes_1 = __webpack_require__(7);
	function getType(type, mediaResult) {
	    switch (type) {
	        case media_types_1.MediaType.VIDEO:
	            return [mediaResult.video];
	        case media_types_1.MediaType.AUDIO:
	            return mediaResult.audio;
	        case media_types_1.MediaType.SUBS:
	            return mediaResult.subs;
	    }
	}
	var Upload = (function (_super) {
	    __extends(Upload, _super);
	    function Upload() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.form = { title: 'Hello', video: null, enAudio: null, ruAudio: null, enSub: null, ruSub: null };
	        this.videoDone = function (res) {
	            _this.res = res;
	            _this.form.video = res.video ? res.video.id : null;
	            _this.forceUpdate();
	        };
	        this.onSubmit = function () {
	            fetch('http://localhost:1335/v1/post', {
	                method: "POST",
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify(_this.form)
	            }).then(function (data) { return data.json(); }).then(function (data) {
	                //this.postId = data.data;
	                routes_1.editorRoute.goto({ id: data.data });
	                _this.forceUpdate();
	                console.log('Success');
	            });
	            return false;
	        };
	        this._startTime = Math.random() * 7000 | 0;
	        this._endTime = this._startTime + 250;
	    }
	    Upload.prototype.filterLang = function (items, lang) {
	        return items.filter(function (item) { return !item.lang || item.lang == lang; });
	    };
	    Upload.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", null, this.res ?
	            React.createElement("div", null, 
	                React.createElement("form", {onSubmit: this.onSubmit}, 
	                    React.createElement(SelectMedia, {type: media_types_1.MediaType.AUDIO, label: "En Audio", startTime: this._startTime, endTime: this._endTime, onChange: function (val) { return _this.form.enAudio = val; }, items: this.filterLang(this.res.audio, 'eng')}), 
	                    React.createElement(SelectMedia, {type: media_types_1.MediaType.AUDIO, label: "Ru Audio", startTime: this._startTime, endTime: this._endTime, onChange: function (val) { return _this.form.ruAudio = val; }, items: this.filterLang(this.res.audio, 'rus')}), 
	                    React.createElement(SelectMedia, {type: media_types_1.MediaType.SUBS, label: "En Subs", startTime: this._startTime, endTime: this._endTime, onChange: function (val) { return _this.form.enSub = val; }, items: this.filterLang(this.res.subs, 'eng')}), 
	                    React.createElement(SelectMedia, {type: media_types_1.MediaType.SUBS, label: "Ru Subs", startTime: this._startTime, endTime: this._endTime, onChange: function (val) { return _this.form.ruSub = val; }, items: this.filterLang(this.res.subs, 'rus')}), 
	                    React.createElement("div", null, 
	                        React.createElement("button", null, "Create")
	                    ))
	            )
	            :
	                React.createElement(Uploader, {startTime: this._startTime, endTime: this._endTime, onDone: this.videoDone}));
	    };
	    return Upload;
	}(React.Component));
	exports.Upload = Upload;
	var SelectMedia = (function (_super) {
	    __extends(SelectMedia, _super);
	    function SelectMedia() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.selected = this.props.items.length ? this.props.items[0] : null;
	        this.uploadItems = [];
	        this.onDone = function (result) {
	            _this.uploadItems = getType(_this.props.type, result);
	            _this.forceUpdate();
	        };
	    }
	    SelectMedia.prototype.onChange = function (item) {
	        this.props.onChange(item.id);
	        this.selected = item;
	        this.forceUpdate();
	    };
	    SelectMedia.prototype.render = function () {
	        var _this = this;
	        //todo: show correct title if no lang and no title
	        this.props.onChange(this.selected ? this.selected.id : null);
	        return React.createElement("div", null, 
	            React.createElement("label", null, this.props.label), 
	            this.props.items.concat(this.uploadItems).map(function (item, i) { return React.createElement("div", null, 
	                React.createElement("label", null, 
	                    React.createElement("input", {required: true, name: _this.props.label, checked: _this.selected == item, value: item.id, onChange: function () { return _this.onChange(item); }, type: "radio"}), 
	                    item.title + " (" + item.lang + ")")
	            ); }), 
	            React.createElement("div", null, this.uploadItems.length ? null :
	                React.createElement(Uploader, {startTime: this.props.startTime, endTime: this.props.endTime, onDone: this.onDone})));
	    };
	    return SelectMedia;
	}(React.Component));
	var Uploader = (function (_super) {
	    __extends(Uploader, _super);
	    function Uploader() {
	        var _this = this;
	        _super.apply(this, arguments);
	        this.startUploadTime = 0;
	        this.startExtractTime = 0;
	        this.preSize = 0.2;
	        this.middleSize = 0.6;
	        this.endSize = 0.2;
	        this.progress = 0;
	        this.uploadDone = false;
	        this.extractDone = false;
	        this.isSending = false;
	        this.streams = {};
	        this.socket = io('http://localhost:7878');
	        this.fileSelected = false;
	        this.error = false;
	        this.onChange = function () {
	            _this.fileSelected = true;
	            _this.forceUpdate();
	        };
	        this.onClose = function (data) {
	            _this.stopStream(data.id);
	        };
	        this.onDataNeed = function (data) {
	            _this.sendStream(data.start, data.id);
	        };
	        this.onInfo = function (info) {
	            if (_this.props.onInfo) {
	                _this.props.onInfo(info);
	            }
	        };
	        this.onDone = function (info) {
	            _this.extractDone = true;
	            clearInterval(_this.interval);
	            if (_this.props.onDone) {
	                _this.props.onDone(info);
	            }
	        };
	        this.onUploadDone = function () {
	            console.timeEnd('process');
	            _this.startExtractTime = Date.now();
	            _this.uploadDone = true;
	        };
	        this.onProgress = function (data) {
	            _this.progress = data.progress;
	        };
	        this.onError = function (err) {
	            console.error(err);
	            _this.error = true;
	            _this.uploadDone = false;
	            _this.isSending = false;
	            _this.extractDone = false;
	            _this.progress = 0;
	            _this.startExtractTime = 0;
	            _this.startUploadTime = 0;
	        };
	    }
	    Uploader.prototype.getFile = function () {
	        var fileInput = this.refs['fileInput'];
	        return fileInput.files[0];
	    };
	    Uploader.prototype.on = function (event, callback) {
	        var _this = this;
	        this.socket.on(event + '-' + this.sid, function (data) {
	            console.log(event, _this.sid, data);
	            callback(data);
	            _this.forceUpdate();
	        });
	    };
	    Uploader.prototype.send = function () {
	        var _this = this;
	        this.isSending = true;
	        this.startUploadTime = Date.now();
	        this.interval = setInterval(function () { return _this.forceUpdate(); }, 600);
	        this.forceUpdate();
	        return new Promise(function (resolve, reject) {
	            var file = _this.getFile();
	            var info = {
	                startTime: _this.startTime,
	                endTime: _this.endTime,
	                filename: file.name,
	                size: file.size
	            };
	            console.log(info);
	            console.time('process');
	            _this.socket.emit('start-upload', info, function (sid) {
	                _this.sid = sid;
	                _this.on('close', _this.onClose);
	                _this.on('data-need', _this.onDataNeed);
	                _this.on('info', _this.onInfo);
	                _this.on('upload-done', _this.onUploadDone);
	                _this.on('done', _this.onDone);
	                _this.on('progress', _this.onProgress);
	                _this.on('err', _this.onError);
	            });
	        });
	    };
	    Uploader.prototype.stopStream = function (id) {
	        console.log("stopStream", id);
	        this.streams[id] = false;
	    };
	    Uploader.prototype.sendStream = function (start, id, partSize) {
	        var _this = this;
	        if (this.uploadDone || this.error) {
	            return;
	        }
	        if (!partSize) {
	            partSize = 10000;
	        }
	        partSize = Math.min(partSize, 1000000);
	        var file = this.getFile();
	        this.streams[id] = true;
	        var reader = new FileReader();
	        var end = Math.min(start + partSize, file.size);
	        if (end - start > 0) {
	            console.log("sendStream", this.sid, start, end - start, id);
	            reader.readAsArrayBuffer(file.slice(start, end));
	            reader.onloadend = function (e) {
	                if (reader.readyState == 2) {
	                    _this.socket.emit('data', {
	                        sid: _this.sid,
	                        start: start,
	                        id: id,
	                        size: reader.result.length,
	                        file: reader.result
	                    }, function () {
	                        if (_this.streams[id]) {
	                            _this.sendStream(start + partSize, id, partSize * 2);
	                        }
	                    });
	                }
	            };
	        }
	    };
	    Uploader.prototype.calcProgress = function () {
	        var middlePercent = this.progress;
	        var timeElapsed = (Date.now() - this.startUploadTime) / 100 | 0;
	        var prePercent = 0;
	        var endPercent = 0;
	        if (!middlePercent) {
	            for (var i = 0; i < timeElapsed; i++) {
	                prePercent += 0.05 * (1 - prePercent);
	            }
	        }
	        else {
	            prePercent = 1;
	            if (this.startExtractTime) {
	                var extractTimeElapsed = (Date.now() - this.startExtractTime) / 100 | 0;
	                for (var i = 0; i < extractTimeElapsed; i++) {
	                    endPercent += 0.05 * (1 - endPercent);
	                }
	            }
	        }
	        if (this.extractDone) {
	            endPercent = 1;
	        }
	        return prePercent * this.preSize + middlePercent * this.middleSize + endPercent * this.endSize;
	    };
	    Uploader.prototype.secToTime = function (sec) {
	        return ('0' + (sec / 3600 | 0)).substr(-2) + ':' + ('0' + (sec / 60 % 60 | 0)).substr(-2) + ':' + ('0' + (sec % 60)).substr(-2);
	    };
	    Uploader.prototype.render = function () {
	        var _this = this;
	        return React.createElement("div", null, this.error ? 'Error occured' :
	            this.extractDone ?
	                'Uploaded'
	                :
	                    (this.isSending ?
	                        React.createElement("progress", {value: this.calcProgress().toString()})
	                        :
	                            React.createElement("div", null, this.fileSelected ?
	                                React.createElement("div", null, 
	                                    React.createElement("input", {value: this.secToTime(this.props.startTime), ref: function (d) { return _this.startTime = d.value; }, type: "text"}), 
	                                    React.createElement("input", {value: this.secToTime(this.props.endTime), ref: function (d) { return _this.endTime = d.value; }, type: "text"}), 
	                                    React.createElement("button", {onClick: function () { return _this.send(); }}, "Submit"))
	                                :
	                                    React.createElement("input", {ref: "fileInput", onChange: this.onChange, type: "file"}))));
	    };
	    return Uploader;
	}(React.Component));


/***/ },
/* 69 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 70 */,
/* 71 */
/***/ function(module, exports) {

	"use strict";
	(function (MediaType) {
	    MediaType[MediaType["VIDEO"] = 10] = "VIDEO";
	    MediaType[MediaType["AUDIO"] = 20] = "AUDIO";
	    MediaType[MediaType["SUBS"] = 30] = "SUBS";
	    MediaType[MediaType["THUMBS"] = 40] = "THUMBS";
	})(exports.MediaType || (exports.MediaType = {}));
	var MediaType = exports.MediaType;


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmNkNzliYmJiMjQyNWI0NjkzMzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vfi9mYXN0LXJlYWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUm91dGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvZWRpdG9yL2VkaXRvci50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9wb3N0LnRzIiwid2VicGFjazovLy8uL2F0b20tbmV4dC9wcm9wLnRzIiwid2VicGFjazovLy8uL3NyYy9lZGl0b3IvZWRpdG9yLW1vZGVsLnRzIiwid2VicGFjazovLy8uLi9pbnRlcmZhY2VzL2xhbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2hpc3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9saW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9lZGl0b3IvZWRpdG9yLXRleHQtbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci9lZGl0b3Itc3BlYWtlcmxpc3QtbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vYXRvbS1uZXh0L2Jhc2UtYXJyYXkudHMiLCJ3ZWJwYWNrOi8vLy4vYXRvbS1uZXh0L2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3ZXIvdGh1bWJzLnRzeCIsIndlYnBhY2s6Ly8vLi4vYmFja2VuZC9jb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdlci90aHVtYnMuY3NzIiwid2VicGFjazovLy8uL3NyYy92aWV3ZXIvdGltZWxpbmUudHN4Iiwid2VicGFjazovLy8uL3NyYy92aWV3ZXIvYXVkaW8tc2VsZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld2VyL2F1ZGlvLXNlbGVjdGlvbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdlci90aW1lbGluZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdlci90aW1lbGluZS1jb25uZWN0b3IudHN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9zdmctcGF0aC1nZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdlci90aW1lbGluZS1jb25uZWN0b3IuY3NzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9hdWRpby1wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vfi9zb3VuZC11dGlscy9GRlQudHMiLCJ3ZWJwYWNrOi8vLy4vfi9zb3VuZC11dGlscy9Tb3VuZExvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9+L3NvdW5kLXV0aWxzL1BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3RpbWUtYWxsb2NhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci9lZGl0b3ItdGV4dC50c3giLCJ3ZWJwYWNrOi8vLy4vfi9jbGFzc25hbWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9lZGl0b3IvZWRpdG9yLWtleS1oYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2F0b20tbmV4dC9hdXRvd2F0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci9zdHlsZXMvZWRpdG9yLXRleHQuY3NzIiwid2VicGFjazovLy8uL3NyYy9lZGl0b3Ivc3R5bGVzL2VkaXRvci5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci90b29sYmFyL3Rvb2xiYXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9lZGl0b3IvdG9vbGJhci9zcGVha2Vycy50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci90b29sYmFyL3NwZWFrZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9lZGl0b3IvdG9vbGJhci9zdHlsZXMvc3BlYWtlci5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci90b29sYmFyL3N0eWxlcy9zcGVha2Vycy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci90b29sYmFyL3N0eWxlcy90b29sYmFyLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRpdG9yL2VkaXRvci10aXRsZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkaXRvci9zdHlsZXMvZWRpdG9yLXRpdGxlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRpdG9yL2VkaXRvci10YWdzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvZWRpdG9yL3N0eWxlcy9lZGl0b3ItdGFncy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdlci92aWV3ZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy92aWV3ZXIvc3VidGl0bGVzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld2VyL3N1YnRpdGxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdlci92aWV3ZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy91cGxvYWRlci91cGxvYWRlci50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwbG9hZGVyL3VwbG9hZC5jc3MiLCJ3ZWJwYWNrOi8vLy4uL2ludGVyZmFjZXMvbWVkaWEtdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsYUFBWSxDQUFDO0FBQ2IscUJBQU8sQ0FBVyxDQUFDO0FBQ25CLEtBQVksUUFBUSx1QkFBTSxDQUFXLENBQUM7QUFDdEMsS0FBWSxLQUFLLHVCQUFNLENBQU8sQ0FBQztBQUMvQixtQ0FBb0IsQ0FBZSxDQUFDO0FBQ3BDLG9DQUFxQixDQUFpQixDQUFDO0FBQ3ZDLG9DQUFxQixDQUFVLENBQUM7QUFDaEMsb0NBQThELENBQVUsQ0FBQztBQUN6RSxvQ0FBcUIsRUFBaUIsQ0FBQztBQUN2QyxzQ0FBcUIsRUFBcUIsQ0FBQztBQUMzQyxtQ0FBbUIsRUFBb0IsQ0FBQztBQUV4QyxhQUFJLENBQUM7QUFFTCxTQUFRLENBQUMsTUFBTSxDQUFDLG9CQUFDLGVBQU0sR0FBQyxLQUFLLEVBQUU7S0FDM0IsRUFBQyxLQUFLLEVBQUUsbUJBQVUsRUFBRSxPQUFPLEVBQUUsYUFBSyxFQUFDO0tBQ25DLEVBQUMsS0FBSyxFQUFFLG9CQUFXLEVBQUUsT0FBTyxFQUFFLGlCQUFNLEVBQUM7S0FDckMsRUFBQyxLQUFLLEVBQUUsa0JBQVMsRUFBRSxPQUFPLEVBQUUsZUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFNLENBQUMsSUFBSSxFQUFDO0tBQzFELEVBQUMsS0FBSyxFQUFFLG9CQUFXLEVBQUUsT0FBTyxFQUFFLGVBQU0sRUFBRSxRQUFRLEVBQUUsZUFBTSxDQUFDLElBQUksRUFBQztFQUM5RCxFQUFFLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0FDbkJ2QywwQzs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCLG9CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBLG1CQUFrQixjQUFjLHVDQUF1Qyw0QkFBNEIsb0RBQW9ELHVEQUF1RCxxQkFBcUI7O0FBRW5PO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0EscUJBQW9COzs7QUFHcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixTQUFTO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0EsbUNBQWtDLGFBQWE7QUFDL0M7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLDRCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUF5QyxpQkFBaUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBeUMsWUFBWTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF3QyxRQUFRO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQW9ELFlBQVk7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxREFBb0QsWUFBWTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWlELGlCQUFpQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBc0UsaUJBQWlCO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBdUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxjQUFjO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixvRkFBb0Y7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0Isd0ZBQXdGO0FBQzVHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixZQUFZO0FBQzNDO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsWUFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTBELGdCQUFnQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQStDLFNBQVM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QkFBQyxLQUFLLElBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUUsRUFDNUMsR0FBRyxFQUFFLFdBQUMsSUFBSSxZQUFJLENBQUMsU0FBUyxHQUFJLENBQXNCLENBQUMsS0FBSyxFQUE5QyxDQUErQyxFQUN6RCxJQUFJLEVBQUMsTUFBTSxFQUFFO3FDQUNwQixxQkFBQyxLQUFLLElBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUUsRUFDMUMsR0FBRyxFQUFFLFdBQUMsSUFBSSxZQUFJLENBQUMsT0FBTyxHQUFJLENBQXNCLENBQUMsS0FBSyxFQUE1QyxDQUE2QyxFQUN2RCxJQUFJLEVBQUMsTUFBTSxFQUFFO3FDQUNwQixxQkFBQyxNQUFNLElBQUMsT0FBTyxFQUFFLGNBQUksWUFBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVksR0FBQyxRQUFNLENBQVMsQ0FDL0M7O3FDQUVOLHFCQUFDLEtBQUssSUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUcsQ0FDNUQsQ0FDVCxDQUNIO0tBQ1YsQ0FBQztLQUNMLGVBQUM7QUFBRCxFQUFDLENBcE5zQixLQUFLLENBQUMsU0FBUyxHQW9OckM7Ozs7Ozs7QUMvVkQsMEM7Ozs7Ozs7O0FDQUEsWUFBWSxTQUFTO0tBQ2pCLDRDQUFVO0tBQ1YsNENBQVU7S0FDViwwQ0FBUztLQUNULDhDQUFXO0FBQ2YsRUFBQyxFQUxXLGlCQUFTLEtBQVQsaUJBQVMsUUFLcEI7QUFMRCxLQUFZLFNBQVMsR0FBVCxpQkFLWCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDJjZDc5YmJiYjI0MjViNDY5MzMzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgXCIuL2FwcC5jc3NcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0luZGV4fSBmcm9tIFwiLi9pbmRleC9pbmRleFwiO1xuaW1wb3J0IHtFZGl0b3J9IGZyb20gXCIuL2VkaXRvci9lZGl0b3JcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiLi9Sb3V0ZXJcIjtcbmltcG9ydCB7dXBsb2FkUm91dGUsIHBvc3RSb3V0ZSwgZWRpdG9yUm91dGUsIGluZGV4Um91dGV9IGZyb20gXCIuL3JvdXRlc1wiO1xuaW1wb3J0IHtWaWV3ZXJ9IGZyb20gXCIuL3ZpZXdlci92aWV3ZXJcIjtcbmltcG9ydCB7VXBsb2FkfSBmcm9tIFwiLi91cGxvYWRlci91cGxvYWRlclwiO1xuaW1wb3J0IHtBdG9tfSBmcm9tIFwiLi4vYXRvbS1uZXh0L2luZGV4XCI7XG5cbkF0b207XG5cblJlYWN0RE9NLnJlbmRlcig8Um91dGVyIHBhZ2VzPXtbXG4gICAge3JvdXRlOiBpbmRleFJvdXRlLCBoYW5kbGVyOiBJbmRleH0sXG4gICAge3JvdXRlOiB1cGxvYWRSb3V0ZSwgaGFuZGxlcjogVXBsb2FkfSxcbiAgICB7cm91dGU6IHBvc3RSb3V0ZSwgaGFuZGxlcjogVmlld2VyLCByZXNvbHZlcjogVmlld2VyLmxvYWR9LFxuICAgIHtyb3V0ZTogZWRpdG9yUm91dGUsIGhhbmRsZXI6IEVkaXRvciwgcmVzb2x2ZXI6IEVkaXRvci5sb2FkfSxcbl19Lz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluJykpO1xuXG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwLnRzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9hcHAuY3NzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIWZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqXG4gICAgICogR2xvYmFsc1xuICAgICAqKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qKi9cbiAgICB2YXIgREVCVUdfTU9ERSA9IGZhbHNlO1xuICAgIHZhciBpZCA9IDE7XG4gICAgdmFyIGh0bWxFbGVtZW50ID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICBmdW5jdGlvbiBSZWFjdFRhZygpe31cbiAgICBmdW5jdGlvbiBSZWFjdENvbXBvbmVudCgpe31cbiAgICBmdW5jdGlvbiBSZWFjdEFycmF5KCl7fVxuICAgIGZ1bmN0aW9uIFJlYWN0VGV4dCgpe31cblxuICAgIGZ1bmN0aW9uIGRlYnVnVk5vZGUobm9kZSkge1xuICAgICAgICBub2RlLmlkID0gaWQrKztcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudENvbXBvbmVudCA9IG51bGw7XG5cbiAgICAvLyBmb3IgcGVyZm9ybWFuY2UgcHVycG9zZXNcbiAgICB2YXIgVlRhZyA9IG5ldyBSZWFjdFRhZygpO1xuICAgIHZhciBWVGV4dCA9IG5ldyBSZWFjdFRleHQoKVxuICAgIHZhciBWQ29tcG9uZW50ID0gbmV3IFJlYWN0Q29tcG9uZW50KCk7XG4gICAgdmFyIFZBcnJheSA9IG5ldyBSZWFjdEFycmF5KCk7XG5cbiAgICB2YXIgY29uc3RQcm9wcyA9IHtcbiAgICAgICAgY2hlY2tlZDogJ2NoZWNrZWQnLFxuICAgICAgICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgICAgICAgaWQ6ICdpZCcsXG4gICAgICAgIGxvb3A6ICdsb29wJyxcbiAgICAgICAgbXVsdGlwbGU6ICdtdWx0aXBsZScsXG4gICAgICAgIG11dGVkOiAnbXV0ZWQnLFxuICAgICAgICByZWFkT25seTogJ3JlYWRPbmx5JyxcbiAgICAgICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gICAgICAgIHNyY0RvYzogJ3NyY2RvYycsXG4gICAgICAgIHZhbHVlOiAndmFsdWUnXG4gICAgfTtcbiAgICB2YXIgYWxsQXR0cnMgPSBcImFjY2VwdCxhY2Nlc3NLZXksYWN0aW9uLGFsbG93RnVsbFNjcmVlbixhbGxvd1RyYW5zcGFyZW5jeSxhbHQsYXN5bmMsYXV0b0NvbXBsZXRlLGF1dG9QbGF5LGNhcHR1cmUsY2VsbFBhZGRpbmcsY2VsbFNwYWNpbmcsY2hhclNldCxjaGFsbGVuZ2UsY2hlY2tlZCxjbGFzc0lELGNvbHMsY29sU3Bhbixjb250ZW50LGNvbnRlbnRFZGl0YWJsZSxjb250ZXh0TWVudSxjb250cm9scyxjb29yZHMsY3Jvc3NPcmlnaW4sZGF0YSxkYXRlVGltZSxkZWZhdWx0LGRlZmVyLGRpcixkaXNhYmxlZCxkb3dubG9hZCxkcmFnZ2FibGUsZW5jVHlwZSxmb3JtLGZvcm1BY3Rpb24sZm9ybUVuY1R5cGUsZm9ybU1ldGhvZCxmb3JtTm9WYWxpZGF0ZSxmb3JtVGFyZ2V0LGZyYW1lQm9yZGVyLGhlYWRlcnMsaGVpZ2h0LGhpZGRlbixoaWdoLGhyZWYsaHJlZkxhbmcsaWNvbixpZCxpbnB1dE1vZGUsaW50ZWdyaXR5LGlzLGtleVBhcmFtcyxrZXlUeXBlLGtpbmQsbGFiZWwsbGFuZyxsaXN0LGxvb3AsbG93LG1hbmlmZXN0LG1hcmdpbkhlaWdodCxtYXJnaW5XaWR0aCxtYXgsbWF4TGVuZ3RoLG1lZGlhLG1lZGlhR3JvdXAsbWV0aG9kLG1pbixtaW5MZW5ndGgsbXVsdGlwbGUsbXV0ZWQsbmFtZSxub25jZSxub1ZhbGlkYXRlLG9wZW4sb3B0aW11bSxwYXR0ZXJuLHBsYWNlaG9sZGVyLHBvc3RlcixwcmVsb2FkLHJhZGlvR3JvdXAscmVhZE9ubHkscmVsLHJlcXVpcmVkLHJldmVyc2VkLHJvbGUscm93cyxyb3dTcGFuLHNhbmRib3gsc2NvcGUsc2NvcGVkLHNjcm9sbGluZyxzZWFtbGVzcyxzZWxlY3RlZCxzaGFwZSxzaXplLHNpemVzLHNwYW4sc3BlbGxDaGVjayxzcmMsc3JjRG9jLHNyY0xhbmcsc3JjU2V0LHN0YXJ0LHN0ZXAsc3VtbWFyeSx0YWJJbmRleCx0YXJnZXQsdGl0bGUsdHlwZSx1c2VNYXAsdmFsdWUsd2lkdGgsd21vZGUsd3JhcCxhYm91dCxkYXRhdHlwZSxpbmxpc3QscHJlZml4LHByb3BlcnR5LHJlc291cmNlLHR5cGVvZix2b2NhYixhdXRvQ2FwaXRhbGl6ZSxhdXRvQ29ycmVjdCxhdXRvU2F2ZSxjb2xvcixpdGVtUHJvcCxpdGVtU2NvcGUsaXRlbVR5cGUsaXRlbUlELGl0ZW1SZWYscmVzdWx0cyxzZWN1cml0eSx1bnNlbGVjdGFibGUsY3gsY3ksZCxkeCxkeSxmaWxsLGZ4LGZ5LGdyYWRpZW50VHJhbnNmb3JtLGdyYWRpZW50VW5pdHMsb2Zmc2V0LG9wYWNpdHkscGF0dGVybkNvbnRlbnRVbml0cyxwYXR0ZXJuVW5pdHMscG9pbnRzLHByZXNlcnZlQXNwZWN0UmF0aW8scixyeCxyeSxzcHJlYWRNZXRob2Qsc3Ryb2tlLHRyYW5zZm9ybSx2ZXJzaW9uLHZpZXdCb3gseDEseDIseCx5MSx5Mix5XCIuc3BsaXQoJywnKVxuICAgIHZhciBmYXN0QXR0cnMgPSB7XCJhY2NlcHRDaGFyc2V0XCI6XCJhY2NlcHQtY2hhcnNldFwiLFwiY2xhc3NOYW1lXCI6XCJjbGFzc1wiLFwiaHRtbEZvclwiOlwiZm9yXCIsXCJodHRwRXF1aXZcIjpcImh0dHAtZXF1aXZcIixcImNsaXBQYXRoXCI6XCJjbGlwLXBhdGhcIixcImZpbGxPcGFjaXR5XCI6XCJmaWxsLW9wYWNpdHlcIixcImZvbnRGYW1pbHlcIjpcImZvbnQtZmFtaWx5XCIsXCJmb250U2l6ZVwiOlwiZm9udC1zaXplXCIsXCJtYXJrZXJFbmRcIjpcIm1hcmtlci1lbmRcIixcIm1hcmtlck1pZFwiOlwibWFya2VyLW1pZFwiLFwibWFya2VyU3RhcnRcIjpcIm1hcmtlci1zdGFydFwiLFwic3RvcENvbG9yXCI6XCJzdG9wLWNvbG9yXCIsXCJzdG9wT3BhY2l0eVwiOlwic3RvcC1vcGFjaXR5XCIsXCJzdHJva2VEYXNoYXJyYXlcIjpcInN0cm9rZS1kYXNoYXJyYXlcIixcInN0cm9rZUxpbmVjYXBcIjpcInN0cm9rZS1saW5lY2FwXCIsXCJzdHJva2VPcGFjaXR5XCI6XCJzdHJva2Utb3BhY2l0eVwiLFwic3Ryb2tlV2lkdGhcIjpcInN0cm9rZS13aWR0aFwiLFwidGV4dEFuY2hvclwiOlwidGV4dC1hbmNob3JcIn07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxBdHRycy5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYgKCFjb25zdFByb3BzW2FsbEF0dHJzW2ldXSlcbiAgICAgICAgICAgIGZhc3RBdHRyc1thbGxBdHRyc1tpXV0gPSBhbGxBdHRyc1tpXTtcbiAgICAvL3ZhciBzcyA9IFtdOyB2YXIgb2JqID0ge307IGZvciAodmFyIGkgaW4gRE9NUHJvcGVydHkucHJvcGVydGllcyl7IGlmIChpID09ICdzdHlsZScpIGNvbnRpbnVlOyB2YXIgYXR0ciA9IERPTVByb3BlcnR5LnByb3BlcnRpZXNbaV0uYXR0cmlidXRlTmFtZTsgaWYgKGkudG9Mb3dlckNhc2UoKSA9PSBhdHRyLnRvTG93ZXJDYXNlKCkpIHNzLnB1c2goaSk7IGVsc2Ugb2JqW2ldID0gYXR0ciB9IHNzLmpvaW4oJywnKVxuXG4gICAgdmFyIHhMaW5rTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG4gICAgdmFyIHhMaW5rQXR0cnMgPSB7XCJ4bGlua0FjdHVhdGVcIjpcInhsaW5rOmFjdHVhdGVcIixcInhsaW5rQXJjcm9sZVwiOlwieGxpbms6YXJjcm9sZVwiLFwieGxpbmtIcmVmXCI6XCJ4bGluazpocmVmXCIsXCJ4bGlua1JvbGVcIjpcInhsaW5rOnJvbGVcIixcInhsaW5rU2hvd1wiOlwieGxpbms6c2hvd1wiLFwieGxpbmtUaXRsZVwiOlwieGxpbms6dGl0bGVcIixcInhsaW5rVHlwZVwiOlwieGxpbms6dHlwZVwifTtcbiAgICB2YXIgeG1sTlMgPSAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJztcbiAgICB2YXIgeG1sQXR0cnMgPSB7XCJ4bWxCYXNlXCI6XCJ4bWw6YmFzZVwiLFwieG1sTGFuZ1wiOlwieG1sOmxhbmdcIixcInhtbFNwYWNlXCI6XCJ4bWw6c3BhY2VcIn07XG5cblxuICAgIGNvbnN0IHN2Z0VsZW1lbnRzID0ge1xuICAgICAgICBjaXJjbGU6ICdjaXJjbGUnLFxuICAgICAgICBjbGlwUGF0aDogJ2NsaXBQYXRoJyxcbiAgICAgICAgZGVmczogJ2RlZnMnLFxuICAgICAgICBlbGxpcHNlOiAnZWxsaXBzZScsXG4gICAgICAgIGc6ICdnJyxcbiAgICAgICAgaW1hZ2U6ICdpbWFnZScsXG4gICAgICAgIGxpbmU6ICdsaW5lJyxcbiAgICAgICAgbGluZWFyR3JhZGllbnQ6ICdsaW5lYXJHcmFkaWVudCcsXG4gICAgICAgIG1hc2s6ICdtYXNrJyxcbiAgICAgICAgcGF0aDogJ3BhdGgnLFxuICAgICAgICBwYXR0ZXJuOiAncGF0dGVybicsXG4gICAgICAgIHBvbHlnb246ICdwb2x5Z29uJyxcbiAgICAgICAgcG9seWxpbmU6ICdwb2x5bGluZScsXG4gICAgICAgIHJhZGlhbEdyYWRpZW50OiAncmFkaWFsR3JhZGllbnQnLFxuICAgICAgICByZWN0OiAncmVjdCcsXG4gICAgICAgIHN0b3A6ICdzdG9wJyxcbiAgICAgICAgc3ZnOiAnc3ZnJyxcbiAgICAgICAgdGV4dDogJ3RleHQnLFxuICAgICAgICB0c3BhbjogJ3RzcGFuJyxcbiAgICB9XG5cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG4gICAgdmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gICAgICAgIGJveEZsZXg6IHRydWUsXG4gICAgICAgIGJveEZsZXhHcm91cDogdHJ1ZSxcbiAgICAgICAgY29sdW1uQ291bnQ6IHRydWUsXG4gICAgICAgIGZsZXg6IHRydWUsXG4gICAgICAgIGZsZXhHcm93OiB0cnVlLFxuICAgICAgICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gICAgICAgIGZsZXhTaHJpbms6IHRydWUsXG4gICAgICAgIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgICAgICAgZm9udFdlaWdodDogdHJ1ZSxcbiAgICAgICAgbGluZUNsYW1wOiB0cnVlLFxuICAgICAgICBsaW5lSGVpZ2h0OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiB0cnVlLFxuICAgICAgICBvcmRlcjogdHJ1ZSxcbiAgICAgICAgb3JwaGFuczogdHJ1ZSxcbiAgICAgICAgd2lkb3dzOiB0cnVlLFxuICAgICAgICB6SW5kZXg6IHRydWUsXG4gICAgICAgIHpvb206IHRydWUsXG5cbiAgICAgICAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICAgICAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlRGFzaG9mZnNldDogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IHRydWVcbiAgICB9O1xuXG4gICAgdmFyIGNvbnN0RXZlbnRzID0ge1xuICAgICAgICBvbkNsaWNrOiAnb25jbGljaycsXG4gICAgICAgIG9uRGJsQ2xpY2s6ICdvbmRibGNsaWNrJyxcblxuICAgICAgICBvbk1vdXNlRG93bjogJ29ubW91c2Vkb3duJyxcbiAgICAgICAgb25Nb3VzZVVwOiAnb25tb3VzZXVwJyxcbiAgICAgICAgb25Nb3VzZU1vdmU6ICdvbm1vdXNlbW92ZScsXG4gICAgICAgIG9uTW91c2VFbnRlcjogJ29ubW91c2VlbnRlcicsXG4gICAgICAgIG9uTW91c2VMZWF2ZTogJ29ubW91c2VsZWF2ZScsXG4gICAgICAgIG9uTW91c2VPdmVyOiAnb25tb3VzZW92ZXInLFxuICAgICAgICBvbk1vdXNlT3V0OiAnb25tb3VzZW91dCcsXG5cbiAgICAgICAgb25Ub3VjaFN0YXJ0OiAnb250b3VjaHN0YXJ0JyxcbiAgICAgICAgb25Ub3VjaEVuZDogJ29udG91Y2hlbmQnLFxuICAgICAgICBvblRvdWNoTW92ZTogJ29udG91Y2htb3ZlJyxcbiAgICAgICAgb25Ub3VjaENhbmNlbDogJ29udG91Y2hjYW5jZWwnLFxuICAgICAgICBvblRvdWNoTGVhdmU6ICdvbnRvdWNobGVhdmUnLFxuXG4gICAgICAgIG9uQ29udGV4dE1lbnU6ICdvbmNvbnRleHRtZW51JyxcblxuICAgICAgICBvbklucHV0OiAnb25pbnB1dCcsXG4gICAgICAgIG9uRm9jdXM6ICdvbmZvY3VzJyxcbiAgICAgICAgb25DaGFuZ2U6ICdvbmNoYW5nZScsXG5cbiAgICAgICAgb25LZXlEb3duOiAnb25rZXlkb3duJyxcbiAgICAgICAgb25LZXlQcmVzczogJ29ua2V5cHJlc3MnLFxuICAgICAgICBvbktleVVwOiAnb25rZXl1cCdcbiAgICB9O1xuXG4gICAgdmFyIHRvcEV2ZW50cyA9IHtcbiAgICAgICAgb25DbGljazogJ2NsaWNrJyxcbiAgICAgICAgb25EYmxDbGljazogJ2RibGNsaWNrJyxcblxuICAgICAgICBvbk1vdXNlRG93bjogJ21vdXNlZG93bicsXG4gICAgICAgIG9uTW91c2VVcDogJ21vdXNldXAnLFxuICAgICAgICBvbk1vdXNlTW92ZTogJ21vdXNlbW92ZScsXG4gICAgICAgIG9uTW91c2VFbnRlcjogJ21vdXNlZW50ZXInLFxuICAgICAgICBvbk1vdXNlTGVhdmU6ICdtb3VzZWxlYXZlJyxcbiAgICAgICAgb25Nb3VzZU92ZXI6ICdtb3VzZW92ZXInLFxuICAgICAgICBvbk1vdXNlT3V0OiAnbW91c2VvdXQnXG4gICAgfTtcbiAgICB2YXIgdG9wRXZlbnRzTWFwID0ge307XG4gICAgZm9yICh2YXIgaSBpbiB0b3BFdmVudHMpXG4gICAgICAgIHRvcEV2ZW50c01hcFt0b3BFdmVudHNbaV1dID0gMDtcblxuXG4gICAgY29uc3Qgc3ZnTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG4gICAgLyoqXG4gICAgICogVlRhZ1R1cGxlW3R5cGUsIG5vZGUsIHRhZywga2V5LCBhdHRyc0hhc2gsIGF0dHJzTGVuLCBjb25zdEF0dHJzTGVuLCAuLi5hdHRycywgLi4uY2hpbGRyZW5dXG4gICAgICoqL1xuICAgIC8vIDAvKnR5cGUqL1xuICAgIC8vIDEvKm5vZGUqL1xuICAgIC8vIDIvKnRhZyovXG4gICAgLy8gMy8qa2V5Ki9cbiAgICAvLyA0LypyZWZUKi9cbiAgICAvLyA1Lypvd25lclQqL1xuICAgIC8vIDYvKmF0dHJzSGFzaCovXG4gICAgLy8gNy8qYXR0cnNMZW4qL1xuICAgIC8vIDgvKmNvbnN0QXR0cnNMZW4qL1xuICAgIC8vIDkvKmF0dHJzU3RhcnRQb3MqL1xuXG4gICAgLyoqXG4gICAgICogVlRleHRUdXBsZVt0eXBlLCBub2RlLCB2YWx1ZV1cbiAgICAgKi9cbiAgICAvLyAwLyp0eXBlKi9cbiAgICAvLyAxLypub2RlVGV4dCovXG4gICAgLy8gMi8qdGV4dCovXG5cbiAgICAvKipcbiAgICAgKiBWQXJyYXlUdXBsZVt0eXBlLCBwYXJlbnROb2RlLCBrZXlNYXAsIHNvdXJjZUFycmF5LCAuLi52YWx1ZXNdXG4gICAgICovXG4gICAgLy8gMC8qdHlwZSovXG4gICAgLy8gMS8qcGFyZW50Tm9kZUFyciovXG4gICAgLy8gMi8qa2V5bWFwKi9cbiAgICAvLyAzLypzb3VyY2VBcnJheSovXG4gICAgLy8gNC8qYXJyYXlGaXJzdE5vZGUqL1xuXG4gICAgLyoqXG4gICAgICogVkNoaWxkcmVuW3R5cGUsIHBhcmVudE5vZGUsIHJlZkNvbXBvbmVudCwgLi4udmFsdWVzXVxuICAgICAqL1xuICAgIC8vIDAvKnR5cGUqL1xuICAgIC8vIDEvKnBhcmVudE5vZGVDaGlsZCovXG4gICAgLy8gMi8qcmVmQ29tcG9uZW50Ki9cbiAgICAvLyAzLypWQ2hpbGRyZW5GaXJzdE5vZGUqL1xuXG4gICAgLyoqXG4gICAgICogVkNvbXBvbmVudFR1cGxlW3R5cGUsIHBhcmVudE5vZGUsIEN0b3IsIGtleSwgcmVmLCBpbnN0YW5jZSwgY2hpbGRyZW4sIHByb3BzLCBwcm9wc0NoaWxkcmVuP11cbiAgICAgKi9cbiAgICAvLyAwLyp0eXBlKi9cbiAgICAvLyAxLypwYXJlbnROb2RlKi9cbiAgICAvLyAyLypDdG9yKi9cbiAgICAvLyAzLyprZXlDbXAqL1xuICAgIC8vIDQvKnJlZiovXG4gICAgLy8gNS8qb3duZXJDKi9cbiAgICAvLyA2LyppbnN0YW5jZSovXG4gICAgLy8gNy8qY2hpbGRyZW4qL1xuICAgIC8vIDgvKnByb3BzKi9cbiAgICAvLyA5Lypwcm9wc0NoaWxkcmVuKi9cblxuXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqXG4gICAgICogQ3JlYXRpbmdcbiAgICAgKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKiovXG4gICAgZnVuY3Rpb24gY3JlYXRlKHZkb20sIHJvb3ROb2RlLCBiZWZvcmUsIHBhcmVudENvbXBvbmVudCwgcmVuZGVyVG9QYXJlbnQpIHtcbiAgICAgICAgaWYgKERFQlVHX01PREUpIHtcbiAgICAgICAgICAgIGRlYnVnVk5vZGUodmRvbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmRvbVswLyp0eXBlKi9dID09IFZUZXh0KSB7XG4gICAgICAgICAgICBpZiAocmVuZGVyVG9QYXJlbnQgJiYgdmRvbVsyLyp0ZXh0Ki9dKSB7XG4gICAgICAgICAgICAgICAgcm9vdE5vZGUudGV4dENvbnRlbnQgPSB2ZG9tWzIvKnRleHQqL107XG4gICAgICAgICAgICAgICAgdmRvbVsxLypub2RlVGV4dCovXSA9IHJvb3ROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZkb21bMS8qbm9kZVRleHQqL10gPSBkb2MuY3JlYXRlVGV4dE5vZGUodmRvbVsyLyp0ZXh0Ki9dKTtcbiAgICAgICAgICAgICAgICByb290Tm9kZS5pbnNlcnRCZWZvcmUodmRvbVsxLypub2RlVGV4dCovXSwgYmVmb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2ZG9tWzAvKnR5cGUqL10gPT0gVlRhZykge1xuICAgICAgICAgICAgLy8gaXNTdmdcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ZnRWxlbWVudHNbdmRvbVsyLyp0YWcqL11dID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCB2ZG9tWzIvKnRhZyovXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQodmRvbVsyLyp0YWcqL10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmRvbVsxLypub2RlKi9dID0gcm9vdE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIGJlZm9yZSk7XG4gICAgICAgICAgICB2YXIgYXR0cnNTdGFydCA9IDkvKmF0dHJzU3RhcnRQb3MqLztcbiAgICAgICAgICAgIHZhciBhdHRyc0VuZCA9IDkvKmF0dHJzU3RhcnRQb3MqLyArIHZkb21bNy8qYXR0cnNMZW4qL10gKiAyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGF0dHJzU3RhcnQ7IGkgPCBhdHRyc0VuZDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlQXR0cih2ZG9tW2ldLCB2ZG9tW2kgKyAxXSwgbnVsbCwgbm9kZSwgdmRvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSA5LyphdHRyc1N0YXJ0UG9zKi8gKyB2ZG9tWzcvKmF0dHJzTGVuKi9dICogMjtcbiAgICAgICAgICAgIHZhciBlbmQgPSB2ZG9tLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjaGlsZFJlbmRlclRvUGFyZW50ID0gZW5kIC0gc3RhcnQgPT0gMTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmRvbVtpXSA9IGNyZWF0ZShub3JtKHZkb21baV0pLCBub2RlLCBudWxsLCBwYXJlbnRDb21wb25lbnQsIGNoaWxkUmVuZGVyVG9QYXJlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmRvbVs0LypyZWZUKi9dKSB7XG4gICAgICAgICAgICAgICAgc2V0UmVmKHZkb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZkb21bMC8qdHlwZSovXSA9PSBWQXJyYXkpIHtcbiAgICAgICAgICAgIHZkb21bMS8qcGFyZW50Tm9kZUFyciovXSA9IHJvb3ROb2RlO1xuICAgICAgICAgICAgLy9pdGVyYXRlIHNvdXJjZSBhcnJheVxuICAgICAgICAgICAgdmFyIHNvdXJjZUFycmF5ID0gdmRvbVszLypzb3VyY2VBcnJheSovXTtcbiAgICAgICAgICAgIHZhciBrZXlNYXAgPSB2ZG9tWzIvKmtleW1hcCovXSA9IHt9O1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZkb21Qb3MgPSBpICsgNC8qYXJyYXlGaXJzdE5vZGUqLztcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBub3JtKHNvdXJjZUFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB2ZG9tW3Zkb21Qb3NdID0gY3JlYXRlKGNoaWxkLCByb290Tm9kZSwgYmVmb3JlLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXRLZXkoY2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlNYXBba2V5XSA9IHZkb21Qb3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmRvbVszLypzb3VyY2VBcnJheSovXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmRvbVswLyp0eXBlKi9dID09IFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHZkb20gPSBjcmVhdGVDb21wb25lbnQodmRvbSwgcm9vdE5vZGUsIGJlZm9yZSwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQodmRvbSwgcm9vdE5vZGUsIGJlZm9yZSwgcGFyZW50Q29tcG9uZW50KSB7XG4gICAgICAgIHZhciBDb25zdHJ1Y3RvciA9IHZkb21bMi8qQ3RvciovXTtcbiAgICAgICAgdmRvbVsxLypwYXJlbnROb2RlKi9dID0gcm9vdE5vZGU7XG4gICAgICAgIHZhciBwcm9wcyA9IHZkb21bOC8qcHJvcHMqL107XG4gICAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlIHx8ICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBub3JtKENvbnN0cnVjdG9yKHByb3BzKSk7XG4gICAgICAgICAgICB2ZG9tWzcvKmNoaWxkcmVuKi9dID0gY3JlYXRlKGNoaWxkcmVuLCB2ZG9tWzEvKnBhcmVudE5vZGUqL10sIGJlZm9yZSwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgICAgICAgICBzZXREZWZhdWx0UHJvcHMocHJvcHMsIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSB2ZG9tWzYvKmluc3RhbmNlKi9dID0gbmV3IENvbnN0cnVjdG9yKHByb3BzKTtcbiAgICAgICAgICAgIHZhciBwcmV2Q29tcG9uZW50ID0gY3VycmVudENvbXBvbmVudDtcbiAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICBjb21wb25lbnQubm9kZSA9IHZkb207XG4gICAgICAgICAgICBjb21wb25lbnQuX2ludGVybmFsUGFyZW50Q29tcG9uZW50ID0gcGFyZW50Q29tcG9uZW50O1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBub3JtKGNvbXBvbmVudC5yZW5kZXIoKSk7XG4gICAgICAgICAgICBjb21wb25lbnQuX2ludGVybmFsQ29udGV4dCA9IGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQgPyBjb21wb25lbnQuZ2V0Q2hpbGRDb250ZXh0KCkgOiBudWxsO1xuICAgICAgICAgICAgdmRvbVs3LypjaGlsZHJlbiovXSA9IGNyZWF0ZShjaGlsZHJlbiwgdmRvbVsxLypwYXJlbnROb2RlKi9dLCBiZWZvcmUsIGNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudERpZE1vdW50KSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudERpZE1vdW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50ID0gcHJldkNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmRvbVs0LypyZWYqL10pIHtcbiAgICAgICAgICAgIHNldFJlZih2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cblxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qKlxuICAgICAqIFVwZGF0aW5nXG4gICAgICoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZShvbGQsIHZkb20sIHBhcmVudENvbXBvbmVudCkge1xuICAgICAgICB2YXIgdHlwZSA9IHZkb21bMC8qdHlwZSovXTtcbiAgICAgICAgaWYgKERFQlVHX01PREUgJiYgIXZkb20uaWQpIHtcbiAgICAgICAgICAgIGRlYnVnVk5vZGUodmRvbSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZG9uJ3QgdXBkYXRlIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgLy8gaGFwcGVucyB3aGVuIHdlIHVzZSB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgaWYgKHZkb20gPT09IG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIHZkb207XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgIT09IG9sZFswLyp0eXBlKi9dKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZShvbGQsIHZkb20sIHBhcmVudENvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBWVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZVRleHQob2xkLCB2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFZUYWcpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVUYWcob2xkLCB2ZG9tLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gVkFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlQXJyYXkob2xkLCB2ZG9tLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gVkNvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZUNvbXBvbmVudChvbGQsIHZkb20sIHBhcmVudENvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVUZXh0KG9sZCwgdmRvbSkge1xuICAgICAgICB2ZG9tWzEvKm5vZGVUZXh0Ki9dID0gb2xkWzEvKm5vZGVUZXh0Ki9dO1xuICAgICAgICBpZiAodmRvbVsyLyp0ZXh0Ki9dICE9PSBvbGRbMi8qdGV4dCovXSkge1xuICAgICAgICAgICAgdmRvbVsxLypub2RlVGV4dCovXS50ZXh0Q29udGVudCA9IHZkb21bMi8qdGV4dCovXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVUYWcob2xkLCB2ZG9tLCBwYXJlbnRDb21wb25lbnQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB2ZG9tWzEvKm5vZGUqL10gPSBvbGRbMS8qbm9kZSovXTtcbiAgICAgICAgaWYgKHZkb21bMi8qdGFnKi9dICE9PSBvbGRbMi8qdGFnKi9dKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZShvbGQsIHZkb20sIHBhcmVudENvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF0dHJzU3RhcnQgPSA5LyphdHRyc1N0YXJ0UG9zKi8gKyB2ZG9tWzgvKmNvbnN0QXR0cnNMZW4qL10gKiAyO1xuICAgICAgICB2YXIgYXR0cnNFbmQgPSA5LyphdHRyc1N0YXJ0UG9zKi8gKyB2ZG9tWzcvKmF0dHJzTGVuKi9dICogMjtcbiAgICAgICAgdmFyIG9sZEF0dHJzRW5kID0gOS8qYXR0cnNTdGFydFBvcyovICsgb2xkWzcvKmF0dHJzTGVuKi9dICogMjtcbiAgICAgICAgdmFyIHZkb21MZW4gPSB2ZG9tLmxlbmd0aDtcbiAgICAgICAgdmFyIG9sZExlbiA9IG9sZC5sZW5ndGg7XG4gICAgICAgIHZhciBjaGlsZExlbiA9IHZkb21MZW4gLSBhdHRyc0VuZDtcbiAgICAgICAgdmFyIG9sZENoaWxkTGVuID0gb2xkTGVuIC0gb2xkQXR0cnNFbmQ7XG4gICAgICAgIGlmIChjaGlsZExlbiAhPT0gb2xkQ2hpbGRMZW4pIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlKG9sZCwgdmRvbSwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmRvbVs2LyphdHRyc0hhc2gqL10gPT09IG9sZFs2LyphdHRyc0hhc2gqL10gJiYgYXR0cnNFbmQgPT09IG9sZEF0dHJzRW5kKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gYXR0cnNTdGFydDsgaSA8IGF0dHJzRW5kOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVBdHRyKHZkb21baV0sIHZkb21baSArIDFdLCBvbGRbaSArIDFdLCBub2RlLCB2ZG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBhdHRyc0VuZDsgaSA8IHZkb21MZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHZkb21baV0gPSB1cGRhdGUob2xkW2ldLCBub3JtKHZkb21baV0pLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlQXR0cnModmRvbSwgb2xkLCBhdHRyc0VuZCwgb2xkQXR0cnNFbmQpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZExlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmRvbVthdHRyc0VuZCArIGldID0gdXBkYXRlKG9sZFtvbGRBdHRyc0VuZCArIGldLCBub3JtKHZkb21bYXR0cnNFbmQgKyBpXSksIHBhcmVudENvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFs0LypyZWZUKi9dICE9IHZkb21bNC8qcmVmVCovXSB8fCBvbGRbNS8qb3duZXJUKi9dICE9IHZkb21bNS8qb3duZXJUKi9dKSB7XG4gICAgICAgICAgICBzZXRSZWYodmRvbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZkb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50KG9sZCwgdmRvbSwgcGFyZW50Q29tcG9uZW50KSB7XG4gICAgICAgIHZhciBDdG9yID0gdmRvbVsyLypDdG9yKi9dO1xuICAgICAgICBpZiAob2xkWzIvKkN0b3IqL10gIT09IEN0b3IpIHtcbiAgICAgICAgICAgIHZkb20gPSByZXBsYWNlKG9sZCwgdmRvbSwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZkb21bMS8qcGFyZW50Tm9kZSovXSA9IG9sZFsxLypwYXJlbnROb2RlKi9dO1xuICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IHZkb21bNi8qaW5zdGFuY2UqL10gPSBvbGRbNi8qaW5zdGFuY2UqL107XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIC8vbm9pbnNwZWN0aW9uIEpTRHVwbGljYXRlZERlY2xhcmF0aW9uXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9ybShDdG9yKCkpO1xuICAgICAgICAgICAgICAgIHZkb21bNy8qY2hpbGRyZW4qL10gPSB1cGRhdGUob2xkWzcvKmNoaWxkcmVuKi9dLCBjaGlsZHJlbiwgcGFyZW50Q29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2Q29tcG9uZW50ID0gY3VycmVudENvbXBvbmVudDtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50ID0gY29tcG9uZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5faW50ZXJuYWxQYXJlbnRDb21wb25lbnQgIT09IHBhcmVudENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuX2ludGVybmFsUGFyZW50Q29tcG9uZW50ID0gcGFyZW50Q29tcG9uZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fY29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IHZkb21bOC8qcHJvcHMqL107XG4gICAgICAgICAgICAgICAgaWYgKEN0b3IuZGVmYXVsdFByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldERlZmF1bHRQcm9wcyhwcm9wcywgQ3Rvci5kZWZhdWx0UHJvcHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlKHByb3BzLCBjb21wb25lbnQuc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcywgY29tcG9uZW50LnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSB2ZG9tWzgvKnByb3BzKi9dID0gcHJvcHM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IG5vcm0oY29tcG9uZW50LnJlbmRlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Ll9pbnRlcm5hbENvbnRleHQgPSBjb21wb25lbnQuZ2V0Q2hpbGRDb250ZXh0ID8gY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVjYXVzZSBjaGlsZCBjb21wb25lbnQgY2FuIHN0aWxsIHVwZGF0ZXNcbiAgICAgICAgICAgICAgICAgICAgdmRvbVs3LypjaGlsZHJlbiovXSA9IHVwZGF0ZShjb21wb25lbnQubm9kZVs3LypjaGlsZHJlbiovXSwgY2hpbGRyZW4sIGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZkb21bNy8qY2hpbGRyZW4qL10gPSB1cGRhdGUob2xkWzcvKmNoaWxkcmVuKi9dLCBjaGlsZHJlbiwgY29tcG9uZW50LCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQubm9kZSA9IHZkb207XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKHByb3BzLCBjb21wb25lbnQuc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmRvbVs3LypjaGlsZHJlbiovXSA9IG9sZFs3LypjaGlsZHJlbiovXTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Lm5vZGUgPSB2ZG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50ID0gcHJldkNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvbGRbNC8qcmVmKi9dICE9IHZkb21bNC8qcmVmKi9dIHx8IG9sZFs1Lypvd25lckMqL10gIT0gdmRvbVs1Lypvd25lckMqL10pIHtcbiAgICAgICAgICAgICAgICBzZXRSZWYodmRvbSwgb2xkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBcnJheShvbGQsIHZkb20sIHBhcmVudENvbXBvbmVudCkge1xuICAgICAgICB2YXIgcm9vdE5vZGUgPSB2ZG9tWzEvKnBhcmVudE5vZGVBcnIqL10gPSBvbGRbMS8qcGFyZW50Tm9kZUFyciovXTtcbiAgICAgICAgdmFyIGtleU1hcCA9IHZkb21bMi8qa2V5bWFwKi9dID0gb2xkWzIvKmtleW1hcCovXTtcbiAgICAgICAgdmFyIG9sZExlbiA9IG9sZC5sZW5ndGg7XG4gICAgICAgIHZhciBzb3VyY2VBcnJheSA9IHZkb21bMy8qc291cmNlQXJyYXkqL107XG4gICAgICAgIC8vdG9kbzptYXliZSBzbG93IHNwZWVkXG4gICAgICAgIHZhciBsYXN0TmV4dE5vZGUgPSBnZXRDaGlsZE5vZGUob2xkLCB0cnVlKS5uZXh0U2libGluZztcbiAgICAgICAgdmFyIGluc2VydHMgPSBudWxsO1xuXG4gICAgICAgIHZhciBmaXRDb3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSA0LyphcnJheUZpcnN0Tm9kZSovOyBpIDwgdmRvbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5ld0NoaWxkID0gdmRvbVtpXSA9IG5vcm0oc291cmNlQXJyYXlbaSAtIDQvKmFycmF5Rmlyc3ROb2RlKi9dKTtcbiAgICAgICAgICAgIHZhciBvbGRDaGlsZCA9IG9sZExlbiA+IGkgPyBvbGRbaV0gOiBudWxsO1xuICAgICAgICAgICAgdmFyIG5ld0tleSA9IGdldEtleShuZXdDaGlsZCk7XG4gICAgICAgICAgICBpZiAobmV3S2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZml0UG9zID0ga2V5TWFwW25ld0tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkQ2hpbGQgJiYgZ2V0S2V5KG9sZENoaWxkKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpdFBvcyA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaXRQb3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpdFBvcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2xkQ2hpbGQgPSBvbGRbZml0UG9zXTtcbiAgICAgICAgICAgICAgICBpZiAoIW9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZHVwbGljYXRlIGtleTogJyArIG5ld0tleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpdENvdW50Kys7XG4gICAgICAgICAgICAgICAgdmRvbVtpXSA9IHVwZGF0ZShvbGRDaGlsZCwgbmV3Q2hpbGQsIHBhcmVudENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdFBvcyAhPT0gaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0cy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbGRbZml0UG9zXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0cyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydHMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zZXJ0cy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0tleSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAga2V5TWFwW25ld0tleV0gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZkb21bMy8qc291cmNlQXJyYXkqL10gPSBudWxsO1xuXG4gICAgICAgIHZhciBvbGRMZW5GdWxsID0gb2xkTGVuIC0gNC8qYXJyYXlGaXJzdE5vZGUqLztcbiAgICAgICAgaWYgKG9sZExlbkZ1bGwgPiBmaXRDb3VudCkge1xuICAgICAgICAgICAgZm9yIChpID0gNC8qYXJyYXlGaXJzdE5vZGUqLzsgaSA8IG9sZExlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2xkQ2hpbGQgPSBvbGRbaV07XG4gICAgICAgICAgICAgICAgaWYgKG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXRLZXkob2xkQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleU1hcFtrZXldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZW1vdmUocm9vdE5vZGUsIG9sZENoaWxkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZExlbkZ1bGwgPT0gKytmaXRDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5zZXJ0cykge1xuICAgICAgICAgICAgZm9yIChpID0gaW5zZXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBpbnNlcnRzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHZkb21bcG9zXTtcblxuICAgICAgICAgICAgICAgIGlmIChwb3MgPT0gdmRvbS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiZWZvcmVDaGlsZCA9IGxhc3ROZXh0Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZUNoaWxkID0gZ2V0Q2hpbGROb2RlKHZkb21bcG9zICsgMV0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSZW5kZXJlZChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZShyb290Tm9kZSwgY2hpbGQsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gdmRvbVtwb3NdID0gY3JlYXRlKGNoaWxkLCByb290Tm9kZSwgYmVmb3JlQ2hpbGQsIHBhcmVudENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZG9tO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFJlZih2ZG9tKSB7XG4gICAgICAgIHZhciB0b3BDb21wb25lbnQ7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHZhciB2YWw7XG4gICAgICAgIGlmICh2ZG9tWzAvKnR5cGUqL10gPT0gVlRhZykge1xuICAgICAgICAgICAgdG9wQ29tcG9uZW50ID0gdmRvbVs1Lypvd25lclQqL107XG4gICAgICAgICAgICByZWYgPSB2ZG9tWzQvKnJlZlQqL107XG4gICAgICAgICAgICB2YWwgPSB2ZG9tWzEvKm5vZGUqL107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3BDb21wb25lbnQgPSB2ZG9tWzUvKm93bmVyQyovXTtcbiAgICAgICAgICAgIHJlZiA9IHZkb21bNC8qcmVmKi9dO1xuICAgICAgICAgICAgdmFsID0gdmRvbVs2LyppbnN0YW5jZSovXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlZiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZWYodmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdG9wQ29tcG9uZW50LnJlZnMpIHtcbiAgICAgICAgICAgICAgICB0b3BDb21wb25lbnQucmVmcyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9wQ29tcG9uZW50LnJlZnNbcmVmXSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldERlZmF1bHRQcm9wcyhwcm9wcywgZGVmYXVsdFByb3BzKSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzW3Byb3BdID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSBkZWZhdWx0UHJvcHNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKipcbiAgICAgKiBBdHRyc1xuICAgICAqKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qKi9cbiAgICBmdW5jdGlvbiBzZXRTdHlsZShub2RlLCBvbGRTdHlsZXMsIG5ld1N0eWxlcykge1xuICAgICAgICB2YXIgdmFsO1xuICAgICAgICB2YXIgc3R5bGVOb2RlID0gbm9kZS5zdHlsZTtcbiAgICAgICAgZm9yIChwcm9wIGluIG5ld1N0eWxlcykge1xuICAgICAgICAgICAgdmFsID0gbmV3U3R5bGVzW3Byb3BdO1xuICAgICAgICAgICAgaWYgKG9sZFN0eWxlcyAmJiBvbGRTdHlsZXNbcHJvcF0gPT09IHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCA9PSArdmFsICYmIHR5cGVvZiBpc1VuaXRsZXNzTnVtYmVyW3Byb3BdID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0eWxlTm9kZVtwcm9wXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkU3R5bGVzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9sZFN0eWxlcykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3U3R5bGVzW3Byb3BdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZU5vZGVbcHJvcF0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUF0dHIoYXR0ciwgdmFsLCBvbGRWYWwsIG5vZGUsIHZkb20pIHtcbiAgICAgICAgdmFyIG5vcm1BdHRyO1xuICAgICAgICBpZiAodmFsID09PSBvbGRWYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG5vcm1BdHRyID0gZmFzdEF0dHJzW2F0dHJdKSB8fCAoYXR0cls0XSA9PSAnLScgJiYgYXR0ci5zdWJzdHIoMCwgNSkgPT0gJ2RhdGEtJyAmJiAobm9ybUF0dHIgPSBhdHRyKSkpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT0gbnVsbCB8fCB2YWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShub3JtQXR0cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobm9ybUF0dHIsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9ybUF0dHIgPSBjb25zdFByb3BzW2F0dHJdKSB7XG4gICAgICAgICAgICBub2RlW25vcm1BdHRyXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgobm9ybUF0dHIgPSBjb25zdEV2ZW50c1thdHRyXSkgfHwgKGF0dHJbMF0gPT0gJ28nICYmIGF0dHJbMV0gPT0gJ24nICYmIChub3JtQXR0ciA9IGF0dHIudG9Mb3dlckNhc2UoKSkgJiYgKG5vcm1BdHRyIGluIGRvYyAmJiBub3JtQXR0ci5zdWJzdHIoMCwgMikgPT0gJ29uJykpKSB7XG4gICAgICAgICAgICB2YXIgdG9wRXZlbnROYW1lID0gdG9wRXZlbnRzW2F0dHJdO1xuICAgICAgICAgICAgaWYgKHRvcEV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIHNldFRvcEV2ZW50KG5vZGUsIHRvcEV2ZW50TmFtZSwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVbbm9ybUF0dHJdID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHIgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIHNldFN0eWxlKG5vZGUsIG9sZFZhbCwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyID09PSAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnKSB7XG4gICAgICAgICAgICBpZiAoIW9sZFZhbCB8fCBvbGRWYWwuX19odG1sICE9PSB2YWwuaHRtbCkge1xuICAgICAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MID0gdmFsLl9faHRtbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgobm9ybUF0dHIgPSB4TGlua0F0dHJzW2F0dHJdKSB8fCAobm9ybUF0dHIgPSB4bWxBdHRyc1thdHRyXSkpIHtcbiAgICAgICAgICAgIHZhciBucyA9IG5vcm1BdHRyWzVdID09ICc6JyA/IHhMaW5rTlMgOiB4bWxOUztcbiAgICAgICAgICAgIGlmICh2YWwgPT0gbnVsbCB8fCB2YWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZU5TKG5zLCBub3JtQXR0cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGVOUyhucywgbm9ybUF0dHIsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVBdHRycyh2ZG9tLCBvbGQsIG5ld0VuZCwgb2xkRW5kKSB7XG4gICAgICAgIHZhciBuZXdQcm9wLCBuZXdQcm9wVmFsLCBvbGRQcm9wLCBvbGRQcm9wVmFsLCBub2RlID0gdmRvbVsxLypub2RlKi9dO1xuICAgICAgICB2YXIgbWF4ID0gb2xkRW5kID4gbmV3RW5kID8gb2xkRW5kIDogbmV3RW5kO1xuICAgICAgICBmb3IgKHZhciBpID0gOS8qYXR0cnNTdGFydFBvcyovOyBpIDwgbWF4OyBpICs9IDIpIHtcbiAgICAgICAgICAgIGlmIChpIDwgbmV3RW5kKSB7XG4gICAgICAgICAgICAgICAgbmV3UHJvcCA9IHZkb21baV07XG4gICAgICAgICAgICAgICAgbmV3UHJvcFZhbCA9IHZkb21baSArIDFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdQcm9wID0gbnVsbDtcbiAgICAgICAgICAgICAgICBuZXdQcm9wVmFsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIDwgb2xkRW5kKSB7XG4gICAgICAgICAgICAgICAgb2xkUHJvcCA9IG9sZFtpXTtcbiAgICAgICAgICAgICAgICBvbGRQcm9wVmFsID0gb2xkW2kgKyAxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkUHJvcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgb2xkUHJvcFZhbCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3UHJvcCAhPT0gb2xkUHJvcCkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgb2xkIGlzIGRlbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSA5LyphdHRyc1N0YXJ0UG9zKi87IGogPCBuZXdFbmQ7IGogKz0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZkb21bal0gPT0gb2xkUHJvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBdHRyKG9sZFByb3AsIG51bGwsIG9sZFByb3BWYWwsIG5vZGUsIHZkb20pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Byb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSA5LyphdHRyc1N0YXJ0UG9zKi87IGogPCBvbGRFbmQ7IGogKz0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFtqXSA9PSBuZXdQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBdHRyKG5ld1Byb3AsIG5ld1Byb3BWYWwsIG9sZFtmb3VuZCArIDFdLCBub2RlLCB2ZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUF0dHIobmV3UHJvcCwgbmV3UHJvcFZhbCwgbnVsbCwgbm9kZSwgdmRvbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVBdHRyKG5ld1Byb3AsIG5ld1Byb3BWYWwsIG9sZFByb3BWYWwsIG5vZGUsIHZkb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcFByb3BhZ2F0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9wRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgdmFyIGRvbSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID0gc3RvcFByb3BhZ2F0aW9uO1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb247XG4gICAgICAgIGV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9tLl9ldmVudHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBkb20uX2V2ZW50c1tldmVudC50eXBlXTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChkb20sIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGRvbSA9IGRvbS5wYXJlbnROb2RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUb3BFdmVudChkb20sIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFkb20uX2V2ZW50cykge1xuICAgICAgICAgICAgZG9tLl9ldmVudHMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRvbS5fZXZlbnRzW2V2ZW50TmFtZV0gPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGlmICh0b3BFdmVudHNNYXBbZXZlbnROYW1lXSsrID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaHRtbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRvcEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5fZXZlbnRzW2V2ZW50TmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgaWYgKC0tdG9wRXZlbnRzTWFwW2V2ZW50TmFtZV0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBodG1sRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdG9wRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qKlxuICAgICAqIE1vdmUsIFJlbW92ZSwgUmVwbGFjZVxuICAgICAqKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qKi9cbiAgICBmdW5jdGlvbiByZXBsYWNlKG9sZCwgdmRvbSwgcGFyZW50Q29tcG9uZW50KSB7XG4gICAgICAgIHZhciB0eXBlID0gb2xkWzAvKnR5cGUqL107XG4gICAgICAgIGlmICh0eXBlID09IFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnROb2RlID0gb2xkWzEvKnBhcmVudE5vZGUqL107XG4gICAgICAgICAgICB2YXIgYmVmb3JlID0gZ2V0Q2hpbGROb2RlKG9sZCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gVkFycmF5KSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IG9sZFsxLypwYXJlbnROb2RlQXJyKi9dO1xuICAgICAgICAgICAgdmFyIGJlZm9yZSA9IGdldENoaWxkTm9kZShvbGQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFZUYWcpIHtcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSBvbGRbMS8qbm9kZSovXS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgYmVmb3JlID0gb2xkWzEvKm5vZGUqL107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBWVGV4dCkge1xuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IG9sZFsxLypub2RlVGV4dCovXS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgYmVmb3JlID0gb2xkWzEvKm5vZGVUZXh0Ki9dO1xuICAgICAgICB9XG4gICAgICAgIHZkb20gPSBjcmVhdGUodmRvbSwgcGFyZW50Tm9kZSwgYmVmb3JlLCBwYXJlbnRDb21wb25lbnQpO1xuICAgICAgICByZW1vdmUocGFyZW50Tm9kZSwgb2xkLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHZkb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlKHBhcmVudE5vZGUsIHZkb20sIHJlbW92ZUZyb21Eb20pIHtcbiAgICAgICAgdmFyIHR5cGUgPSB2ZG9tWzAvKnR5cGUqL107XG4gICAgICAgIGlmICh0eXBlID09IFZDb21wb25lbnQgfHwgdHlwZSA9PSBWQXJyYXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09IFZBcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSA0LyphcnJheUZpcnN0Tm9kZSovOyBpIDwgdmRvbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUodmRvbVsxLypwYXJlbnROb2RlQXJyKi9dLCB2ZG9tW2ldLCByZW1vdmVGcm9tRG9tKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodmRvbVs2LyppbnN0YW5jZSovXS5jb21wb25lbnRXaWxsVW5tb3VudCkge1xuICAgICAgICAgICAgICAgICAgICB2ZG9tWzYvKmluc3RhbmNlKi9dLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlbW92ZSh2ZG9tWzEvKnBhcmVudE5vZGUqL10sIHZkb21bNy8qY2hpbGRyZW4qL10sIHJlbW92ZUZyb21Eb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT0gVlRhZykge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDkvKmF0dHJzU3RhcnRQb3MqLyArIHZkb21bNy8qYXR0cnNMZW4qL10gKiAyOyBpIDwgdmRvbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUodmRvbVsxLypub2RlKi9dLCB2ZG9tW2ldLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZW1vdmVGcm9tRG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmRvbVsxLypub2RlKi9dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSA9PSBWVGV4dCAmJiByZW1vdmVGcm9tRG9tKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2ZG9tWzEvKm5vZGVUZXh0Ki9dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmUocGFyZW50Tm9kZSwgdmRvbSwgYmVmb3JlQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBnZXRDaGlsZE5vZGUodmRvbSwgZmFsc2UpO1xuICAgICAgICBpZiAobm9kZS5uZXh0U2libGluZyAhPT0gYmVmb3JlQ2hpbGQpIHtcbiAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIGJlZm9yZUNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqXG4gICAgICogVXRpbHNcbiAgICAgKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKiovXG4gICAgZnVuY3Rpb24gbm9ybSh2ZG9tKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmRvbSA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmRvbSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIG1ha2VUZXh0KHZkb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmRvbSA9PSAnYm9vbGVhbicgfHwgdmRvbSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFrZVRleHQoJycpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlID0gdmRvbVswLyp0eXBlKi9dO1xuICAgICAgICBpZiAoIXR5cGUgfHwgKHR5cGUgIT09IFZUYWcgJiYgdHlwZSAhPT0gVlRleHQgJiYgdHlwZSAhPT0gVkNvbXBvbmVudCAmJiB0eXBlICE9PSBWQXJyYXkpKSB7XG4gICAgICAgICAgICBpZiAodmRvbS5jb25zdHJ1Y3RvciA9PSBBcnJheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlVkFycmF5KHZkb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1ha2VUZXh0KCcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PSBWQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAvL2NvbnZlcnRDb21wb25lbnRUb1RhZ1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ZG9tWzIvKkN0b3IqL10gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBub3JtQ2hpbGRyZW4odmRvbVs4Lypwcm9wcyovXS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ha2VUYWcodmRvbVsyLypDdG9yKi9dLCB2ZG9tWzgvKnByb3BzKi9dLCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCB2ZG9tWzUvKm93bmVyQyovXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZkb207XG4gICAgfVxuXG4gICAgLy8gW10sIG51bGwsIGZhbHNlLCBcIjIyM1wiLCB1bmRlZmluZWQsIHt9LCBbXCJ4VFwiLCAuLi5dLFxuICAgIGZ1bmN0aW9uIG5vcm1DaGlsZHJlbih2ZG9tKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmRvbSA9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmRvbSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmRvbSA9PSAnYm9vbGVhbicgfHwgdmRvbSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gW3Zkb21dO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0eXBlID0gdmRvbVswLyp0eXBlKi9dO1xuICAgICAgICBpZiAodHlwZSA9PT0gVlRhZyB8fCB0eXBlID09PSBWVGV4dCB8fCB0eXBlID09PSBWQ29tcG9uZW50IHx8IHR5cGUgPT09IFZBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIFt2ZG9tXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmRvbS5jb25zdHJ1Y3RvciA9PSBBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIHZkb207XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt2ZG9tXTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcHNIYXNoQ291bnRlciA9IDE7XG5cbiAgICBmdW5jdGlvbiBtYWtlQXR0cnModmRvbSwgYXR0cnMsIG93bmVyQ29tcG9uZW50KSB7XG4gICAgICAgIHZhciBwQ291bnQgPSAwO1xuICAgICAgICB2YXIgayA9IDkvKmF0dHJzU3RhcnRQb3MqLztcbiAgICAgICAgdmFyIGtleSwgcmVmO1xuICAgICAgICBmb3IgKHZhciBwIGluIGF0dHJzKSB7XG4gICAgICAgICAgICBpZiAocCA9PT0gJ2NoaWxkcmVuJykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHAgPT09ICdrZXknKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gYXR0cnNbcF07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocCA9PT0gJ3JlZicpIHtcbiAgICAgICAgICAgICAgICByZWYgPSBhdHRyc1twXTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZkb21baysrXSA9IHA7XG4gICAgICAgICAgICB2ZG9tW2srK10gPSBhdHRyc1twXTtcbiAgICAgICAgICAgIHBDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHZkb21bMy8qa2V5Ki9dID0ga2V5O1xuICAgICAgICB2ZG9tWzQvKnJlZlQqL10gPSByZWY7XG4gICAgICAgIHZkb21bNS8qb3duZXJUKi9dID0gcmVmID8gb3duZXJDb21wb25lbnQgOiBudWxsO1xuICAgICAgICByZXR1cm4gcENvdW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VUYWcodGFnLCBhdHRycywgY2hpbGRyZW5BcnJheSwgZnJvbSwgdG8sIG93bmVyQ29tcG9uZW50KSB7XG4gICAgICAgIHZhciBjaGlsZHJlbkxlbiA9IHRvIC0gZnJvbTtcbiAgICAgICAgaWYgKGNoaWxkcmVuTGVuIDwgMCkge1xuICAgICAgICAgICAgY2hpbGRyZW5MZW4gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGlsZHJlbkxlbiA9PSAwKSB7XG4gICAgICAgICAgICBpZiAoYXR0cnMgJiYgYXR0cnMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbkFycmF5ID0gbm9ybUNoaWxkcmVuKGF0dHJzLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBmcm9tID0gMDtcbiAgICAgICAgICAgICAgICB0byA9IGNoaWxkcmVuQXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHZhciBuZXdWZG9tID0gbmV3IEFycmF5KDkvKmF0dHJzU3RhcnRQb3MqLyArIDIgKyB0byAtIGZyb20pOyAvLyBtaW4gdGFnIGFycmF5IGxlblxuICAgICAgICB2YXIgdmRvbSA9IFtdO1xuICAgICAgICB2ZG9tWzgvKmNvbnN0QXR0cnNMZW4qL10gPSAwO1xuICAgICAgICB2ZG9tWzAvKnR5cGUqL10gPSBWVGFnO1xuICAgICAgICB2ZG9tWzEvKm5vZGUqL10gPSBudWxsO1xuICAgICAgICB2ZG9tWzIvKnRhZyovXSA9IHRhZztcbiAgICAgICAgdmFyIHBDb3VudCA9IGF0dHJzID8gbWFrZUF0dHJzKHZkb20sIGF0dHJzLCBvd25lckNvbXBvbmVudCkgOiAwO1xuICAgICAgICB2YXIgayA9IDkvKmF0dHJzU3RhcnRQb3MqLyArIHBDb3VudCAqIDI7XG4gICAgICAgIHZkb21bNi8qYXR0cnNIYXNoKi9dID0gcHJvcHNIYXNoQ291bnRlcisrO1xuICAgICAgICB2ZG9tWzcvKmF0dHJzTGVuKi9dID0gcENvdW50O1xuXG4gICAgICAgIGlmIChjaGlsZHJlbkxlbikge1xuICAgICAgICAgICAgLy8gcHJlIGNyZWF0ZSBhcnJheSBzbG90c1xuICAgICAgICAgICAgdmRvbS5sZW5ndGggPSBrICsgY2hpbGRyZW5MZW47XG4gICAgICAgICAgICAvLyB2ZG9tW2sgKyBjaGlsZHJlbkxlbiAtIDFdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hpbGRyZW5BcnJheSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZyb207IGkgPCB0bzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmRvbVtrKytdID0gY2hpbGRyZW5BcnJheVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoREVCVUdfTU9ERSkge1xuICAgICAgICAgICAgZGVidWdWTm9kZSh2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlQ29tcG9uZW50KEN0b3IsIHByb3BzLCBjaGlsZHJlbkFycmF5LCBvd25lckNvbXBvbmVudCkge1xuICAgICAgICB2YXIga2V5ID0gbnVsbDtcbiAgICAgICAgdmFyIHJlZiA9IG51bGw7XG4gICAgICAgIHZhciBuZXdQcm9wcyA9IHtjaGlsZHJlbjogY2hpbGRyZW5BcnJheX07XG4gICAgICAgIGlmIChwcm9wcykge1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgIGlmIChwID09PSAnY2hpbGRyZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbkFycmF5ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Byb3BzLmNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwID09PSAna2V5Jykge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBwcm9wc1twXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwID09PSAncmVmJykge1xuICAgICAgICAgICAgICAgICAgICByZWYgPSBwcm9wc1twXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld1Byb3BzW3BdID0gcHJvcHNbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZkb20gPSBbVkNvbXBvbmVudCwgbnVsbCwgQ3Rvciwga2V5LCByZWYsIHJlZiA/IG93bmVyQ29tcG9uZW50IDogbnVsbCwgbnVsbCwgbnVsbCwgbmV3UHJvcHNdO1xuICAgICAgICBpZiAoREVCVUdfTU9ERSkge1xuICAgICAgICAgICAgZGVidWdWTm9kZSh2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlVkFycmF5KGFycmF5KSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbVlRleHQsIG51bGwsICcnXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcCA9IG5ldyBBcnJheShsZW5ndGggKyA0LyphcnJheUZpcnN0Tm9kZSovKTtcbiAgICAgICAgcFswLyp0eXBlKi9dID0gVkFycmF5O1xuICAgICAgICBwWzMvKnNvdXJjZUFycmF5Ki9dID0gYXJyYXk7XG4gICAgICAgIGlmIChERUJVR19NT0RFKSB7XG4gICAgICAgICAgICBkZWJ1Z1ZOb2RlKHApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VUZXh0KHRleHQpIHtcbiAgICAgICAgdmFyIHZkb20gPSBbVlRleHQsIG51bGwsIHRleHRdO1xuICAgICAgICBpZiAoREVCVUdfTU9ERSkge1xuICAgICAgICAgICAgZGVidWdWTm9kZSh2ZG9tKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRLZXkodmRvbSkge1xuICAgICAgICBpZiAodmRvbVswLyp0eXBlKi9dID09IFZUYWcpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZG9tWzMvKmtleSovXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2ZG9tWzAvKnR5cGUqL10gPT0gVkNvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHZkb21bMy8qa2V5Q21wKi9dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFJlZih2ZG9tKSB7XG4gICAgICAgIGlmICh2ZG9tWzAvKnR5cGUqL10gPT0gVkNvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHZkb21bNC8qcmVmKi9dXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmRvbVswLyp0eXBlKi9dID09IFZUYWcpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZG9tWzQvKnJlZlQqL11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3BzKHZkb20pIHtcbiAgICAgICAgaWYgKHZkb21bMC8qdHlwZSovXSA9PSBWQ29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdmRvbVs4Lypwcm9wcyovXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2ZG9tWzAvKnR5cGUqL10gPT0gVlRhZykge1xuICAgICAgICAgICAgdmFyIGF0dHJzU3RhcnQgPSA5LyphdHRyc1N0YXJ0UG9zKi87XG4gICAgICAgICAgICB2YXIgYXR0cnNFbmQgPSA5LyphdHRyc1N0YXJ0UG9zKi8gKyB2ZG9tWzcvKmF0dHJzTGVuKi9dICogMjtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHt9O1xuICAgICAgICAgICAgaWYgKGF0dHJzRW5kIC0gYXR0cnNTdGFydCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gYXR0cnNTdGFydDsgaSA8IGF0dHJzRW5kOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHNbdmRvbVtpXV0gPSB2ZG9tW2kgKyAxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDaGlsZHJlbih2ZG9tKXtcbiAgICAgICAgdmFyIGNoaWxkcmVuO1xuICAgICAgICB2YXIgdHlwZSA9IHZkb21bMC8qdHlwZSovXTtcbiAgICAgICAgaWYgKHR5cGUgPT0gVkNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSB2ZG9tWzgvKnByb3BzKi9dID8gdmRvbVs4Lypwcm9wcyovXS5jaGlsZHJlbiA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBWVGFnKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IHZkb20uc2xpY2UoOS8qYXR0cnNTdGFydFBvcyovICsgdmRvbVs3LyphdHRyc0xlbiovXSAqIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gVkFycmF5KXtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gdmRvbS5zbGljZSg0LyphcnJheUZpcnN0Tm9kZSovKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGFnKHZkb20pe1xuICAgICAgICByZXR1cm4gdmRvbVswLyp0eXBlKi9dID09IFZDb21wb25lbnQgPyB2ZG9tWzIvKkN0b3IqL10gOiB2ZG9tWzIvKnRhZyovXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDaGlsZE5vZGUodmRvbSwgaXNMYXN0KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHZkb21bMC8qdHlwZSovXTtcbiAgICAgICAgICAgIGlmICh0eXBlID09IFZBcnJheSkge1xuICAgICAgICAgICAgICAgIHZkb20gPSB2ZG9tW2lzTGFzdCA/IHZkb20ubGVuZ3RoIC0gMSA6IDQvKmFycmF5Rmlyc3ROb2RlKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBWQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdmRvbSA9IHZkb21bNy8qY2hpbGRyZW4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IFZUYWcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmRvbVsxLypub2RlKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBWVGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2ZG9tWzEvKm5vZGVUZXh0Ki9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNSZW5kZXJlZCh2ZG9tKSB7XG4gICAgICAgIHZhciB0eXBlID0gdmRvbVswLyp0eXBlKi9dO1xuICAgICAgICBpZiAodHlwZSA9PSBWQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZG9tWzEvKnBhcmVudE5vZGVBcnIqL10gIT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZG9tWzEvKnBhcmVudE5vZGUqL10gIT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFZUYWcpIHtcbiAgICAgICAgICAgIHJldHVybiB2ZG9tWzEvKm5vZGUqL10gIT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFZUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdmRvbVsxLypub2RlVGV4dCovXSAhPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqXG4gICAgICogQ29tcG9uZW50XG4gICAgICoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqL1xuICAgIGZ1bmN0aW9uIENvbXBvbmVudChwcm9wcykge1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICAgIHRoaXMubm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbnRlcm5hbENvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbnRlcm5hbFBhcmVudENvbXBvbmVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIENvbXBvbmVudFByb3RvID0gQ29tcG9uZW50LnByb3RvdHlwZTtcbiAgICBDb21wb25lbnRQcm90by5jb21wb25lbnRXaWxsTW91bnQgPSBudWxsO1xuICAgIENvbXBvbmVudFByb3RvLmNvbXBvbmVudERpZE1vdW50ID0gbnVsbDtcbiAgICBDb21wb25lbnRQcm90by5jb21wb25lbnRXaWxsVXBkYXRlID0gbnVsbDtcbiAgICBDb21wb25lbnRQcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBudWxsO1xuICAgIENvbXBvbmVudFByb3RvLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBudWxsO1xuICAgIENvbXBvbmVudFByb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gbnVsbDtcbiAgICBDb21wb25lbnRQcm90by5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBudWxsO1xuICAgIENvbXBvbmVudFByb3RvLmdldENoaWxkQ29udGV4dCA9IG51bGw7XG5cbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgaXNVcGRhdGluZyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gcnVuUXVldWUoKSB7XG4gICAgICAgIGlmICghaXNVcGRhdGluZyAmJiBxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpc1VwZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciB0YXNrID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICh0YXNrLnR5cGUgPT0gJ3VwZGF0ZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gdGFzay5jb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZDb21wb25lbnQgPSBjdXJyZW50Q29tcG9uZW50O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRQcm9wcyA9IGNvbXBvbmVudC5wcm9wcztcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gdGFzay5uZXh0U3RhdGU7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIXRhc2suZm9yY2UgJiYgY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Ll9pbnRlcm5hbENvbnRleHQgPSB0eXBlb2YgY29tcG9uZW50LmdldENoaWxkQ29udGV4dCA9PSAnZnVuY3Rpb24nID8gY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9ybShjb21wb25lbnQucmVuZGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQubm9kZVs3LypjaGlsZHJlbiovXSA9IHVwZGF0ZShjb21wb25lbnQubm9kZVs3LypjaGlsZHJlbiovXSwgY2hpbGRyZW4sIGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50ID0gcHJldkNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzVXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJ1blF1ZXVlKCk7XG4gICAgICAgICAgICBpZiAodGFzay5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRhc2suY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvbXBvbmVudFByb3RvLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoc3RhdGUgJiYgdGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlW2tleV0gPSB0aGlzLnN0YXRlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlLnB1c2goe3R5cGU6ICd1cGRhdGUnLCBmb3JjZTogZmFsc2UsIG5leHRTdGF0ZTogc3RhdGUsIGNvbXBvbmVudDogdGhpcywgY2FsbGJhY2s6IGNhbGxiYWNrfSk7XG4gICAgICAgIHJ1blF1ZXVlKCk7XG4gICAgfTtcbiAgICBDb21wb25lbnRQcm90by5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgQ29tcG9uZW50UHJvdG8uZ2V0Q2hpbGRDb250ZXh0ID0gbnVsbDtcbiAgICBDb21wb25lbnRQcm90by5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBxdWV1ZS5wdXNoKHt0eXBlOiAndXBkYXRlJywgZm9yY2U6IHRydWUsIG5leHRTdGF0ZTogdGhpcy5zdGF0ZSwgY29tcG9uZW50OiB0aGlzLCBjYWxsYmFjazogY2FsbGJhY2t9KTtcbiAgICAgICAgcnVuUXVldWUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50Q29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICAgICAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudENvbXBvbmVudCA9IHBhcmVudENvbXBvbmVudC5faW50ZXJuYWxQYXJlbnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50Q29tcG9uZW50Ll9pbnRlcm5hbENvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50ID0gcGFyZW50c1tpXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHBhcmVudENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0W3Byb3BdID0gcGFyZW50Q29tcG9uZW50W3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnRQcm90bywgJ2NvbnRleHQnLCB7XG4gICAgICAgIGdldDogZ2V0Q29udGV4dFxuICAgIH0pO1xuXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqXG4gICAgICogVG9wIExldmVsXG4gICAgICoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSoqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRycywgY2hpbGQpIHtcbiAgICAgICAgdmFyIGFyZ0xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIGlmICh0eXBlb2YgdGFnID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbjtcbiAgICAgICAgICAgIGlmIChhcmdMZW4gPiAyKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBuZXcgQXJyYXkoYXJnTGVuIC0gMik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltpIC0gMl0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWFrZUNvbXBvbmVudCh0YWcsIGF0dHJzLCBjaGlsZHJlbiwgY3VycmVudENvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZkb20gPSBtYWtlVGFnKHRhZywgYXR0cnMsIG51bGwsIDIsIGFyZ0xlbiwgY3VycmVudENvbXBvbmVudCk7XG4gICAgICAgIGlmIChhcmdMZW4pIHtcbiAgICAgICAgICAgIHZhciBzaGlmdCA9IHZkb20ubGVuZ3RoIC0gYXJnTGVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmdMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHZkb21bc2hpZnQgKyBpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmRvbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXIodmRvbSwgcm9vdE5vZGUpIHtcbiAgICAgICAgaXNVcGRhdGluZyA9IHRydWU7XG4gICAgICAgIGlmICh0eXBlb2Ygcm9vdE5vZGUuX3Zkb20gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZkb20gPSByb290Tm9kZS5fdmRvbSA9IGNyZWF0ZShub3JtKHZkb20pLCByb290Tm9kZSwgbnVsbCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gcm9vdE5vZGUuX3Zkb207XG4gICAgICAgICAgICB2ZG9tID0gcm9vdE5vZGUuX3Zkb20gPSB1cGRhdGUob2xkLCBub3JtKHZkb20pLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBpc1VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgIHJ1blF1ZXVlKCk7XG4gICAgICAgIHJldHVybiB2ZG9tWzAvKnR5cGUqL10gPT0gVkNvbXBvbmVudCA/IHZkb21bNi8qaW5zdGFuY2UqL10gOiB2ZG9tWzEvKm5vZGUqL107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRHVtbXkodmRvbSl7XG4gICAgICAgIGRvYyA9IGR1bW15RG9jO1xuICAgICAgICB2YXIgcm9vdE5vZGUgPSBkdW1teU5vZGU7XG4gICAgICAgIGlzVXBkYXRpbmcgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIHJvb3ROb2RlLl92ZG9tID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2ZG9tID0gcm9vdE5vZGUuX3Zkb20gPSBjcmVhdGUobm9ybSh2ZG9tKSwgcm9vdE5vZGUsIG51bGwsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHJvb3ROb2RlLl92ZG9tO1xuICAgICAgICAgICAgdmRvbSA9IHJvb3ROb2RlLl92ZG9tID0gdXBkYXRlKG9sZCwgbm9ybSh2ZG9tKSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaXNVcGRhdGluZyA9IGZhbHNlO1xuICAgICAgICBydW5RdWV1ZSgpO1xuICAgICAgICByZXR1cm4gdmRvbVswLyp0eXBlKi9dID09IFZDb21wb25lbnQgPyB2ZG9tWzYvKmluc3RhbmNlKi9dIDogdmRvbVsxLypub2RlKi9dO1xuICAgIH1cblxuICAgIHZhciBwcm9wVHlwZSA9IGZ1bmN0aW9uICgpIHtyZXR1cm4gcHJvcFR5cGV9O1xuICAgIHByb3BUeXBlLmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAoKSB7fVxuICAgIGNvbnN0IFByb3BUeXBlcyA9IHtcbiAgICAgICAgYXJyYXk6IHByb3BUeXBlLFxuICAgICAgICBib29sOiBwcm9wVHlwZSxcbiAgICAgICAgZnVuYzogcHJvcFR5cGUsXG4gICAgICAgIG51bWJlcjogcHJvcFR5cGUsXG4gICAgICAgIG9iamVjdDogcHJvcFR5cGUsXG4gICAgICAgIHN0cmluZzogcHJvcFR5cGUsXG4gICAgICAgIGFueTogcHJvcFR5cGUsXG4gICAgICAgIGFycmF5T2Y6IHByb3BUeXBlLFxuICAgICAgICBlbGVtZW50OiBwcm9wVHlwZSxcbiAgICAgICAgaW5zdGFuY2VPZjogcHJvcFR5cGUsXG4gICAgICAgIG5vZGU6IHByb3BUeXBlLFxuICAgICAgICBvYmplY3RPZjogcHJvcFR5cGUsXG4gICAgICAgIG9uZU9mOiBwcm9wVHlwZSxcbiAgICAgICAgb25lT2ZUeXBlOiBwcm9wVHlwZSxcbiAgICAgICAgc2hhcGU6IHByb3BUeXBlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGZpbmRET01Ob2RlKHZkb20pIHtcbiAgICAgICAgcmV0dXJuIHZkb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmVFbGVtZW50KHZkb20sIHByb3BzKSB7XG4gICAgICAgIHZhciB2cHJvcHMgPSBnZXRQcm9wcyh2ZG9tKTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBwcm9wcyl7XG4gICAgICAgICAgICB2cHJvcHNbaV0gPSBwcm9wc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFrZUNvbXBvbmVudChnZXRUYWcodmRvbSksIHZwcm9wcywgZ2V0Q2hpbGRyZW4odmRvbSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgJiYgdHlwZW9mIGVsZW1lbnQgPT0gJ29iamVjdCcgJiYgKGVsZW1lbnRbMC8qdHlwZSovXSA9PSBWVGFnIHx8IGVsZW1lbnRbMC8qdHlwZSovXSA9PSBWQ29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzcyhzcGVjaWZpY2F0aW9uKSB7XG4gICAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSBzcGVjaWZpY2F0aW9uLmdldERlZmF1bHRQcm9wcyA/IHNwZWNpZmljYXRpb24uZ2V0RGVmYXVsdFByb3BzKCkgOiBudWxsO1xuICAgICAgICB2YXIgY29tcG9uZW50UHJvcHMgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzcGVjaWZpY2F0aW9uKSB7XG4gICAgICAgICAgICBpZiAocCAhPSAnZ2V0RGVmYXVsdFByb3BzJyAmJiBwICE9ICdnZXRJbml0aWFsU3RhdGUnICYmIHAgIT0gJ3N0YXRpY3MnXG4gICAgICAgICAgICAgICAgJiYgcCAhPSAnY29tcG9uZW50V2lsbE1vdW50JyAmJiBwICE9ICdjb21wb25lbnREaWRNb3VudCcgJiYgcCAhPSAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcydcbiAgICAgICAgICAgICAgICAmJiBwICE9ICdzaG91bGRDb21wb25lbnRVcGRhdGUnICYmIHAgIT0gJ2NvbXBvbmVudFdpbGxVcGRhdGUnICYmIHAgIT0gJ2NvbXBvbmVudERpZFVwZGF0ZSdcbiAgICAgICAgICAgICAgICAmJiBwICE9ICdjb21wb25lbnRXaWxsVW5tb3VudCcgJiYgcCAhPSAncmVuZGVyJyAmJiBwICE9ICdwcm9wVHlwZXMnICYmIHAgIT0gJ2Rpc3BsYXlOYW1lJykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFByb3BzW3BdID0gc3BlY2lmaWNhdGlvbltwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNwZWNpZmljYXRpb24uZ2V0SW5pdGlhbFN0YXRlKSB7XG4gICAgICAgICAgICBzcGVjaWZpY2F0aW9uLmdldEluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBDb21wKHByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3BlY2lmaWNhdGlvbi5nZXRJbml0aWFsU3RhdGUgPyBzcGVjaWZpY2F0aW9uLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGNvbXBvbmVudFByb3BzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGNvbXBvbmVudFByb3BzW3BdO1xuICAgICAgICAgICAgICAgIHRoaXNbcF0gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbicgPyB2YWwuYmluZCh0aGlzKSA6IHZhbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxDb250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsUGFyZW50Q29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIG1ldGhvZCBpbiBDb21wb25lbnRQcm90bykge1xuICAgICAgICAgICAgQ29tcC5wcm90b3R5cGVbbWV0aG9kXSA9IENvbXBvbmVudFByb3RvW21ldGhvZF07XG4gICAgICAgIH1cbiAgICAgICAgQ29tcC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gc3BlY2lmaWNhdGlvbi5jb21wb25lbnRXaWxsTW91bnQ7XG4gICAgICAgIENvbXAucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gc3BlY2lmaWNhdGlvbi5jb21wb25lbnREaWRNb3VudDtcbiAgICAgICAgQ29tcC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IHNwZWNpZmljYXRpb24uY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcztcbiAgICAgICAgQ29tcC5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gc3BlY2lmaWNhdGlvbi5zaG91bGRDb21wb25lbnRVcGRhdGU7XG4gICAgICAgIENvbXAucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBzcGVjaWZpY2F0aW9uLmNvbXBvbmVudFdpbGxVcGRhdGU7XG4gICAgICAgIENvbXAucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IHNwZWNpZmljYXRpb24uY29tcG9uZW50RGlkVXBkYXRlO1xuICAgICAgICBDb21wLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IHNwZWNpZmljYXRpb24uY29tcG9uZW50V2lsbFVubW91bnQ7XG4gICAgICAgIENvbXAucHJvdG90eXBlLnJlbmRlciA9IHNwZWNpZmljYXRpb24ucmVuZGVyO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcC5wcm90b3R5cGUsICdjb250ZXh0Jywge2dldDogZ2V0Q29udGV4dH0pO1xuICAgICAgICBDb21wLmRpc3BsYXlOYW1lID0gc3BlY2lmaWNhdGlvbi5kaXNwbGF5TmFtZTtcbiAgICAgICAgQ29tcC5wcm9wVHlwZXMgPSBzcGVjaWZpY2F0aW9uLnByb3BUeXBlcztcbiAgICAgICAgQ29tcC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4gICAgICAgIGlmIChzcGVjaWZpY2F0aW9uLnN0YXRpY3MpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc3BlY2lmaWNhdGlvbi5zdGF0aWNzKSB7XG4gICAgICAgICAgICAgICAgQ29tcFtpXSA9IHNwZWNpZmljYXRpb24uc3RhdGljc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bm1vdW50Q29tcG9uZW50QXROb2RlKGNvbnRhaW5lcikge1xuICAgICAgICByZW5kZXIobnVsbCwgY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGYWN0b3J5KHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcHJlYWQoZnJvbSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBhcmcpIHtcbiAgICAgICAgICAgICAgICBmcm9tW3Byb3BdID0gYXJnW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcm9tO1xuICAgIH1cblxuICAgIGNvbnN0IENoaWxkcmVuID0ge1xuICAgICAgICBtYXA6IGZ1bmN0aW9uIChjaGlsZHJlbiwgZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIHJldHVybiBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5tYXAoZm4sIHRoaXNBcmcpO1xuICAgICAgICB9LFxuICAgICAgICBmb3JFYWNoOiBmdW5jdGlvbiAoY2hpbGRyZW4sIGZuLCB0aGlzQXJnKSB7XG4gICAgICAgICAgICByZXR1cm4gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbikuZm9yRWFjaChmbiwgdGhpc0FyZyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvdW50OiBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uIChjaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmRvbSA9IG5vcm0oY2hpbGRyZW4pO1xuICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB2ZG9tWzAvKnR5cGUqL107XG4gICAgICAgICAgICBpZiAodHlwZSA9PSBWQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSA0LyphcnJheUZpcnN0Tm9kZSovO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IHZkb20ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChDaGlsZHJlbi50b0FycmF5KHZkb21baV0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0YWcgPSBnZXRUYWcodmRvbSk7XG4gICAgICAgICAgICB2YXIgY2hpbGRzID0gZ2V0Q2hpbGRyZW4odmRvbSk7XG4gICAgICAgICAgICB2YXIgcHJvcHMgPSBnZXRQcm9wcyh2ZG9tKTtcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRzO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHZkb20uc2xpY2UoKTtcbiAgICAgICAgICAgIG9iai50eXBlID0gdGFnO1xuICAgICAgICAgICAgb2JqLmtleSA9IGdldEtleSh2ZG9tKTtcbiAgICAgICAgICAgIG9iai5yZWYgPSBnZXRSZWYodmRvbSk7XG4gICAgICAgICAgICBvYmoucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIHJldHVybiBbb2JqXTtcbiAgICAgICAgfSxcbiAgICAgICAgb25seTogZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb25seUNoaWxkIG11c3QgYmUgcGFzc2VkIGEgY2hpbGRyZW4gd2l0aCBleGFjdGx5IG9uZSBjaGlsZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKipcbiAgICAgKiBFeHBvcnRcbiAgICAgKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKiovXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgICAgICBmaW5kRE9NTm9kZTogZmluZERPTU5vZGUsXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICByZW5kZXJEdW1teTogcmVuZGVyRHVtbXksXG4gICAgICAgIFByb3BUeXBlczogUHJvcFR5cGVzLFxuICAgICAgICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgICAgICAgaXNWYWxpZEVsZW1lbnQ6IGlzVmFsaWRFbGVtZW50LFxuICAgICAgICBjcmVhdGVDbGFzczogY3JlYXRlQ2xhc3MsXG4gICAgICAgIHVubW91bnRDb21wb25lbnRBdE5vZGU6IHVubW91bnRDb21wb25lbnRBdE5vZGUsXG4gICAgICAgIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnksXG4gICAgICAgIENoaWxkcmVuOiBDaGlsZHJlbixcbiAgICAgICAgVGFnVHlwZTogVlRhZyxcbiAgICAgICAgQ29tcG9uZW50VHlwZTogVkNvbXBvbmVudCxcbiAgICAgICAgQXJyYXlUeXBlOiBWQXJyYXksXG4gICAgICAgIFRleHRUeXBlOiBWVGV4dCxcbiAgICAgICAgX19zcHJlYWQ6IHNwcmVhZFxuICAgIH07XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgd2luZG93Ll9fRlJDID0gVkNvbXBvbmVudDtcbiAgICAgICAgd2luZG93Ll9fRlJUID0gVlRhZztcbiAgICAgICAgd2luZG93Ll9fRlJ0ID0gVlRleHQ7XG4gICAgICAgIHdpbmRvdy5fX0ZSQSA9IFZBcnJheTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZHVtbXkoKXtyZXR1cm4gZHVtbXlOb2RlO31cbiAgICB2YXIgZHVtbXlOb2RlID0ge1xuICAgICAgICBmaXJzdENoaWxkOiBudWxsLFxuICAgICAgICBwYXJlbnROb2RlOiBudWxsLFxuICAgICAgICB0ZXh0Q29udGVudDogJycsXG4gICAgICAgIHNldEF0dHJpYnV0ZTogZHVtbXksXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGR1bW15LFxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBkdW1teSxcbiAgICAgICAgaW5zZXJ0QmVmb3JlOiBkdW1teSxcbiAgICAgICAgcmVtb3ZlQ2hpbGQ6IGR1bW15XG4gICAgfTtcbiAgICBkdW1teU5vZGUuZmlyc3RDaGlsZCA9IGR1bW15Tm9kZTtcbiAgICBkdW1teU5vZGUucGFyZW50Tm9kZSA9IGR1bW15Tm9kZTtcbiAgICB2YXIgZHVtbXlEb2MgPSB7XG4gICAgICAgIGRvY3VtZW50RWxlbWVudDogZHVtbXlOb2RlLFxuICAgICAgICBhcHBlbmRDaGlsZDogZHVtbXksXG4gICAgICAgIGluc2VydEJlZm9yZTogZHVtbXksXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGR1bW15LFxuICAgICAgICBjcmVhdGVFbGVtZW50TlM6IGR1bW15LFxuICAgICAgICBjcmVhdGVUZXh0Tm9kZTogZHVtbXlcbiAgICB9XG59KCk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYXN0LXJlYWN0L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHt1cGxvYWRSb3V0ZX0gZnJvbSBcIi4uL3JvdXRlc1wiO1xuZXhwb3J0IGNsYXNzIEluZGV4IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtwYXJhbXM6IHt9LCByZXNvbHZlZDoge319LCB7fT4ge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8YSBvbkNsaWNrPXsoKT0+dXBsb2FkUm91dGUuZ290byh7fSl9PlVwbG9hZDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXgvaW5kZXgudHN4XG4gKiovIiwiaW1wb3J0IHtSb3V0ZX0gZnJvbSBcIi4vUm91dGVyXCI7XG5leHBvcnQgdmFyIGluZGV4Um91dGUgPSBuZXcgUm91dGU8e30+KCcvJyk7XG5leHBvcnQgdmFyIHVwbG9hZFJvdXRlID0gbmV3IFJvdXRlPHt9PignL3VwbG9hZCcpO1xuZXhwb3J0IHZhciBwb3N0Um91dGUgPSBuZXcgUm91dGU8e2lkOm51bWJlcn0+KCcvcG9zdC86aWQnKTtcbmV4cG9ydCB2YXIgZWRpdG9yUm91dGUgPSBuZXcgUm91dGU8e2lkOm51bWJlcn0+KCcvZWRpdG9yLzppZCcpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcm91dGVzLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgc2Nyb2xsRGF0YTp7W3BhZ2U6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcbnZhciBhY3RpdmVVcmw6c3RyaW5nO1xudmFyIGV4Y2xNYXJrID0gZmFsc2U7XG52YXIgaHRtbDVIaXN0b3J5ID0gZmFsc2U7IC8vdHlwZW9mIGhpc3RvcnkucHVzaFN0YXRlID09ICdmdW5jdGlvbicgPyB0cnVlIDogZmFsc2U7XG52YXIgYWN0aXZlUm91dGVyOlJvdXRlcjtcblxudmFyIHJlc29sdmluZyA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gZ28odXJsOnN0cmluZywgaXNCYWNrID0gZmFsc2UsIHJlcGxhY2VDdXJyZW50ID0gZmFsc2UpIHtcbiAgICBpZiAocmVzb2x2aW5nKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoaHRtbDVIaXN0b3J5KSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHVybCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJyMnKS5wb3AoKTtcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKCdodHRwOicpID09PSAwKSB7XG4gICAgICAgICAgICB1cmwgPSAnLyc7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IChleGNsTWFyayA/ICchJyA6ICcnKSArIHVybDtcbiAgICB9XG4gICAgaWYgKCFpc0JhY2spIHtcbiAgICAgICAgc2Nyb2xsRGF0YVtsb2NhdGlvbi5ocmVmXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVSb3V0ZXIuY2hhbmdlVXJsKGlzQmFjaywgcmVwbGFjZUN1cnJlbnQpO1xufVxuXG5leHBvcnQgbGV0IHN0YWNrOnN0cmluZ1tdID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBnb0JhY2soZGVmYXVsdFVybDpzdHJpbmcpIHtcbiAgICBpZiAocmVzb2x2aW5nKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgc3RhY2sucG9wKCk7XG4gICAgdmFyIHVybCA9IHN0YWNrLnBvcCgpO1xuXG4gICAgaWYgKHVybCkge1xuICAgICAgICByZXR1cm4gZ28odXJsLCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBnbyhkZWZhdWx0VXJsLCB0cnVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyUGFnZTxULCBSPiB7XG4gICAgcm91dGU6Um91dGU8VD47XG4gICAgaGFuZGxlcjogbmV3IChwcm9wczp7cGFyYW1zOiBULCByZXNvbHZlZDogUn0pID0+IFJlYWN0LkNvbXBvbmVudDx7cGFyYW1zOiBULCByZXNvbHZlZDogUn0sIHt9PjtcbiAgICByZXNvbHZlcj86IChwYXJhbXM6VCk9PlByb21pc2U8Uj47XG4gICAgcGFyYW1zPzpUO1xuICAgIHJlc29sdmVkPzpSO1xuICAgIHVybD86c3RyaW5nO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e3BhZ2VzOiBSb3V0ZXJQYWdlPGFueSwgYW55PltdfSwge30+IHtcbiAgICBhY3RpdmVQYWdlOlJvdXRlclBhZ2U8YW55LCBhbnk+O1xuICAgIHJvdXRlcyA9IHRoaXMucHJvcHMucGFnZXM7XG4gICAgZW1wdHlQYWdlOlJvdXRlclBhZ2U8YW55LCBhbnk+O1xuXG4gICAgc2F2ZVNjcm9sbCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6YW55KSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgYWN0aXZlUm91dGVyID0gdGhpcztcbiAgICB9XG5cbiAgICBoaWRlTWVudSgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdqcy1tZW51LW9wZW5lZCcpO1xuICAgIH1cblxuICAgIGNoYW5nZVVybChpc0JhY2sgPSBmYWxzZSwgcmVwbGFjZUN1cnJlbnQgPSBmYWxzZSkge1xuICAgICAgICB2YXIgY3VycmVudFVybCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIGlmIChhY3RpdmVVcmwgPT0gY3VycmVudFVybCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zYXZlU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgIGFjdGl2ZVVybCA9IGN1cnJlbnRVcmw7XG4gICAgICAgIGlmIChyZXBsYWNlQ3VycmVudCkge1xuICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sucHVzaChhY3RpdmVVcmwpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2hhbmdlVXJsXCIsIHN0YWNrKTtcblxuICAgICAgICB0aGlzLmNoYW5nZVJvdXRlKCk7XG5cbiAgICAgICAgLy9kZWJ1Z2dlcjtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlUGFnZS5yZXNvbHZlcil7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuYWN0aXZlUGFnZS5yZXNvbHZlcih0aGlzLmFjdGl2ZVBhZ2UucGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvbWlzZS50aGVuKGRhdGE9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVBhZ2UucmVzb2x2ZWQgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVQYWdlLnVybCA9IGFjdGl2ZVVybDtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgIHJlc29sdmluZyA9IGZhbHNlO1xuICAgICAgICB9LCAoY2FsbGJhY2spPT4ge1xuICAgICAgICAgICAgcmVzb2x2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgY2hhbmdlUm91dGUoKSB7XG4gICAgICAgIHZhciB1cmwgPSAnJztcbiAgICAgICAgaWYgKGh0bWw1SGlzdG9yeSkge1xuICAgICAgICAgICAgdXJsID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1cmwgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgICAgICAgICAgIGlmIChleGNsTWFyayAmJiB1cmxbMF0gPT0gJyEnKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlUGFnZSA9IHRoaXMuZW1wdHlQYWdlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm91dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcm91dGVJdGVtID0gdGhpcy5yb3V0ZXNbaV07XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gcm91dGVJdGVtLnJvdXRlLmNoZWNrKHVybCk7XG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVQYWdlID0gcm91dGVJdGVtO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFnZS5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xuICAgICAgICB0aGlzLmNoYW5nZVJvdXRlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjb21wb25lbnREaWRNb3VudFwiKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoaHRtbDVIaXN0b3J5ID8gJ3BvcHN0YXRlJyA6ICdoYXNoY2hhbmdlJywgKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVVybCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZVNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHNjcm9sbERhdGFbYWN0aXZlVXJsXSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VVcmwoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxEYXRhW2FjdGl2ZVVybF0gfHwgMCk7XG4gICAgICAgIHRoaXMuc2F2ZVNjcm9sbCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJyb3V0ZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLmFjdGl2ZVBhZ2VcbiAgICAgICAgICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5hY3RpdmVQYWdlLmhhbmRsZXIsIHtyZXNvbHZlZDogdGhpcy5hY3RpdmVQYWdlLnJlc29sdmVkLCBwYXJhbXM6IHRoaXMuYWN0aXZlUGFnZS5wYXJhbXN9KVxuICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJvdXRlPFA+IHtcbiAgICByZWdleHA6UmVnRXhwO1xuICAgIG5hbWVzOnN0cmluZ1tdO1xuICAgIHVybDpzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmw6c3RyaW5nKSB7XG4gICAgICAgIHVybCA9ICcvJyArIHVybC5yZXBsYWNlKC8oXlxcLyt8XFwvKyQpL2csICcnKTtcbiAgICAgICAgdXJsID0gdXJsID09PSAnLycgPyB1cmwgOiB1cmwgKyAnLyc7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB2YXIgdjpzdHJpbmdbXTtcbiAgICAgICAgdmFyIHJlZyA9IC86KFteXFwvXSspL2c7XG4gICAgICAgIHZhciBuYW1lczpzdHJpbmdbXSA9IFtdO1xuICAgICAgICB3aGlsZSAodiA9IHJlZy5leGVjKHVybCkpXG4gICAgICAgICAgICBuYW1lcy5wdXNoKHZbMV0pO1xuICAgICAgICB0aGlzLm5hbWVzID0gbmFtZXM7XG4gICAgICAgIHRoaXMucmVnZXhwID0gbmV3IFJlZ0V4cCgnXicgKyB1cmwucmVwbGFjZSgvKDooW15cXC9dKykpL2csICcoW15cXC9dKyknKSArICc/JCcpO1xuICAgIH1cblxuICAgIGNoZWNrKHVybDpzdHJpbmcpIHtcbiAgICAgICAgdmFyIG06c3RyaW5nW107XG4gICAgICAgIGlmIChtID0gdGhpcy5yZWdleHAuZXhlYyh1cmwpKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zOntbaW5kZXg6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5uYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHBhcmFtc1t0aGlzLm5hbWVzW2pdXSA9IG1baiArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0b1VybChwYXJhbXM6UCkge1xuICAgICAgICB2YXIgdXJsID0gdGhpcy51cmw7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJzonICsga2V5ICsgJygvfCQpJyksIChwYXJhbXMgYXMgYW55KVtrZXldICsgJyQxJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBnb3RvKHBhcmFtczpQLCByZXBsYWNlQ3VycmVudCA9IGZhbHNlLCBlPzpNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdvKHRoaXMudG9VcmwocGFyYW1zKSwgbnVsbCwgcmVwbGFjZUN1cnJlbnQpO1xuICAgIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUm91dGVyLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtQb3N0TW9kZWx9IGZyb20gXCIuLy4uL21vZGVscy9wb3N0XCI7XG5pbXBvcnQge0VkaXRvck1vZGVsfSBmcm9tIFwiLi9lZGl0b3ItbW9kZWxcIjtcbmltcG9ydCB7VGh1bWJzfSBmcm9tIFwiLi4vdmlld2VyL3RodW1ic1wiO1xuaW1wb3J0IHtUaW1lbGluZX0gZnJvbSBcIi4uL3ZpZXdlci90aW1lbGluZVwiO1xuaW1wb3J0IHtUaW1lbGluZUNvbm5lY3Rvcn0gZnJvbSBcIi4uL3ZpZXdlci90aW1lbGluZS1jb25uZWN0b3JcIjtcbmltcG9ydCB7QXVkaW9QbGF5ZXJ9IGZyb20gXCIuLi91dGlscy9hdWRpby1wbGF5ZXJcIjtcbmltcG9ydCB7TGluZUFsbG9jYXRvcn0gZnJvbSBcIi4uL3V0aWxzL3RpbWUtYWxsb2NhdGVcIjtcbmltcG9ydCB7RWRpdG9yVGV4dH0gZnJvbSBcIi4vZWRpdG9yLXRleHRcIjtcbmltcG9ydCB7Y29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vYmFja2VuZC9jb25maWdcIjtcbmltcG9ydCBcIi4vc3R5bGVzL2VkaXRvci5jc3NcIjtcbmltcG9ydCB7RWRpdG9yVG9vbGJhcn0gZnJvbSBcIi4vdG9vbGJhci90b29sYmFyXCI7XG5pbXBvcnQge0VkaXRvclRpdGxlfSBmcm9tIFwiLi9lZGl0b3ItdGl0bGVcIjtcbmltcG9ydCB7RWRpdG9yVGFnc30gZnJvbSBcIi4vZWRpdG9yLXRhZ3NcIjtcbmltcG9ydCB7cHJvcH0gZnJvbSBcIi4uLy4uL2F0b20tbmV4dC9wcm9wXCI7XG5pbXBvcnQge2F1dG93YXRjaH0gZnJvbSBcIi4uLy4uL2F0b20tbmV4dC9hdXRvd2F0Y2hcIjtcblxuQGF1dG93YXRjaFxuZXhwb3J0IGNsYXNzIEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7cGFyYW1zOiBhbnksIHJlc29sdmVkOiBFZGl0b3JNb2RlbH0sIHt9PiB7XG4gICAgQHByb3AgbW9kZWwgPSB0aGlzLnByb3BzLnJlc29sdmVkO1xuICAgIEBwcm9wIGF1ZGlvUGxheWVyID0gbmV3IEF1ZGlvUGxheWVyKCk7XG5cblxuICAgIHN0YXRpYyBsb2FkKHBhcmFtczphbnkpIHtcbiAgICAgICAgcmV0dXJuIFBvc3RNb2RlbC5mZXRjaChwYXJhbXMuaWQpLnRoZW4oZGF0YSA9PiBuZXcgRWRpdG9yTW9kZWwoKS5mcm9tUG9zdE1vZGVsKGRhdGEpKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmVkaXRvckhpc3RvcnkgPSB0aGlzLm1vZGVsLmhpc3Rvcnk7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5tb2RlbC5wb3N0TW9kZWwuZGF0YTtcbiAgICAgICAgY29uc3QgZW5BdWRpbyA9IGRhdGEubWVkaWFGaWxlc1tkYXRhLnBvc3QuZW5BdWRpb107XG4gICAgICAgIGNvbnN0IHVybCA9IGNvbmZpZy5iYXNlVXJsICsgJy8nICsgZW5BdWRpby51cmw7XG4gICAgICAgIHRoaXMuYXVkaW9QbGF5ZXIubG9hZFNvdW5kKHVybCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwb3N0TW9kZWwgPSB0aGlzLm1vZGVsLnBvc3RNb2RlbDtcblxuICAgICAgICAvLyBjb25zdCBwb3NpdGlvbnMgPSB0aGlzLm1vZGVsLnBvc3RNb2RlbC5saW5lcy5tYXAobGluZSA9PiAobGluZS5lbi5zdGFydCArIGxpbmUuZW4uZHVyIC8gMikgLyB0aGlzLm1vZGVsLnJlc2l6ZUtvZWYpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSB0aGlzLm1vZGVsLmxpbmVzLm1hcChsaW5lID0+IChsaW5lLmVuLnN0YXJ0ICsgbGluZS5lbi5kdXIgLyAyKSAvIHRoaXMubW9kZWwucmVzaXplS29lZik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvc2l0aW9ucywgcG9zaXRpb25zMik7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyTGluZXMgPSBuZXcgTGluZUFsbG9jYXRvcihwb3NpdGlvbnMsIDUwKS5hbGxvY2F0ZVJlbmRlckxpbmVzKCk7XG5cblxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJlZGl0b3JcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdG9yLW1haW5cIj5cbiAgICAgICAgICAgICAgICA8RWRpdG9yVGl0bGUgbW9kZWw9e3RoaXMubW9kZWx9Lz5cbiAgICAgICAgICAgICAgICA8RWRpdG9yVGFncyBtb2RlbD17dGhpcy5tb2RlbH0vPlxuICAgICAgICAgICAgICAgIDxFZGl0b3JUZXh0IG1vZGVsPXt0aGlzLm1vZGVsfSByZW5kZXJMaW5lcz17cmVuZGVyTGluZXN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuYXVkaW9QbGF5ZXIuc291bmRMb2FkZWQgP1xuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxUaW1lbGluZSByZXNpemVLb2VmPXt0aGlzLm1vZGVsLnJlc2l6ZUtvZWZ9IHBsYXllcj17dGhpcy5hdWRpb1BsYXllcn0vPlxuICAgICAgICAgICAgICAgICAgICA8VGltZWxpbmVDb25uZWN0b3IgbGluZXM9e3RoaXMubW9kZWwubGluZXN9IGxpbmVIPXt0aGlzLm1vZGVsLmxpbmVIfSByZXNpemVLb2VmPXt0aGlzLm1vZGVsLnJlc2l6ZUtvZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXI9e3RoaXMuYXVkaW9QbGF5ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5PXt0aGlzLm1vZGVsLmhpc3Rvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJMaW5lcz17cmVuZGVyTGluZXN9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8VGh1bWJzIHBvc3RNb2RlbD17cG9zdE1vZGVsfSByZXNpemVLb2VmPXt0aGlzLm1vZGVsLnJlc2l6ZUtvZWZ9Lz5cbiAgICAgICAgICAgIDxFZGl0b3JUb29sYmFyIG1vZGVsPXt0aGlzLm1vZGVsfS8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZWRpdG9yL2VkaXRvci50c3hcbiAqKi8iLCJpbXBvcnQge0lHZXRQb3N0fSBmcm9tIFwiLi4vLi4vLi4vaW50ZXJmYWNlcy90cmFuc3BvcnRcIjtcbmltcG9ydCB7TGluZX0gZnJvbSBcIi4vbGluZVwiO1xuaW1wb3J0IHtwcm9wfSBmcm9tIFwiLi4vLi4vYXRvbS1uZXh0L3Byb3BcIjtcbmV4cG9ydCBjbGFzcyBQb3N0TW9kZWwge1xuICAgIEBwcm9wIGxpbmVzOkxpbmVbXTtcbiAgICBAcHJvcCBkYXRhOiBJR2V0UG9zdDtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6SUdldFBvc3QpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5saW5lcyA9IHRoaXMuZ2V0TGluZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExpbmVzKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgY29uc3Qgc2hpZnRFblN1YnMgPSBkYXRhLm1lZGlhRmlsZXNbZGF0YS5wb3N0LmVuU3ViXS5zaGlmdFRpbWUgKiAxMDA7XG4gICAgICAgIGNvbnN0IHNoaWZ0UnVTdWJzID0gZGF0YS5tZWRpYUZpbGVzW2RhdGEucG9zdC5ydVN1Yl0uc2hpZnRUaW1lICogMTAwO1xuICAgICAgICBjb25zdCBzaGlmdEVuQXVkaW8gPSBkYXRhLm1lZGlhRmlsZXNbZGF0YS5wb3N0LmVuQXVkaW9dLnNoaWZ0VGltZSAqIDEwMDtcbiAgICAgICAgY29uc3Qgc2hpZnRSdUF1ZGlvID0gZGF0YS5tZWRpYUZpbGVzW2RhdGEucG9zdC5ydUF1ZGlvXS5zaGlmdFRpbWUgKiAxMDA7XG4gICAgICAgIHJldHVybiBkYXRhLmxpbmVzLmZpbHRlcihsaW5lID0+IEJvb2xlYW4oZGF0YS50ZXh0TGluZXNbbGluZS5lbl0pKS5tYXAobGluZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbiA9IGRhdGEudGV4dExpbmVzW2xpbmUuZW5dO1xuICAgICAgICAgICAgY29uc3QgcnUgPSBkYXRhLnRleHRMaW5lc1tsaW5lLnJ1XTtcbiAgICAgICAgICAgIGlmIChlbikge1xuICAgICAgICAgICAgICAgIGVuLnN0YXJ0IC09IHNoaWZ0RW5BdWRpbyAtIHNoaWZ0RW5TdWJzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJ1ICYmIHNoaWZ0UnVBdWRpbykge1xuICAgICAgICAgICAgICAgIHJ1LnN0YXJ0IC09IHNoaWZ0UnVBdWRpbyAtIHNoaWZ0UnVTdWJzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBlbjogZW4sXG4gICAgICAgICAgICAgICAgcnU6IHJ1LFxuICAgICAgICAgICAgICAgIHNwZWFrZXI6IGxpbmUuc3BlYWtlclxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmV0Y2goaWQ6bnVtYmVyKTpQcm9taXNlPFBvc3RNb2RlbD4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNS92MS9wb3N0LycgKyBpZCkudGhlbihkYXRhID0+IGRhdGEuanNvbigpKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3N0TW9kZWwoZGF0YS5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbW9kZWxzL3Bvc3QudHNcbiAqKi8iLCJleHBvcnQgdmFyIHByb3A6YW55ID0gZnVuY3Rpb24gKHByb3RvOmFueSwgcHJvcDpzdHJpbmcsIGRlc2NyaXB0b3I/OlByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIHZhciBfcHJvcCA9ICgnXycgKyBwcm9wKS5zdWJzdHIoMCk7XG4gICAgY29uc3QgZmllbGROYW1lID0gcHJvdG8uY29uc3RydWN0b3IubmFtZSArICcuJyArIHByb3A7XG5cbiAgICBjb25zdCBnZXRGbiA9IG5ldyBGdW5jdGlvbihgXG4gICAgICAgICAgICB2YXIgYXRvbSA9IHRoaXMuJHtfcHJvcH07XG4gICAgICAgICAgICBpZiAoYXRvbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhdG9tLmdldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXRvbSA9IHRoaXMuJHtfcHJvcH0gPSBuZXcgQXRvbUdsb2IoKS5wcm9wKCcke2ZpZWxkTmFtZX0nLCBudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXRvbS5nZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGApO1xuICAgIGNvbnN0IHNldEZuID0gbmV3IEZ1bmN0aW9uKCd2YWx1ZScsIGBcbiAgICAgICAgICAgIHZhciBhdG9tID0gdGhpcy4ke19wcm9wfTtcbiAgICAgICAgICAgIGlmIChhdG9tKSB7XG4gICAgICAgICAgICAgICAgYXRvbS5zZXQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4ke19wcm9wfSA9IG5ldyBBdG9tR2xvYigpLnByb3AoJyR7ZmllbGROYW1lfScsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGApO1xuICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZ2V0KSB7XG4gICAgICAgIHByb3RvW19wcm9wICsgJ0dldHRlciddID0gZGVzY3JpcHRvci5nZXQ7XG4gICAgICAgIGNvbnN0IGdldHRlckZuID0gbmV3IEZ1bmN0aW9uKGBcbiAgICAgICAgICAgIHZhciBhdG9tID0gdGhpcy4ke19wcm9wfTtcbiAgICAgICAgICAgIGlmIChhdG9tKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF0b20uZ2V0V2l0aENhbGMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0b20gPSB0aGlzLiR7X3Byb3B9ID0gbmV3IEF0b21HbG9iKCkuZ2V0dGVyKCcke2ZpZWxkTmFtZX0nLCB0aGlzLCB0aGlzLiR7X3Byb3B9R2V0dGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXRvbS5nZXRXaXRoQ2FsYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZXQ6IHZvaWQgMCxcbiAgICAgICAgICAgIGdldDogZ2V0dGVyRm5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXQ6IHNldEZuLFxuICAgICAgICBnZXQ6IGdldEZuXG4gICAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXRvbS1uZXh0L3Byb3AudHNcbiAqKi8iLCJpbXBvcnQge0xhbmd9IGZyb20gXCIuLi8uLi8uLi9pbnRlcmZhY2VzL2xhbmdcIjtcbmltcG9ydCB7UG9zdE1vZGVsfSBmcm9tIFwiLi4vbW9kZWxzL3Bvc3RcIjtcbmltcG9ydCB7RWRpdG9ySGlzdG9yeSwgRWRpdG9ySGlzdG9yeURhdGEsIEVkaXRvckhpc3RvcnlTdHJpbmdEYXRhfSBmcm9tIFwiLi4vdXRpbHMvaGlzdG9yeVwiO1xuaW1wb3J0IHtMaW5lfSBmcm9tIFwiLi4vbW9kZWxzL2xpbmVcIjtcbmltcG9ydCB7SVRleHRMaW5lfSBmcm9tIFwiLi4vLi4vLi4vaW50ZXJmYWNlcy90ZXh0LWxpbmVcIjtcbmltcG9ydCB7RWRpdG9yVGV4dE1vZGVsfSBmcm9tIFwiLi9lZGl0b3ItdGV4dC1tb2RlbFwiO1xuaW1wb3J0IHtFZGl0b3JTcGVha2VyTGlzdH0gZnJvbSBcIi4vZWRpdG9yLXNwZWFrZXJsaXN0LW1vZGVsXCI7XG5pbXBvcnQge3Byb3B9IGZyb20gXCIuLi8uLi9hdG9tLW5leHQvcHJvcFwiO1xuXG5jb25zdCBoaXN0b3J5VGl0bGUgPSAndGl0bGUnO1xuY29uc3QgaGlzdG9yeVRhZ3MgPSAndGFncyc7XG5cbmV4cG9ydCBjbGFzcyBFZGl0b3JNb2RlbCB7XG4gICAgQHByb3AgcG9zdE1vZGVsOlBvc3RNb2RlbDtcbiAgICBAcHJvcCBsaW5lczpFZGl0b3JMaW5lW10gPSBbXTtcbiAgICBAcHJvcCBoaXN0b3J5ID0gbmV3IEVkaXRvckhpc3RvcnkoKVxuICAgICAgICAubGlzdGVuKGhpc3RvcnlUaXRsZSwgdGhpcy5oaXN0b3J5U2V0VGl0bGUpXG4gICAgICAgIC5saXN0ZW4oaGlzdG9yeVRhZ3MsIHRoaXMuaGlzdG9yeVNldFRhZ3MpXG5cbiAgICBAcHJvcCByZXNpemVLb2VmID0gNDtcbiAgICBAcHJvcCBsaW5lSCA9IDUwO1xuICAgIEBwcm9wIHRpdGxlID0gJyc7XG4gICAgQHByb3AgdGFncyA9ICcnO1xuICAgIEBwcm9wIHNwZWFrZXJzOkVkaXRvclNwZWFrZXJMaXN0O1xuICAgIEBwcm9wIHRleHRNb2RlbDpFZGl0b3JUZXh0TW9kZWw7XG5cbiAgICBoaXN0b3J5U2V0VGl0bGUgPSAoZGF0YTpFZGl0b3JIaXN0b3J5U3RyaW5nRGF0YSwgaXNSZWRvOmJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy50aXRsZSA9IGlzUmVkbyA/IGRhdGEubmV3VmFsdWUgOiBkYXRhLm9sZFZhbHVlXG4gICAgfVxuXG4gICAgaGlzdG9yeVNldFRhZ3MgPSAoZGF0YTpFZGl0b3JIaXN0b3J5U3RyaW5nRGF0YSwgaXNSZWRvOmJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy50YWdzID0gaXNSZWRvID8gZGF0YS5uZXdWYWx1ZSA6IGRhdGEub2xkVmFsdWVcbiAgICB9XG5cbiAgICBzZXRUaXRsZSh0aXRsZTpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LmFkZChuZXcgRWRpdG9ySGlzdG9yeVN0cmluZ0RhdGEoe1xuICAgICAgICAgICAgdHlwZTogaGlzdG9yeVRpdGxlLFxuICAgICAgICAgICAgbmV3VmFsdWU6IHRpdGxlLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHRoaXMudGl0bGUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIHNldFRhZ3ModGFnczpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LmFkZChuZXcgRWRpdG9ySGlzdG9yeVN0cmluZ0RhdGEoe1xuICAgICAgICAgICAgdHlwZTogaGlzdG9yeVRhZ3MsXG4gICAgICAgICAgICBuZXdWYWx1ZTogdGFncyxcbiAgICAgICAgICAgIG9sZFZhbHVlOiB0aGlzLnRhZ3MsXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy50YWdzID0gdGFncztcbiAgICB9XG5cbiAgICBmcm9tUG9zdE1vZGVsKHBvc3RNb2RlbDpQb3N0TW9kZWwpIHtcbiAgICAgICAgdGhpcy5wb3N0TW9kZWwgPSBwb3N0TW9kZWw7XG4gICAgICAgIHRoaXMubGluZXMgPSB0aGlzLnBvc3RNb2RlbC5saW5lcy5tYXAobGluZSA9PlxuICAgICAgICAgICAgbmV3IEVkaXRvckxpbmUoXG4gICAgICAgICAgICAgICAgbmV3IEVkaXRvclRleHRMaW5lKExhbmcuRU4sIGxpbmUuZW4uc3RhcnQsIGxpbmUuZW4uZHVyLCBsaW5lLmVuID8gbGluZS5lbi50ZXh0LnNwbGl0KC9cXHMrLykubWFwKHcgPT4gbmV3IEVkaXRvcldvcmQodykpIDogW10pLFxuICAgICAgICAgICAgICAgIG5ldyBFZGl0b3JUZXh0TGluZShMYW5nLlJVLCBsaW5lLnJ1LnN0YXJ0LCBsaW5lLnJ1LmR1ciwgbGluZS5ydSA/IGxpbmUucnUudGV4dC5zcGxpdCgvXFxzKy8pLm1hcCh3ID0+IG5ldyBFZGl0b3JXb3JkKHcpKSA6IFtdKVxuICAgICAgICAgICAgKSlcbiAgICAgICAgdGhpcy50ZXh0TW9kZWwgPSBuZXcgRWRpdG9yVGV4dE1vZGVsKHRoaXMpO1xuICAgICAgICB0aGlzLnNwZWFrZXJzID0gbmV3IEVkaXRvclNwZWFrZXJMaXN0KHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRWRpdG9yTGluZSBleHRlbmRzIExpbmUge1xuICAgIEBwcm9wIGVuOkVkaXRvclRleHRMaW5lID0gbnVsbDtcbiAgICBAcHJvcCBydTpFZGl0b3JUZXh0TGluZSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihlbjpFZGl0b3JUZXh0TGluZSA9IG51bGwsIHJ1OkVkaXRvclRleHRMaW5lID0gbnVsbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVuID0gZW4gPyBlbiA6IG5ldyBFZGl0b3JUZXh0TGluZShMYW5nLkVOLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgdGhpcy5ydSA9IHJ1ID8gcnUgOiBuZXcgRWRpdG9yVGV4dExpbmUoTGFuZy5SVSwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgfVxuXG4gICAgZ2V0VGV4dExpbmUobGFuZzpMYW5nKSB7XG4gICAgICAgIHJldHVybiBsYW5nID09IExhbmcuRU4gPyB0aGlzLmVuIDogdGhpcy5ydTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbi5pc0VtcHR5KCkgJiYgdGhpcy5ydS5pc0VtcHR5KCk7XG4gICAgfVxuXG4gICAgc2V0VGV4dExpbmUobGFuZzpMYW5nLCB0ZXh0TGluZTpFZGl0b3JUZXh0TGluZSkge1xuICAgICAgICBpZiAobGFuZyA9PSBMYW5nLkVOKSB7XG4gICAgICAgICAgICB0aGlzLmVuID0gdGV4dExpbmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJ1ID0gdGV4dExpbmU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0b3JUZXh0TGluZSBpbXBsZW1lbnRzIElUZXh0TGluZSB7XG4gICAgQHByb3Agd29yZHM6RWRpdG9yV29yZFtdO1xuICAgIEBwcm9wIGxhbmc6TGFuZztcbiAgICBAcHJvcCBzdGFydDpudW1iZXI7XG4gICAgQHByb3AgZHVyOm51bWJlcjtcblxuICAgIGdldFdvcmQoaTpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud29yZHNbaV07XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0V29yZCgwKS5pc0VtcHR5O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGxhbmc6TGFuZywgc3RhcnQ6bnVtYmVyLCBkdXI6bnVtYmVyLCB3b3JkczpFZGl0b3JXb3JkW10pIHtcbiAgICAgICAgdGhpcy5sYW5nID0gbGFuZztcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgICAgICB0aGlzLmR1ciA9IGR1cjtcbiAgICAgICAgdGhpcy5zZXRXb3Jkcyh3b3Jkcyk7XG4gICAgfVxuXG4gICAgc2V0V29yZHMod29yZHM6RWRpdG9yV29yZFtdKSB7XG4gICAgICAgIGlmICghd29yZHMpIHtcbiAgICAgICAgICAgIHdvcmRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgd29yZHMgPSB3b3Jkcy5maWx0ZXIodyA9PiB3LndvcmQudHJpbSgpICE9ICcnKTtcbiAgICAgICAgaWYgKHdvcmRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB3b3JkcyA9IFtuZXcgRWRpdG9yV29yZChudWxsKV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53b3JkcyA9IHdvcmRzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy53b3Jkcy5tYXAodyA9PiB3LndvcmQpLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBzZXRUZXh0KHRleHQ6c3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFdvcmRzKHRleHQuc3BsaXQoL1xccysvKS5tYXAodyA9PiBuZXcgRWRpdG9yV29yZCh3KSkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVkaXRvcldvcmQge1xuICAgIEBwcm9wIGlzRW1wdHkgPSBmYWxzZTtcbiAgICBAcHJvcCB3b3JkOnN0cmluZztcbiAgICBAcHJvcCBzcGFuOkVsZW1lbnRcblxuICAgIGNvbnN0cnVjdG9yKHdvcmQ6c3RyaW5nLCBzcGFuOkVsZW1lbnQgPSBudWxsKSB7XG4gICAgICAgIHRoaXMud29yZCA9IHdvcmQ7XG4gICAgICAgIHRoaXMuc3BhbiA9IHNwYW47XG4gICAgICAgIGlmICh3b3JkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNFbXB0eSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndvcmQgPSAnXFx1MDBBMCc7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFZGl0b3JTZWxlY3Rpb24ge1xuICAgIEBwcm9wIGxpbmU6RWRpdG9yTGluZTtcbiAgICBAcHJvcCBsaW5lUG9zOm51bWJlcjtcbiAgICBAcHJvcCB0ZXh0TGluZTpFZGl0b3JUZXh0TGluZTtcbiAgICBAcHJvcCBsYW5nOkxhbmc7XG4gICAgQHByb3Agd29yZDpFZGl0b3JXb3JkO1xuICAgIEBwcm9wIHdvcmRQb3M6bnVtYmVyO1xuICAgIEBwcm9wIGxpbmVzOkVkaXRvckxpbmVbXTtcblxuICAgIGNvbnN0cnVjdG9yKGxpbmVzOkVkaXRvckxpbmVbXSkge1xuICAgICAgICB0aGlzLmxpbmVzID0gbGluZXM7XG4gICAgfVxuXG4gICAgc2V0KGxpbmVQb3M6bnVtYmVyLCBsYW5nOkxhbmcsIHdvcmRQb3M6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0TGluZShsaW5lUG9zKTtcbiAgICAgICAgdGhpcy5zZXRMYW5nKGxhbmcpO1xuICAgICAgICB0aGlzLnNldFdvcmQod29yZFBvcyk7XG4gICAgfVxuXG4gICAgc2V0TGluZShsaW5lUG9zOm51bWJlcikge1xuICAgICAgICB0aGlzLmxpbmVQb3MgPSBsaW5lUG9zO1xuICAgICAgICB0aGlzLmxpbmUgPSB0aGlzLmxpbmVzW2xpbmVQb3NdO1xuICAgIH1cblxuICAgIHNldExhbmcobGFuZzpMYW5nKSB7XG4gICAgICAgIHRoaXMubGFuZyA9IGxhbmc7XG4gICAgICAgIHRoaXMudGV4dExpbmUgPSB0aGlzLmxpbmUuZ2V0VGV4dExpbmUobGFuZyk7XG4gICAgfVxuXG4gICAgaW52ZXJ0TGFuZygpIHtcbiAgICAgICAgdGhpcy5zZXRMYW5nKHRoaXMubGFuZyA9PSBMYW5nLkVOID8gTGFuZy5SVSA6IExhbmcuRU4pO1xuICAgIH1cblxuICAgIHNldFdvcmQod29yZFBvczpudW1iZXIpIHtcbiAgICAgICAgdGhpcy53b3JkUG9zID0gd29yZFBvcztcbiAgICAgICAgdGhpcy53b3JkID0gdGhpcy50ZXh0TGluZS5nZXRXb3JkKHdvcmRQb3MpO1xuICAgIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZWRpdG9yL2VkaXRvci1tb2RlbC50c1xuICoqLyIsImV4cG9ydCBlbnVtIExhbmd7XG4gICAgRU4gPSAxMDAsXG4gICAgUlUgPSAyMDBcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9pbnRlcmZhY2VzL2xhbmcudHNcbiAqKi8iLCJleHBvcnQgY2xhc3MgRWRpdG9ySGlzdG9yeURhdGE8VD4ge1xuICAgIHR5cGU6c3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoanNvbjpUKSB7XG4gICAgICAgIGNvbnN0IGFueUpzb246YW55ID0ganNvbjtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIGpzb24pIHtcbiAgICAgICAgICAgICh0aGlzIGFzIGFueSlbaV0gPSBhbnlKc29uW2ldO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEVkaXRvckhpc3RvcnlTdHJpbmdEYXRhIGV4dGVuZHMgRWRpdG9ySGlzdG9yeURhdGE8RWRpdG9ySGlzdG9yeVN0cmluZ0RhdGE+IHtcbiAgICBvbGRWYWx1ZTpzdHJpbmc7XG4gICAgbmV3VmFsdWU6c3RyaW5nO1xufVxuXG50eXBlIENhbGxiYWNrID0gKGRhdGE6RWRpdG9ySGlzdG9yeURhdGE8e30+LCBpc1JlZG86Ym9vbGVhbik9PnZvaWQ7XG5pbnRlcmZhY2UgTGlzdGVuZXIge1xuICAgIGNhbGxiYWNrOkNhbGxiYWNrO1xuICAgIHR5cGU6c3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRWRpdG9ySGlzdG9yeSB7XG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnM6TGlzdGVuZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgaXRlbXM6RWRpdG9ySGlzdG9yeURhdGE8e30+W10gPSBbXTtcbiAgICBwcml2YXRlIHBvcyA9IC0xO1xuXG4gICAgYWRkKGl0ZW06RWRpdG9ySGlzdG9yeURhdGE8e30+KSB7XG4gICAgICAgIHRoaXMucG9zKys7XG4gICAgICAgIHRoaXMuaXRlbXNbdGhpcy5wb3NdID0gaXRlbTtcbiAgICAgICAgdGhpcy5pdGVtcy5sZW5ndGggPSB0aGlzLnBvcyArIDE7XG4gICAgfVxuXG4gICAgbGlzdGVuKHR5cGU6c3RyaW5nLCBjYWxsYmFjazpDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKHt0eXBlOiB0eXBlLCBjYWxsYmFja30pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGxMaXN0ZW5lcnMoZGF0YTpFZGl0b3JIaXN0b3J5RGF0YTx7fT4sIGlzUmVkbzpib29sZWFuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbaV07XG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVyLnR5cGUgfHwgbGlzdGVuZXIudHlwZSA9PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjayhkYXRhLCBpc1JlZG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5kbygpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW3RoaXMucG9zXTtcbiAgICAgICAgICAgIHRoaXMuY2FsbExpc3RlbmVycyhpdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnBvcy0tO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmVkbygpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zIDwgdGhpcy5pdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBvcysrO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbdGhpcy5wb3NdO1xuICAgICAgICAgICAgdGhpcy5jYWxsTGlzdGVuZXJzKGl0ZW0sIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvaGlzdG9yeS50c1xuICoqLyIsImltcG9ydCB7SVRleHRMaW5lfSBmcm9tIFwiLi4vLi4vLi4vaW50ZXJmYWNlcy90ZXh0LWxpbmVcIjtcbmltcG9ydCB7cHJvcH0gZnJvbSBcIi4uLy4uL2F0b20tbmV4dC9wcm9wXCI7XG5leHBvcnQgY2xhc3MgTGluZSB7XG4gICAgQHByb3AgZW46IElUZXh0TGluZTtcbiAgICBAcHJvcCBydTogSVRleHRMaW5lO1xuICAgIEBwcm9wIHNwZWFrZXI6IHN0cmluZztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21vZGVscy9saW5lLnRzXG4gKiovIiwiaW1wb3J0IHtMYW5nfSBmcm9tIFwiLi4vLi4vLi4vaW50ZXJmYWNlcy9sYW5nXCI7XG5pbXBvcnQge0VkaXRvckhpc3RvcnlEYXRhLCBFZGl0b3JIaXN0b3J5LCBFZGl0b3JIaXN0b3J5U3RyaW5nRGF0YX0gZnJvbSBcIi4uL3V0aWxzL2hpc3RvcnlcIjtcbmltcG9ydCB7RWRpdG9yU2VsZWN0aW9uLCBFZGl0b3JMaW5lLCBFZGl0b3JUZXh0TGluZSwgRWRpdG9yV29yZCwgRWRpdG9yTW9kZWx9IGZyb20gXCIuL2VkaXRvci1tb2RlbFwiO1xuaW1wb3J0IHtwcm9wfSBmcm9tIFwiLi4vLi4vYXRvbS1uZXh0L3Byb3BcIjtcblxuY29uc3QgaGlzdG9yeVNwbGl0ID0gJ3NwbGl0JztcbmNvbnN0IGhpc3RvcnlTcGxpdE1vdmUgPSAnc3BsaXQtbW92ZSc7XG5jb25zdCBoaXN0b3J5Sm9pbiA9ICdqb2luJztcbmNvbnN0IGhpc3RvcnlKb2luTW92ZSA9ICdqb2luLW1vdmUnO1xuXG5jb25zdCBoaXN0b3J5U3BlYWtlciA9ICdzcGVha2VyJztcbmNvbnN0IGhpc3RvcnlUZXh0TGluZSA9ICd0ZXh0LWxpbmUnO1xuXG5jbGFzcyBIaXN0b3J5VGV4dCBleHRlbmRzIEVkaXRvckhpc3RvcnlEYXRhPEhpc3RvcnlUZXh0PiB7XG4gICAgbGluZVBvczpudW1iZXI7XG4gICAgbGFuZzpMYW5nO1xuICAgIHdvcmRQb3M6bnVtYmVyO1xufVxuXG5jbGFzcyBIaXN0b3J5VGV4dFNwZWFrZXIgZXh0ZW5kcyBFZGl0b3JIaXN0b3J5RGF0YTxIaXN0b3J5VGV4dFNwZWFrZXI+IHtcbiAgICB0eXBlID0gaGlzdG9yeVNwZWFrZXI7XG4gICAgb2xkVmFsdWU6c3RyaW5nO1xuICAgIG5ld1ZhbHVlOnN0cmluZztcbiAgICBsaW5lUG9zOm51bWJlcjtcbn1cblxuY2xhc3MgSGlzdG9yeVRleHRXb3JkcyBleHRlbmRzIEVkaXRvckhpc3RvcnlEYXRhPEhpc3RvcnlUZXh0V29yZHM+IHtcbiAgICB0eXBlID0gaGlzdG9yeVRleHRMaW5lO1xuICAgIGxpbmVQb3M6bnVtYmVyO1xuICAgIGxhbmc6TGFuZztcbiAgICBvbGRWYWx1ZTpzdHJpbmc7XG4gICAgbmV3VmFsdWU6c3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRWRpdG9yVGV4dE1vZGVsIHtcbiAgICBAcHJvcCBlZGl0b3JNb2RlbDpFZGl0b3JNb2RlbFxuICAgIEBwcm9wIGxpbmVzOkVkaXRvckxpbmVbXTtcbiAgICBAcHJvcCBzZWxlY3Rpb246RWRpdG9yU2VsZWN0aW9uO1xuICAgIEBwcm9wIGhpc3Rvcnk6RWRpdG9ySGlzdG9yeTtcblxuICAgIGNvbnN0cnVjdG9yKGVkaXRvck1vZGVsOkVkaXRvck1vZGVsKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yTW9kZWwgPSBlZGl0b3JNb2RlbDtcbiAgICAgICAgdGhpcy5saW5lcyA9IGVkaXRvck1vZGVsLmxpbmVzO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG5ldyBFZGl0b3JTZWxlY3Rpb24odGhpcy5lZGl0b3JNb2RlbC5saW5lcyk7XG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IHRoaXMuZWRpdG9yTW9kZWwuaGlzdG9yeVxuICAgICAgICAgICAgLmxpc3RlbihoaXN0b3J5U3BlYWtlciwgdGhpcy5oaXN0b3J5U2V0U3BlYWtlcilcbiAgICAgICAgICAgIC5saXN0ZW4oaGlzdG9yeVRleHRMaW5lLCB0aGlzLmhpc3RvcnlTZXRUZXh0TGluZSlcblxuICAgICAgICAgICAgLmxpc3RlbihoaXN0b3J5U3BsaXQsIHRoaXMuaGlzdG9yeVNwbGl0KVxuICAgICAgICAgICAgLmxpc3RlbihoaXN0b3J5U3BsaXRNb3ZlLCB0aGlzLmhpc3RvcnlTcGxpdE1vdmUpXG4gICAgICAgICAgICAubGlzdGVuKGhpc3RvcnlKb2luLCB0aGlzLmhpc3RvcnlKb2luKVxuICAgICAgICAgICAgLmxpc3RlbihoaXN0b3J5Sm9pbk1vdmUsIHRoaXMuaGlzdG9yeUpvaW5Nb3ZlKVxuICAgIH1cblxuICAgIGhpc3RvcnlTZXRUZXh0TGluZSA9IChkYXRhOkhpc3RvcnlUZXh0V29yZHMsIGlzUmVkbzpib29sZWFuKSA9PiB7XG4gICAgICAgIHRoaXMubGluZXNbZGF0YS5saW5lUG9zXS5nZXRUZXh0TGluZShkYXRhLmxhbmcpLnNldFRleHQoaXNSZWRvID8gZGF0YS5uZXdWYWx1ZSA6IGRhdGEub2xkVmFsdWUpO1xuICAgIH1cblxuICAgIGhpc3RvcnlTZXRTcGVha2VyID0gKGRhdGE6SGlzdG9yeVRleHRTcGVha2VyLCBpc1JlZG86Ym9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmxpbmVzW2RhdGEubGluZVBvc10uc3BlYWtlciA9IGlzUmVkbyA/IGRhdGEubmV3VmFsdWUgOiBkYXRhLm9sZFZhbHVlO1xuICAgIH1cblxuICAgIGhpc3RvcnlKb2luID0gKGRhdGE6SGlzdG9yeVRleHQsIGlzUmVkbzpib29sZWFuKSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLnNldChkYXRhLmxpbmVQb3MsIGRhdGEubGFuZywgZGF0YS53b3JkUG9zKTtcbiAgICAgICAgdGhpcy5zcGxpdEludG9OZXdMaW5lKCk7XG4gICAgICAgIC8vdG9kbzogcmVkb1xuICAgIH1cblxuICAgIGhpc3RvcnlKb2luTW92ZSA9IChkYXRhOkhpc3RvcnlUZXh0LCBpc1JlZG86Ym9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbi5zZXQoZGF0YS5saW5lUG9zLCBkYXRhLmxhbmcsIGRhdGEud29yZFBvcyk7XG4gICAgICAgIHRoaXMuc3BsaXRXaXRoTW92ZSgpO1xuICAgICAgICAvL3RvZG86IHJlZG9cbiAgICB9XG5cbiAgICBoaXN0b3J5U3BsaXQgPSAoZGF0YTpIaXN0b3J5VGV4dCwgaXNSZWRvOmJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uc2V0KGRhdGEubGluZVBvcywgZGF0YS5sYW5nLCBkYXRhLndvcmRQb3MpO1xuICAgICAgICB0aGlzLmpvaW5MaW5lKCk7XG4gICAgICAgIC8vdG9kbzogcmVkb1xuICAgIH1cblxuICAgIGhpc3RvcnlTcGxpdE1vdmUgPSAoZGF0YTpIaXN0b3J5VGV4dCwgaXNSZWRvOmJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uc2V0KGRhdGEubGluZVBvcywgZGF0YS5sYW5nLCBkYXRhLndvcmRQb3MpO1xuICAgICAgICB0aGlzLmpvaW5MaW5lV2l0aE1vdmUoKTtcbiAgICAgICAgLy90b2RvOiByZWRvXG4gICAgfVxuXG4gICAgZmluZENsb3Nlc3ROZXh0V29yZChjdXJyV29yZDpFZGl0b3JXb3JkLCBuZXh0VGV4dExpbmU6RWRpdG9yVGV4dExpbmUpIHtcbiAgICAgICAgdmFyIGN1cnJSZWN0ID0gY3VycldvcmQuc3Bhbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGN1cnJQb3MgPSBjdXJyUmVjdC5sZWZ0ICsgY3VyclJlY3Qud2lkdGggLyAyO1xuICAgICAgICByZXR1cm4gbmV4dFRleHRMaW5lLndvcmRzLm1hcCgodywgaSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlY3QgPSB3LnNwYW4uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgcG9zID0gcmVjdC5sZWZ0ICsgcmVjdC53aWR0aCAvIDI7XG4gICAgICAgICAgICByZXR1cm4ge3dvcmQ6IHcsIHBvczogaSwgZGlmZjogTWF0aC5hYnMoY3VyclBvcyAtIHBvcyl9O1xuICAgICAgICB9KS5zb3J0KChhLCBiKSA9PiBhLmRpZmYgPCBiLmRpZmYgPyAtMSA6IDEpLnNoaWZ0KCkucG9zO1xuICAgIH1cblxuICAgIHNwbGl0V2l0aE1vdmUoKSB7XG4gICAgICAgIHZhciBzZWwgPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgICAgY29uc3QgY3VycmVudFRleHRMaW5lID0gc2VsLnRleHRMaW5lO1xuICAgICAgICBjb25zdCBoYWxmRHVyID0gY3VycmVudFRleHRMaW5lLmR1ciAvIDI7XG4gICAgICAgIHZhciBvcmlnV29yZHMgPSBjdXJyZW50VGV4dExpbmUud29yZHMuc2xpY2UoKTtcbiAgICAgICAgY29uc3Qgb2xkRHVyID0gY3VycmVudFRleHRMaW5lLmR1cjtcblxuICAgICAgICB2YXIgbGFzdExpbmUgPSB0aGlzLmxpbmVzW3RoaXMubGluZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICghbGFzdExpbmUuZ2V0VGV4dExpbmUoc2VsLmxhbmcpLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lcy5wdXNoKG5ldyBFZGl0b3JMaW5lKCkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmxpbmVzLmxlbmd0aCAtIDE7IGkgPiBzZWwubGluZVBvczsgaS0tKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVzW2ldLnNldFRleHRMaW5lKHNlbC5sYW5nLCB0aGlzLmxpbmVzW2kgLSAxXS5nZXRUZXh0TGluZShzZWwubGFuZykpO1xuICAgICAgICB9XG4gICAgICAgIHNlbC5saW5lLnNldFRleHRMaW5lKHNlbC5sYW5nLCBuZXcgRWRpdG9yVGV4dExpbmUoc2VsLmxhbmcsIGN1cnJlbnRUZXh0TGluZS5zdGFydCwgaGFsZkR1ciwgb3JpZ1dvcmRzLnNsaWNlKDAsIHNlbC53b3JkUG9zKSkpO1xuXG4gICAgICAgIGNvbnN0IHByZXZUZXh0TGluZSA9IHNlbC50ZXh0TGluZTtcbiAgICAgICAgLy9jdXJyZW50VGV4dExpbmUuc3RhcnQgKz0gY3VycmVudFRleHRMaW5lLmR1cjtcblxuICAgICAgICB2YXIgbmV4dExpbmVQb3MgPSBzZWwubGluZVBvcyArIDE7XG4gICAgICAgIHZhciBuZXdMaW5lID0gdGhpcy5saW5lc1tuZXh0TGluZVBvc107XG4gICAgICAgIHZhciBzZWxUZXh0TGluZSA9IG5ld0xpbmUuZ2V0VGV4dExpbmUoc2VsLmxhbmcpO1xuICAgICAgICBzZWxUZXh0TGluZS5zZXRXb3JkcyhvcmlnV29yZHMuc2xpY2Uoc2VsLndvcmRQb3MpKTtcbiAgICAgICAgc2VsVGV4dExpbmUuc3RhcnQgPSBjdXJyZW50VGV4dExpbmUuc3RhcnQgKyBoYWxmRHVyO1xuICAgICAgICBzZWxUZXh0TGluZS5kdXIgPSBoYWxmRHVyO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLnNldChuZXh0TGluZVBvcywgc2VsLmxhbmcsIDApO1xuXG5cbiAgICAgICAgLyogcmV0dXJuIG5ldyBFZGl0b3JIaXN0b3J5VGltZWxpbmUoe1xuICAgICAgICAgdHlwZTogRWRpdG9ySGlzdG9yeVRpbWVsaW5lLnR5cGUsXG4gICAgICAgICBsaW5lTjogbmV4dExpbmVQb3MgLSAxLFxuICAgICAgICAgbGFuZzogc2VsLmxhbmcsXG4gICAgICAgICBvbGRTdGFydDogcHJldlRleHRMaW5lLnN0YXJ0LFxuICAgICAgICAgb2xkRHVyOiBvbGREdXIsXG4gICAgICAgICBuZXdTdGFydDogcHJldlRleHRMaW5lLnN0YXJ0LFxuICAgICAgICAgbmV3RHVyOiBwcmV2VGV4dExpbmUuZHVyXG4gICAgICAgICB9KTsqL1xuXG4gICAgICAgIC8qbmV3IEVkaXRvckhpc3RvcnlUaW1lbGluZSh7XG4gICAgICAgICB0eXBlOiBFZGl0b3JIaXN0b3J5VGltZWxpbmUudHlwZSxcbiAgICAgICAgIGxpbmVOOiBuZXh0TGluZVBvcyxcbiAgICAgICAgIGxhbmc6IHNlbC5sYW5nLFxuICAgICAgICAgb2xkU3RhcnQ6IDAsXG4gICAgICAgICBvbGREdXI6IDAsXG4gICAgICAgICBuZXdTdGFydDogc2VsVGV4dExpbmUuc3RhcnQsXG4gICAgICAgICBuZXdEdXI6IHNlbFRleHRMaW5lLmR1clxuICAgICAgICAgfSk7Ki9cblxuICAgICAgICByZXR1cm4gbmV3IEhpc3RvcnlUZXh0KHtcbiAgICAgICAgICAgIHR5cGU6IGhpc3RvcnlTcGxpdE1vdmUsXG4gICAgICAgICAgICBsYW5nOiBzZWwubGFuZyxcbiAgICAgICAgICAgIGxpbmVQb3M6IG5leHRMaW5lUG9zLFxuICAgICAgICAgICAgd29yZFBvczogMFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzcGxpdEludG9OZXdMaW5lKCkge1xuICAgICAgICB2YXIgc2VsID0gdGhpcy5zZWxlY3Rpb247XG4gICAgICAgIHZhciBvcmlnV29yZHMgPSBzZWwudGV4dExpbmUud29yZHMuc2xpY2UoKTtcbiAgICAgICAgY29uc3QgY3VycmVudFRleHRMaW5lID0gc2VsLnRleHRMaW5lO1xuXG4gICAgICAgIGN1cnJlbnRUZXh0TGluZS5zZXRXb3JkcyhvcmlnV29yZHMuc2xpY2UoMCwgc2VsLndvcmRQb3MpKTtcbiAgICAgICAgdmFyIG5leHRMaW5lUG9zID0gc2VsLmxpbmVQb3MgKyAxO1xuICAgICAgICB2YXIgbmV4dExpbmUgPSB0aGlzLmxpbmVzW25leHRMaW5lUG9zXTtcbiAgICAgICAgaWYgKCFuZXh0TGluZS5nZXRUZXh0TGluZShzZWwubGFuZykuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICBuZXh0TGluZSA9IG5ldyBFZGl0b3JMaW5lKCk7XG4gICAgICAgICAgICB0aGlzLmxpbmVzLnNwbGljZShuZXh0TGluZVBvcywgMCwgbmV4dExpbmUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRUZXh0TGluZSA9IG5leHRMaW5lLmdldFRleHRMaW5lKHNlbC5sYW5nKTtcbiAgICAgICAgbmV4dFRleHRMaW5lLnNldFdvcmRzKG9yaWdXb3Jkcy5zbGljZShzZWwud29yZFBvcykpO1xuICAgICAgICBuZXh0VGV4dExpbmUuc3RhcnQgPSBjdXJyZW50VGV4dExpbmUuc3RhcnQgKyBjdXJyZW50VGV4dExpbmUuZHVyIC8gMjtcbiAgICAgICAgY3VycmVudFRleHRMaW5lLmR1ciAvPSAyO1xuICAgICAgICBuZXh0VGV4dExpbmUuZHVyID0gY3VycmVudFRleHRMaW5lLmR1cjtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uc2V0KG5leHRMaW5lUG9zLCBzZWwubGFuZywgMCk7XG4gICAgICAgIHJldHVybiBuZXcgSGlzdG9yeVRleHQoe1xuICAgICAgICAgICAgdHlwZTogaGlzdG9yeVNwbGl0LFxuICAgICAgICAgICAgbGFuZzogc2VsLmxhbmcsXG4gICAgICAgICAgICBsaW5lUG9zOiBuZXh0TGluZVBvcyxcbiAgICAgICAgICAgIHdvcmRQb3M6IDBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgam9pbkxpbmUoKSB7XG4gICAgICAgIHZhciBzZWwgPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgICAgY29uc3QgY3VycmVudFRleHRMaW5lID0gc2VsLnRleHRMaW5lO1xuICAgICAgICB2YXIgb3JpZ1dvcmRzID0gY3VycmVudFRleHRMaW5lLndvcmRzLnNsaWNlKCk7XG5cbiAgICAgICAgaWYgKHNlbC5saW5lUG9zIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZMaW5lUG9zID0gc2VsLmxpbmVQb3MgLSAxO1xuICAgICAgICB2YXIgcHJldkxpbmUgPSB0aGlzLmxpbmVzW3ByZXZMaW5lUG9zXTtcbiAgICAgICAgdmFyIHByZXZUZXh0TGluZSA9IHByZXZMaW5lLmdldFRleHRMaW5lKHNlbC5sYW5nKTtcbiAgICAgICAgdmFyIHByZXZXb3JkcyA9IHByZXZUZXh0TGluZS53b3JkcztcbiAgICAgICAgdmFyIG5ld1dvcmRzID0gWy4uLnByZXZXb3JkcywgLi4ub3JpZ1dvcmRzXTtcbiAgICAgICAgdmFyIHRleHRMaW5lID0gbmV3IEVkaXRvclRleHRMaW5lKHNlbC5sYW5nLCBwcmV2VGV4dExpbmUuc3RhcnQsIGN1cnJlbnRUZXh0TGluZS5zdGFydCAtIHByZXZUZXh0TGluZS5zdGFydCArIGN1cnJlbnRUZXh0TGluZS5kdXIsIG5ld1dvcmRzKTtcbiAgICAgICAgcHJldkxpbmUuc2V0VGV4dExpbmUoc2VsLmxhbmcsIHRleHRMaW5lKTtcbiAgICAgICAgc2VsLnRleHRMaW5lLnNldFdvcmRzKG51bGwpO1xuICAgICAgICBpZiAoc2VsLmxpbmUuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVzLnNwbGljZShzZWwubGluZVBvcywgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1dvcmRQb3MgPSBwcmV2V29yZHMubGVuZ3RoIC0gKHByZXZXb3Jkc1swXS5pc0VtcHR5ID8gMSA6IDApO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbi5zZXQocHJldkxpbmVQb3MsIHNlbC5sYW5nLCBuZXdXb3JkUG9zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBIaXN0b3J5VGV4dCh7XG4gICAgICAgICAgICB0eXBlOiBoaXN0b3J5Sm9pbixcbiAgICAgICAgICAgIGxhbmc6IHNlbC5sYW5nLFxuICAgICAgICAgICAgbGluZVBvczogcHJldkxpbmVQb3MsXG4gICAgICAgICAgICB3b3JkUG9zOiBuZXdXb3JkUG9zXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGpvaW5MaW5lV2l0aE1vdmUoKSB7XG4gICAgICAgIHZhciBsYW5nID0gdGhpcy5zZWxlY3Rpb24ubGFuZztcbiAgICAgICAgdmFyIGxpbmVQb3MgPSB0aGlzLnNlbGVjdGlvbi5saW5lUG9zO1xuXG4gICAgICAgIHZhciB1bmRvID0gdGhpcy5qb2luTGluZSgpO1xuICAgICAgICBpZiAodW5kbykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGxpbmVQb3MgKyAxOyBpIDwgdGhpcy5saW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubGluZXNbaSAtIDFdLnNldFRleHRMaW5lKGxhbmcsIHRoaXMubGluZXNbaV0uZ2V0VGV4dExpbmUobGFuZykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxhc3RMaW5lID0gdGhpcy5saW5lc1t0aGlzLmxpbmVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgbGFzdExpbmUuc2V0VGV4dExpbmUobGFuZywgbmV3IEVkaXRvclRleHRMaW5lKGxhbmcsIG51bGwsIG51bGwsIG51bGwpKTtcbiAgICAgICAgICAgIGlmIChsYXN0TGluZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5kby50eXBlID0gaGlzdG9yeUpvaW5Nb3ZlO1xuICAgICAgICAgICAgcmV0dXJuIHVuZG87XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmxhbmcgPT0gTGFuZy5FTikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmxpbmVQb3MgPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnNldExpbmUodGhpcy5zZWxlY3Rpb24ubGluZVBvcyAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLmludmVydExhbmcoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uc2V0V29yZCh0aGlzLmZpbmRDbG9zZXN0TmV4dFdvcmQodGhpcy5zZWxlY3Rpb24ud29yZCwgdGhpcy5zZWxlY3Rpb24udGV4dExpbmUpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmxhbmcgPT0gTGFuZy5SVSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmxpbmVQb3MgPj0gdGhpcy5saW5lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24uc2V0TGluZSh0aGlzLnNlbGVjdGlvbi5saW5lUG9zICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uaW52ZXJ0TGFuZygpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbi5zZXRXb3JkKHRoaXMuZmluZENsb3Nlc3ROZXh0V29yZCh0aGlzLnNlbGVjdGlvbi53b3JkLCB0aGlzLnNlbGVjdGlvbi50ZXh0TGluZSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi53b3JkUG9zIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdGlvbi5zZXRXb3JkKHRoaXMuc2VsZWN0aW9uLndvcmRQb3MgLSAxKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24ud29yZFBvcyA+PSB0aGlzLnNlbGVjdGlvbi50ZXh0TGluZS53b3Jkcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3Rpb24uc2V0V29yZCh0aGlzLnNlbGVjdGlvbi53b3JkUG9zICsgMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBzZXRTcGVha2VyKHBvczpudW1iZXIsIHNwZWFrZXI6c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5hZGQobmV3IEhpc3RvcnlUZXh0U3BlYWtlcih7XG4gICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgbGluZVBvczogcG9zLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHRoaXMubGluZXNbcG9zXS5zcGVha2VyLFxuICAgICAgICAgICAgbmV3VmFsdWU6IHNwZWFrZXIsXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5saW5lc1twb3NdLnNwZWFrZXIgPSBzcGVha2VyO1xuICAgIH1cblxuICAgIHNldFdvcmRzKHBvczpudW1iZXIsIGxhbmc6TGFuZywgdGV4dDpzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdGV4dExpbmUgPSB0aGlzLmxpbmVzW3Bvc10uZ2V0VGV4dExpbmUobGFuZyk7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5hZGQobmV3IEhpc3RvcnlUZXh0V29yZHMoe1xuICAgICAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgICAgIGxpbmVQb3M6IHBvcyxcbiAgICAgICAgICAgIGxhbmc6IGxhbmcsXG4gICAgICAgICAgICBvbGRWYWx1ZTogdGV4dExpbmUuZ2V0VGV4dCgpLFxuICAgICAgICAgICAgbmV3VmFsdWU6IHRleHQsXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGV4dExpbmUuc2V0VGV4dCh0ZXh0KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lZGl0b3IvZWRpdG9yLXRleHQtbW9kZWwudHNcbiAqKi8iLCJpbXBvcnQge0VkaXRvckhpc3RvcnlEYXRhfSBmcm9tIFwiLi4vdXRpbHMvaGlzdG9yeVwiO1xuaW1wb3J0IHtFZGl0b3JNb2RlbH0gZnJvbSBcIi4vZWRpdG9yLW1vZGVsXCI7XG5pbXBvcnQge3Byb3B9IGZyb20gXCIuLi8uLi9hdG9tLW5leHQvcHJvcFwiO1xuaW1wb3J0IHtCYXNlQXJyYXl9IGZyb20gXCIuLi8uLi9hdG9tLW5leHQvYmFzZS1hcnJheVwiO1xuXG5lbnVtIFNwZWFrZXJzTGlzdEhpc3RvcnlUeXBle1xuICAgIEFERCA9IDEsXG4gICAgQ0hBTkdFID0gMixcbiAgICBSRU1PVkUgPSAzXG59XG5cbmNvbnN0IGhpc3RvcnlTcGVha2VyTGlzdCA9ICdzcGVha2VyLWxpc3QnXG5cbmNsYXNzIEhpc3RvcnlTcGVha2Vyc0xpc3QgZXh0ZW5kcyBFZGl0b3JIaXN0b3J5RGF0YTxIaXN0b3J5U3BlYWtlcnNMaXN0PiB7XG4gICAgdHlwZSA9IGhpc3RvcnlTcGVha2VyTGlzdDtcbiAgICBzdWJ0eXBlOlNwZWFrZXJzTGlzdEhpc3RvcnlUeXBlO1xuICAgIG9sZFZhbDpzdHJpbmc7XG4gICAgcG9zOm51bWJlcjtcbiAgICBzcGVha2VyOnN0cmluZztcbiAgICBhZmZlY3RMaW5lczpudW1iZXJbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEVkaXRvclNwZWFrZXJMaXN0IHtcbiAgICBAcHJvcCBsaXN0ID0gbmV3IEJhc2VBcnJheTxzdHJpbmc+KFtdKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2RlbDpFZGl0b3JNb2RlbCkge1xuICAgICAgICB0aGlzLm1vZGVsLmhpc3RvcnkubGlzdGVuKGhpc3RvcnlTcGVha2VyTGlzdCwgdGhpcy5vbkhpc3RvcnkpXG4gICAgfVxuXG4gICAgb25IaXN0b3J5ID0gKGRhdGE6SGlzdG9yeVNwZWFrZXJzTGlzdCwgaXNSZWRvOmJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGRhdGEuc3VidHlwZSA9PSBTcGVha2Vyc0xpc3RIaXN0b3J5VHlwZS5BREQpIHtcbiAgICAgICAgICAgIGlmIChpc1JlZG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChkYXRhLnNwZWFrZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEuc3VidHlwZSA9PSBTcGVha2Vyc0xpc3RIaXN0b3J5VHlwZS5DSEFOR0UpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdC5zZXQoZGF0YS5wb3MsIGlzUmVkbyA/IGRhdGEuc3BlYWtlciA6IGRhdGEub2xkVmFsKTtcbiAgICAgICAgICAgIGlmIChpc1JlZG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmFtZUxpbmVTcGVha2VycyhkYXRhLm9sZFZhbCwgZGF0YS5zcGVha2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuYW1lTGluZVNwZWFrZXJzKGRhdGEuc3BlYWtlciwgZGF0YS5vbGRWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRhdGEuc3VidHlwZSA9PSBTcGVha2Vyc0xpc3RIaXN0b3J5VHlwZS5SRU1PVkUpIHtcbiAgICAgICAgICAgIGlmIChpc1JlZG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGRhdGEucG9zLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpbmVTcGVha2VycyhkYXRhLm9sZFZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGRhdGEucG9zLCAwLCBkYXRhLm9sZFZhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlTGluZVNwZWFrZXJzKGRhdGEuYWZmZWN0TGluZXMsIGRhdGEub2xkVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZShwb3M6bnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbCA9IHRoaXMubGlzdC5nZXQocG9zKTtcbiAgICAgICAgdGhpcy5tb2RlbC5oaXN0b3J5LmFkZChuZXcgSGlzdG9yeVNwZWFrZXJzTGlzdCh7XG4gICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgc3VidHlwZTogU3BlYWtlcnNMaXN0SGlzdG9yeVR5cGUuUkVNT1ZFLFxuICAgICAgICAgICAgb2xkVmFsOiB0aGlzLmxpc3QuZ2V0KHBvcyksXG4gICAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICAgIHNwZWFrZXI6IG51bGwsXG4gICAgICAgICAgICBhZmZlY3RMaW5lczogdGhpcy5yZW1vdmVMaW5lU3BlYWtlcnMob2xkVmFsKVxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMubGlzdC5zcGxpY2UocG9zLCAxKTtcbiAgICB9XG5cbiAgICBzYXZlKHBvczpudW1iZXIsIHNwZWFrZXI6c3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbCA9IHRoaXMubGlzdC5nZXQocG9zKTtcbiAgICAgICAgY29uc3QgaXNBZGQgPSBwb3MgPT0gdGhpcy5saXN0Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5tb2RlbC5oaXN0b3J5LmFkZChuZXcgSGlzdG9yeVNwZWFrZXJzTGlzdCh7XG4gICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgc3VidHlwZTogaXNBZGQgPyBTcGVha2Vyc0xpc3RIaXN0b3J5VHlwZS5BREQgOiBTcGVha2Vyc0xpc3RIaXN0b3J5VHlwZS5DSEFOR0UsXG4gICAgICAgICAgICBvbGRWYWw6IG9sZFZhbCxcbiAgICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgICAgc3BlYWtlcjogc3BlYWtlcixcbiAgICAgICAgICAgIGFmZmVjdExpbmVzOiBudWxsLFxuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChpc0FkZCkge1xuICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goc3BlYWtlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3Quc2V0KHBvcywgc3BlYWtlcik7XG4gICAgICAgICAgICB0aGlzLnJlbmFtZUxpbmVTcGVha2VycyhvbGRWYWwsIHNwZWFrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuYW1lTGluZVNwZWFrZXJzKGZyb206c3RyaW5nLCB0bzpzdHJpbmcpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1vZGVsLmxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHRoaXMubW9kZWwubGluZXNbaV07XG4gICAgICAgICAgICBpZiAobGluZS5zcGVha2VyID09IGZyb20pIHtcbiAgICAgICAgICAgICAgICBsaW5lLnNwZWFrZXIgPSB0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUxpbmVTcGVha2VycyhzcGVha2VyOnN0cmluZykge1xuICAgICAgICBjb25zdCBhZmZlY3RMaW5lczpudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kZWwubGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gdGhpcy5tb2RlbC5saW5lc1tpXTtcbiAgICAgICAgICAgIGlmIChsaW5lLnNwZWFrZXIgPT0gc3BlYWtlcikge1xuICAgICAgICAgICAgICAgIGxpbmUuc3BlYWtlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgYWZmZWN0TGluZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWZmZWN0TGluZXM7XG4gICAgfVxuXG4gICAgcmVzdG9yZUxpbmVTcGVha2VycyhsaW5lczpudW1iZXJbXSwgc3BlYWtlcjpzdHJpbmcpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGxpbmUgPSB0aGlzLm1vZGVsLmxpbmVzW2xpbmVzW2ldXTtcbiAgICAgICAgICAgIGxpbmUuc3BlYWtlciA9IHNwZWFrZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VkaXRvci9lZGl0b3Itc3BlYWtlcmxpc3QtbW9kZWwudHNcbiAqKi8iLCJpbXBvcnQge0F0b219IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQge3Byb3B9IGZyb20gXCIuL3Byb3BcIjtcbmV4cG9ydCBjbGFzcyBCYXNlQXJyYXk8VD4ge1xuICAgIEBwcm9wIHByb3RlY3RlZCBpdGVtczpUW107XG5cbiAgICBAcHJvcCBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoaXRlbXM6VFtdKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcyB8fCBbXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QXRvbUNhbGxiYWNrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXRvbTpBdG9tID0gQXRvbS5nZXRBdG9tKHRoaXMuZ2V0QXRvbUNhbGxiYWNrLCB0aGlzKTtcblxuXG4gICAgcHJvdGVjdGVkIG11dGF0ZSgpIHtcbiAgICAgICAgdGhpcy5hdG9tLmNoYW5nZSgpO1xuICAgIH1cblxuICAgIHB1c2goLi4uaXRlbXM6VFtdKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaXRlbXMucHVzaCguLi5pdGVtcyk7XG4gICAgICAgIHRoaXMubXV0YXRlKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc2V0KGluZGV4Om51bWJlciwgdmFsdWU6VCkge1xuICAgICAgICB0aGlzLml0ZW1zW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm11dGF0ZSgpO1xuICAgIH1cblxuICAgIGdldChpbmRleDpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHBvcCgpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5pdGVtcy5wb3AoKTtcbiAgICAgICAgdGhpcy5tdXRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXZlcnNlKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLml0ZW1zLnJldmVyc2UoKTtcbiAgICAgICAgdGhpcy5tdXRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIHNoaWZ0KCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLml0ZW1zLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMubXV0YXRlKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cblxuICAgIHNvcnQoY29tcGFyZUZuPzooYTpULCBiOlQpID0+IG51bWJlcikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLml0ZW1zLnNvcnQoY29tcGFyZUZuKTtcbiAgICAgICAgdGhpcy5tdXRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIHNwbGljZShzdGFydDpudW1iZXIsIGRlbGV0ZUNvdW50PzpudW1iZXIsIC4uLml0ZW1zOlRbXSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLml0ZW1zLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQsIC4uLml0ZW1zKTtcbiAgICAgICAgdGhpcy5tdXRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIHVuc2hpZnQoLi4uaXRlbXM6VFtdKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaXRlbXMudW5zaGlmdCguLi5pdGVtcyk7XG4gICAgICAgIHRoaXMubXV0YXRlKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICB9XG5cbiAgICBjb25jYXQ8VSBleHRlbmRzIFRbXT4oLi4uaXRlbXM6VVtdKTpUW107XG4gICAgY29uY2F0KC4uLml0ZW1zOlRbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5jb25jYXQoLi4uaXRlbXMpO1xuICAgIH1cblxuICAgIGpvaW4oc2VwYXJhdG9yPzpzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuam9pbihzZXBhcmF0b3IpO1xuICAgIH1cblxuICAgIHNsaWNlKHN0YXJ0PzpudW1iZXIsIGVuZD86bnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgIH1cblxuICAgIGluZGV4T2Yoc2VhcmNoRWxlbWVudDpULCBmcm9tSW5kZXg/Om51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5pbmRleE9mKHNlYXJjaEVsZW1lbnQsIGZyb21JbmRleCk7XG4gICAgfVxuXG4gICAgbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudDpULCBmcm9tSW5kZXg/Om51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpO1xuICAgIH1cblxuICAgIGV2ZXJ5KGNhbGxiYWNrZm46KHZhbHVlOlQsIGluZGV4Om51bWJlciwgYXJyYXk6VFtdKSA9PiBib29sZWFuLCB0aGlzQXJnPzphbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZXZlcnkoY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gICAgfVxuXG4gICAgc29tZShjYWxsYmFja2ZuOih2YWx1ZTpULCBpbmRleDpudW1iZXIsIGFycmF5OlRbXSkgPT4gYm9vbGVhbiwgdGhpc0FyZz86YW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNvbWUoY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gICAgfVxuXG4gICAgZm9yRWFjaChjYWxsYmFja2ZuOih2YWx1ZTpULCBpbmRleDpudW1iZXIsIGFycmF5OlRbXSkgPT4gdm9pZCwgdGhpc0FyZz86YW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyk7XG4gICAgfVxuXG4gICAgbWFwPFU+KGNhbGxiYWNrZm46KHZhbHVlOlQsIGluZGV4Om51bWJlciwgYXJyYXk6VFtdKSA9PiBVLCB0aGlzQXJnPzphbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKGNhbGxiYWNrZm4sIHRoaXNBcmcpO1xuICAgIH1cblxuICAgIGZpbHRlcihjYWxsYmFja2ZuOih2YWx1ZTpULCBpbmRleDpudW1iZXIsIGFycmF5OlRbXSkgPT4gYm9vbGVhbiwgdGhpc0FyZz86YW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgICB9XG5cbiAgICByZWR1Y2UoY2FsbGJhY2tmbjoocHJldmlvdXNWYWx1ZTpULCBjdXJyZW50VmFsdWU6VCwgY3VycmVudEluZGV4Om51bWJlciwgYXJyYXk6VFtdKSA9PiBULCBpbml0aWFsVmFsdWU/OlQpOlQ7XG4gICAgcmVkdWNlPFU+KGNhbGxiYWNrZm46KHByZXZpb3VzVmFsdWU6VSwgY3VycmVudFZhbHVlOlQsIGN1cnJlbnRJbmRleDpudW1iZXIsIGFycmF5OlRbXSkgPT4gVSwgaW5pdGlhbFZhbHVlOlUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMucmVkdWNlKGNhbGxiYWNrZm4sIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmVkdWNlUmlnaHQoY2FsbGJhY2tmbjoocHJldmlvdXNWYWx1ZTpULCBjdXJyZW50VmFsdWU6VCwgY3VycmVudEluZGV4Om51bWJlciwgYXJyYXk6VFtdKSA9PiBULCBpbml0aWFsVmFsdWU/OlQpOlQ7XG4gICAgcmVkdWNlUmlnaHQ8VT4oY2FsbGJhY2tmbjoocHJldmlvdXNWYWx1ZTpVLCBjdXJyZW50VmFsdWU6VCwgY3VycmVudEluZGV4Om51bWJlciwgYXJyYXk6VFtdKSA9PiBVLCBpbml0aWFsVmFsdWU6VSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5yZWR1Y2VSaWdodChjYWxsYmFja2ZuLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXRvbS1uZXh0L2Jhc2UtYXJyYXkudHNcbiAqKi8iLCJjb25zdCBwcm9taXNlID0gKHdpbmRvdyBhcyBhbnkpLlByb21pc2UucmVzb2x2ZSgpO1xuZnVuY3Rpb24gcnVuTWljcm9UYXNrKGNhbGxiYWNrOigpPT52b2lkKSB7XG4gICAgcHJvbWlzZS50aGVuKGNhbGxiYWNrKTtcbn1cblxuXG5leHBvcnQgZW51bSBBdG9tU3RhdHVzIHtcbiAgICBQUk9QID0gMSxcbiAgICBHRVRURVJfTk9fVkFMID0gMixcbiAgICBHRVRURVIgPSAzLFxuICAgIERFU1RST1lFRCA9IC0xLFxufVxuXG5leHBvcnQgZW51bSBBdG9tQWZmZWN0U3RhdHVze1xuICAgIE5FRURDQUxDID0gMSxcbiAgICBDQUxDID0gNSxcbiAgICBORUVETk9UX0NBTEMgPSAxMCxcbiAgICBXQUlUX1BBUkVOVF9DQUxDID0gMzAsXG59XG5cbmV4cG9ydCBlbnVtIFRhc2tUeXBlIHtcbiAgICBDSEFOR0UgPSAxMCxcbiAgICBDTEVBUl9NQVNURVJTID0gMjAsXG4gICAgREVTVFJPWSA9IDUwLFxuICAgIE1PRElGWSA9IDEwMCxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRE1hcDxUPiB7XG4gICAgW2lkOm51bWJlcl06VDtcbn1cblxuaW50ZXJmYWNlIFNoYXJlZCBleHRlbmRzIEFycmF5PEF0b20gfCBudW1iZXI+IHtcbiAgICBsZW46bnVtYmVyO1xuICAgIGs6bnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgVGFza0xpc3Qge1xuICAgIHBvcyA9IDA7XG4gICAgZG9uZVBvcyA9IDA7XG4gICAgYXN5bmNSdW5uZWQgPSBmYWxzZTtcbiAgICBxdWV1ZTphbnlbXTtcbiAgICBzaXplID0gMzAwMDA7XG5cbiAgICBnZXQgbGlzdCgpIHtcbiAgICAgICAgY29uc3QgaXRlbXM6YW55ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmRvbmVQb3M7IGkgPCB0aGlzLnBvczsgaSArPSAzKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBpICUgdGhpcy5zaXplO1xuICAgICAgICAgICAgY29uc3QgdHlwZTpUYXNrVHlwZSA9IHRoaXMucXVldWVbcG9zXTtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goe3R5cGU6IHR5cGUsIGF0b206IHRoaXMucXVldWVbcG9zICsgMV0sIHNsYXZlOiB0aGlzLnF1ZXVlW3BvcyArIDJdfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0YXNrUnVubmVyOigpPT52b2lkKSB7XG4gICAgICAgIHRoaXMucXVldWUgPSBuZXcgQXJyYXkodGhpcy5zaXplKTtcbiAgICB9XG5cbiAgICBhZGRUYXNrKHRhc2tUeXBlOlRhc2tUeXBlLCBhdG9tOkF0b20sIHBhcmFtPzphbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFzeW5jUnVubmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFzeW5jUnVubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJ1bk1pY3JvVGFzayh0aGlzLnRhc2tSdW5uZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zICUgdGhpcy5zaXplO1xuICAgICAgICB0aGlzLnF1ZXVlW3Bvc10gPSB0YXNrVHlwZTtcbiAgICAgICAgdGhpcy5xdWV1ZVtwb3MgKyAxXSA9IGF0b207XG4gICAgICAgIGlmIChwYXJhbSkge1xuICAgICAgICAgICAgdGhpcy5xdWV1ZVtwb3MgKyAyXSA9IHBhcmFtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zICs9IDM7XG4gICAgfVxuXG4gICAgaXRlcmF0ZVVuZG9uZShjYWxsYmFjazoodHlwZTpUYXNrVHlwZSwgYXRvbTpBdG9tLCBwYXJhbTphbnksIGlzTGFzdDpib29sZWFuKT0+dm9pZCkge1xuICAgICAgICBpZiAodGhpcy5wb3MgLSB0aGlzLmRvbmVQb3MgPiB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0IG9mIHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuZG9uZVBvczsgaSA8IHRoaXMucG9zOyBpICs9IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGkgJSB0aGlzLnNpemU7XG4gICAgICAgICAgICBjb25zdCB0eXBlOlRhc2tUeXBlID0gdGhpcy5xdWV1ZVtwb3NdO1xuICAgICAgICAgICAgY2FsbGJhY2sodHlwZSwgdGhpcy5xdWV1ZVtwb3MgKyAxXSwgdHlwZSA9PSBUYXNrVHlwZS5NT0RJRlkgPyB0aGlzLnF1ZXVlW3BvcyArIDJdIDogbnVsbCwgaSA9PSB0aGlzLnBvcyAtIDMpO1xuICAgICAgICAgICAgdGhpcy5kb25lUG9zICs9IDM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hc3luY1J1bm5lZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF0b20ge1xuICAgIHByb3RlY3RlZCBpZCA9ICsrQXRvbS5hdG9tSWQ7XG4gICAgcHJvdGVjdGVkIHNsYXZlczpBdG9tW107XG4gICAgcHJvdGVjdGVkIG1hc3RlcnM6QXRvbVtdO1xuICAgIHByb3RlY3RlZCBzdGF0dXM6QXRvbVN0YXR1cztcbiAgICBwcm90ZWN0ZWQgZmllbGQ6c3RyaW5nO1xuICAgIHByb3RlY3RlZCB2YWx1ZTphbnk7XG4gICAgcHJvdGVjdGVkIG93bmVyOmFueTtcbiAgICBwcm90ZWN0ZWQgY2FsY0ZuOigpPT52b2lkO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgYWN0aXZlU2xhdmU6QXRvbSA9IG51bGw7XG4gICAgcHJvdGVjdGVkIHN0YXRpYyBhdG9tSWQgPSAwO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgZGVidWdBdG9tczp7W2lkOnN0cmluZ106Ym9vbGVhbn0gPSBudWxsO1xuXG4gICAgc3RhdGljIGRlYnVnQXRvbShuYW1lOnN0cmluZykge1xuICAgICAgICBpZiAoIUF0b20uZGVidWdBdG9tcykge1xuICAgICAgICAgICAgQXRvbS5kZWJ1Z0F0b21zID0ge307XG4gICAgICAgIH1cbiAgICAgICAgQXRvbS5kZWJ1Z0F0b21zW25hbWVdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIGRlYnVnKCkge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICB9XG5cbiAgICBwcm9wKGZpZWxkOnN0cmluZywgdmFsdWU6YW55KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgICAgICB0aGlzLnNsYXZlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQXRvbVN0YXR1cy5QUk9QO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXR0ZXIoZmllbGQ6c3RyaW5nLCBvd25lcjphbnksIGNhbGNGbjooKT0+dm9pZCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgICAgICB0aGlzLnNsYXZlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FsY0ZuID0gY2FsY0ZuO1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMubWFzdGVycyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IEF0b21TdGF0dXMuR0VUVEVSX05PX1ZBTDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBnZXRXaXRoQ2FsYygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSBBdG9tU3RhdHVzLkdFVFRFUl9OT19WQUwpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsYygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgpO1xuICAgIH1cblxuICAgIGdldFdpdGhGb3JjZUNhbGMoKSB7XG4gICAgICAgIHRoaXMuY2FsYygpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoKTtcbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIC8vdGhpcy5jaGVja0ZvckRlc3Ryb3koKTtcbiAgICAgICAgdmFyIGFjdGl2ZVNsYXZlID0gQXRvbS5hY3RpdmVTbGF2ZTtcbiAgICAgICAgaWYgKGFjdGl2ZVNsYXZlKSB7XG4gICAgICAgICAgICB2YXIgYWN0aXZlU2xhdmVNYXN0ZXJzID0gYWN0aXZlU2xhdmUubWFzdGVycztcbiAgICAgICAgICAgIHZhciBsZW4gPSBhY3RpdmVTbGF2ZU1hc3RlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNoYXJlZCA9IEF0b20uc2hhcmVkO1xuICAgICAgICAgICAgLy8gaWYgZmluZCBzZWxmIGluIGFjdGl2ZVNsYXZlIG1hc3RlcnMgZXhpdFxuICAgICAgICAgICAgdmFyIGsgPSBzaGFyZWQuaztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlU2xhdmVNYXN0ZXJzW2ldID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXJlZFtpXSA9IGs7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGZpbmQgc2VsZiBpbiBhZGRlZCBsaXN0IGV4aXRcbiAgICAgICAgICAgIHZhciBzaGFyZWRMZW4gPSBzaGFyZWQubGVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IGxlbjsgaiA8IHNoYXJlZExlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoYXJlZFtqXSA9PT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhZGQgc2VsZiB0byBhZGRlZCBsaXN0XG4gICAgICAgICAgICBzaGFyZWRbc2hhcmVkLmxlbisrXSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgc2V0KHZhbHVlOmFueSkge1xuICAgICAgICB0aGlzLmNoZWNrRm9yRGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JEZXN0cm95KCk7XG4gICAgICAgIEF0b20uc2NoZWR1bGVkVGFza3MuYWRkVGFzayhUYXNrVHlwZS5DSEFOR0UsIHRoaXMpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JEZXN0cm95KCk7XG4gICAgICAgIGlmIChBdG9tLmRlYnVnQXRvbXMgJiYgKEF0b20uZGVidWdBdG9tc1t0aGlzLmZpZWxkXSB8fCBBdG9tLmRlYnVnQXRvbXNbdGhpcy5pZF0pKSB7XG4gICAgICAgICAgICBBdG9tLmRlYnVnKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0dXMgPSBBdG9tU3RhdHVzLkRFU1RST1lFRDtcbiAgICAgICAgQXRvbS5zY2hlZHVsZWRUYXNrcy5hZGRUYXNrKFRhc2tUeXBlLkRFU1RST1ksIHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWFsRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhck1hc3RlcnMoKTtcbiAgICAgICAgdGhpcy5jbGVhclNsYXZlcygpO1xuICAgICAgICAvLyB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FsY0ZuID0gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VydmljZUF0b20gPSBuZXcgQXRvbSgpLmdldHRlcigncHJpdmF0ZScsIG51bGwsIG51bGwpO1xuXG4gICAgc3RhdGljIGdldEF0b20oY2FsbGJhY2s6KCk9PnZvaWQsIHRoaXNBcmc/OmFueSkge1xuICAgICAgICB2YXIgcHJldlNoYXJlZCA9IEF0b20uc2hhcmVkO1xuICAgICAgICBjb25zdCBvbGRBY3RpdmVTbGF2ZSA9IEF0b20uYWN0aXZlU2xhdmU7XG4gICAgICAgIEF0b20uYWN0aXZlU2xhdmUgPSBBdG9tLnNlcnZpY2VBdG9tO1xuICAgICAgICBBdG9tLnNoYXJlZCA9IEF0b20uc2hhcmVkQ2FjaGVQb3MgPT09IC0xID8gQXRvbS5nZXRTaGFyZWQoKSA6IEF0b20uc2hhcmVkQ2FjaGVbQXRvbS5zaGFyZWRDYWNoZVBvcy0tXTtcbiAgICAgICAgQXRvbS5zaGFyZWQubGVuID0gMDtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnKTtcbiAgICAgICAgaWYgKCFBdG9tLnNoYXJlZC5sZW4pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXRvbSBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhdG9tID0gQXRvbS5zaGFyZWRbMF0gYXMgQXRvbTtcbiAgICAgICAgQXRvbS5zaGFyZWQgPSBwcmV2U2hhcmVkO1xuICAgICAgICBBdG9tLmFjdGl2ZVNsYXZlID0gb2xkQWN0aXZlU2xhdmU7XG4gICAgICAgIHJldHVybiBhdG9tO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRTZWxmVG9BY3RpdmVTbGF2ZShzbGF2ZTpBdG9tKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JEZXN0cm95KCk7XG4gICAgICAgIGlmICghc2xhdmUubWFzdGVycykge1xuICAgICAgICAgICAgc2xhdmUubWFzdGVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHNsYXZlLm1hc3RlcnNbdGhpcy5pZF0gPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuc2xhdmVzKSB7XG4gICAgICAgICAgICB0aGlzLnNsYXZlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2xhdmVzW3NsYXZlLmlkXSA9IHNsYXZlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVja0ZvckRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSBBdG9tU3RhdHVzLkRFU1RST1lFRCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnkgdG8gdXNlIGRlc3Ryb3llZCBhdG9tJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIHNoYXJlZDpTaGFyZWQgPSBudWxsO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgc2hhcmVkQ2FjaGU6U2hhcmVkW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHNoYXJlZENhY2hlUG9zID0gLTE7XG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIGdldFNoYXJlZCgpIHtcbiAgICAgICAgY29uc3QgYSA9IFtdIGFzIFNoYXJlZDtcbiAgICAgICAgYS5rID0gMDtcbiAgICAgICAgYS5sZW4gPSAwO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2FsYygpIHtcbiAgICAgICAgY29uc3Qgb2xkQWN0aXZlU2xhdmUgPSBBdG9tLmFjdGl2ZVNsYXZlO1xuICAgICAgICBBdG9tLmFjdGl2ZVNsYXZlID0gdGhpcztcbiAgICAgICAgdmFyIHByZXZTaGFyZWQgPSBBdG9tLnNoYXJlZDtcbiAgICAgICAgQXRvbS5zaGFyZWQgPSBBdG9tLnNoYXJlZENhY2hlUG9zID09PSAtMSA/IEF0b20uZ2V0U2hhcmVkKCkgOiBBdG9tLnNoYXJlZENhY2hlW0F0b20uc2hhcmVkQ2FjaGVQb3MtLV07XG4gICAgICAgIEF0b20uc2hhcmVkLmxlbiA9IHRoaXMubWFzdGVycy5sZW5ndGg7XG4gICAgICAgIEF0b20uc2hhcmVkLmsrKztcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jYWxjRm4uY2FsbCh0aGlzLm93bmVyKTtcbiAgICAgICAgQXRvbS5zY2hlZHVsZWRUYXNrcy5hZGRUYXNrKFRhc2tUeXBlLk1PRElGWSwgdGhpcywgQXRvbS5zaGFyZWQpO1xuICAgICAgICAvLyB0aGlzLmFwcGx5TW9kaWZ5KEF0b20uc2hhcmVkKTtcbiAgICAgICAgQXRvbS5zaGFyZWQgPSBwcmV2U2hhcmVkO1xuICAgICAgICBBdG9tLmFjdGl2ZVNsYXZlID0gb2xkQWN0aXZlU2xhdmU7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gQXRvbVN0YXR1cy5HRVRURVI7XG4gICAgICAgIC8vIGNvbnNvbGUuaW5mbyh0aGlzLmZpZWxkLCB0aGlzLmlkKTtcbiAgICAgICAgcmV0dXJuIG9sZFZhbHVlICE9PSB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhcHBseU1vZGlmeShzaGFyZWQ6U2hhcmVkKSB7XG4gICAgICAgIHZhciBrID0gc2hhcmVkLms7XG4gICAgICAgIGNvbnN0IG1hc3RlcnMgPSB0aGlzLm1hc3RlcnM7XG4gICAgICAgIGNvbnN0IGxlbiA9IG1hc3RlcnMubGVuZ3RoO1xuXG4gICAgICAgIC8vIGZpbmQgYW5kIHJlbW92ZSBvbGQgbWFzdGVyc1xuICAgICAgICB2YXIgcmVtb3ZlQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVtb3ZlQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgbWFzdGVyc1tpIC0gcmVtb3ZlQ291bnRdID0gbWFzdGVyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaGFyZWRbaV0gIT09IGspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGZGcm9tTGlzdChtYXN0ZXJzW2ldLnNsYXZlcyk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVtb3ZlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgbWFzdGVycy5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IGxlbjsgaSA8IHNoYXJlZC5sZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYXRvbSA9IHNoYXJlZFtpXSBhcyBBdG9tO1xuICAgICAgICAgICAgbWFzdGVycy5wdXNoKGF0b20pO1xuICAgICAgICAgICAgaWYgKCFhdG9tLnNsYXZlcykge1xuICAgICAgICAgICAgICAgIGF0b20uc2xhdmVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdG9tLnNsYXZlcy5wdXNoKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgQXRvbS5zaGFyZWRDYWNoZVsrK0F0b20uc2hhcmVkQ2FjaGVQb3NdID0gc2hhcmVkO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhck1hc3RlcnMoKSB7XG4gICAgICAgIHZhciBtYXN0ZXJzID0gdGhpcy5tYXN0ZXJzO1xuICAgICAgICBpZiAobWFzdGVycykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1hc3RlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGZGcm9tTGlzdChtYXN0ZXJzW2ldLnNsYXZlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1hc3RlcnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsZWFyU2xhdmVzKCkge1xuICAgICAgICB2YXIgc2xhdmVzID0gdGhpcy5zbGF2ZXM7XG4gICAgICAgIGlmIChzbGF2ZXMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzbGF2ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGZGcm9tTGlzdChzbGF2ZXNbaV0ubWFzdGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNsYXZlcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlU2VsZkZyb21MaXN0KGl0ZW1zOkF0b21bXSkge1xuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1tpIC0gMV0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW1zW2ldID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgaXRlbXMucG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBhZmZlY3QoYWZmZWN0QXRvbXM6SURNYXA8QXRvbUFmZmVjdFN0YXR1cz4pIHtcbiAgICAgICAgYWZmZWN0QXRvbXNbdGhpcy5pZF0gPSAxO1xuXG4gICAgICAgIHZhciBzbGF2ZXMgPSB0aGlzLnNsYXZlcztcbiAgICAgICAgaWYgKHNsYXZlcykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNsYXZlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHNsYXZlc1tpXS5hZmZlY3QoYWZmZWN0QXRvbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG5lZWRUb1JlY2FsYyhhZmZlY3RBdG9tczpJRE1hcDxBdG9tQWZmZWN0U3RhdHVzPikge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gQXRvbVN0YXR1cy5ERVNUUk9ZRUQpIHtcbiAgICAgICAgICAgIHJldHVybiBBdG9tQWZmZWN0U3RhdHVzLk5FRUROT1RfQ0FMQztcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3RhdHVzID0gQXRvbUFmZmVjdFN0YXR1cy5ORUVETk9UX0NBTEM7XG4gICAgICAgIHZhciBtYXN0ZXJzID0gdGhpcy5tYXN0ZXJzO1xuICAgICAgICBpZiAobWFzdGVycykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG1hc3RlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXN0ZXIgPSBtYXN0ZXJzW2ldXG4gICAgICAgICAgICAgICAgY29uc3QgbWFzdGVyQWZmZWN0U3RhdHVzID0gYWZmZWN0QXRvbXNbbWFzdGVyLmlkXTtcbiAgICAgICAgICAgICAgICBpZiAobWFzdGVyQWZmZWN0U3RhdHVzID09PSBBdG9tQWZmZWN0U3RhdHVzLk5FRURDQUxDKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBdG9tQWZmZWN0U3RhdHVzLldBSVRfUEFSRU5UX0NBTEM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXN0ZXJBZmZlY3RTdGF0dXMgPT09IEF0b21BZmZlY3RTdGF0dXMuQ0FMQykge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBBdG9tQWZmZWN0U3RhdHVzLkNBTEM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZSh0b3BMZXZlbDpib29sZWFuLCBhZmZlY3RBdG9tczpJRE1hcDxBdG9tQWZmZWN0U3RhdHVzPikge1xuICAgICAgICBpZiAoYWZmZWN0QXRvbXNbdGhpcy5pZF0gPT09IEF0b21BZmZlY3RTdGF0dXMuQ0FMQykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHRvcExldmVsID8gQXRvbUFmZmVjdFN0YXR1cy5DQUxDIDogdGhpcy5uZWVkVG9SZWNhbGMoYWZmZWN0QXRvbXMpO1xuICAgICAgICBpZiAoc3RhdHVzID09PSBBdG9tQWZmZWN0U3RhdHVzLldBSVRfUEFSRU5UX0NBTEMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdHVzID09PSBBdG9tQWZmZWN0U3RhdHVzLkNBTEMgJiYgdGhpcy5zdGF0dXMgPT09IEF0b21TdGF0dXMuR0VUVEVSKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGMoKTtcbiAgICAgICAgfVxuICAgICAgICBhZmZlY3RBdG9tc1t0aGlzLmlkXSA9IHN0YXR1cztcbiAgICAgICAgaWYgKHRoaXMuc2xhdmVzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2xhdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGF2ZXNbaV0udXBkYXRlKGZhbHNlLCBhZmZlY3RBdG9tcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIGJhdGNoVXBkYXRlKGNoYW5nZUF0b21zOkF0b21bXSkge1xuICAgICAgICAvLyBBdG9tLmFmZmVjdEF0b21zID0ge307XG4gICAgICAgIGNvbnN0IGFmZmVjdEF0b21zOklETWFwPEF0b21BZmZlY3RTdGF0dXM+ID0ge31cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZUF0b21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjaGFuZ2VBdG9tc1tpXS5hZmZlY3QoYWZmZWN0QXRvbXMpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbmdlQXRvbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNoYW5nZUF0b21zW2ldLnVwZGF0ZSh0cnVlLCBhZmZlY3RBdG9tcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhdGljIHNjaGVkdWxlZFRhc2tzID0gbmV3IFRhc2tMaXN0KEF0b20udXBkYXRlU2NoZWR1bGVkKTtcblxuICAgIHN0YXRpYyB1cGRhdGVTY2hlZHVsZWQoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RhcnQgc2NoZWR1bGUgcnVubmVyXCIpO1xuICAgICAgICBsZXQgY2hhbmdlQXRvbXM6QXRvbVtdO1xuICAgICAgICBsZXQgcHJldlR5cGU6VGFza1R5cGU7XG5cblxuICAgICAgICBjb25zdCBzYyA9IEF0b20uc2NoZWR1bGVkVGFza3M7XG4gICAgICAgIGlmIChzYy5wb3MgLSBzYy5kb25lUG9zID4gc2Muc2l6ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gc2MuZG9uZVBvczsgaSA8IHNjLnBvczsgaSArPSAzKSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBpICUgc2Muc2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGU6VGFza1R5cGUgPSBzYy5xdWV1ZVtwb3NdO1xuICAgICAgICAgICAgY29uc3QgYXRvbTpBdG9tID0gc2MucXVldWVbcG9zICsgMV07XG4gICAgICAgICAgICBjb25zdCBwYXJhbSA9IHR5cGUgPT0gVGFza1R5cGUuTU9ESUZZID8gc2MucXVldWVbcG9zICsgMl0gOiBudWxsO1xuICAgICAgICAgICAgY29uc3QgaXNMYXN0ID0gaSA9PSBzYy5wb3MgLSAzO1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBUYXNrVHlwZS5DSEFOR0UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNoYW5nZUF0b21zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUF0b21zID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYW5nZUF0b21zLnB1c2goYXRvbSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICAgICAgICAgICAgICBBdG9tLmJhdGNoVXBkYXRlKGNoYW5nZUF0b21zKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlQXRvbXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2VHlwZSA9PSBUYXNrVHlwZS5DSEFOR0UpIHtcbiAgICAgICAgICAgICAgICBBdG9tLmJhdGNoVXBkYXRlKGNoYW5nZUF0b21zKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VBdG9tcyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSA9PSBUYXNrVHlwZS5NT0RJRlkpIHtcbiAgICAgICAgICAgICAgICBhdG9tLmFwcGx5TW9kaWZ5KHBhcmFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gVGFza1R5cGUuREVTVFJPWSkge1xuICAgICAgICAgICAgICAgIGF0b20ucmVhbERlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIHNjLmRvbmVQb3MgKz0gMztcbiAgICAgICAgfVxuICAgICAgICBzYy5hc3luY1J1bm5lZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuKHdpbmRvdyBhcyBhbnkpLkF0b21HbG9iID0gQXRvbTtcbih3aW5kb3cgYXMgYW55KS5kZWJ1Z0F0b20gPSBBdG9tLmRlYnVnQXRvbTtcbi8qXG5jb25zdCBhMSA9IG5ldyBBdG9tKCkucHJvcCgnYTEnLCAxKTtcbmNvbnN0IGEyID0gbmV3IEF0b20oKS5wcm9wKCdhMicsIDIpO1xuY29uc3QgYTMgPSBuZXcgQXRvbSgpLnByb3AoJ2EzJywgMyk7XG5jb25zdCBhNCA9IG5ldyBBdG9tKCkucHJvcCgnYTQnLCA0KTtcbmNvbnN0IGE1ID0gbmV3IEF0b20oKS5wcm9wKCdhNScsIDUpO1xuY29uc3QgYTYgPSBuZXcgQXRvbSgpLnByb3AoJ2E2JywgNik7XG5jb25zdCBhNyA9IG5ldyBBdG9tKCkucHJvcCgnYTcnLCA3KTtcbmNvbnN0IGE4ID0gbmV3IEF0b20oKS5wcm9wKCdhOCcsIDgpO1xuY29uc3QgYTkgPSBuZXcgQXRvbSgpLnByb3AoJ2E5JywgOSk7XG5jb25zdCBhMCA9IG5ldyBBdG9tKCkucHJvcCgnYTAnLCAwKTtcblxuY29uc3QgYjEgPSBuZXcgQXRvbSgpLnByb3AoJ2ExJywgMSk7XG5jb25zdCBiMiA9IG5ldyBBdG9tKCkucHJvcCgnYTInLCAyKTtcbmNvbnN0IGIzID0gbmV3IEF0b20oKS5wcm9wKCdhMycsIDMpO1xuY29uc3QgYjQgPSBuZXcgQXRvbSgpLnByb3AoJ2E0JywgNCk7XG5jb25zdCBiNSA9IG5ldyBBdG9tKCkucHJvcCgnYTUnLCA1KTtcbmNvbnN0IGI2ID0gbmV3IEF0b20oKS5wcm9wKCdhNicsIDYpO1xuY29uc3QgYjcgPSBuZXcgQXRvbSgpLnByb3AoJ2E3JywgNyk7XG5jb25zdCBiOCA9IG5ldyBBdG9tKCkucHJvcCgnYTgnLCA4KTtcbmNvbnN0IGI5ID0gbmV3IEF0b20oKS5wcm9wKCdhOScsIDkpO1xuY29uc3QgYjAgPSBuZXcgQXRvbSgpLnByb3AoJ2EwJywgMCk7XG5cbmxldCB4ID0gMDtcbmNvbnN0IHN1bSA9IG5ldyBBdG9tKCkuZ2V0dGVyKCdzdW0nLCB7fSwgKCkgPT4ge1xuICAgIGExLmdldCgpO1xuICAgIGEyLmdldCgpO1xuICAgIGEzLmdldCgpO1xuICAgIGE0LmdldCgpO1xuICAgIGE1LmdldCgpO1xuICAgIGE2LmdldCgpO1xuICAgIGE3LmdldCgpO1xuICAgIGE4LmdldCgpO1xuICAgIGE5LmdldCgpO1xuICAgIGEwLmdldCgpO1xuICAgIC8vXG4gICAgLy8gcmV0dXJuIHgrKyAlIDIgPT0gMCA/IGEuZ2V0KCkgOiBiLmdldCgpO1xufSk7Ki9cblxuLypcbmZ1bmN0aW9uIGFiYygpIHtcbiAgICBjb25zb2xlLnRpbWUoJ3BlcmYnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDAwMDA7IGkrKykge1xuICAgICAgICBzdW0uY2FsYygpO1xuICAgICAgICAvLyBBdG9tLnVwZGF0ZVNjaGVkdWxlZCgpO1xuICAgIH1cbiAgICBjb25zb2xlLnRpbWVFbmQoJ3BlcmYnKTtcbn1cbiovXG5cbi8vIGFiYygpO1xuXG5cbi8qXG5cbiBjb25zdCBhID0gbmV3IEF0b20oKS5wcm9wKCdhJywgJ1tBXScpO1xuIGNvbnN0IGIgPSBuZXcgQXRvbSgpLnByb3AoJ2InLCAnW0JdJyk7XG4gY29uc3QgYyA9IG5ldyBBdG9tKCkucHJvcCgnYycsICdbQ10nKTtcblxuIGxldCB4ID0gMDtcbiBjb25zdCBzdW0gPSBuZXcgQXRvbSgpLmdldHRlcignc3VtJywgbnVsbCwgKCkgPT4ge1xuIGMuZ2V0KCk7XG4gcmV0dXJuIHgrKyAlIDIgPT0gMCA/IGEuZ2V0KCkgOiBiLmdldCgpO1xuIH0pO1xuIHN1bS5nZXQoKTtcbiBBdG9tLnVwZGF0ZVNjaGVkdWxlZCgpO1xuXG4gYS5zZXQoJ1tBMV0nKTtcbiBBdG9tLnVwZGF0ZVNjaGVkdWxlZCgpO1xuXG4gYi5zZXQoJ1tCMV0nKTtcbiBBdG9tLnVwZGF0ZVNjaGVkdWxlZCgpO1xuICovXG5cbi8qXG5cbiBjb25zdCByZW5kZXIgPSBuZXcgQXRvbSgpLmdldHRlcigncmVuZGVyJywgbnVsbCwgKCkgPT4ge1xuIHgrKztcbiBjb25zdCB2YWwgPSAoeCAlIDIgPT0gMCA/IGIuZ2V0KCkgOiAoYS5nZXQoKSArIHN1bS5nZXQoKSkpO1xuIGNvbnNvbGUubG9nKCdyZW5kZXInLCB2YWwpO1xuIH0pXG4gcmVuZGVyLmdldCgpO1xuIGEuc2V0KCdbQTFdJyk7XG4gc2V0VGltZW91dCgoKSA9PiB7XG4gYS5zZXQoJ1tBMF0nKTtcbiBzZXRUaW1lb3V0KCgpID0+IHtcbiBhLnNldCgnW0F4XScpO1xuIH0pO1xuIH0pO1xuICovXG5cblxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXRvbS1uZXh0L2luZGV4LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge2NvbmZpZ30gZnJvbSBcIi4uLy4uLy4uL2JhY2tlbmQvY29uZmlnXCI7XG5pbXBvcnQge1Bvc3RNb2RlbH0gZnJvbSBcIi4uL21vZGVscy9wb3N0XCI7XG5pbXBvcnQgXCIuL3RodW1icy5jc3NcIjtcblxuZXhwb3J0IGNsYXNzIFRodW1icyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7cG9zdE1vZGVsOiBQb3N0TW9kZWw7IHJlc2l6ZUtvZWY6IG51bWJlcjt9LCB7fT4ge1xuICAgIHRpbWVUb1kodGltZTpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRpbWUgKiAxMDAgLyB0aGlzLnByb3BzLnJlc2l6ZUtvZWY7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5wcm9wcy5wb3N0TW9kZWwuZGF0YTtcblxuICAgICAgICBjb25zdCB2aWRlbyA9IGRhdGEubWVkaWFGaWxlc1tkYXRhLnBvc3QudmlkZW9dO1xuICAgICAgICBjb25zdCBlbkF1ZGlvID0gZGF0YS5tZWRpYUZpbGVzW2RhdGEucG9zdC5lbkF1ZGlvXTtcbiAgICAgICAgY29uc3Qgc2hpZnRWaWRlb1kgPSB0aGlzLnRpbWVUb1kodmlkZW8uc2hpZnRUaW1lKTtcbiAgICAgICAgY29uc3Qgc2hpZnRBdWRpb1kgPSB0aGlzLnRpbWVUb1koZW5BdWRpby5zaGlmdFRpbWUpO1xuICAgICAgICBjb25zdCBkdXJhdGlvblkgPSB0aGlzLnRpbWVUb1koZW5BdWRpby5kdXJhdGlvbik7XG5cbiAgICAgICAgY29uc3QgdGh1bWJJbWcgPSBjb25maWcuYmFzZVVybCArICcvJyArIGRhdGEubWVkaWFGaWxlc1tkYXRhLnBvc3QudGh1bWJzXS51cmw7XG4gICAgICAgIGNvbnN0IHRodW1iV2lkdGggPSA0MDA7XG4gICAgICAgIGNvbnN0IHRodW1iSGVpZ2h0ID0gMjAwO1xuICAgICAgICBjb25zdCB0aHVtYnNQZXJMaW5lID0gMjA7XG4gICAgICAgIGNvbnN0IHRodW1iU2hpZnQgPSAtdGh1bWJIZWlnaHQgLyAyO1xuICAgICAgICBjb25zdCB0aHVtYkNvdW50UGVyU2Vjb25kID0gMSAvIDg7XG4gICAgICAgIGNvbnN0IHRodW1ic0NvdW50ID0gZHVyYXRpb25ZIC8gdGh1bWJIZWlnaHQgfCAwO1xuICAgICAgICBjb25zdCB0aHVtYnNJdGVtczp7dG9wOm51bWJlcjtpbWdUb3A6bnVtYmVyO2ltZ0xlZnQ6bnVtYmVyfVtdID0gW107XG4gICAgICAgIHZhciB0aHVtYksgPSB0aHVtYkhlaWdodCAvIGR1cmF0aW9uWSAqIGVuQXVkaW8uZHVyYXRpb247XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aHVtYnNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBrID0gTWF0aC5yb3VuZChpICogdGh1bWJLICogdGh1bWJDb3VudFBlclNlY29uZCk7XG4gICAgICAgICAgICB0aHVtYnNJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0b3A6IGkgKiB0aHVtYkhlaWdodCArIHRodW1iU2hpZnQgKyBzaGlmdEF1ZGlvWSAtIHNoaWZ0VmlkZW9ZLFxuICAgICAgICAgICAgICAgIGltZ1RvcDogKGsgLyB0aHVtYnNQZXJMaW5lIHwgMCkgKiB0aHVtYkhlaWdodCxcbiAgICAgICAgICAgICAgICBpbWdMZWZ0OiAoayAlIHRodW1ic1BlckxpbmUpICogdGh1bWJXaWR0aCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0aHVtYnNcIj5cbiAgICAgICAgICAgIHt0aHVtYnNJdGVtcy5tYXAoKHRodW1iLCBpKSA9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGh1bWJcIiBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3RvcDogdGh1bWIudG9wLCBiYWNrZ3JvdW5kOiBgdXJsKCR7dGh1bWJJbWd9KSAkey10aHVtYi5pbWdMZWZ0fXB4ICR7LXRodW1iLmltZ1RvcH1weGB9fT5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgICA8L2Rpdj5cblxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92aWV3ZXIvdGh1bWJzLnRzeFxuICoqLyIsImV4cG9ydCB2YXIgY29uZmlnID0ge1xuICAgIGRiOiB7XG4gICAgICAgIHVzZXI6ICdyb290JyxcbiAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICBuYW1lOiAnd29yZHN0ZXAnXG4gICAgfSxcbiAgICBkaXI6ICcvVXNlcnMvY29keS9Eb3dubG9hZHMvbGluZ28vJyxcbiAgICBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM1J1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9iYWNrZW5kL2NvbmZpZy50c1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy92aWV3ZXIvdGh1bWJzLmNzc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7QXVkaW9TZWxlY3Rpb259IGZyb20gXCIuL2F1ZGlvLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtBdWRpb1BsYXllcn0gZnJvbSBcIi4uL3V0aWxzL2F1ZGlvLXBsYXllclwiO1xuaW1wb3J0IFwiLi90aW1lbGluZS5jc3NcIjtcblxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtwbGF5ZXI6IEF1ZGlvUGxheWVyOyByZXNpemVLb2VmOiBudW1iZXJ9LCB7fT4ge1xuICAgIHRpbWVUb1kodGltZTpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRpbWUgKiAxMDAgLyB0aGlzLnByb3BzLnJlc2l6ZUtvZWY7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucHJvcHMucGxheWVyLmFwcGx5U3BlY3Ryb2dyYW1Ub0NhbnZhcyh0aGlzLnJlZnNbJ3NwZWN0cm9ncmFtJ10gYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb25ZID0gdGhpcy50aW1lVG9ZKHRoaXMucHJvcHMucGxheWVyLmR1cmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmVcIiByZWY9XCJ0aW1lbGluZVwiPlxuICAgICAgICAgICAgPGNhbnZhcyBjbGFzc05hbWU9XCJzcGVjdHJvZ3JhbVwiIHJlZj1cInNwZWN0cm9ncmFtXCIgc3R5bGU9e3toZWlnaHQ6IGR1cmF0aW9uWX19Lz5cbiAgICAgICAgICAgIDxBdWRpb1NlbGVjdGlvbiBweFBlclNlYz17MTAwIC8gdGhpcy5wcm9wcy5yZXNpemVLb2VmfSBwbGF5ZXI9e3RoaXMucHJvcHMucGxheWVyfS8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZpZXdlci90aW1lbGluZS50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7QXVkaW9QbGF5ZXJ9IGZyb20gXCIuLi91dGlscy9hdWRpby1wbGF5ZXJcIjtcbmltcG9ydCBcIi4vYXVkaW8tc2VsZWN0aW9uLmNzc1wiO1xuXG5leHBvcnQgY2xhc3MgQXVkaW9TZWxlY3Rpb25EYXRhIHtcbiAgICBzdGFydCA9IDA7XG4gICAgZW5kID0gMDtcbn1cblxudmFyIGF1ZGlvU2VsZWN0aW9uID0gbmV3IEF1ZGlvU2VsZWN0aW9uRGF0YSgpO1xuZnVuY3Rpb24gc2V0QXVkaW9TZWxlY3Rpb24oc3RhcnQ6bnVtYmVyLCBlbmQ6bnVtYmVyKSB7XG4gICAgYXVkaW9TZWxlY3Rpb24uc3RhcnQgPSBzdGFydDtcbiAgICBhdWRpb1NlbGVjdGlvbi5lbmQgPSBlbmQ7XG59XG5cblxuZXhwb3J0IGNsYXNzIEF1ZGlvU2VsZWN0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtweFBlclNlYzogbnVtYmVyOyBwbGF5ZXI6IEF1ZGlvUGxheWVyfSx7fT4ge1xuICAgIHNlbGVjdGluZyA9IGZhbHNlO1xuICAgIGN1cnJlbnRUaW1lOkhUTUxFbGVtZW50O1xuICAgIGVsOkhUTUxFbGVtZW50O1xuXG4gICAgb2Zmc2V0VG9wID0gMDtcbiAgICBzdGFydFkgPSAwO1xuICAgIGVuZFkgPSAwO1xuICAgIGF1ZGlvUmF0ZSA9IDE7XG5cbiAgICBweFRvVGltZShweDpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHB4IC8gdGhpcy5wcm9wcy5weFBlclNlYztcbiAgICB9XG5cbiAgICB0aW1lVG9QeCh0aW1lOm51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5weFBlclNlYyAqIHRpbWU7XG4gICAgfVxuXG4gICAgc2V0QXVkaW9TZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IHRoaXMucHhUb1RpbWUodGhpcy5zdGFydFkpO1xuICAgICAgICBjb25zdCBlbmRUaW1lID0gdGhpcy5weFRvVGltZSh0aGlzLmVuZFkpO1xuICAgICAgICBpZiAoZW5kVGltZSA8PSBzdGFydFRpbWUpIHtcbiAgICAgICAgICAgIHNldEF1ZGlvU2VsZWN0aW9uKGVuZFRpbWUsIHN0YXJ0VGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRBdWRpb1NlbGVjdGlvbihzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RTdGFydChlOk1vdXNlRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gKGUucGFnZVkgLSB0aGlzLm9mZnNldFRvcCk7XG4gICAgICAgIHRoaXMuZW5kWSA9IHRoaXMuc3RhcnRZO1xuICAgICAgICB0aGlzLnNldEF1ZGlvU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH1cblxuICAgIHNlbGVjdE1vdmUoZTpNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGluZykge1xuICAgICAgICAgICAgdGhpcy5lbmRZID0gKGUucGFnZVkgLSB0aGlzLm9mZnNldFRvcCk7XG4gICAgICAgICAgICB0aGlzLnNldEF1ZGlvU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RFbmQoZTpNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGluZykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy5zdGFydEN1cnJlbnRUaW1lKCk7XG4gICAgICAgIHRoaXMucHJvcHMucGxheWVyLnBsYXllci5wbGF5KGF1ZGlvU2VsZWN0aW9uLnN0YXJ0LCBhdWRpb1NlbGVjdGlvbi5lbmQgLSBhdWRpb1NlbGVjdGlvbi5zdGFydCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwbGF5JywgYXVkaW9TZWxlY3Rpb24uc3RhcnQsIGF1ZGlvU2VsZWN0aW9uLmVuZCAtIGF1ZGlvU2VsZWN0aW9uLnN0YXJ0KTtcblxuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuc3RvcEN1cnJlbnRUaW1lKCk7XG4gICAgICAgIHRoaXMucHJvcHMucGxheWVyLnBsYXllci5zdG9wKCk7XG4gICAgfVxuXG4gICAgc3RhcnRDdXJyZW50VGltZSgpIHtcbiAgICAgICAgdmFyIGR1ciA9IChhdWRpb1NlbGVjdGlvbi5lbmQgLSBhdWRpb1NlbGVjdGlvbi5zdGFydCk7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUuc3R5bGUudHJhbnNpdGlvbiA9ICcnO1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGhpcy50aW1lVG9QeChhdWRpb1NlbGVjdGlvbi5zdGFydCl9cHgpYDtcbiAgICAgICAgLy9ub2luc3BlY3Rpb24gQmFkRXhwcmVzc2lvblN0YXRlbWVudEpTXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUub2Zmc2V0SGVpZ2h0OyAvL2ZvcmNlIHJlZmxvd1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIGxpbmVhcic7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHt0aGlzLnRpbWVUb1B4KGF1ZGlvU2VsZWN0aW9uLmVuZCl9cHgpYDtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXIgLyB0aGlzLmF1ZGlvUmF0ZSArICdzJztcbiAgICB9XG5cbiAgICBzdG9wQ3VycmVudFRpbWUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUuc3R5bGUudHJhbnNpdGlvbiA9ICcnO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmVsID0gdGhpcy5yZWZzWydhdWRpb1NlbGVjdGlvbiddIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCByb290ID0gdGhpcy5yZWZzWydyb290J10gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSB0aGlzLnJlZnNbJ2N1cnJlbnRUaW1lJ10gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRoaXMub2Zmc2V0VG9wID0gKHRoaXMuZWwucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkub2Zmc2V0VG9wO1xuXG4gICAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB0aGlzLnNlbGVjdFN0YXJ0KGUpKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB0aGlzLnNlbGVjdE1vdmUoZSkpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB0aGlzLnNlbGVjdEVuZChlKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdWRpby1zZWxlY3Rpb24td3JhcHBlclwiIHJlZj1cInJvb3RcIiBzdHlsZT17e2hlaWdodDogdGhpcy50aW1lVG9QeCh0aGlzLnByb3BzLnBsYXllci5kdXJhdGlvbil9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tc2VsZWN0aW9uXCIgcmVmPVwiYXVkaW9TZWxlY3Rpb25cIlxuICAgICAgICAgICAgICAgICBzdHlsZT17e3RvcDogdGhpcy50aW1lVG9QeChhdWRpb1NlbGVjdGlvbi5zdGFydCksIGhlaWdodDogdGhpcy50aW1lVG9QeChhdWRpb1NlbGVjdGlvbi5lbmQgLSBhdWRpb1NlbGVjdGlvbi5zdGFydCl9fT48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VycmVudC10aW1lXCIgcmVmPVwiY3VycmVudFRpbWVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZpZXdlci9hdWRpby1zZWxlY3Rpb24udHN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3ZpZXdlci9hdWRpby1zZWxlY3Rpb24uY3NzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy92aWV3ZXIvdGltZWxpbmUuY3NzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtzdmdQYXRoR2VuZXJhdG9yfSBmcm9tIFwiLi4vdXRpbHMvc3ZnLXBhdGgtZ2VuZXJhdG9yXCI7XG5pbXBvcnQge0lUZXh0TGluZX0gZnJvbSBcIi4uLy4uLy4uL2ludGVyZmFjZXMvdGV4dC1saW5lXCI7XG5pbXBvcnQge0F1ZGlvUGxheWVyfSBmcm9tIFwiLi4vdXRpbHMvYXVkaW8tcGxheWVyXCI7XG5pbXBvcnQge0VkaXRvckhpc3RvcnksIEVkaXRvckhpc3RvcnlEYXRhfSBmcm9tIFwiLi4vdXRpbHMvaGlzdG9yeVwiO1xuaW1wb3J0IHtMaW5lfSBmcm9tIFwiLi4vbW9kZWxzL2xpbmVcIjtcbmltcG9ydCB7TGFuZ30gZnJvbSBcIi4uLy4uLy4uL2ludGVyZmFjZXMvbGFuZ1wiO1xuaW1wb3J0IFwiLi90aW1lbGluZS1jb25uZWN0b3IuY3NzXCI7XG5cblxuZXhwb3J0IGNsYXNzIEhpc3RvcnlUaW1lbGluZSBleHRlbmRzIEVkaXRvckhpc3RvcnlEYXRhPEhpc3RvcnlUaW1lbGluZT4ge1xuICAgIHN0YXRpYyB0eXBlID0gJ3RpbWVsaW5lJztcbiAgICBsaW5lTjpudW1iZXI7XG4gICAgbGFuZzpMYW5nO1xuICAgIG9sZFN0YXJ0Om51bWJlcjtcbiAgICBvbGREdXI6bnVtYmVyO1xuICAgIG5ld1N0YXJ0Om51bWJlcjtcbiAgICBuZXdEdXI6bnVtYmVyO1xufVxuXG5cbmludGVyZmFjZSBUaW1lbGluZUNvbm5lY3RvclByb3BzIHtcbiAgICBsaW5lczpMaW5lW107XG4gICAgcGxheWVyOkF1ZGlvUGxheWVyO1xuICAgIHJlc2l6ZUtvZWY6bnVtYmVyO1xuICAgIGxpbmVIOm51bWJlcjtcbiAgICByZW5kZXJMaW5lczpudW1iZXJbXTtcbiAgICBoaXN0b3J5OkVkaXRvckhpc3Rvcnk7XG59XG5leHBvcnQgY2xhc3MgVGltZWxpbmVDb25uZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8VGltZWxpbmVDb25uZWN0b3JQcm9wcywge30+IHtcbiAgICB0aW1lVG9ZKHRpbWU6bnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aW1lICogMTAwIC8gdGhpcy5wcm9wcy5yZXNpemVLb2VmO1xuICAgIH1cblxuICAgIHBsYXlUZXh0TGluZSh0ZXh0TGluZTpJVGV4dExpbmUpIHtcbiAgICAgICAgLy90b2RvOiBhdWRpb3NlbGVjdGlvblxuICAgICAgICB0aGlzLnByb3BzLnBsYXllci5wbGF5ZXIucGxheSh0ZXh0TGluZS5zdGFydCAvIDEwMCwgdGV4dExpbmUuZHVyIC8gMTAwLCBmYWxzZSwgKCk9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVFRUVuZFwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWN0aXZlTGluZSA9IC0xO1xuICAgIGFjdGl2ZUxpbmVTdGFydCA9IDA7XG4gICAgYWN0aXZlTGluZUR1ciA9IDA7XG4gICAgYWN0aXZlSXNUb3AgPSBmYWxzZTtcbiAgICB5ID0gMDtcblxuICAgIG1vdmVSZXNpemVLb2VmID0gMSAvIDI7XG5cbiAgICBvbk1vdXNlRG93bihlOk1vdXNlRXZlbnQsIGxpbmVOOm51bWJlciwgaXNUb3A6Ym9vbGVhbikge1xuICAgICAgICBjb25zdCB0ZXh0TGluZSA9IHRoaXMucHJvcHMubGluZXNbbGluZU5dLmVuO1xuICAgICAgICB0aGlzLmFjdGl2ZUlzVG9wID0gaXNUb3A7XG4gICAgICAgIHRoaXMuYWN0aXZlTGluZSA9IGxpbmVOO1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmVTdGFydCA9IHRleHRMaW5lLnN0YXJ0O1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmVEdXIgPSB0ZXh0TGluZS5kdXI7XG4gICAgICAgIHRoaXMueSA9IGUucGFnZVk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyZXNpemluZycpO1xuICAgIH1cblxuICAgIGhpc3RvcnlMaXN0ZW4gPSAoZGF0YTpIaXN0b3J5VGltZWxpbmUsIGlzUmVkbzpib29sZWFuKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRMaW5lID0gdGhpcy5wcm9wcy5saW5lc1tkYXRhLmxpbmVOXS5lbjtcbiAgICAgICAgdGV4dExpbmUuc3RhcnQgPSBpc1JlZG8gPyBkYXRhLm5ld1N0YXJ0IDogZGF0YS5vbGRTdGFydDtcbiAgICAgICAgdGV4dExpbmUuZHVyID0gaXNSZWRvID8gZGF0YS5uZXdEdXIgOiBkYXRhLm9sZER1cjtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkubGlzdGVuKEhpc3RvcnlUaW1lbGluZS50eXBlLCB0aGlzLmhpc3RvcnlMaXN0ZW4pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlTGluZSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dExpbmUgPSB0aGlzLnByb3BzLmxpbmVzW3RoaXMuYWN0aXZlTGluZV0uZW47XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKHRoaXMueSAtIGUub2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGxldCBkaWZmID0gKHRoaXMueSAtIGUucGFnZVkpICogdGhpcy5wcm9wcy5yZXNpemVLb2VmICogdGhpcy5tb3ZlUmVzaXplS29lZjtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW5IID0gMjAgKiB0aGlzLnByb3BzLnJlc2l6ZUtvZWY7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXNUb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlTGluZVN0YXJ0IC0gZGlmZiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYgPSB0aGlzLmFjdGl2ZUxpbmVTdGFydDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVMaW5lRHVyICsgZGlmZiA8IG1pbkgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYgPSAtKHRoaXMuYWN0aXZlTGluZUR1ciAtIG1pbkgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRMaW5lLnN0YXJ0ID0gdGhpcy5hY3RpdmVMaW5lU3RhcnQgLSBkaWZmO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0TGluZS5kdXIgPSB0aGlzLmFjdGl2ZUxpbmVEdXIgKyBkaWZmO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRMaW5lLmR1ciA9IHRoaXMuYWN0aXZlTGluZUR1ciAtIGRpZmYgPiBtaW5IID8gdGhpcy5hY3RpdmVMaW5lRHVyIC0gZGlmZiA6IG1pbkg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVMaW5lID4gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0TGluZSA9IHRoaXMucHJvcHMubGluZXNbdGhpcy5hY3RpdmVMaW5lXS5lbjtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlUZXh0TGluZSh0ZXh0TGluZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdyZXNpemluZycpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUxpbmVTdGFydCAhPSB0ZXh0TGluZS5zdGFydCB8fCB0aGlzLmFjdGl2ZUxpbmVEdXIgIT0gdGV4dExpbmUuZHVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGlzdG9yeS5hZGQobmV3IEhpc3RvcnlUaW1lbGluZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lTjogdGhpcy5hY3RpdmVMaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogTGFuZy5FTixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEhpc3RvcnlUaW1lbGluZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkU3RhcnQ6IHRoaXMuYWN0aXZlTGluZVN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkRHVyOiB0aGlzLmFjdGl2ZUxpbmVEdXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGFydDogdGV4dExpbmUuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEdXI6IHRleHRMaW5lLmR1cixcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUxpbmUgPSAtMTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBjb25uZWN0b3JXaWR0aCA9IDUwO1xuICAgICAgICBjb25zdCBzdmdXaWR0aCA9IDEwMDtcbiAgICAgICAgY29uc3Qgc3ZnSGVpZ2h0ID0gdGhpcy50aW1lVG9ZKHRoaXMucHJvcHMucGxheWVyLmR1cmF0aW9uKTtcbiAgICAgICAgY29uc3QgbGluZUggPSB0aGlzLnByb3BzLmxpbmVIO1xuICAgICAgICBjb25zdCBoYWxmTGluZUggPSBsaW5lSCAvIDI7XG4gICAgICAgIGNvbnN0IHJlc2l6ZUtvZWYgPSB0aGlzLnByb3BzLnJlc2l6ZUtvZWY7XG5cbiAgICAgICAgcmV0dXJuIDxzdmcgY2xhc3NOYW1lPVwidGltZWxpbmUtY29ubmVjdG9yXCIgd2lkdGg9e3N2Z1dpZHRofSBoZWlnaHQ9e3N2Z0hlaWdodH0+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5yZW5kZXJMaW5lcy5tYXAoKHBvcywgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRMaW5lID0gdGhpcy5wcm9wcy5saW5lc1tpXS5lbjtcbiAgICAgICAgICAgICAgICBpZiAodGV4dExpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGwgPSB0ZXh0TGluZS5zdGFydCAvIHJlc2l6ZUtvZWY7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsID0gKHRleHRMaW5lLnN0YXJ0ICsgdGV4dExpbmUuZHVyKSAvIHJlc2l6ZUtvZWY7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyID0gcG9zIC0gaGFsZkxpbmVIO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiciA9IHBvcyArIGhhbGZMaW5lSDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSAnaHNsYSgnICsgKHRleHRMaW5lLnN0YXJ0KSArICcsIDUwJSw2MCUsIDEpJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxnIGtleT17aX0gY2xhc3NOYW1lPXtpID09IHRoaXMuYWN0aXZlTGluZSA/ICdyZXNpemluZycgOiAnJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBvbkNsaWNrPXsoKT0+dGhpcy5wbGF5VGV4dExpbmUodGV4dExpbmUpfSBmaWxsPXtjb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQ9e3N2Z1BhdGhHZW5lcmF0b3IodGwsIGJsLCB0ciwgYnIsIGNvbm5lY3RvcldpZHRoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3Qgb25Nb3VzZURvd249eyhlOmFueSk9PnRoaXMub25Nb3VzZURvd24oZSwgaSwgdHJ1ZSl9IGNsYXNzTmFtZT1cInRvcFwiIHk9e3RsfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBvbk1vdXNlRG93bj17KGU6YW55KT0+dGhpcy5vbk1vdXNlRG93bihlLCBpLCBmYWxzZSl9IGNsYXNzTmFtZT1cImJvdHRvbVwiIHk9e2JsLTIwfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC9zdmc+XG5cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92aWV3ZXIvdGltZWxpbmUtY29ubmVjdG9yLnRzeFxuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBzdmdQYXRoR2VuZXJhdG9yKHRvcExlZnQ6bnVtYmVyLCBib3R0b21MZWZ0Om51bWJlciwgdG9wUmlnaHQ6bnVtYmVyLCBib3R0b21SaWdodDpudW1iZXIsIHdpZHRoOm51bWJlcikge1xuICAgIHZhciBieCA9IHdpZHRoIC8gMjtcbiAgICB2YXIgcGF0aCA9ICcnO1xuXG4gICAgcGF0aCArPSAnTTAsJyArIHRvcExlZnQgKyAnICc7XG5cbiAgICBwYXRoICs9ICdDJyArIGJ4ICsgJywnICsgdG9wTGVmdCArICcgJztcbiAgICBwYXRoICs9IGJ4ICsgJywnICsgdG9wUmlnaHQgKyAnICc7XG4gICAgcGF0aCArPSB3aWR0aCArICcsJyArIHRvcFJpZ2h0ICsgJyAnO1xuXG4gICAgcGF0aCArPSAnTCcgKyB3aWR0aCArICcsJyArIGJvdHRvbVJpZ2h0ICsgJyAnO1xuXG4gICAgcGF0aCArPSAnQycgKyBieCArICcsJyArIGJvdHRvbVJpZ2h0ICsgJyAnO1xuICAgIHBhdGggKz0gYnggKyAnLCcgKyBib3R0b21MZWZ0ICsgJyAnO1xuICAgIHBhdGggKz0gJzAsJyArIGJvdHRvbUxlZnQgKyAnWic7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9zdmctcGF0aC1nZW5lcmF0b3IudHNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdmlld2VyL3RpbWVsaW5lLWNvbm5lY3Rvci5jc3NcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtGRlR9IGZyb20gXCJzb3VuZC11dGlscy9GRlRcIjtcbmltcG9ydCB7U291bmRMb2FkZXJ9IGZyb20gXCJzb3VuZC11dGlscy9Tb3VuZExvYWRlclwiO1xuaW1wb3J0IHtQbGF5fSBmcm9tIFwic291bmQtdXRpbHMvUGxheVwiO1xuXG52YXIgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuZXhwb3J0IGNsYXNzIEF1ZGlvUGxheWVyIHtcbiAgICBjdXJyZW50VGltZTpudW1iZXIgPSAwO1xuICAgIGR1cmF0aW9uOm51bWJlciA9IDA7XG4gICAgcGxheWVyID0gbmV3IFBsYXkoYXVkaW9Db250ZXh0KTtcbiAgICBzb3VuZExvYWRlZCA9IGZhbHNlO1xuXG4gICAgc3BlY3Ryb2dyYW1EYXRhOlVpbnQ4Q2xhbXBlZEFycmF5W107XG4gICAgYXVkaW9CdWZmZXI6QXVkaW9CdWZmZXI7XG5cbiAgICBsb2FkU291bmQodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTb3VuZExvYWRlcihhdWRpb0NvbnRleHQpLmZyb21VcmwodXJsKS50aGVuKGF1ZGlvQnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9CdWZmZXIgPSBhdWRpb0J1ZmZlcjtcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBhdWRpb0J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnNldEF1ZGlvKGF1ZGlvQnVmZmVyKTtcbiAgICAgICAgICAgIHRoaXMuc3BlY3Ryb2dyYW1EYXRhID0gdGhpcy5wcm9jZXNzKGF1ZGlvQnVmZmVyLCAxMjgpO1xuICAgICAgICAgICAgLy8gdGhpcy5zcGVjdHJvZ3JhbS5wcm9jZXNzKGF1ZGlvQnVmZmVyKTtcbiAgICAgICAgICAgIHRoaXMuc291bmRMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFwcGx5U3BlY3Ryb2dyYW1Ub0NhbnZhcyhjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnNwZWN0cm9ncmFtRGF0YTtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHZhciB0aW1lTGVuID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIHZhciB2YWxzTGVuID0gZGF0YVswXS5sZW5ndGg7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHZhbHNMZW47XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aW1lTGVuO1xuXG4gICAgICAgIHZhciBpbWQgPSBuZXcgSW1hZ2VEYXRhKHZhbHNMZW4sIHRpbWVMZW4pO1xuICAgICAgICB2YXIgaW1kZCA9IGltZC5kYXRhO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVMZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIHZhbHMgPSBkYXRhW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxzTGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gMjU1IC0gdmFsc1tqXSAqIDU7XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IChpICogdmFsc0xlbiArIHZhbHNMZW4gLSBqKSAqIDQ7XG4gICAgICAgICAgICAgICAgaW1kZFtwb3MgKyAwXSA9IHZhbDtcbiAgICAgICAgICAgICAgICBpbWRkW3BvcyArIDFdID0gdmFsO1xuICAgICAgICAgICAgICAgIGltZGRbcG9zICsgMl0gPSB2YWw7XG4gICAgICAgICAgICAgICAgaW1kZFtwb3MgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZCwgMCwgMCk7XG4gICAgICAgIHJldHVybiBpbWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzKGF1ZGlvQnVmZmVyOkF1ZGlvQnVmZmVyLCBmZnRTaXplOm51bWJlcikge1xuICAgICAgICBjb25zdCBkYXRhOlVpbnQ4Q2xhbXBlZEFycmF5W10gPSBbXTtcbiAgICAgICAgY29uc3Qga29lZiA9IDMwO1xuICAgICAgICB2YXIgYnVmZmVyU2l6ZSA9IGZmdFNpemU7XG4gICAgICAgIHZhciBidWZmZXJEYXRhU2l6ZSA9IGZmdFNpemUgKiBrb2VmO1xuICAgICAgICB2YXIgZmZ0ID0gbmV3IEZGVChidWZmZXJTaXplLCAwKTtcbiAgICAgICAgdmFyIHNpZ25hbDpGbG9hdDMyQXJyYXkgPSBhdWRpb0J1ZmZlci5nZXRDaGFubmVsRGF0YSgwKTtcbiAgICAgICAgdmFyIGJ1ZmZlclNpZ25hbCA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyU2l6ZSk7XG4gICAgICAgIHZhciBrID0gMDtcbiAgICAgICAgd2hpbGUgKHNpZ25hbC5sZW5ndGggPiBrICsgYnVmZmVyRGF0YVNpemUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJiID0gc2lnbmFsLnN1YmFycmF5KGssIGsgKyBidWZmZXJEYXRhU2l6ZSk7XG4gICAgICAgICAgICBjb25zdCBrayA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyU2l6ZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJiLmxlbmd0aDsgaSArPSBrb2VmKSB7XG4gICAgICAgICAgICAgICAga2tbaSAvIGtvZWYgfCAwXSA9IGJiW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyU2lnbmFsLnNldChrayk7XG4gICAgICAgICAgICBrICs9IGJ1ZmZlckRhdGFTaXplO1xuICAgICAgICAgICAgZmZ0LmZvcndhcmQoYnVmZmVyU2lnbmFsKTtcbiAgICAgICAgICAgIHZhciBzcGVjdHJ1bSA9IGZmdC5zcGVjdHJ1bTtcbiAgICAgICAgICAgIHZhciBhcnIgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoc3BlY3RydW0ubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3BlY3RydW0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAvLyBlcXVhbGl6ZSwgYXR0ZW51YXRlcyBsb3cgZnJlcXMgYW5kIGJvb3N0cyBoaWdoc1xuICAgICAgICAgICAgICAgIC8vYXJyW2pdID0gc3BlY3RydW1bal0gKiAtMSAqIE1hdGgubG9nKChidWZmZXJTaXplIC8gMiAtIGopICogKDAuNSAvIGJ1ZmZlclNpemUgLyAyKSkgKiBidWZmZXJTaXplIHwgMDtcbiAgICAgICAgICAgICAgICBhcnJbal0gPSBzcGVjdHJ1bVtqXSAqIDUwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLnB1c2goYXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlscy9hdWRpby1wbGF5ZXIudHNcbiAqKi8iLCJjb25zdCBUV09fUEkgPSAyICogTWF0aC5QSTtcbnR5cGUgQnVmZiA9IHtbaTpudW1iZXJdOiBudW1iZXI7IGxlbmd0aDogbnVtYmVyfTtcblxuLyoqXG4gKiBGRlQgaXMgYSBjbGFzcyBmb3IgY2FsY3VsYXRpbmcgdGhlIERpc2NyZXRlIEZvdXJpZXIgVHJhbnNmb3JtIG9mIGEgc2lnbmFsXG4gKiB3aXRoIHRoZSBGYXN0IEZvdXJpZXIgVHJhbnNmb3JtIGFsZ29yaXRobS5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gYnVmZmVyU2l6ZSBUaGUgc2l6ZSBvZiB0aGUgc2FtcGxlIGJ1ZmZlciB0byBiZSBjb21wdXRlZC4gTXVzdCBiZSBwb3dlciBvZiAyXG4gKiBAcGFyYW0ge051bWJlcn0gc2FtcGxlUmF0ZSBUaGUgc2FtcGxlUmF0ZSBvZiB0aGUgYnVmZmVyIChlZy4gNDQxMDApXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuZXhwb3J0IGNsYXNzIEZGVCB7XG4gICAgcmV2ZXJzZVRhYmxlOlVpbnQzMkFycmF5O1xuICAgIHNpblRhYmxlOkZsb2F0MzJBcnJheTtcbiAgICBjb3NUYWJsZTpGbG9hdDMyQXJyYXk7XG4gICAgc2FtcGxlUmF0ZTpudW1iZXI7XG4gICAgYnVmZmVyU2l6ZTpudW1iZXI7XG4gICAgYmFuZHdpZHRoOm51bWJlcjtcbiAgICBwZWFrQmFuZDpudW1iZXI7XG4gICAgcGVhazpudW1iZXI7XG4gICAgcmVhbDpGbG9hdDMyQXJyYXk7XG4gICAgaW1hZzpGbG9hdDMyQXJyYXk7XG4gICAgc3BlY3RydW06RmxvYXQzMkFycmF5O1xuXG4gICAgY29uc3RydWN0b3IoYnVmZmVyU2l6ZTpudW1iZXIsIHNhbXBsZVJhdGU6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZm91cmllclRyYW5zZm9ybShidWZmZXJTaXplLCBzYW1wbGVSYXRlKTtcblxuICAgICAgICB0aGlzLnJldmVyc2VUYWJsZSA9IG5ldyBVaW50MzJBcnJheShidWZmZXJTaXplKTtcblxuICAgICAgICB2YXIgbGltaXQgPSAxO1xuICAgICAgICB2YXIgYml0ID0gYnVmZmVyU2l6ZSA+PiAxO1xuXG4gICAgICAgIHdoaWxlIChsaW1pdCA8IGJ1ZmZlclNpemUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGltaXQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZVRhYmxlW2kgKyBsaW1pdF0gPSB0aGlzLnJldmVyc2VUYWJsZVtpXSArIGJpdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGltaXQgPSBsaW1pdCA8PCAxO1xuICAgICAgICAgICAgYml0ID0gYml0ID4+IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpblRhYmxlID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXJTaXplKTtcbiAgICAgICAgdGhpcy5jb3NUYWJsZSA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyU2l6ZSk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJ1ZmZlclNpemU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zaW5UYWJsZVtpXSA9IE1hdGguc2luKC1NYXRoLlBJIC8gaSk7XG4gICAgICAgICAgICB0aGlzLmNvc1RhYmxlW2ldID0gTWF0aC5jb3MoLU1hdGguUEkgLyBpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZm91cmllclRyYW5zZm9ybShidWZmZXJTaXplOm51bWJlciwgc2FtcGxlUmF0ZTpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5idWZmZXJTaXplID0gYnVmZmVyU2l6ZTtcbiAgICAgICAgdGhpcy5zYW1wbGVSYXRlID0gc2FtcGxlUmF0ZTtcbiAgICAgICAgdGhpcy5iYW5kd2lkdGggPSAyIC8gYnVmZmVyU2l6ZSAqIHNhbXBsZVJhdGUgLyAyO1xuXG4gICAgICAgIHRoaXMuc3BlY3RydW0gPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlclNpemUgLyAyKTtcbiAgICAgICAgdGhpcy5yZWFsID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXJTaXplKTtcbiAgICAgICAgdGhpcy5pbWFnID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXJTaXplKTtcblxuICAgICAgICB0aGlzLnBlYWtCYW5kID0gMDtcbiAgICAgICAgdGhpcy5wZWFrID0gMDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlICptaWRkbGUqIGZyZXF1ZW5jeSBvZiBhbiBGRlQgYmFuZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIEZGVCBiYW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG1pZGRsZSBmcmVxdWVuY3kgaW4gSHouXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRCYW5kRnJlcXVlbmN5KGluZGV4Om51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5iYW5kd2lkdGggKiBpbmRleCArIHRoaXMuYmFuZHdpZHRoIC8gMjtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVTcGVjdHJ1bSgpIHtcbiAgICAgICAgdmFyIHNwZWN0cnVtID0gdGhpcy5zcGVjdHJ1bSxcbiAgICAgICAgICAgIHJlYWwgICAgID0gdGhpcy5yZWFsLFxuICAgICAgICAgICAgaW1hZyAgICAgPSB0aGlzLmltYWcsXG4gICAgICAgICAgICBiU2kgICAgICA9IDIgLyB0aGlzLmJ1ZmZlclNpemUsXG4gICAgICAgICAgICBzcXJ0ICAgICA9IE1hdGguc3FydDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgTiA9IHRoaXMuYnVmZmVyU2l6ZSAvIDI7IGkgPCBOOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBydmFsID0gcmVhbFtpXTtcbiAgICAgICAgICAgIHZhciBpdmFsID0gaW1hZ1tpXTtcbiAgICAgICAgICAgIHZhciBtYWcgPSBiU2kgKiBzcXJ0KHJ2YWwgKiBydmFsICsgaXZhbCAqIGl2YWwpO1xuXG4gICAgICAgICAgICBpZiAobWFnID4gdGhpcy5wZWFrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZWFrQmFuZCA9IGk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZWFrID0gbWFnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGVjdHJ1bVtpXSA9IG1hZztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZvcndhcmQgdHJhbnNmb3JtIG9uIHRoZSBzYW1wbGUgYnVmZmVyLlxuICAgICAqIENvbnZlcnRzIGEgdGltZSBkb21haW4gc2lnbmFsIHRvIGZyZXF1ZW5jeSBkb21haW4gc3BlY3RyYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlciBUaGUgc2FtcGxlIGJ1ZmZlci4gQnVmZmVyIExlbmd0aCBtdXN0IGJlIHBvd2VyIG9mIDJcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBmcmVxdWVuY3kgc3BlY3RydW0gYXJyYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9yd2FyZChidWZmZXI6QnVmZikge1xuICAgICAgICAvLyBMb2NhbGx5IHNjb3BlIHZhcmlhYmxlcyBmb3Igc3BlZWQgdXBcbiAgICAgICAgdmFyIGJ1ZmZlclNpemUgICA9IHRoaXMuYnVmZmVyU2l6ZSxcbiAgICAgICAgICAgIGNvc1RhYmxlICAgICA9IHRoaXMuY29zVGFibGUsXG4gICAgICAgICAgICBzaW5UYWJsZSAgICAgPSB0aGlzLnNpblRhYmxlLFxuICAgICAgICAgICAgcmV2ZXJzZVRhYmxlID0gdGhpcy5yZXZlcnNlVGFibGUsXG4gICAgICAgICAgICByZWFsICAgICAgICAgPSB0aGlzLnJlYWwsXG4gICAgICAgICAgICBpbWFnICAgICAgICAgPSB0aGlzLmltYWcsXG4gICAgICAgICAgICBzcGVjdHJ1bSAgICAgPSB0aGlzLnNwZWN0cnVtO1xuXG4gICAgICAgIHZhciBrID0gTWF0aC5mbG9vcihNYXRoLmxvZyhidWZmZXJTaXplKSAvIE1hdGguTE4yKTtcblxuICAgICAgICBpZiAoTWF0aC5wb3coMiwgaykgIT09IGJ1ZmZlclNpemUpIHsgdGhyb3cgXCJJbnZhbGlkIGJ1ZmZlciBzaXplLCBtdXN0IGJlIGEgcG93ZXIgb2YgMi5cIjsgfVxuICAgICAgICBpZiAoYnVmZmVyU2l6ZSAhPT0gYnVmZmVyLmxlbmd0aCkgeyB0aHJvdyBcIlN1cHBsaWVkIGJ1ZmZlciBpcyBub3QgdGhlIHNhbWUgc2l6ZSBhcyBkZWZpbmVkIEZGVC4gRkZUIFNpemU6IFwiICsgYnVmZmVyU2l6ZSArIFwiIEJ1ZmZlciBTaXplOiBcIiArIGJ1ZmZlci5sZW5ndGg7IH1cblxuICAgICAgICB2YXIgaGFsZlNpemUgPSAxO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpKyspIHtcbiAgICAgICAgICAgIHJlYWxbaV0gPSBidWZmZXJbcmV2ZXJzZVRhYmxlW2ldXTtcbiAgICAgICAgICAgIGltYWdbaV0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGhhbGZTaXplIDwgYnVmZmVyU2l6ZSkge1xuICAgICAgICAgICAgLy9waGFzZVNoaWZ0U3RlcFJlYWwgPSBNYXRoLmNvcygtTWF0aC5QSS9oYWxmU2l6ZSk7XG4gICAgICAgICAgICAvL3BoYXNlU2hpZnRTdGVwSW1hZyA9IE1hdGguc2luKC1NYXRoLlBJL2hhbGZTaXplKTtcbiAgICAgICAgICAgIHZhciBwaGFzZVNoaWZ0U3RlcFJlYWwgPSBjb3NUYWJsZVtoYWxmU2l6ZV07XG4gICAgICAgICAgICB2YXIgcGhhc2VTaGlmdFN0ZXBJbWFnID0gc2luVGFibGVbaGFsZlNpemVdO1xuXG4gICAgICAgICAgICB2YXIgY3VycmVudFBoYXNlU2hpZnRSZWFsID0gMTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UGhhc2VTaGlmdEltYWcgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBmZnRTdGVwID0gMDsgZmZ0U3RlcCA8IGhhbGZTaXplOyBmZnRTdGVwKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IGZmdFN0ZXA7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGJ1ZmZlclNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZiA9IGkgKyBoYWxmU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyID0gKGN1cnJlbnRQaGFzZVNoaWZ0UmVhbCAqIHJlYWxbb2ZmXSkgLSAoY3VycmVudFBoYXNlU2hpZnRJbWFnICogaW1hZ1tvZmZdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpID0gKGN1cnJlbnRQaGFzZVNoaWZ0UmVhbCAqIGltYWdbb2ZmXSkgKyAoY3VycmVudFBoYXNlU2hpZnRJbWFnICogcmVhbFtvZmZdKTtcblxuICAgICAgICAgICAgICAgICAgICByZWFsW29mZl0gPSByZWFsW2ldIC0gdHI7XG4gICAgICAgICAgICAgICAgICAgIGltYWdbb2ZmXSA9IGltYWdbaV0gLSB0aTtcbiAgICAgICAgICAgICAgICAgICAgcmVhbFtpXSArPSB0cjtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ1tpXSArPSB0aTtcblxuICAgICAgICAgICAgICAgICAgICBpICs9IGhhbGZTaXplIDw8IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRtcFJlYWwgPSBjdXJyZW50UGhhc2VTaGlmdFJlYWw7XG4gICAgICAgICAgICAgICAgY3VycmVudFBoYXNlU2hpZnRSZWFsID0gKHRtcFJlYWwgKiBwaGFzZVNoaWZ0U3RlcFJlYWwpIC0gKGN1cnJlbnRQaGFzZVNoaWZ0SW1hZyAqIHBoYXNlU2hpZnRTdGVwSW1hZyk7XG4gICAgICAgICAgICAgICAgY3VycmVudFBoYXNlU2hpZnRJbWFnID0gKHRtcFJlYWwgKiBwaGFzZVNoaWZ0U3RlcEltYWcpICsgKGN1cnJlbnRQaGFzZVNoaWZ0SW1hZyAqIHBoYXNlU2hpZnRTdGVwUmVhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhhbGZTaXplID0gaGFsZlNpemUgPDwgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0ZVNwZWN0cnVtKCk7XG4gICAgfTtcblxufVxuXG4vKipcbiAqIFJGRlQgaXMgYSBjbGFzcyBmb3IgY2FsY3VsYXRpbmcgdGhlIERpc2NyZXRlIEZvdXJpZXIgVHJhbnNmb3JtIG9mIGEgc2lnbmFsXG4gKiB3aXRoIHRoZSBGYXN0IEZvdXJpZXIgVHJhbnNmb3JtIGFsZ29yaXRobS5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjdXJyZW50bHkgb25seSBjb250YWlucyBhIGZvcndhcmQgdHJhbnNmb3JtIGJ1dCBpcyBoaWdobHkgb3B0aW1pemVkLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBidWZmZXJTaXplIFRoZSBzaXplIG9mIHRoZSBzYW1wbGUgYnVmZmVyIHRvIGJlIGNvbXB1dGVkLiBNdXN0IGJlIHBvd2VyIG9mIDJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzYW1wbGVSYXRlIFRoZSBzYW1wbGVSYXRlIG9mIHRoZSBidWZmZXIgKGVnLiA0NDEwMClcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG4vLyBXaW5kb3cgZnVuY3Rpb25zXG5lbnVtIFdpbmRvd1R5cGV7XG4gICAgQkFSVExFVFQgICAgID0gMSxcbiAgICBCQVJUTEVUVEhBTk4gPSAyLFxuICAgIEJMQUNLTUFOICAgICA9IDMsXG4gICAgQ09TSU5FICAgICAgID0gNCxcbiAgICBHQVVTUyAgICAgICAgPSA1LFxuICAgIEhBTU1JTkcgICAgICA9IDYsXG4gICAgSEFOTiAgICAgICAgID0gNyxcbiAgICBMQU5DWk9TICAgICAgPSA4LFxuICAgIFJFQ1RBTkdVTEFSICA9IDksXG4gICAgVFJJQU5HVUxBUiAgID0gMTBcbn1cblxuY2xhc3MgV2luZG93RnVuY3Rpb24ge1xuICAgIGFscGhhOm51bWJlcjtcbiAgICBmdW5jOihsZW5ndGg6bnVtYmVyLCBpbmRleDpudW1iZXIsIGFscGhhPzpudW1iZXIpPT5udW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOm51bWJlciwgYWxwaGE6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYWxwaGEgPSBhbHBoYTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgV2luZG93VHlwZS5CQVJUTEVUVDpcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bmMgPSBXaW5kb3dGdW5jdGlvbi5CYXJ0bGV0dDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBXaW5kb3dUeXBlLkJBUlRMRVRUSEFOTjpcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bmMgPSBXaW5kb3dGdW5jdGlvbi5CYXJ0bGV0dEhhbm47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgV2luZG93VHlwZS5CTEFDS01BTjpcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bmMgPSBXaW5kb3dGdW5jdGlvbi5CbGFja21hbjtcbiAgICAgICAgICAgICAgICB0aGlzLmFscGhhID0gdGhpcy5hbHBoYSB8fCAwLjE2O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFdpbmRvd1R5cGUuQ09TSU5FOlxuICAgICAgICAgICAgICAgIHRoaXMuZnVuYyA9IFdpbmRvd0Z1bmN0aW9uLkNvc2luZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBXaW5kb3dUeXBlLkdBVVNTOlxuICAgICAgICAgICAgICAgIHRoaXMuZnVuYyA9IFdpbmRvd0Z1bmN0aW9uLkdhdXNzO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxwaGEgPSB0aGlzLmFscGhhIHx8IDAuMjU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgV2luZG93VHlwZS5IQU1NSU5HOlxuICAgICAgICAgICAgICAgIHRoaXMuZnVuYyA9IFdpbmRvd0Z1bmN0aW9uLkhhbW1pbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgV2luZG93VHlwZS5IQU5OOlxuICAgICAgICAgICAgICAgIHRoaXMuZnVuYyA9IFdpbmRvd0Z1bmN0aW9uLkhhbm47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgV2luZG93VHlwZS5MQU5DWk9TOlxuICAgICAgICAgICAgICAgIHRoaXMuZnVuYyA9IFdpbmRvd0Z1bmN0aW9uLkxhbmN6b3M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgV2luZG93VHlwZS5SRUNUQU5HVUxBUjpcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bmMgPSBXaW5kb3dGdW5jdGlvbi5SZWN0YW5ndWxhcjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBXaW5kb3dUeXBlLlRSSUFOR1VMQVI6XG4gICAgICAgICAgICAgICAgdGhpcy5mdW5jID0gV2luZG93RnVuY3Rpb24uVHJpYW5ndWxhcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3MoYnVmZmVyOkJ1ZmYpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZmZlcltpXSAqPSB0aGlzLmZ1bmMobGVuZ3RoLCBpLCB0aGlzLmFscGhhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgIH1cblxuICAgIHN0YXRpYyBCYXJ0bGV0dChsZW5ndGg6bnVtYmVyLCBpbmRleDpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIDIgLyAobGVuZ3RoIC0gMSkgKiAoKGxlbmd0aCAtIDEpIC8gMiAtIE1hdGguYWJzKGluZGV4IC0gKGxlbmd0aCAtIDEpIC8gMikpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgQmFydGxldHRIYW5uKGxlbmd0aDpudW1iZXIsIGluZGV4Om51bWJlcikge1xuICAgICAgICByZXR1cm4gMC42MiAtIDAuNDggKiBNYXRoLmFicyhpbmRleCAvIChsZW5ndGggLSAxKSAtIDAuNSkgLSAwLjM4ICogTWF0aC5jb3MoVFdPX1BJICogaW5kZXggLyAobGVuZ3RoIC0gMSkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgQmxhY2ttYW4obGVuZ3RoOm51bWJlciwgaW5kZXg6bnVtYmVyLCBhbHBoYTpudW1iZXIpIHtcbiAgICAgICAgdmFyIGEwID0gKDEgLSBhbHBoYSkgLyAyO1xuICAgICAgICB2YXIgYTEgPSAwLjU7XG4gICAgICAgIHZhciBhMiA9IGFscGhhIC8gMjtcblxuICAgICAgICByZXR1cm4gYTAgLSBhMSAqIE1hdGguY29zKFRXT19QSSAqIGluZGV4IC8gKGxlbmd0aCAtIDEpKSArIGEyICogTWF0aC5jb3MoNCAqIE1hdGguUEkgKiBpbmRleCAvIChsZW5ndGggLSAxKSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBDb3NpbmUobGVuZ3RoOm51bWJlciwgaW5kZXg6bnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNvcyhNYXRoLlBJICogaW5kZXggLyAobGVuZ3RoIC0gMSkgLSBNYXRoLlBJIC8gMik7XG4gICAgfTtcblxuICAgIHN0YXRpYyBHYXVzcyhsZW5ndGg6bnVtYmVyLCBpbmRleDpudW1iZXIsIGFscGhhOm51bWJlcikge1xuICAgICAgICByZXR1cm4gTWF0aC5wb3coTWF0aC5FLCAtMC41ICogTWF0aC5wb3coKGluZGV4IC0gKGxlbmd0aCAtIDEpIC8gMikgLyAoYWxwaGEgKiAobGVuZ3RoIC0gMSkgLyAyKSwgMikpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgSGFtbWluZyhsZW5ndGg6bnVtYmVyLCBpbmRleDpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIDAuNTQgLSAwLjQ2ICogTWF0aC5jb3MoVFdPX1BJICogaW5kZXggLyAobGVuZ3RoIC0gMSkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgSGFubihsZW5ndGg6bnVtYmVyLCBpbmRleDpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoVFdPX1BJICogaW5kZXggLyAobGVuZ3RoIC0gMSkpKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIExhbmN6b3MobGVuZ3RoOm51bWJlciwgaW5kZXg6bnVtYmVyKSB7XG4gICAgICAgIHZhciB4ID0gMiAqIGluZGV4IC8gKGxlbmd0aCAtIDEpIC0gMTtcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKE1hdGguUEkgKiB4KSAvIChNYXRoLlBJICogeCk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBSZWN0YW5ndWxhcihsZW5ndGg6bnVtYmVyLCBpbmRleDpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfTtcblxuICAgIHN0YXRpYyBUcmlhbmd1bGFyKGxlbmd0aDpudW1iZXIsIGluZGV4Om51bWJlcikge1xuICAgICAgICByZXR1cm4gMiAvIGxlbmd0aCAqIChsZW5ndGggLyAyIC0gTWF0aC5hYnMoaW5kZXggLSAobGVuZ3RoIC0gMSkgLyAyKSk7XG4gICAgfTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L3NvdW5kLXV0aWxzL0ZGVC50c1xuICoqLyIsImV4cG9ydCBjbGFzcyBTb3VuZExvYWRlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdWRpb0NvbnRleHQ6QXVkaW9Db250ZXh0KSB7XG4gICAgfVxuXG4gICAgcGFyc2VBdWRpbyhhcnJheUJ1ZmZlcjpBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QXVkaW9CdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YShhcnJheUJ1ZmZlciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnJvbUZpbGVJbnB1dChpbnB1dEZpbGU6SFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICB2YXIgZmlsZXMgPSBpbnB1dEZpbGUuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdFxuICAgICAgICB2YXIgZmlsZSA9IGZpbGVzWzBdO1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QXVkaW9CdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUF1ZGlvKHJlYWRlci5yZXN1bHQpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZyb21VcmwodXJsOnN0cmluZykge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxBdWRpb0J1ZmZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUF1ZGlvKHJlcXVlc3QucmVzcG9uc2UpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9zb3VuZC11dGlscy9Tb3VuZExvYWRlci50c1xuICoqLyIsImV4cG9ydCBjb25zdCBlbnVtIFBsYXlpbmdTdGF0dXMge1xuICAgIFBMQVlJTkcsIFNUT1BQSU5HXG59XG5leHBvcnQgY2xhc3MgUGxheSB7XG4gICAgcHJpdmF0ZSBwbGF5U291cmNlOkF1ZGlvQnVmZmVyU291cmNlTm9kZTtcbiAgICBwcml2YXRlIHN0YXJ0UGxheVRpbWUgPSAwO1xuICAgIHByaXZhdGUgc3RhcnQgPSAwO1xuICAgIHByaXZhdGUgZHVyID0gMDtcbiAgICBwcml2YXRlIGF1ZGlvQnVmZmVyOkF1ZGlvQnVmZmVyO1xuICAgIHByaXZhdGUgc3RhdGUgPSBQbGF5aW5nU3RhdHVzLlNUT1BQSU5HO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGF1ZGlvQ29udGV4dDpBdWRpb0NvbnRleHQpIHt9XG5cbiAgICBzZXRBdWRpbyhhdWRpb0J1ZmZlcjpBdWRpb0J1ZmZlcikge1xuICAgICAgICB0aGlzLmF1ZGlvQnVmZmVyID0gYXVkaW9CdWZmZXI7XG4gICAgfVxuXG4gICAgY3V0QXVkaW9CdWZmZXIoc3RhcnQ6bnVtYmVyLCBlbmQ6bnVtYmVyKSB7XG4gICAgICAgIHN0YXJ0ID0gc3RhcnQgKiB0aGlzLmF1ZGlvQnVmZmVyLnNhbXBsZVJhdGUgfCAwO1xuICAgICAgICBlbmQgPSBlbmQgKiB0aGlzLmF1ZGlvQnVmZmVyLnNhbXBsZVJhdGUgfCAwO1xuICAgICAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgIHZhciBudW1iZXJPZkNoYW5uZWxzID0gdGhpcy5hdWRpb0J1ZmZlci5udW1iZXJPZkNoYW5uZWxzO1xuICAgICAgICB2YXIgYnVmZiA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihudW1iZXJPZkNoYW5uZWxzLCBsZW4sIHRoaXMuYXVkaW9CdWZmZXIuc2FtcGxlUmF0ZSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZDaGFubmVsczsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hhbm5lbDpGbG9hdDMyQXJyYXkgPSB0aGlzLmF1ZGlvQnVmZmVyLmdldENoYW5uZWxEYXRhKGkpO1xuICAgICAgICAgICAgdmFyIHNvdXJjZUNoYW5uZWw6RmxvYXQzMkFycmF5ID0gYnVmZi5nZXRDaGFubmVsRGF0YShpKTtcbiAgICAgICAgICAgIHNvdXJjZUNoYW5uZWwuc2V0KGNoYW5uZWwuc3ViYXJyYXkoc3RhcnQsIGVuZCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWZmO1xuICAgIH1cblxuICAgIHBsYXkoc3RhcnQ6bnVtYmVyLCBkdXI6bnVtYmVyLCBsb29wID0gZmFsc2UsIG9uRW5kZWQ/OiAoKT0+dm9pZCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gUGxheWluZ1N0YXR1cy5QTEFZSU5HO1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgdGhpcy5wbGF5U291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIHRoaXMucGxheVNvdXJjZS5idWZmZXIgPSB0aGlzLmN1dEF1ZGlvQnVmZmVyKHN0YXJ0LCBzdGFydCArIGR1cik7XG4gICAgICAgIHRoaXMucGxheVNvdXJjZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5wbGF5U291cmNlLm9uZW5kZWQgPSAoKT0+dGhpcy5zdG9wKCk7XG4gICAgICAgIGlmICghdGhpcy5hdWRpb0J1ZmZlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdWRpb0J1ZmZlciBpcyBlbXB0eScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICAgICAgdGhpcy5kdXIgPSBkdXI7XG4gICAgICAgIHRoaXMuc3RhcnRQbGF5VGltZSA9IHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lO1xuICAgICAgICB0aGlzLnBsYXlTb3VyY2Uuc3RhcnQoMCk7XG4gICAgICAgIHRoaXMucGxheVNvdXJjZS5sb29wID0gbG9vcDtcbiAgICAgICAgdGhpcy5wbGF5U291cmNlLm9uZW5kZWQgPSB0aGlzLm9uRW5kZWQ7XG4gICAgICAgIGlmIChvbkVuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBvbkVuZGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25FbmRlZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBsYXlpbmdTdGF0dXMuU1RPUFBJTkc7XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheVNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5U291cmNlLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMucGxheVNvdXJjZS5vbmVuZGVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsYXlTb3VyY2UgPSBudWxsO1xuICAgIH1cblxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VGltZSgpIHtcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gdGhpcy5hdWRpb0NvbnRleHQuY3VycmVudFRpbWUgLSB0aGlzLnN0YXJ0UGxheVRpbWU7XG4gICAgICAgIHZhciBwbGF5RHVyID0gdGhpcy5kdXI7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0ICsgKHRoaXMucGxheVNvdXJjZSA/IGN1cnJUaW1lICUgcGxheUR1ciA6IDApO1xuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vc291bmQtdXRpbHMvUGxheS50c1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbVRpbWVzdGFtcHMoY291bnQgPSA1MCkge1xuICAgIGxldCBsYXN0Om51bWJlcjtcbiAgICBsZXQgYWI6bnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBsYXN0ICsgTWF0aC5yYW5kb20oKSAqIDcwIHwgMDtcbiAgICAgICAgYWIucHVzaChpdGVtKTtcbiAgICAgICAgbGFzdCA9IGl0ZW07XG4gICAgfVxuICAgIHJldHVybiBhYjtcbn1cbmNvbnN0IGRlYnVnID0gZmFsc2U7XG4vLyBhYiA9IFswLCAxMCwgMjAsIDMwLCA0MCwgMTEwLCAxMjAsIDEzMCwgMzYwLCAzNzAsIDM4MCwgMzkwLCA0MDAsIDUxMCwgNTIwLCA1MzAsIDU0MCwgNTUwLCA1NjAsIDU3MCwgNzAwLCA4MDAsIDkxMCwgOTIwLCA5MzBdXG4vLyBhYiA9IFswLCAxMDM1LCAxMDU2LCAxMDkxLCAxMTA1LCAxMTE5LCAxMTc2LCAxMjAxLCAxMjE4LCAxMjkxXVxuLy8gYWIgPSBbMCwgMTAwLCAyMDAsIDIwMCwgMjAwLCAyMDAsIDIwMCwgMjAwLCAyMDAsIDIwMCwgMjAwXTtcblxuXG5leHBvcnQgY2xhc3MgTGluZUFsbG9jYXRvciB7XG4gICAgcHJpdmF0ZSByZW5kZXI6bnVtYmVyW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvc2l0aW9uczpudW1iZXJbXSwgcHJpdmF0ZSBsaW5lSGVpZ2h0Om51bWJlcikge1xuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZUdyb3VwKHN0YXJ0Om51bWJlciwgZW5kOm51bWJlciwgbW92ZVNpemU6bnVtYmVyKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBzdGFydDsgaiA8PSBlbmQ7IGorKykge1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyWSA9IHRoaXMucmVuZGVyW2pdO1xuICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGosXG4gICAgICAgICAgICAgICAgICAgIGxpbmVUb3A6IHRoaXMucG9zaXRpb25zW2pdLFxuICAgICAgICAgICAgICAgICAgICBsaW5lUmVuZGVyOiByZW5kZXJZLFxuICAgICAgICAgICAgICAgICAgICBsaW5lQWZ0ZXJSZW5kZXI6IHJlbmRlclkgLSBtb3ZlU2l6ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJbal0gLT0gbW92ZVNpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vdmVTaXplICogKGVuZCAtIHN0YXJ0ICsgMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXRUb1VwKHN0YXJ0UG9zOm51bWJlcikge1xuICAgICAgICBsZXQgbGFzdFJlbmRlclkgPSB0aGlzLnJlbmRlcltzdGFydFBvc107XG4gICAgICAgIGxldCBncm91cFdlaWdodCA9IGxhc3RSZW5kZXJZIC0gdGhpcy5wb3NpdGlvbnNbc3RhcnRQb3NdO1xuICAgICAgICBsZXQgZ3JvdXBTaXplID0gMTtcbiAgICAgICAgY29uc3QgZ3JvdXBFbmRQb3MgPSBzdGFydFBvcztcbiAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0UG9zIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnBvc2l0aW9uc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlclkgPSB0aGlzLnJlbmRlcltpXTtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbVNwYWNlU2l6ZSA9IChsYXN0UmVuZGVyWSAtIHJlbmRlclkpIC0gdGhpcy5saW5lSGVpZ2h0O1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHNwYWNlXG4gICAgICAgICAgICBpZiAoYm90dG9tU3BhY2VTaXplID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5lZWRTcGFjZSA9IGdyb3VwV2VpZ2h0IC8gZ3JvdXBTaXplO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzTmVlZFNwYWNlRml0ID0gYm90dG9tU3BhY2VTaXplID4gbmVlZFNwYWNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVTaXplID0gTWF0aC5taW4obmVlZFNwYWNlLCBib3R0b21TcGFjZVNpemUpO1xuICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZm91bmQgc3BhY2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lVG9wOiB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVJlbmRlcjogcmVuZGVyWSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc05lZWRTcGFjZUZpdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBXZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cEVuZFBvcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVNwYWNlU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRTcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzOiB0aGlzLnJlbmRlci5zbGljZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtb3ZlU2l6ZSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBXZWlnaHQgLT0gdGhpcy5tb3ZlR3JvdXAoaSArIDEsIGdyb3VwRW5kUG9zLCBtb3ZlU2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzTmVlZFNwYWNlRml0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhncm91cFdlaWdodCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdicmVhaycsIHtncm91cFdlaWdodH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwV2VpZ2h0ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdicmVhaycsIHtncm91cFdlaWdodH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2JyZWFrJywge2dyb3VwV2VpZ2h0fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbmQgb2YgZ3JvdXAnLCB7Z3JvdXBXZWlnaHR9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXBXZWlnaHQgKz0gcmVuZGVyWSAtIHk7XG4gICAgICAgICAgICBncm91cFNpemUrKztcbiAgICAgICAgICAgIGxhc3RSZW5kZXJZID0gcmVuZGVyWTtcbiAgICAgICAgICAgIGlmIChkZWJ1Zykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVyJywge2dyb3VwV2VpZ2h0LCBncm91cFNpemUsIGxuUlk6IHJlbmRlclksIGxuWTogeX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsb2NhdGVSZW5kZXJMaW5lcygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXIgPSBuZXcgQXJyYXkodGhpcy5wb3NpdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgbGV0IGxhc3RUb3AgPSAtSW5maW5pdHk7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5wb3NpdGlvbnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyW2tdID0gTWF0aC5tYXgodGhpcy5wb3NpdGlvbnNba10sIGxhc3RUb3AgKyB0aGlzLmxpbmVIZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5maXRUb1VwKGspO1xuICAgICAgICAgICAgbGFzdFRvcCA9IHRoaXMucmVuZGVyW2tdO1xuICAgICAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIGluc2VydCcsIHtrLCBsYXN0VG9wfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyO1xuICAgIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvdGltZS1hbGxvY2F0ZS50c1xuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IHtFZGl0b3JNb2RlbCwgRWRpdG9yVGV4dExpbmUsIEVkaXRvcldvcmQsIEVkaXRvckxpbmV9IGZyb20gXCIuL2VkaXRvci1tb2RlbFwiO1xuaW1wb3J0IHtMYW5nfSBmcm9tIFwiLi4vLi4vLi4vaW50ZXJmYWNlcy9sYW5nXCI7XG5pbXBvcnQge0VkaXRvcktleUhhbmRsZXJ9IGZyb20gXCIuL2VkaXRvci1rZXktaGFuZGxlclwiO1xuaW1wb3J0IHtMaW5lfSBmcm9tIFwiLi4vbW9kZWxzL2xpbmVcIjtcbmltcG9ydCBcIi4vc3R5bGVzL2VkaXRvci10ZXh0LmNzc1wiO1xuaW1wb3J0IHtwcm9wfSBmcm9tIFwiLi4vLi4vYXRvbS1uZXh0L3Byb3BcIjtcbmltcG9ydCB7YXV0b3dhdGNofSBmcm9tIFwiLi4vLi4vYXRvbS1uZXh0L2F1dG93YXRjaFwiO1xuXG5jbGFzcyBVc2VyIHtcbiAgICBAcHJvcCBmaXJzdE5hbWU6c3RyaW5nO1xuICAgIEBwcm9wIGxhc3ROYW1lOnN0cmluZztcblxuICAgIEBwcm9wIGdldCBmdWxsTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROYW1lICsgJyAnICsgdGhpcy5sYXN0TmFtZTtcbiAgICB9XG59XG5jb25zdCB1c2VyID0gbmV3IFVzZXIoKTtcbnVzZXIuZmlyc3ROYW1lID0gXCJKb2huXCI7XG51c2VyLmxhc3ROYW1lID0gXCJNaWxsZXJcIjtcblxuXG4od2luZG93IGFzIGFueSkudXNlciA9IHVzZXI7XG5AYXV0b3dhdGNoXG5jbGFzcyBDbXAge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2codXNlci5mdWxsTmFtZSk7XG4gICAgfVxuXG4gICAgZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxufVxuXG5uZXcgQ21wKCkucmVuZGVyKCk7XG5cbkBhdXRvd2F0Y2hcbmV4cG9ydCBjbGFzcyBFZGl0b3JUZXh0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHttb2RlbDpFZGl0b3JNb2RlbDsgcmVuZGVyTGluZXM6bnVtYmVyW107fSwge30+IHtcbiAgICBAcHJvcCBtb2RlbCA9IHRoaXMucHJvcHMubW9kZWw7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImVkaXRvci10ZXh0XCI+XG4gICAgICAgICAgICA8RWRpdG9yS2V5SGFuZGxlciBtb2RlbD17dGhpcy5tb2RlbH0vPlxuXG4gICAgICAgICAgICB7dGhpcy5tb2RlbC5saW5lcy5tYXAoKGxpbmUsIGxpbmVQb3MpID0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5lXCIga2V5PXtsaW5lUG9zfSBzdHlsZT17e3RvcDogdGhpcy5wcm9wcy5yZW5kZXJMaW5lc1tsaW5lUG9zXX19PlxuICAgICAgICAgICAgICAgICAgICA8U3BlYWtlcnMgbW9kZWw9e3RoaXMubW9kZWx9IGxpbmVQb3M9e2xpbmVQb3N9Lz5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRMaW5lIG1vZGVsPXt0aGlzLm1vZGVsfSBsaW5lPXtsaW5lfSBsaW5lUG9zPXtsaW5lUG9zfSBsYW5nPXtMYW5nLkVOfS8+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0TGluZSBtb2RlbD17dGhpcy5tb2RlbH0gbGluZT17bGluZX0gbGluZVBvcz17bGluZVBvc30gbGFuZz17TGFuZy5SVX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5AYXV0b3dhdGNoXG5jbGFzcyBTcGVha2VycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7bW9kZWw6RWRpdG9yTW9kZWw7IGxpbmVQb3M6bnVtYmVyO30se30+IHtcbiAgICBzZXRTcGVha2VyKHBvczpudW1iZXIsIHNwZWFrZXI6c3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBvcywgc3BlYWtlcik7XG4gICAgICAgIHRoaXMucHJvcHMubW9kZWwudGV4dE1vZGVsLnNldFNwZWFrZXIocG9zLCBzcGVha2VyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSB0aGlzLnByb3BzLm1vZGVsLmxpbmVzW3RoaXMucHJvcHMubGluZVBvc107XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNwZWFrZXJzXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5tb2RlbC5zcGVha2Vycy5saXN0Lm1hcChzcGVha2VyID0+XG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3NwZWFrZXJ9IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInNwZWFrZXJcIiwgeydzZWxlY3RlZCc6IHNwZWFrZXIgPT0gbGluZS5zcGVha2VyfSl9XG4gICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTcGVha2VyKHRoaXMucHJvcHMubGluZVBvcywgc3BlYWtlcil9PntzcGVha2VyfTwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICB9XG59XG5cbkBhdXRvd2F0Y2hcbmNsYXNzIFRleHRMaW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHttb2RlbDpFZGl0b3JNb2RlbDsgbGluZTpFZGl0b3JMaW5lOyBsaW5lUG9zOm51bWJlcjsgbGFuZzpMYW5nO30se30+IHtcbiAgICBzcGFuQ2xhc3NOYW1lKHRleHRMaW5lOkVkaXRvclRleHRMaW5lLCB3b3JkOkVkaXRvcldvcmQpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXMoeydzZWxlY3RlZCc6IHRoaXMucHJvcHMubW9kZWwudGV4dE1vZGVsLnNlbGVjdGlvbi53b3JkID09IHdvcmQgJiYgdGhpcy5wcm9wcy5tb2RlbC50ZXh0TW9kZWwuc2VsZWN0aW9uLnRleHRMaW5lID09IHRleHRMaW5lfSk7XG4gICAgfVxuXG4gICAgc2V0V29yZE5vZGUod29yZDpFZGl0b3JXb3JkLCBub2RlOkhUTUxFbGVtZW50KSB7XG4gICAgICAgIHdvcmQuc3BhbiA9IG5vZGU7XG4gICAgfVxuXG4gICAgb25Xb3JkQ2xpY2soZTpSZWFjdC5Nb3VzZUV2ZW50LCBsaW5lUG9zOm51bWJlciwgbGFuZzpMYW5nLCB3b3JkUG9zOm51bWJlcikge1xuICAgICAgICB0aGlzLnByb3BzLm1vZGVsLnRleHRNb2RlbC5zZWxlY3Rpb24uc2V0KGxpbmVQb3MsIGxhbmcsIHdvcmRQb3MpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25UZXh0TGluZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm1vZGVsLnRleHRNb2RlbC5zZWxlY3Rpb24uc2V0KHRoaXMucHJvcHMubGluZVBvcywgdGhpcy5wcm9wcy5sYW5nLCAwKTtcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkV29yZFBvcyA9IDA7XG4gICAgfVxuXG4gICAgQHByb3AgZWRpdE1vZGUgPSBmYWxzZTtcblxuICAgIG9uRWRpdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25TYXZlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJvcHMubW9kZWwudGV4dE1vZGVsLnNldFdvcmRzKHRoaXMucHJvcHMubGluZVBvcywgdGhpcy5wcm9wcy5sYW5nLCAodGhpcy5yZWZzWydpbnB1dCddIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgbGluZSA9IHRoaXMucHJvcHMubGluZTtcbiAgICAgICAgY29uc3QgbGluZVBvcyA9IHRoaXMucHJvcHMubGluZVBvcztcbiAgICAgICAgY29uc3QgbGFuZyA9IHRoaXMucHJvcHMubGFuZztcbiAgICAgICAgY29uc3QgdGV4dExpbmUgPSBsYW5nID09IExhbmcuUlUgPyBsaW5lLnJ1IDogbGluZS5lbjsgLy8gdG9kb1xuICAgICAgICByZXR1cm4gIDxkaXYgY2xhc3NOYW1lPVwidGV4dGxpbmUgcnVcIiBvbkNsaWNrPXt0aGlzLm9uVGV4dExpbmVDbGlja30+XG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLm9uRWRpdH0gY2xhc3NOYW1lPVwidGV4dGxpbmUtZWRpdGJ1dHRvblwiPkVkaXQ8L3NwYW4+XG4gICAgICAgICAgICB7dGhpcy5lZGl0TW9kZSA/XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0bGluZS1lZGl0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cImlucHV0XCIgdmFsdWU9e3RleHRMaW5lLmdldFRleHQoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub25TYXZlfT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5vbkNhbmNlbH0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgIHRleHRMaW5lLndvcmRzLm1hcCgodywgd29yZFBvcykgPT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXt0aGlzLnNwYW5DbGFzc05hbWUodGV4dExpbmUsIHcpfSBrZXk9e3dvcmRQb3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17bm9kZSA9PiB0aGlzLnNldFdvcmROb2RlKHcsIG5vZGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLm9uV29yZENsaWNrKGUsIGxpbmVQb3MsIHRoaXMucHJvcHMubGFuZywgd29yZFBvcyl9Pnt3LndvcmR9PC9zcGFuPilcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZWRpdG9yL2VkaXRvci10ZXh0LnRzeFxuICoqLyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5zdWJzdHIoMSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7RWRpdG9yTW9kZWx9IGZyb20gXCIuL2VkaXRvci1tb2RlbFwiO1xuaW1wb3J0IHthdXRvd2F0Y2h9IGZyb20gXCIuLi8uLi9hdG9tLW5leHQvYXV0b3dhdGNoXCI7XG5lbnVtIEtleUNvZGVze1xuICAgIEVOVEVSICAgICA9IDEzLFxuICAgIEJBQ0tTUEFDRSA9IDgsXG4gICAgVVAgICAgICAgID0gMzgsXG4gICAgRE9XTiAgICAgID0gNDAsXG4gICAgUklHSFQgICAgID0gMzksXG4gICAgTEVGVCAgICAgID0gMzcsXG4gICAgWiAgICAgICAgID0gOTAsXG59XG5cbkBhdXRvd2F0Y2hcbmV4cG9ydCBjbGFzcyBFZGl0b3JLZXlIYW5kbGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHttb2RlbDogRWRpdG9yTW9kZWw7fSx7fT57XG4gICAga2V5SGFuZGxlciA9IChlOktleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLnByb3BzLm1vZGVsO1xuXG4gICAgICAgIHZhciBoYW5kbGVkID0gZmFsc2U7XG4gICAgICAgIGlmICghbW9kZWwudGV4dE1vZGVsLnNlbGVjdGlvbi5saW5lIHx8ICFtb2RlbC50ZXh0TW9kZWwuc2VsZWN0aW9uLnRleHRMaW5lKSB7XG4gICAgICAgICAgICBtb2RlbC50ZXh0TW9kZWwuc2VsZWN0aW9uLnNldCgwLCAwLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xuICAgICAgICB2YXIgaXNDdHJsID0gZS5tZXRhS2V5IHx8IGUuY3RybEtleTtcbiAgICAgICAgaWYgKGtleUNvZGUgPT0gS2V5Q29kZXMuRU5URVIpIHtcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgbW9kZWwuaGlzdG9yeS5hZGQobW9kZWwudGV4dE1vZGVsLnNwbGl0SW50b05ld0xpbmUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbC5oaXN0b3J5LmFkZChtb2RlbC50ZXh0TW9kZWwuc3BsaXRXaXRoTW92ZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleUNvZGUgPT0gS2V5Q29kZXMuQkFDS1NQQUNFKSB7XG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIG1vZGVsLmhpc3RvcnkuYWRkKG1vZGVsLnRleHRNb2RlbC5qb2luTGluZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vZGVsLmhpc3RvcnkuYWRkKG1vZGVsLnRleHRNb2RlbC5qb2luTGluZVdpdGhNb3ZlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29kZSA9PSBLZXlDb2Rlcy5aICYmIGlzQ3RybCkge1xuICAgICAgICAgICAgbW9kZWwuaGlzdG9yeS51bmRvKCk7XG4gICAgICAgICAgICBoYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5Q29kZSA9PSBLZXlDb2Rlcy5MRUZUKSB7XG4gICAgICAgICAgICBtb2RlbC50ZXh0TW9kZWwubGVmdCgpO1xuICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleUNvZGUgPT0gS2V5Q29kZXMuUklHSFQpIHtcbiAgICAgICAgICAgIG1vZGVsLnRleHRNb2RlbC5yaWdodCgpO1xuICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleUNvZGUgPT0gS2V5Q29kZXMuVVApIHtcbiAgICAgICAgICAgIG1vZGVsLnRleHRNb2RlbC51cCgpO1xuICAgICAgICAgICAgaGFuZGxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleUNvZGUgPT0gS2V5Q29kZXMuRE9XTikge1xuICAgICAgICAgICAgbW9kZWwudGV4dE1vZGVsLmRvd24oKTtcbiAgICAgICAgICAgIGhhbmRsZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2Nyb2xsKCkge1xuICAgICAgICB2YXIgd29yZFNwYW4gPSB0aGlzLnByb3BzLm1vZGVsLnRleHRNb2RlbC5zZWxlY3Rpb24ud29yZC5zcGFuIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB2YXIgcmVjdCA9IHdvcmRTcGFuLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGlmIChyZWN0LnRvcCA8IDApIHtcbiAgICAgICAgICAgIHdvcmRTcGFuLnNjcm9sbEludG9WaWV3KHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWN0LmJvdHRvbSA+ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkpIHtcbiAgICAgICAgICAgIHdvcmRTcGFuLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlIYW5kbGVyKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKTphbnl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VkaXRvci9lZGl0b3Ita2V5LWhhbmRsZXIudHNcbiAqKi8iLCJpbXBvcnQge0F0b20sIFRhc2tUeXBlLCBJRE1hcCwgQXRvbUFmZmVjdFN0YXR1cywgQXRvbVN0YXR1c30gZnJvbSBcIi4vaW5kZXhcIjtcbmNsYXNzIENvbXBvbmVudEF0b20gZXh0ZW5kcyBBdG9tIHtcbiAgICBwcm90ZWN0ZWQgY21wOmFueTtcblxuICAgIGNvbnN0cnVjdG9yKGNtcDphbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5nZXR0ZXIoY21wLmNvbnN0cnVjdG9yLm5hbWUgKyAnLnJlbmRlcicsIGNtcCwgY21wLm1haW5SZW5kZXIpO1xuICAgICAgICB0aGlzLmNtcCA9IGNtcDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlKHRvcExldmVsOmJvb2xlYW4sIGFmZmVjdEF0b21zOklETWFwPEF0b21BZmZlY3RTdGF0dXM+KSB7XG4gICAgICAgIGlmIChhZmZlY3RBdG9tc1t0aGlzLmlkXSA9PT0gQXRvbUFmZmVjdFN0YXR1cy5DQUxDKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdHVzID0gdG9wTGV2ZWwgPyBBdG9tQWZmZWN0U3RhdHVzLkNBTEMgOiB0aGlzLm5lZWRUb1JlY2FsYyhhZmZlY3RBdG9tcyk7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IEF0b21BZmZlY3RTdGF0dXMuV0FJVF9QQVJFTlRfQ0FMQykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBdG9tLmRlYnVnQXRvbXMgJiYgKEF0b20uZGVidWdBdG9tc1t0aGlzLmZpZWxkXSB8fCBBdG9tLmRlYnVnQXRvbXNbdGhpcy5pZF0pKSB7XG4gICAgICAgICAgICBBdG9tLmRlYnVnKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gQXRvbUFmZmVjdFN0YXR1cy5DQUxDICYmIHRoaXMuc3RhdHVzID09PSBBdG9tU3RhdHVzLkdFVFRFUikge1xuICAgICAgICAgICAgdGhpcy5jbXAuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBhZmZlY3RBdG9tc1t0aGlzLmlkXSA9IHN0YXR1cztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhdXRvd2F0Y2ggPSBmdW5jdGlvbiAoY2xzOmFueSkge1xuICAgIGNscy5wcm90b3R5cGUuY29tcG9uZW50QXRvbSA9IG51bGw7XG4gICAgY2xzLnByb3RvdHlwZS5tYWluUmVuZGVyID0gY2xzLnByb3RvdHlwZS5yZW5kZXI7XG4gICAgY2xzLnByb3RvdHlwZS5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmdW5jdGlvbiAobmV4dFByb3BzOmFueSkge1xuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gbmV4dFByb3BzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wc1twcm9wXSAhPT0gbmV4dFByb3BzW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHRoaXMucHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzW3Byb3BdICE9PSBuZXh0UHJvcHNbcHJvcF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNscy5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50QXRvbS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGNscy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRBdG9tKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRBdG9tLmdldFdpdGhGb3JjZUNhbGMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5jb21wb25lbnRBdG9tID0gbmV3IENvbXBvbmVudEF0b20odGhpcykpLmdldFdpdGhGb3JjZUNhbGMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXRvbS1uZXh0L2F1dG93YXRjaC50c1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9lZGl0b3Ivc3R5bGVzL2VkaXRvci10ZXh0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZWRpdG9yL3N0eWxlcy9lZGl0b3IuY3NzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtFZGl0b3JNb2RlbH0gZnJvbSBcIi4vLi4vZWRpdG9yLW1vZGVsXCI7XG5pbXBvcnQge0VkaXRvclRvb2xiYXJTcGVha2Vyc30gZnJvbSBcIi4vc3BlYWtlcnNcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3Rvb2xiYXIuY3NzXCI7XG5pbXBvcnQge2F1dG93YXRjaH0gZnJvbSBcIi4uLy4uLy4uL2F0b20tbmV4dC9hdXRvd2F0Y2hcIjtcblxuQGF1dG93YXRjaFxuZXhwb3J0IGNsYXNzIEVkaXRvclRvb2xiYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e21vZGVsOiBFZGl0b3JNb2RlbDt9LCB7fT4ge1xuICAgIG9uU2F2ZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubW9kZWwuc2F2ZSgpO1xuICAgIH1cblxuICAgIG9uVW5kbyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC5oaXN0b3J5LnVuZG8oKTtcbiAgICB9XG5cbiAgICBvblJlZG8gPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMubW9kZWwuaGlzdG9yeS5yZWRvKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJlZGl0b3ItdG9vbGJhclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uU2F2ZX0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub25VbmRvfT5VbmRvPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLm9uUmVkb30+UmVkbzwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8RWRpdG9yVG9vbGJhclNwZWFrZXJzIG1vZGVsPXt0aGlzLnByb3BzLm1vZGVsfS8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lZGl0b3IvdG9vbGJhci90b29sYmFyLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtFZGl0b3JNb2RlbH0gZnJvbSBcIi4uL2VkaXRvci1tb2RlbFwiO1xuaW1wb3J0IHtFZGl0b3JUb29sYmFyU3BlYWtlcn0gZnJvbSBcIi4vc3BlYWtlclwiO1xuaW1wb3J0IFwiLi9zdHlsZXMvc3BlYWtlcnMuY3NzXCI7XG5pbXBvcnQge2F1dG93YXRjaH0gZnJvbSBcIi4uLy4uLy4uL2F0b20tbmV4dC9hdXRvd2F0Y2hcIjtcblxuQGF1dG93YXRjaFxuZXhwb3J0IGNsYXNzIEVkaXRvclRvb2xiYXJTcGVha2VycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7bW9kZWw6IEVkaXRvck1vZGVsfSwge30+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMucHJvcHMubW9kZWw7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNwZWFrZXJzXCI+XG4gICAgICAgICAgICA8aDM+U3BlYWtlcnM8L2gzPlxuICAgICAgICAgICAge21vZGVsLnNwZWFrZXJzLmxpc3QubWFwKChzcGVha2VyLCBwb3MpID0+XG4gICAgICAgICAgICAgICAgPEVkaXRvclRvb2xiYXJTcGVha2VyIGtleT17c3BlYWtlcn0gbW9kZWw9e21vZGVsfSBzcGVha2VyPXtzcGVha2VyfSBwb3M9e3Bvc30vPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxFZGl0b3JUb29sYmFyU3BlYWtlciBtb2RlbD17bW9kZWx9IHNwZWFrZXI9e1wiXCJ9IGFkZE1vZGU9e3RydWV9IHBvcz17bW9kZWwuc3BlYWtlcnMubGlzdC5sZW5ndGh9Lz5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZWRpdG9yL3Rvb2xiYXIvc3BlYWtlcnMudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0VkaXRvck1vZGVsfSBmcm9tIFwiLi4vZWRpdG9yLW1vZGVsXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9zcGVha2VyLmNzc1wiO1xuaW1wb3J0IHtwcm9wfSBmcm9tIFwiLi4vLi4vLi4vYXRvbS1uZXh0L3Byb3BcIjtcbmltcG9ydCB7YXV0b3dhdGNofSBmcm9tIFwiLi4vLi4vLi4vYXRvbS1uZXh0L2F1dG93YXRjaFwiO1xuXG5AYXV0b3dhdGNoXG5leHBvcnQgY2xhc3MgRWRpdG9yVG9vbGJhclNwZWFrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e21vZGVsOkVkaXRvck1vZGVsOyBhZGRNb2RlPzpib29sZWFuOyBzcGVha2VyOnN0cmluZzsgcG9zOm51bWJlcjt9LCB7fT4ge1xuICAgIEBwcm9wIGVkaXRNb2RlID0gZmFsc2U7XG5cbiAgICBvblJlbW92ZShwb3M6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJvcHMubW9kZWwuc3BlYWtlcnMucmVtb3ZlKHBvcylcbiAgICB9XG5cbiAgICBvbkVkaXQoKSB7XG4gICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uU2F2ZShwb3M6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC5zcGVha2Vycy5zYXZlKHBvcywgKHRoaXMucmVmc1snc3BlYWtlciddIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qgc3BlYWtlciA9IHRoaXMucHJvcHMuc3BlYWtlcjtcbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy5wcm9wcy5wb3M7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNwZWFrZXJcIj5cbiAgICAgICAgICAgIHtzcGVha2VyfVxuICAgICAgICAgICAge3RoaXMuZWRpdE1vZGUgP1xuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj0nc3BlYWtlcicgdmFsdWU9e3NwZWFrZXJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKT0+IHRoaXMub25DYW5jZWwoKX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCk9PiB0aGlzLm9uU2F2ZShwb3MpfT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCk9PiB0aGlzLm9uRWRpdCgpfT57dGhpcy5wcm9wcy5hZGRNb2RlID8gJ0FkZCcgOiAnRWRpdCd9PC9idXR0b24+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5hZGRNb2RlID8gbnVsbFxuICAgICAgICAgICAgICAgIDogPGJ1dHRvbiBvbkNsaWNrPXsoKT0+IHRoaXMub25SZW1vdmUocG9zKX0+WDwvYnV0dG9uPn1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VkaXRvci90b29sYmFyL3NwZWFrZXIudHN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2VkaXRvci90b29sYmFyL3N0eWxlcy9zcGVha2VyLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZWRpdG9yL3Rvb2xiYXIvc3R5bGVzL3NwZWFrZXJzLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZWRpdG9yL3Rvb2xiYXIvc3R5bGVzL3Rvb2xiYXIuY3NzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtFZGl0b3JNb2RlbH0gZnJvbSBcIi4vZWRpdG9yLW1vZGVsXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9lZGl0b3ItdGl0bGUuY3NzXCI7XG5pbXBvcnQge2F1dG93YXRjaH0gZnJvbSBcIi4uLy4uL2F0b20tbmV4dC9hdXRvd2F0Y2hcIjtcblxuQGF1dG93YXRjaFxuZXhwb3J0IGNsYXNzIEVkaXRvclRpdGxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHttb2RlbDpFZGl0b3JNb2RlbH0se30+IHtcbiAgICBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC5zZXRUaXRsZSgodGhpcy5yZWZzWydpbnB1dCddIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImVkaXRvci10aXRsZVwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IHJlZj1cImlucHV0XCIgdmFsdWU9e3RoaXMucHJvcHMubW9kZWwudGl0bGV9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VkaXRvci9lZGl0b3ItdGl0bGUudHN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2VkaXRvci9zdHlsZXMvZWRpdG9yLXRpdGxlLmNzc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7RWRpdG9yTW9kZWx9IGZyb20gXCIuL2VkaXRvci1tb2RlbFwiO1xuaW1wb3J0IFwiLi9zdHlsZXMvZWRpdG9yLXRhZ3MuY3NzXCI7XG5pbXBvcnQge2F1dG93YXRjaH0gZnJvbSBcIi4uLy4uL2F0b20tbmV4dC9hdXRvd2F0Y2hcIjtcblxuQGF1dG93YXRjaFxuZXhwb3J0IGNsYXNzIEVkaXRvclRhZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e21vZGVsOiBFZGl0b3JNb2RlbH0se30+IHtcbiAgICBvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC5zZXRUYWdzKCh0aGlzLnJlZnNbJ2lucHV0J10gYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZWRpdG9yLXRhZ3NcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSByZWY9XCJpbnB1dFwiIHZhbHVlPXt0aGlzLnByb3BzLm1vZGVsLnRhZ3N9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VkaXRvci9lZGl0b3ItdGFncy50c3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZWRpdG9yL3N0eWxlcy9lZGl0b3ItdGFncy5jc3NcbiAqKiBtb2R1bGUgaWQgPSA2MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1Bvc3RNb2RlbH0gZnJvbSBcIi4vLi4vbW9kZWxzL3Bvc3RcIjtcbmltcG9ydCB7VGh1bWJzfSBmcm9tIFwiLi90aHVtYnNcIjtcbmltcG9ydCB7VGltZWxpbmV9IGZyb20gXCIuL3RpbWVsaW5lXCI7XG5pbXBvcnQge1RpbWVsaW5lQ29ubmVjdG9yfSBmcm9tIFwiLi90aW1lbGluZS1jb25uZWN0b3JcIjtcbmltcG9ydCB7TGluZUFsbG9jYXRvcn0gZnJvbSBcIi4uL3V0aWxzL3RpbWUtYWxsb2NhdGVcIjtcbmltcG9ydCB7U3VidGl0bGVzfSBmcm9tIFwiLi9zdWJ0aXRsZXNcIjtcbmltcG9ydCB7QXVkaW9QbGF5ZXJ9IGZyb20gXCIuLi91dGlscy9hdWRpby1wbGF5ZXJcIjtcbmltcG9ydCB7Y29uZmlnfSBmcm9tIFwiLi4vLi4vLi4vYmFja2VuZC9jb25maWdcIjtcbmltcG9ydCB7RWRpdG9ySGlzdG9yeX0gZnJvbSBcIi4uL3V0aWxzL2hpc3RvcnlcIjtcbmltcG9ydCBcIi4vdmlld2VyLmNzc1wiO1xuXG5leHBvcnQgY2xhc3MgVmlld2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtwYXJhbXM6IGFueSwgcmVzb2x2ZWQ6IFBvc3RNb2RlbH0sIHt9PiB7XG4gICAgYXVkaW9QbGF5ZXIgPSBuZXcgQXVkaW9QbGF5ZXIoKTtcbiAgICBoaXN0b3J5ID0gbmV3IEVkaXRvckhpc3RvcnkoKTtcblxuICAgIHN0YXRpYyBsb2FkKHBhcmFtczphbnkpIHtcbiAgICAgICAgcmV0dXJuIFBvc3RNb2RlbC5mZXRjaChwYXJhbXMuaWQpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAod2luZG93IGFzIGFueSkuZWRpdG9ySGlzdG9yeSA9IHRoaXMuaGlzdG9yeTtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnByb3BzLnJlc29sdmVkLmRhdGE7XG4gICAgICAgIGNvbnN0IGVuQXVkaW8gPSBkYXRhLm1lZGlhRmlsZXNbZGF0YS5wb3N0LmVuQXVkaW9dO1xuICAgICAgICBjb25zdCB1cmwgPSBjb25maWcuYmFzZVVybCArICcvJyArIGVuQXVkaW8udXJsO1xuICAgICAgICB0aGlzLmF1ZGlvUGxheWVyLmxvYWRTb3VuZCh1cmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBwb3N0TW9kZWwgPSB0aGlzLnByb3BzLnJlc29sdmVkO1xuICAgICAgICBjb25zdCBsaW5lSCA9IDUwO1xuICAgICAgICBjb25zdCByZXNpemVLb2VmID0gNDtcblxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBwb3N0TW9kZWwubGluZXMubWFwKGxpbmUgPT4gKGxpbmUuZW4uc3RhcnQgKyBsaW5lLmVuLmR1ciAvIDIpIC8gcmVzaXplS29lZik7XG4gICAgICAgIGNvbnN0IHJlbmRlckxpbmVzID0gbmV3IExpbmVBbGxvY2F0b3IocG9zaXRpb25zLCA1MCkuYWxsb2NhdGVSZW5kZXJMaW5lcygpO1xuXG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKT0+dGhpcy5oaXN0b3J5LnVuZG8oKX0+VW5kbzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCk9PnRoaXMuaGlzdG9yeS5yZWRvKCl9PlJlZG88L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge3RoaXMuYXVkaW9QbGF5ZXIuc291bmRMb2FkZWQgP1xuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxUaW1lbGluZSByZXNpemVLb2VmPXtyZXNpemVLb2VmfSBwbGF5ZXI9e3RoaXMuYXVkaW9QbGF5ZXJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPFRpbWVsaW5lQ29ubmVjdG9yIGxpbmVzPXtwb3N0TW9kZWwubGluZXN9IGxpbmVIPXtsaW5lSH0gcmVzaXplS29lZj17cmVzaXplS29lZn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcj17dGhpcy5hdWRpb1BsYXllcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnk9e3RoaXMuaGlzdG9yeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckxpbmVzPXtyZW5kZXJMaW5lc30vPlxuICAgICAgICAgICAgICAgIDwvZGl2PiA6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxUaHVtYnMgcG9zdE1vZGVsPXtwb3N0TW9kZWx9IHJlc2l6ZUtvZWY9e3Jlc2l6ZUtvZWZ9Lz5cbiAgICAgICAgICAgIHsvKjxWaWRlbyBwb3N0TW9kZWw9e3Bvc3RNb2RlbH0gcmVzaXplS29lZj17cmVzaXplS29lZn0vPiovfVxuICAgICAgICAgICAgPFN1YnRpdGxlcyBwb3N0TW9kZWw9e3Bvc3RNb2RlbH0gcGxheWVyPXt0aGlzLmF1ZGlvUGxheWVyfSByZXNpemVLb2VmPXtyZXNpemVLb2VmfVxuICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJMaW5lcz17cmVuZGVyTGluZXN9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmlld2VyL3ZpZXdlci50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7UGxheWluZ1N0YXR1c30gZnJvbSBcInNvdW5kLXV0aWxzL1BsYXlcIjtcbmltcG9ydCB7SVRleHRMaW5lfSBmcm9tIFwiLi4vLi4vLi4vaW50ZXJmYWNlcy90ZXh0LWxpbmVcIjtcbmltcG9ydCB7UG9zdE1vZGVsfSBmcm9tIFwiLi4vbW9kZWxzL3Bvc3RcIjtcbmltcG9ydCB7QXVkaW9QbGF5ZXJ9IGZyb20gXCIuLi91dGlscy9hdWRpby1wbGF5ZXJcIjtcbmltcG9ydCBcIi4vc3VidGl0bGVzLmNzc1wiO1xuXG5leHBvcnQgY2xhc3MgU3VidGl0bGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtwb3N0TW9kZWw6IFBvc3RNb2RlbDsgcGxheWVyOiBBdWRpb1BsYXllcjsgcmVzaXplS29lZjogbnVtYmVyOyByZW5kZXJMaW5lczogbnVtYmVyW119LCB7fT4ge1xuICAgIGR1cmF0aW9uOm51bWJlciA9IDA7XG4gICBcbiAgICB0aW1lVG9ZKHRpbWU6bnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aW1lICogMTAwIC8gdGhpcy5wcm9wcy5yZXNpemVLb2VmO1xuICAgIH1cblxuICAgIHNob3dSdVRleHRMaW5lKGk6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMub3BlbmVkUnVUZXh0TGluZXNbaV0gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaGlkZVJ1VGV4dExpbmUoaTpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vcGVuZWRSdVRleHRMaW5lc1tpXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgb3BlbmVkUnVUZXh0TGluZXM6Ym9vbGVhbltdID0gW107XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgICAgICAgIGxldCBwbGF5aW5nTGluZSA9IC0xO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMucGxheWVyLnBsYXllci5nZXRTdGF0ZSgpID09IFBsYXlpbmdTdGF0dXMuUExBWUlORykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5wb3N0TW9kZWwubGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSB0aGlzLnByb3BzLnBvc3RNb2RlbC5saW5lc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChsaW5lLmVuKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5aW5nTGluZSA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlpbmdMaW5lICE9PSBwbGF5aW5nTGluZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWluZ0xpbmUgPSBwbGF5aW5nTGluZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG4gICAgcGxheWluZ0xpbmUgPSAtMTtcblxuICAgIGlzU2VsZWN0ZWQodGV4dExpbmU6SVRleHRMaW5lKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy5wcm9wcy5wbGF5ZXIucGxheWVyLmdldEN1cnJlbnRUaW1lKCk7XG4gICAgICAgIHJldHVybiAoKHRleHRMaW5lLnN0YXJ0KSAvIDEwMCkgPD0gY3VycmVudFRpbWUgJiYgY3VycmVudFRpbWUgPD0gKHRleHRMaW5lLnN0YXJ0ICsgdGV4dExpbmUuZHVyKSAvIDEwMFxuICAgIH1cblxuXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uWSA9IHRoaXMudGltZVRvWSh0aGlzLmR1cmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVzXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5wb3N0TW9kZWwubGluZXMubWFwKChsaW5lLCBpKSA9PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwibGluZVwiLCB7cGxheWluZzogdGhpcy5wbGF5aW5nTGluZSA9PSBpLCBzZWxlY3RlZDogdGhpcy5pc1NlbGVjdGVkKGxpbmUuZW4pfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsoKT0+dGhpcy5zaG93UnVUZXh0TGluZShpKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZVVwPXsoKT0+dGhpcy5oaWRlUnVUZXh0TGluZShpKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t0b3A6IHRoaXMucHJvcHMucmVuZGVyTGluZXNbaV19fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlblwiPntsaW5lLmVuID8gbGluZS5lbi50ZXh0IDogJyd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLm9wZW5lZFJ1VGV4dExpbmVzW2ldID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicnVcIj57bGluZS5ydSA/IGxpbmUucnUudGV4dCA6ICcnfTwvZGl2PiA6IG51bGx9XG4gICAgICAgICAgICAgICAgPC9kaXY+KX1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmlld2VyL3N1YnRpdGxlcy50c3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdmlld2VyL3N1YnRpdGxlcy5jc3NcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3ZpZXdlci92aWV3ZXIuY3NzXG4gKiogbW9kdWxlIGlkID0gNjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAnLi91cGxvYWQuY3NzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7VHJhY2tJbmZvfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3RyYWNrLWluZm8nO1xuaW1wb3J0IHtQb3N0fSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3Bvc3QnO1xuaW1wb3J0IHtNZWRpYVR5cGV9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvbWVkaWEtdHlwZXMnO1xuaW1wb3J0IHtlZGl0b3JSb3V0ZX0gZnJvbSBcIi4uL3JvdXRlc1wiO1xuXG5pbnRlcmZhY2UgTWVkaWFSZXN1bHQge1xuICAgIHZpZGVvOiBUcmFja0luZm87XG4gICAgc3ViczogVHJhY2tJbmZvW107XG4gICAgYXVkaW86IFRyYWNrSW5mb1tdO1xufVxuXG5mdW5jdGlvbiBnZXRUeXBlKHR5cGU6TWVkaWFUeXBlLCBtZWRpYVJlc3VsdDpNZWRpYVJlc3VsdCkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIE1lZGlhVHlwZS5WSURFTzpcbiAgICAgICAgICAgIHJldHVybiBbbWVkaWFSZXN1bHQudmlkZW9dO1xuICAgICAgICBjYXNlIE1lZGlhVHlwZS5BVURJTzpcbiAgICAgICAgICAgIHJldHVybiBtZWRpYVJlc3VsdC5hdWRpbztcbiAgICAgICAgY2FzZSBNZWRpYVR5cGUuU1VCUzpcbiAgICAgICAgICAgIHJldHVybiBtZWRpYVJlc3VsdC5zdWJzO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVXBsb2FkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtwYXJhbXM6IGFueSwgcmVzb2x2ZWQ6IGFueX0se30+IHtcbiAgICByZXM6TWVkaWFSZXN1bHQ7XG4gICAgcG9zdElkOnN0cmluZztcbiAgICBmb3JtOlBvc3QgPSB7dGl0bGU6ICdIZWxsbycsIHZpZGVvOiBudWxsLCBlbkF1ZGlvOiBudWxsLCBydUF1ZGlvOiBudWxsLCBlblN1YjogbnVsbCwgcnVTdWI6IG51bGx9O1xuICAgIHZpZGVvRG9uZSA9IChyZXM6TWVkaWFSZXN1bHQpPT4ge1xuICAgICAgICB0aGlzLnJlcyA9IHJlcztcbiAgICAgICAgdGhpcy5mb3JtLnZpZGVvID0gcmVzLnZpZGVvID8gcmVzLnZpZGVvLmlkIDogbnVsbDtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBvblN1Ym1pdCA9ICgpID0+IHtcbiAgICAgICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNS92MS9wb3N0Jywge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0aGlzLmZvcm0pXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiBkYXRhLmpzb24oKSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIC8vdGhpcy5wb3N0SWQgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICBlZGl0b3JSb3V0ZS5nb3RvKHtpZDogZGF0YS5kYXRhfSlcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWNjZXNzJyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZmlsdGVyTGFuZyhpdGVtczpUcmFja0luZm9bXSwgbGFuZzpzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcihpdGVtID0+ICFpdGVtLmxhbmcgfHwgaXRlbS5sYW5nID09IGxhbmcpO1xuICAgIH1cblxuICAgIF9zdGFydFRpbWUgPSBNYXRoLnJhbmRvbSgpICogNzAwMCB8IDA7XG4gICAgX2VuZFRpbWUgPSB0aGlzLl9zdGFydFRpbWUgKyAyNTA7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAge3RoaXMucmVzID9cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0TWVkaWEgdHlwZT17TWVkaWFUeXBlLkFVRElPfSBsYWJlbD1cIkVuIEF1ZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZT17dGhpcy5fc3RhcnRUaW1lfSBlbmRUaW1lPXt0aGlzLl9lbmRUaW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbCA9PiB0aGlzLmZvcm0uZW5BdWRpbyA9IHZhbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLmZpbHRlckxhbmcodGhpcy5yZXMuYXVkaW8sICdlbmcnKX0vPlxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0TWVkaWEgdHlwZT17TWVkaWFUeXBlLkFVRElPfSBsYWJlbD1cIlJ1IEF1ZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZT17dGhpcy5fc3RhcnRUaW1lfSBlbmRUaW1lPXt0aGlzLl9lbmRUaW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbCA9PiB0aGlzLmZvcm0ucnVBdWRpbyA9IHZhbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLmZpbHRlckxhbmcodGhpcy5yZXMuYXVkaW8sICdydXMnKX0vPlxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0TWVkaWEgdHlwZT17TWVkaWFUeXBlLlNVQlN9IGxhYmVsPVwiRW4gU3Vic1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWU9e3RoaXMuX3N0YXJ0VGltZX0gZW5kVGltZT17dGhpcy5fZW5kVGltZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt2YWwgPT4gdGhpcy5mb3JtLmVuU3ViID0gdmFsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM9e3RoaXMuZmlsdGVyTGFuZyh0aGlzLnJlcy5zdWJzLCAnZW5nJyl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdE1lZGlhIHR5cGU9e01lZGlhVHlwZS5TVUJTfSBsYWJlbD1cIlJ1IFN1YnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lPXt0aGlzLl9zdGFydFRpbWV9IGVuZFRpbWU9e3RoaXMuX2VuZFRpbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dmFsID0+IHRoaXMuZm9ybS5ydVN1YiA9IHZhbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLmZpbHRlckxhbmcodGhpcy5yZXMuc3VicywgJ3J1cycpfS8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPkNyZWF0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICA8VXBsb2FkZXIgc3RhcnRUaW1lPXt0aGlzLl9zdGFydFRpbWV9IGVuZFRpbWU9e3RoaXMuX2VuZFRpbWV9IG9uRG9uZT17dGhpcy52aWRlb0RvbmV9Lz5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbmNsYXNzIFNlbGVjdE1lZGlhIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHtcbiAgICB0eXBlOiBNZWRpYVR5cGU7XG4gICAgb25DaGFuZ2U6ICh2YWw6c3RyaW5nKT0+dm9pZDtcbiAgICBpdGVtczogVHJhY2tJbmZvW107XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBzdGFydFRpbWU6IG51bWJlcjtcbiAgICBlbmRUaW1lOiBudW1iZXI7XG59LHt9PiB7XG4gICAgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA/IHRoaXMucHJvcHMuaXRlbXNbMF0gOiBudWxsO1xuXG4gICAgb25DaGFuZ2UoaXRlbTpUcmFja0luZm8pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtLmlkKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG5cbiAgICByZXN1bHQ6TWVkaWFSZXN1bHQ7XG5cbiAgICB1cGxvYWRJdGVtczpUcmFja0luZm9bXSA9IFtdO1xuICAgIG9uRG9uZSA9IChyZXN1bHQ6TWVkaWFSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy51cGxvYWRJdGVtcyA9IGdldFR5cGUodGhpcy5wcm9wcy50eXBlLCByZXN1bHQpO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvL3RvZG86IHNob3cgY29ycmVjdCB0aXRsZSBpZiBubyBsYW5nIGFuZCBubyB0aXRsZVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdGVkLmlkIDogbnVsbCk7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLmxhYmVsfTwvbGFiZWw+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5pdGVtcy5jb25jYXQodGhpcy51cGxvYWRJdGVtcykubWFwKChpdGVtLCBpKSA9PiA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zZWxlY3RlZCA9PSBpdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCk9PnRoaXMub25DaGFuZ2UoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIi8+XG4gICAgICAgICAgICAgICAgICAgIHtgJHtpdGVtLnRpdGxlfSAoJHtpdGVtLmxhbmd9KWB9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2Pil9XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnVwbG9hZEl0ZW1zLmxlbmd0aCA/IG51bGwgOlxuICAgICAgICAgICAgICAgIDxVcGxvYWRlciBzdGFydFRpbWU9e3RoaXMucHJvcHMuc3RhcnRUaW1lfSBlbmRUaW1lPXt0aGlzLnByb3BzLmVuZFRpbWV9IG9uRG9uZT17dGhpcy5vbkRvbmV9Lz59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuXG59XG5jbGFzcyBVcGxvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7XG4gICAgb25Eb25lPzogKGluZm86TWVkaWFSZXN1bHQpPT52b2lkO1xuICAgIG9uSW5mbz86IChpbmZvOmFueSk9PnZvaWQ7XG4gICAgc3RhcnRUaW1lOiBudW1iZXI7XG4gICAgZW5kVGltZTogbnVtYmVyO1xufSwge30+IHtcblxuICAgIHNpZDpzdHJpbmc7XG4gICAgc3RhcnRVcGxvYWRUaW1lID0gMDtcbiAgICBzdGFydEV4dHJhY3RUaW1lID0gMDtcbiAgICBwcmVTaXplID0gMC4yO1xuICAgIG1pZGRsZVNpemUgPSAwLjY7XG4gICAgZW5kU2l6ZSA9IDAuMjtcbiAgICBwcm9ncmVzcyA9IDA7XG4gICAgdXBsb2FkRG9uZSA9IGZhbHNlO1xuICAgIGV4dHJhY3REb25lID0gZmFsc2U7XG4gICAgaXNTZW5kaW5nID0gZmFsc2U7XG4gICAgc3RyZWFtczp7W2luZDogc3RyaW5nXTpib29sZWFufSA9IHt9O1xuICAgIHNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0Ojc4NzgnKTtcbiAgICBmaWxlU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBlcnJvciA9IGZhbHNlO1xuICAgIGludGVydmFsOm51bWJlcjtcblxuICAgIGdldEZpbGUoKSB7XG4gICAgICAgIHZhciBmaWxlSW5wdXQgPSB0aGlzLnJlZnNbJ2ZpbGVJbnB1dCddIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBmaWxlSW5wdXQuZmlsZXNbMF07XG4gICAgfVxuXG4gICAgb25DaGFuZ2UgPSAoKT0+IHtcbiAgICAgICAgdGhpcy5maWxlU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfTtcblxuICAgIG9uKGV2ZW50OnN0cmluZywgY2FsbGJhY2s6KGRhdGE6YW55KT0+dm9pZCkge1xuICAgICAgICB0aGlzLnNvY2tldC5vbihldmVudCArICctJyArIHRoaXMuc2lkLCAoZGF0YTphbnkpPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQsIHRoaXMuc2lkLCBkYXRhKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZW5kKCkge1xuICAgICAgICB0aGlzLmlzU2VuZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhcnRVcGxvYWRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PnRoaXMuZm9yY2VVcGRhdGUoKSwgNjAwKTtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgZmlsZSA9IHRoaXMuZ2V0RmlsZSgpO1xuICAgICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiB0aGlzLnN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiB0aGlzLmVuZFRpbWUsXG4gICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICBzaXplOiBmaWxlLnNpemVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmZvKTtcbiAgICAgICAgICAgIGNvbnNvbGUudGltZSgncHJvY2VzcycpO1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc3RhcnQtdXBsb2FkJywgaW5mbywgKHNpZDpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpZCA9IHNpZDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKCdjbG9zZScsIHRoaXMub25DbG9zZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbignZGF0YS1uZWVkJywgdGhpcy5vbkRhdGFOZWVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKCdpbmZvJywgdGhpcy5vbkluZm8pO1xuICAgICAgICAgICAgICAgIHRoaXMub24oJ3VwbG9hZC1kb25lJywgdGhpcy5vblVwbG9hZERvbmUpO1xuICAgICAgICAgICAgICAgIHRoaXMub24oJ2RvbmUnLCB0aGlzLm9uRG9uZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbigncHJvZ3Jlc3MnLCB0aGlzLm9uUHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgIHRoaXMub24oJ2VycicsIHRoaXMub25FcnJvcilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNsb3NlID0gKGRhdGE6e2lkOiBzdHJpbmd9KSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcFN0cmVhbShkYXRhLmlkKTtcbiAgICB9O1xuXG4gICAgb25EYXRhTmVlZCA9IChkYXRhOntzdGFydDogbnVtYmVyLCBpZDogc3RyaW5nfSkgPT4ge1xuICAgICAgICB0aGlzLnNlbmRTdHJlYW0oZGF0YS5zdGFydCwgZGF0YS5pZCk7XG4gICAgfTtcblxuICAgIG9uSW5mbyA9IChpbmZvOk1lZGlhUmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uSW5mbykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkluZm8oaW5mbyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgb25Eb25lID0gKGluZm86TWVkaWFSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5leHRyYWN0RG9uZSA9IHRydWU7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uRG9uZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkRvbmUoaW5mbyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgb25VcGxvYWREb25lID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLnRpbWVFbmQoJ3Byb2Nlc3MnKTtcbiAgICAgICAgdGhpcy5zdGFydEV4dHJhY3RUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy51cGxvYWREb25lID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgb25Qcm9ncmVzcyA9IChkYXRhOntwcm9ncmVzczogbnVtYmVyfSkgPT4ge1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgb25FcnJvciA9IChlcnI6c3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMudXBsb2FkRG9uZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2VuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4dHJhY3REb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgICB0aGlzLnN0YXJ0RXh0cmFjdFRpbWUgPSAwO1xuICAgICAgICB0aGlzLnN0YXJ0VXBsb2FkVGltZSA9IDA7XG4gICAgfTtcblxuICAgIHN0b3BTdHJlYW0oaWQ6c3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcFN0cmVhbVwiLCBpZCk7XG4gICAgICAgIHRoaXMuc3RyZWFtc1tpZF0gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZW5kU3RyZWFtKHN0YXJ0Om51bWJlciwgaWQ6c3RyaW5nLCBwYXJ0U2l6ZT86bnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnVwbG9hZERvbmUgfHwgdGhpcy5lcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFydFNpemUpIHtcbiAgICAgICAgICAgIHBhcnRTaXplID0gMTAwMDA7XG4gICAgICAgIH1cbiAgICAgICAgcGFydFNpemUgPSBNYXRoLm1pbihwYXJ0U2l6ZSwgMTAwMDAwMCk7XG4gICAgICAgIHZhciBmaWxlID0gdGhpcy5nZXRGaWxlKCk7XG5cbiAgICAgICAgdGhpcy5zdHJlYW1zW2lkXSA9IHRydWU7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICB2YXIgZW5kID0gTWF0aC5taW4oc3RhcnQgKyBwYXJ0U2l6ZSwgZmlsZS5zaXplKTtcbiAgICAgICAgaWYgKGVuZCAtIHN0YXJ0ID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZW5kU3RyZWFtXCIsIHRoaXMuc2lkLCBzdGFydCwgZW5kIC0gc3RhcnQsIGlkKTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlLnNsaWNlKHN0YXJ0LCBlbmQpKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVhZGVyLnJlYWR5U3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdkYXRhJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHJlYWRlci5yZXN1bHQubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogcmVhZGVyLnJlc3VsdFxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdHJlYW1zW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFN0cmVhbShzdGFydCArIHBhcnRTaXplLCBpZCwgcGFydFNpemUgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGNQcm9ncmVzcygpIHtcbiAgICAgICAgdmFyIG1pZGRsZVBlcmNlbnQgPSB0aGlzLnByb2dyZXNzO1xuICAgICAgICB2YXIgdGltZUVsYXBzZWQgPSAoRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRVcGxvYWRUaW1lKSAvIDEwMCB8IDA7XG4gICAgICAgIHZhciBwcmVQZXJjZW50ID0gMDtcbiAgICAgICAgdmFyIGVuZFBlcmNlbnQgPSAwO1xuICAgICAgICBpZiAoIW1pZGRsZVBlcmNlbnQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGltZUVsYXBzZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHByZVBlcmNlbnQgKz0gMC4wNSAqICgxIC0gcHJlUGVyY2VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcmVQZXJjZW50ID0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0RXh0cmFjdFRpbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXh0cmFjdFRpbWVFbGFwc2VkID0gKERhdGUubm93KCkgLSB0aGlzLnN0YXJ0RXh0cmFjdFRpbWUpIC8gMTAwIHwgMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dHJhY3RUaW1lRWxhcHNlZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZFBlcmNlbnQgKz0gMC4wNSAqICgxIC0gZW5kUGVyY2VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmV4dHJhY3REb25lKSB7XG4gICAgICAgICAgICBlbmRQZXJjZW50ID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmVQZXJjZW50ICogdGhpcy5wcmVTaXplICsgbWlkZGxlUGVyY2VudCAqIHRoaXMubWlkZGxlU2l6ZSArIGVuZFBlcmNlbnQgKiB0aGlzLmVuZFNpemU7XG4gICAgfVxuXG4gICAgc3RhcnRUaW1lOnN0cmluZztcbiAgICBlbmRUaW1lOnN0cmluZztcblxuICAgIHNlY1RvVGltZShzZWM6bnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAoJzAnICsgKHNlYyAvIDM2MDAgfCAwKSkuc3Vic3RyKC0yKSArICc6JyArICgnMCcgKyAoc2VjIC8gNjAgJSA2MCB8IDApKS5zdWJzdHIoLTIpICsgJzonICsgKCcwJyArIChzZWMgJSA2MCkpLnN1YnN0cigtMik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHt0aGlzLmVycm9yID8gJ0Vycm9yIG9jY3VyZWQnIDpcbiAgICAgICAgICAgICAgICB0aGlzLmV4dHJhY3REb25lID9cbiAgICAgICAgICAgICAgICAgICAgJ1VwbG9hZGVkJ1xuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmlzU2VuZGluZyA/XG4gICAgICAgICAgICAgICAgICAgIDxwcm9ncmVzcyB2YWx1ZT17dGhpcy5jYWxjUHJvZ3Jlc3MoKS50b1N0cmluZygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5maWxlU2VsZWN0ZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc2VjVG9UaW1lKHRoaXMucHJvcHMuc3RhcnRUaW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtkID0+IHRoaXMuc3RhcnRUaW1lID0gKGQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zZWNUb1RpbWUodGhpcy5wcm9wcy5lbmRUaW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtkID0+IHRoaXMuZW5kVGltZSA9IChkIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT50aGlzLnNlbmQoKX0+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPVwiZmlsZUlucHV0XCIgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IHR5cGU9XCJmaWxlXCIvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VwbG9hZGVyL3VwbG9hZGVyLnRzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91cGxvYWRlci91cGxvYWQuY3NzXG4gKiogbW9kdWxlIGlkID0gNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBlbnVtIE1lZGlhVHlwZSB7XG4gICAgVklERU8gPSAxMCxcbiAgICBBVURJTyA9IDIwLFxuICAgIFNVQlMgPSAzMCxcbiAgICBUSFVNQlMgPSA0MCxcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9pbnRlcmZhY2VzL21lZGlhLXR5cGVzLnRzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==