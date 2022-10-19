import { MetaWidgetsReduxState } from "reducers/entityReducers/metaWidgetsReducer";
import { getMetaWidgetChildrenIds } from "utils/metaWidgetReducerUtils";

const metaWidgets: MetaWidgetsReduxState = {
  p4clz8naty: {
    isVisible: true,
    defaultImage: "https://assets.appsmith.com/widgets/default.png",
    imageShape: "RECTANGLE",
    maxZoomLevel: 1,
    enableRotation: false,
    enableDownload: false,
    objectFit: "cover",
    image: "{{((currentItem) => currentItem.img)(Image1.currentItem)}}",
    widgetName: "Image1",
    version: 1,
    animateLoading: true,
    type: "IMAGE_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Image",
    key: "1dfnn5p2nk",
    iconSVG: "/static/media/icon.52d8fb963abcb95c79b10f1553389f22.svg",
    boxShadow: "none",
    dynamicBindingPathList: [
      {
        key: "image",
      },
      {
        key: "borderRadius",
      },
      {
        key: "currentItem",
      },
      {
        key: "currentRow",
      },
    ],
    dynamicTriggerPathList: [],
    widgetId: "p4clz8naty",
    renderMode: "CANVAS",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 0,
    rightColumn: 16,
    topRow: 0,
    bottomRow: 8,
    parentId: "15svapj5qx",
    logBlackList: {
      isVisible: true,
      defaultImage: true,
      imageShape: true,
      maxZoomLevel: true,
      enableRotation: true,
      enableDownload: true,
      objectFit: true,
      image: true,
      widgetName: true,
      version: true,
      animateLoading: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      boxShadow: true,
      dynamicBindingPathList: true,
      dynamicTriggerPathList: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
    },
    currentItem: "{{List1.listData[Image1.currentIndex]}}",
    currentRow: "{{{}}}",
    currentIndex: 0,
    children: [],
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
  "9ngsr0lzpm": {
    isVisible: true,
    text: "{{((currentItem) => currentItem.name)(Text1.currentItem)}}",
    fontSize: "1rem",
    fontStyle: "BOLD",
    textAlign: "LEFT",
    textColor: "#231F20",
    truncateButtonColor: "#FFC13D",
    widgetName: "Text1",
    shouldTruncate: false,
    overflow: "NONE",
    version: 1,
    animateLoading: true,
    searchTags: ["typography", "paragraph", "label"],
    type: "TEXT_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Text",
    key: "950wi3efyy",
    iconSVG: "/static/media/icon.97c59b523e6f70ba6f40a10fc2c7c5b5.svg",
    textStyle: "HEADING",
    boxShadow: "none",
    dynamicBindingPathList: [
      {
        key: "text",
      },
      {
        key: "fontFamily",
      },
      {
        key: "borderRadius",
      },
      {
        key: "currentItem",
      },
      {
        key: "currentRow",
      },
    ],
    dynamicTriggerPathList: [],
    widgetId: "9ngsr0lzpm",
    renderMode: "CANVAS",
    fontFamily: "{{appsmith.theme.fontFamily.appFont}}",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 16,
    rightColumn: 28,
    topRow: 0,
    bottomRow: 4,
    parentId: "15svapj5qx",
    logBlackList: {
      isVisible: true,
      text: true,
      fontSize: true,
      fontStyle: true,
      textAlign: true,
      textColor: true,
      truncateButtonColor: true,
      widgetName: true,
      shouldTruncate: true,
      overflow: true,
      version: true,
      animateLoading: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      textStyle: true,
      boxShadow: true,
      dynamicBindingPathList: true,
      dynamicTriggerPathList: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      fontFamily: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
    },
    currentItem: "{{List1.listData[Text1.currentIndex]}}",
    currentRow: "{{{}}}",
    currentIndex: 0,
    children: [],
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
  "79lvj4a9ep": {
    isVisible: true,
    text: "{{((currentItem) => currentItem.id)(Text2.currentItem)}}",
    fontSize: "1rem",
    fontStyle: "BOLD",
    textAlign: "LEFT",
    textColor: "#231F20",
    truncateButtonColor: "#FFC13D",
    widgetName: "Text2",
    shouldTruncate: false,
    overflow: "NONE",
    version: 1,
    animateLoading: true,
    searchTags: ["typography", "paragraph", "label"],
    type: "TEXT_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Text",
    key: "950wi3efyy",
    iconSVG: "/static/media/icon.97c59b523e6f70ba6f40a10fc2c7c5b5.svg",
    textStyle: "BODY",
    boxShadow: "none",
    dynamicBindingPathList: [
      {
        key: "text",
      },
      {
        key: "fontFamily",
      },
      {
        key: "borderRadius",
      },
      {
        key: "currentItem",
      },
      {
        key: "currentRow",
      },
    ],
    dynamicTriggerPathList: [],
    widgetId: "79lvj4a9ep",
    renderMode: "CANVAS",
    fontFamily: "{{appsmith.theme.fontFamily.appFont}}",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 16,
    rightColumn: 24,
    topRow: 4,
    bottomRow: 8,
    parentId: "15svapj5qx",
    logBlackList: {
      isVisible: true,
      text: true,
      fontSize: true,
      fontStyle: true,
      textAlign: true,
      textColor: true,
      truncateButtonColor: true,
      widgetName: true,
      shouldTruncate: true,
      overflow: true,
      version: true,
      animateLoading: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      textStyle: true,
      boxShadow: true,
      dynamicBindingPathList: true,
      dynamicTriggerPathList: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      fontFamily: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
    },
    currentItem: "{{List1.listData[Text2.currentIndex]}}",
    currentRow: "{{{}}}",
    currentIndex: 0,
    children: [],
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
  "15svapj5qx": {
    isVisible: true,
    widgetName: "Canvas2",
    version: 1,
    detachFromLayout: true,
    type: "CANVAS_WIDGET",
    hideCard: true,
    isDeprecated: false,
    displayName: "Canvas",
    key: "gdfszu4dgu",
    containerStyle: "none",
    canExtend: false,
    children: ["p4clz8naty", "9ngsr0lzpm", "79lvj4a9ep"],
    minHeight: 20,
    widgetId: "15svapj5qx",
    renderMode: "CANVAS",
    boxShadow: "none",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    accentColor: "{{appsmith.theme.colors.primaryColor}}",
    isLoading: false,
    parentColumnSpace: 1,
    parentRowSpace: 1,
    leftColumn: 0,
    rightColumn: 20,
    topRow: 0,
    bottomRow: 20,
    parentId: "cxad6gvwmi",
    dynamicBindingPathList: [
      {
        key: "borderRadius",
      },
      {
        key: "accentColor",
      },
      {
        key: "currentRow",
      },
    ],
    logBlackList: {
      isVisible: true,
      widgetName: true,
      version: true,
      detachFromLayout: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      containerStyle: true,
      canExtend: true,
      children: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      boxShadow: true,
      borderRadius: true,
      accentColor: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
      dynamicBindingPathList: true,
    },
    currentRow: "{{{}}}",
    currentIndex: 0,
    isMetaWidget: true,
    creatorId: "dam7gf64so",
  },
  cxad6gvwmi: {
    isVisible: true,
    backgroundColor: "white",
    widgetName: "Container1",
    containerStyle: "card",
    borderColor: "transparent",
    borderWidth: "0",
    boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
    animateLoading: true,
    children: ["15svapj5qx"],
    version: 1,
    searchTags: ["div", "parent", "group"],
    type: "CONTAINER_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Container",
    key: "cv9rhkyi6j",
    iconSVG: "/static/media/icon.1977dca3370505e2db3a8e44cfd54907.svg",
    isCanvas: true,
    dragDisabled: true,
    isDeletable: false,
    disallowCopy: true,
    disablePropertyPane: true,
    openParentPropertyPane: true,
    widgetId: "cxad6gvwmi",
    renderMode: "CANVAS",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 0,
    rightColumn: 64,
    topRow: 0,
    bottomRow: 12,
    parentId: "6i0c71d47j",
    dynamicBindingPathList: [
      {
        key: "borderRadius",
      },
      {
        key: "boxShadow",
      },
      {
        key: "data",
      },
    ],
    logBlackList: {
      isVisible: true,
      backgroundColor: true,
      widgetName: true,
      containerStyle: true,
      borderColor: true,
      borderWidth: true,
      boxShadow: true,
      animateLoading: true,
      children: true,
      version: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      dragDisabled: true,
      isDeletable: true,
      disallowCopy: true,
      disablePropertyPane: true,
      openParentPropertyPane: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
      dynamicBindingPathList: true,
    },
    gap: 0,
    data:
      "{{\n      {\n        \n          Image1: { image: Image1.image,isVisible: Image1.isVisible }\n        ,\n          Text1: { isVisible: Text1.isVisible,text: Text1.text }\n        ,\n          Text2: { isVisible: Text2.isVisible,text: Text2.text }\n        \n      }\n    }}",
    currentIndex: 0,
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
  "6i0c71d47j": {
    isVisible: true,
    widgetName: "Canvas1",
    version: 1,
    detachFromLayout: true,
    type: "CANVAS_WIDGET",
    hideCard: true,
    isDeprecated: false,
    displayName: "Canvas",
    key: "gdfszu4dgu",
    containerStyle: "none",
    dropDisabled: true,
    openParentPropertyPane: true,
    noPad: true,
    children: ["cxad6gvwmi", "kjww7c2zl1"],
    minHeight: 290,
    widgetId: "6i0c71d47j",
    renderMode: "CANVAS",
    boxShadow: "none",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    accentColor: "{{appsmith.theme.colors.primaryColor}}",
    isLoading: false,
    parentColumnSpace: 1,
    parentRowSpace: 1,
    leftColumn: 0,
    rightColumn: 417.265625,
    topRow: 0,
    bottomRow: 254,
    parentId: "lbxt0gfzvq",
    dynamicBindingPathList: [
      {
        key: "borderRadius",
      },
      {
        key: "accentColor",
      },
    ],
    logBlackList: {
      isVisible: true,
      widgetName: true,
      version: true,
      detachFromLayout: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      containerStyle: true,
      canExtend: true,
      dropDisabled: true,
      openParentPropertyPane: true,
      noPad: true,
      children: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      boxShadow: true,
      borderRadius: true,
      accentColor: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
      dynamicBindingPathList: true,
    },
    isMetaWidget: true,
    creatorId: "dam7gf64so",
  },
  gfrkjdcdp0: {
    isVisible: true,
    defaultImage: "https://assets.appsmith.com/widgets/default.png",
    imageShape: "RECTANGLE",
    maxZoomLevel: 1,
    enableRotation: false,
    enableDownload: false,
    objectFit: "cover",
    image:
      "{{((currentItem) => currentItem.img)(List1_Image1_gfrkjdcdp0.currentItem)}}",
    widgetName: "List1_Image1_gfrkjdcdp0",
    version: 1,
    animateLoading: true,
    type: "IMAGE_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Image",
    key: "1dfnn5p2nk",
    iconSVG: "/static/media/icon.52d8fb963abcb95c79b10f1553389f22.svg",
    boxShadow: "none",
    dynamicBindingPathList: [
      {
        key: "image",
      },
      {
        key: "borderRadius",
      },
      {
        key: "currentItem",
      },
      {
        key: "currentRow",
      },
    ],
    dynamicTriggerPathList: [],
    widgetId: "gfrkjdcdp0",
    renderMode: "CANVAS",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 0,
    rightColumn: 16,
    topRow: 0,
    bottomRow: 8,
    parentId: "p4jfxgkp5j",
    logBlackList: {
      isVisible: true,
      defaultImage: true,
      imageShape: true,
      maxZoomLevel: true,
      enableRotation: true,
      enableDownload: true,
      objectFit: true,
      image: true,
      widgetName: true,
      version: true,
      animateLoading: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      boxShadow: true,
      dynamicBindingPathList: true,
      dynamicTriggerPathList: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
    },
    currentItem: "{{List1.listData[List1_Image1_gfrkjdcdp0.currentIndex]}}",
    currentRow: "{{{}}}",
    resizeDisabled: true,
    disablePropertyPane: true,
    dragDisabled: true,
    dropDisabled: true,
    ignoreCollision: true,
    disabledResizeHandles: [
      "left",
      "top",
      "right",
      "bottomRight",
      "topLeft",
      "topRight",
      "bottomLeft",
    ],
    currentIndex: 1,
    children: [],
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
  jlu8ns1ds7: {
    isVisible: true,
    text:
      "{{((currentItem) => currentItem.name)(List1_Text1_jlu8ns1ds7.currentItem)}}",
    fontSize: "1rem",
    fontStyle: "BOLD",
    textAlign: "LEFT",
    textColor: "#231F20",
    truncateButtonColor: "#FFC13D",
    widgetName: "List1_Text1_jlu8ns1ds7",
    shouldTruncate: false,
    overflow: "NONE",
    version: 1,
    animateLoading: true,
    searchTags: ["typography", "paragraph", "label"],
    type: "TEXT_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Text",
    key: "950wi3efyy",
    iconSVG: "/static/media/icon.97c59b523e6f70ba6f40a10fc2c7c5b5.svg",
    textStyle: "HEADING",
    boxShadow: "none",
    dynamicBindingPathList: [
      {
        key: "text",
      },
      {
        key: "fontFamily",
      },
      {
        key: "borderRadius",
      },
      {
        key: "currentItem",
      },
      {
        key: "currentRow",
      },
    ],
    dynamicTriggerPathList: [],
    widgetId: "jlu8ns1ds7",
    renderMode: "CANVAS",
    fontFamily: "{{appsmith.theme.fontFamily.appFont}}",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 16,
    rightColumn: 28,
    topRow: 0,
    bottomRow: 4,
    parentId: "p4jfxgkp5j",
    logBlackList: {
      isVisible: true,
      text: true,
      fontSize: true,
      fontStyle: true,
      textAlign: true,
      textColor: true,
      truncateButtonColor: true,
      widgetName: true,
      shouldTruncate: true,
      overflow: true,
      version: true,
      animateLoading: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      textStyle: true,
      boxShadow: true,
      dynamicBindingPathList: true,
      dynamicTriggerPathList: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      fontFamily: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
    },
    currentItem: "{{List1.listData[List1_Text1_jlu8ns1ds7.currentIndex]}}",
    currentRow: "{{{}}}",
    resizeDisabled: true,
    disablePropertyPane: true,
    dragDisabled: true,
    dropDisabled: true,
    ignoreCollision: true,
    disabledResizeHandles: [
      "left",
      "top",
      "right",
      "bottomRight",
      "topLeft",
      "topRight",
      "bottomLeft",
    ],
    currentIndex: 1,
    children: [],
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
  "7c99ko7vaq": {
    isVisible: true,
    text:
      "{{((currentItem) => currentItem.id)(List1_Text2_7c99ko7vaq.currentItem)}}",
    fontSize: "1rem",
    fontStyle: "BOLD",
    textAlign: "LEFT",
    textColor: "#231F20",
    truncateButtonColor: "#FFC13D",
    widgetName: "List1_Text2_7c99ko7vaq",
    shouldTruncate: false,
    overflow: "NONE",
    version: 1,
    animateLoading: true,
    searchTags: ["typography", "paragraph", "label"],
    type: "TEXT_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Text",
    key: "950wi3efyy",
    iconSVG: "/static/media/icon.97c59b523e6f70ba6f40a10fc2c7c5b5.svg",
    textStyle: "BODY",
    boxShadow: "none",
    dynamicBindingPathList: [
      {
        key: "text",
      },
      {
        key: "fontFamily",
      },
      {
        key: "borderRadius",
      },
      {
        key: "currentItem",
      },
      {
        key: "currentRow",
      },
    ],
    dynamicTriggerPathList: [],
    widgetId: "7c99ko7vaq",
    renderMode: "CANVAS",
    fontFamily: "{{appsmith.theme.fontFamily.appFont}}",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 16,
    rightColumn: 24,
    topRow: 4,
    bottomRow: 8,
    parentId: "p4jfxgkp5j",
    logBlackList: {
      isVisible: true,
      text: true,
      fontSize: true,
      fontStyle: true,
      textAlign: true,
      textColor: true,
      truncateButtonColor: true,
      widgetName: true,
      shouldTruncate: true,
      overflow: true,
      version: true,
      animateLoading: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      textStyle: true,
      boxShadow: true,
      dynamicBindingPathList: true,
      dynamicTriggerPathList: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      fontFamily: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
    },
    currentItem: "{{List1.listData[List1_Text2_7c99ko7vaq.currentIndex]}}",
    currentRow: "{{{}}}",
    resizeDisabled: true,
    disablePropertyPane: true,
    dragDisabled: true,
    dropDisabled: true,
    ignoreCollision: true,
    disabledResizeHandles: [
      "left",
      "top",
      "right",
      "bottomRight",
      "topLeft",
      "topRight",
      "bottomLeft",
    ],
    currentIndex: 1,
    children: [],
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
  p4jfxgkp5j: {
    isVisible: true,
    widgetName: "List1_Canvas2_p4jfxgkp5j",
    version: 1,
    detachFromLayout: true,
    type: "CANVAS_WIDGET",
    hideCard: true,
    isDeprecated: false,
    displayName: "Canvas",
    key: "gdfszu4dgu",
    containerStyle: "none",
    canExtend: false,
    children: ["gfrkjdcdp0", "jlu8ns1ds7", "7c99ko7vaq"],
    minHeight: 10,
    widgetId: "p4jfxgkp5j",
    renderMode: "CANVAS",
    boxShadow: "none",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    accentColor: "{{appsmith.theme.colors.primaryColor}}",
    isLoading: false,
    parentColumnSpace: 1,
    parentRowSpace: 1,
    leftColumn: 0,
    rightColumn: 10,
    topRow: 0,
    bottomRow: 10,
    parentId: "kjww7c2zl1",
    dynamicBindingPathList: [
      {
        key: "borderRadius",
      },
      {
        key: "accentColor",
      },
      {
        key: "currentRow",
      },
    ],
    logBlackList: {
      isVisible: true,
      widgetName: true,
      version: true,
      detachFromLayout: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      containerStyle: true,
      canExtend: true,
      children: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      boxShadow: true,
      borderRadius: true,
      accentColor: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
      dynamicBindingPathList: true,
    },
    currentRow: "{{{}}}",
    resizeDisabled: true,
    disablePropertyPane: true,
    dragDisabled: true,
    dropDisabled: true,
    ignoreCollision: true,
    disabledResizeHandles: [
      "left",
      "top",
      "right",
      "bottomRight",
      "topLeft",
      "topRight",
      "bottomLeft",
    ],
    currentIndex: 1,
    isMetaWidget: true,
    creatorId: "dam7gf64so",
  },
  kjww7c2zl1: {
    isVisible: true,
    backgroundColor: "white",
    widgetName: "List1_Container1_kjww7c2zl1",
    containerStyle: "card",
    borderColor: "transparent",
    borderWidth: "0",
    boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
    animateLoading: true,
    children: ["p4jfxgkp5j"],
    version: 1,
    searchTags: ["div", "parent", "group"],
    type: "CONTAINER_WIDGET",
    hideCard: false,
    isDeprecated: false,
    displayName: "Container",
    key: "cv9rhkyi6j",
    iconSVG: "/static/media/icon.1977dca3370505e2db3a8e44cfd54907.svg",
    isCanvas: true,
    dragDisabled: true,
    isDeletable: false,
    disallowCopy: true,
    disablePropertyPane: true,
    openParentPropertyPane: true,
    widgetId: "kjww7c2zl1",
    renderMode: "CANVAS",
    borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    isLoading: false,
    leftColumn: 0,
    rightColumn: 64,
    topRow: 12,
    bottomRow: 24,
    parentId: "6i0c71d47j",
    dynamicBindingPathList: [
      {
        key: "borderRadius",
      },
      {
        key: "boxShadow",
      },
      {
        key: "data",
      },
    ],
    logBlackList: {
      isVisible: true,
      backgroundColor: true,
      widgetName: true,
      containerStyle: true,
      borderColor: true,
      borderWidth: true,
      boxShadow: true,
      animateLoading: true,
      children: true,
      version: true,
      searchTags: true,
      type: true,
      hideCard: true,
      isDeprecated: true,
      replacement: true,
      displayName: true,
      key: true,
      iconSVG: true,
      isCanvas: true,
      dragDisabled: true,
      isDeletable: true,
      disallowCopy: true,
      disablePropertyPane: true,
      openParentPropertyPane: true,
      minHeight: true,
      widgetId: true,
      renderMode: true,
      borderRadius: true,
      isLoading: true,
      parentColumnSpace: true,
      parentRowSpace: true,
      leftColumn: true,
      rightColumn: true,
      topRow: true,
      bottomRow: true,
      parentId: true,
      dynamicBindingPathList: true,
    },
    gap: 0,
    data:
      "{{\n      {\n        \n          Image1: { image: List1_Image1_gfrkjdcdp0.image,isVisible: List1_Image1_gfrkjdcdp0.isVisible }\n        ,\n          Text1: { isVisible: List1_Text1_jlu8ns1ds7.isVisible,text: List1_Text1_jlu8ns1ds7.text }\n        ,\n          Text2: { isVisible: List1_Text2_7c99ko7vaq.isVisible,text: List1_Text2_7c99ko7vaq.text }\n        \n      }\n    }}",
    resizeDisabled: true,
    dropDisabled: true,
    ignoreCollision: true,
    disabledResizeHandles: [
      "left",
      "top",
      "right",
      "bottomRight",
      "topLeft",
      "topRight",
      "bottomLeft",
    ],
    currentIndex: 1,
    isMetaWidget: true,
    creatorId: "dam7gf64so",
    parentColumnSpace: 12,
    parentRowSpace: 12,
  },
};

describe("getMetaWidgetChildrenIds", () => {
  it("should return all child meta widgets after executing getMetaWidgetChildrenIds", async () => {
    expect(
      getMetaWidgetChildrenIds(metaWidgets, ["dam7gf64so"]).sort(),
    ).toStrictEqual(Object.keys(metaWidgets).sort());
  });
});
