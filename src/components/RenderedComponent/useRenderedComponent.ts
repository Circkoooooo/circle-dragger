import { reactive, ref, type CSSProperties } from "vue";

export const useComponentEventStates = (props: any) => {
  return reactive({
    isHover: false,
    isChecked: false,
    isDown: false,
    isResize: false,
    resizePointIndex: 0,
    clickPoint: {
      x: 0,
      y: 0,
    },
  });
};

type State = ReturnType<typeof useComponentEventStates>;

export const useRenderedComponent = (props: any, states: State) => {
  const containerStyle = ref<CSSProperties>();
  const maskStyle = ref<CSSProperties>();

  /**
   * 点击组件
   */
  const clickComponent = () => {
    states.isChecked = true;

    if (!states.isHover) {
      states.isChecked = false;
    }
  };

  const mouseEnter = () => {
    if (window.isDown) return; //其它元素isDown为true
    states.isHover = true;
  };

  const mouseLeave = () => {
    if (states.isDown) return;
    states.isHover = false;
  };

  const mouseDown = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;

    states.clickPoint.x = event.clientX - target.offsetLeft;
    states.clickPoint.y = event.clientY - target.offsetTop;
    states.isDown = true;
    window.isDown = true;
  };

  const unFocusStyle = (): CSSProperties => {
    return {
      opacity: "0",
    };
  };

  /**
   * 可移动状态的样式
   * @returns
   */
  const getMoveableStyle = (): CSSProperties => {
    return {
      cursor: "move",
      "z-index": 4,
    };
  };

  const getHoverStyle = (): CSSProperties => {
    return {
      backgroundColor: "rgba(0,0,0,0.05)",
      border: "2px solid #44aaff",
    };
  };

  const getDefaultStyle = (): CSSProperties => {
    return {
      "z-index": 3,
    };
  };

  return {
    containerStyle,
    maskStyle,
    clickComponent,
    getDefaultStyle,
    getMoveableStyle,
    unFocusStyle,
    getHoverStyle,
    mouseEnter,
    mouseLeave,
    mouseDown,
  };
};
