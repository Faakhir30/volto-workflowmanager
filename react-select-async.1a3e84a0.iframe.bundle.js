"use strict";(self.webpackChunk_plone_volto=self.webpackChunk_plone_volto||[]).push([[5320],{"../../../node_modules/.pnpm/react-select@4.3.1_@types+react@18.3.20_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/react-select/async/dist/react-select.esm.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{defaultProps:function(){return defaultProps},makeAsyncSelect:function(){return makeAsyncSelect}});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../../node_modules/.pnpm/react-select@4.3.1_@types+react@18.3.20_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/react-select/dist/index-4bd03571.esm.js"),_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/createClass.js"),_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/inherits.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),_dist_Select_dbb12e54_esm_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("../../../node_modules/.pnpm/react-select@4.3.1_@types+react@18.3.20_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/react-select/dist/Select-dbb12e54.esm.js"),_dist_stateManager_845a3300_esm_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("../../../node_modules/.pnpm/react-select@4.3.1_@types+react@18.3.20_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/react-select/dist/stateManager-845a3300.esm.js"),defaultProps=(__webpack_require__("../../../node_modules/.pnpm/react-input-autosize@3.0.0_react@18.2.0/node_modules/react-input-autosize/lib/AutosizeInput.js"),__webpack_require__("../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/index.js"),{cacheOptions:!1,defaultOptions:!1,filterOption:null,isLoading:!1}),makeAsyncSelect=function makeAsyncSelect(SelectComponent){var _class,_temp;return _temp=_class=function(_Component){(0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__.c)(Async,_Component);var _super=(0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_4__._)(Async);function Async(props){var _this;return(0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__.c)(this,Async),(_this=_super.call(this)).select=void 0,_this.lastRequest=void 0,_this.mounted=!1,_this.handleInputChange=function(newValue,actionMeta){var _this$props=_this.props,cacheOptions=_this$props.cacheOptions,onInputChange=_this$props.onInputChange,inputValue=(0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_4__.H)(newValue,actionMeta,onInputChange);if(!inputValue)return delete _this.lastRequest,void _this.setState({inputValue:"",loadedInputValue:"",loadedOptions:[],isLoading:!1,passEmptyOptions:!1});if(cacheOptions&&_this.state.optionsCache[inputValue])_this.setState({inputValue:inputValue,loadedInputValue:inputValue,loadedOptions:_this.state.optionsCache[inputValue],isLoading:!1,passEmptyOptions:!1});else{var request=_this.lastRequest={};_this.setState({inputValue:inputValue,isLoading:!0,passEmptyOptions:!_this.state.loadedInputValue},(function(){_this.loadOptions(inputValue,(function(options){_this.mounted&&request===_this.lastRequest&&(delete _this.lastRequest,_this.setState((function(state){return{isLoading:!1,loadedInputValue:inputValue,loadedOptions:options||[],passEmptyOptions:!1,optionsCache:options?(0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_4__.a)((0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_4__.a)({},state.optionsCache),{},(0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__.c)({},inputValue,options)):state.optionsCache}})))}))}))}return inputValue},_this.state={defaultOptions:Array.isArray(props.defaultOptions)?props.defaultOptions:void 0,inputValue:void 0!==props.inputValue?props.inputValue:"",isLoading:!0===props.defaultOptions,loadedOptions:[],passEmptyOptions:!1,optionsCache:{},prevDefaultOptions:void 0,prevCacheOptions:void 0},_this}return(0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__.c)(Async,[{key:"componentDidMount",value:function componentDidMount(){var _this2=this;this.mounted=!0;var defaultOptions=this.props.defaultOptions,inputValue=this.state.inputValue;!0===defaultOptions&&this.loadOptions(inputValue,(function(options){if(_this2.mounted){var isLoading=!!_this2.lastRequest;_this2.setState({defaultOptions:options||[],isLoading:isLoading})}}))}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.mounted=!1}},{key:"focus",value:function focus(){this.select.focus()}},{key:"blur",value:function blur(){this.select.blur()}},{key:"loadOptions",value:function loadOptions(inputValue,callback){var loadOptions=this.props.loadOptions;if(!loadOptions)return callback();var loader=loadOptions(inputValue,callback);loader&&"function"==typeof loader.then&&loader.then(callback,(function(){return callback()}))}},{key:"render",value:function render(){var _this3=this,_this$props2=this.props;_this$props2.loadOptions;var isLoadingProp=_this$props2.isLoading,props=(0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_8__.c)(_this$props2,["loadOptions","isLoading"]),_this$state=this.state,defaultOptions=_this$state.defaultOptions,inputValue=_this$state.inputValue,isLoading=_this$state.isLoading,loadedInputValue=_this$state.loadedInputValue,loadedOptions=_this$state.loadedOptions,options=_this$state.passEmptyOptions?[]:inputValue&&loadedInputValue?loadedOptions:defaultOptions||[];return react__WEBPACK_IMPORTED_MODULE_0__.createElement(SelectComponent,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_9__.c)({},props,{ref:function ref(_ref){_this3.select=_ref},options:options,isLoading:isLoading||isLoadingProp,onInputChange:this.handleInputChange}))}}],[{key:"getDerivedStateFromProps",value:function getDerivedStateFromProps(props,state){var newCacheOptionsState=props.cacheOptions!==state.prevCacheOptions?{prevCacheOptions:props.cacheOptions,optionsCache:{}}:{},newDefaultOptionsState=props.defaultOptions!==state.prevDefaultOptions?{prevDefaultOptions:props.defaultOptions,defaultOptions:Array.isArray(props.defaultOptions)?props.defaultOptions:void 0}:{};return(0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_4__.a)((0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_4__.a)({},newCacheOptionsState),newDefaultOptionsState)}}]),Async}(react__WEBPACK_IMPORTED_MODULE_0__.Component),_class.defaultProps=defaultProps,_temp},SelectState=(0,_dist_stateManager_845a3300_esm_js__WEBPACK_IMPORTED_MODULE_10__.m)(_dist_Select_dbb12e54_esm_js__WEBPACK_IMPORTED_MODULE_11__.S),Async=makeAsyncSelect(SelectState);__webpack_exports__.default=Async}}]);