import React, {Component, ReactNode} from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  FlatList,
  StyleProp,
  ViewStyle,
} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  itemContainer: {justifyContent: 'flex-start'},
  button: {},
});

const AnimatedFlatList: any = Animated.createAnimatedComponent(FlatList);
type Props = {
  itemWidth: number;
  containerWidth: number;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  onScrollEnd?: (data: Array<any>, index: number) => void;
  data: Array<any>;
  separatorWidth?: number;
  inActiveScale?: number;
  inActiveOpacity?: number;
  onScrollBeginDrag?: () => void;
  minScrollDistance?: number;
  onScrollEndDrag?: () => void;
  renderItem: (({item, index}: {item: any; index: number}) => ReactNode) | null;
  inverted?: boolean;
  itemContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  bounces?: Animated.WithAnimatedValue<boolean | undefined>;
  keyExtractor?: Animated.WithAnimatedValue<
    ((item: unknown, index: number) => string) | undefined
  >;
  pagingEnable?: boolean;
};
const defaultProps: Props = {
  inActiveScale: 0.8,
  inActiveOpacity: 0.8,
  separatorWidth: 0,
  containerWidth: width,
  itemWidth: 0.9 * width,
  bounces: true,
  data: [],
  style: {},
  initialIndex: 0,
  pagingEnable: true,
  minScrollDistance: 20,
  itemContainerStyle: {},
  keyExtractor: (_item: any, index: number) => index.toString(),
  renderItem: null,
  onScrollEnd: () => {},
  onScrollBeginDrag: () => {},
  onScrollEndDrag: () => {},
};
class Carousel extends Component<Props> {
  static defaultProps: Props;

  currentIndex: any;
  _scrollView: any;
  halfContainerWidth: any;
  halfItemWidth: number;
  scrollXBegin: number;
  handleOnScroll: (...args: any[]) => void;
  xOffset: Animated.Value;
  scrollX: any;

  static defaulProps = defaultProps;

  constructor(props: Props) {
    super(props);

    const {itemWidth, containerWidth, initialIndex} = this.props;
    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.itemAnimatedStyles = this.itemAnimatedStyles.bind(this);
    this.renderItemContainer = this.renderItemContainer.bind(this);
    this.handleOnScrollBeginDrag = this.handleOnScrollBeginDrag.bind(this);
    this.handleOnScrollEndDrag = this.handleOnScrollEndDrag.bind(this);

    this.currentIndex = initialIndex;
    this.scrollXBegin = 0;
    this.xOffset = new Animated.Value(0);
    this.halfContainerWidth = containerWidth / 2;
    this.halfItemWidth = itemWidth / 2;
    this.handleOnScroll = Animated.event(
      [{nativeEvent: {contentOffset: {x: this.xOffset}}}],
      {
        useNativeDriver: true,
        listener: (event: any) => {
          this.scrollX = event.nativeEvent.contentOffset.x;
        },
      },
    );
  }

  scrollToIndex(index: number) {
    const {
      onIndexChange,
      onScrollEnd,
      data,
      itemWidth,
      separatorWidth = 20,
    } = this.props;
    if (index < 0 || index >= data.length) return;
    if (onIndexChange) {
      onIndexChange(index);
    }
    onScrollEnd && onScrollEnd(data[index], index);
    this.currentIndex = index;
    setTimeout(() => {
      this._scrollView.getNode().scrollToOffset({
        offset:
          index * (itemWidth + separatorWidth) +
          this.halfItemWidth -
          this.halfContainerWidth,
        animated: true,
      });
    });
  }
  handleOnScrollBeginDrag() {
    const {onScrollBeginDrag} = this.props;
    onScrollBeginDrag && onScrollBeginDrag();
    this.scrollXBegin = this.scrollX;
  }

  handleOnScrollEndDrag() {
    const {minScrollDistance = 0, onScrollEndDrag} = this.props;
    onScrollEndDrag && onScrollEndDrag();
    if (this.scrollX < 0) {
      return;
    }
    let scrollDistance = this.scrollX - this.scrollXBegin;
    this.scrollXBegin = 0;
    if (Math.abs(scrollDistance) < minScrollDistance) {
      this.scrollToIndex(this.currentIndex);
      return;
    }
    scrollDistance < 0
      ? this.scrollToIndex(this.currentIndex - 1)
      : this.scrollToIndex(this.currentIndex + 1);
  }

  itemAnimatedStyles(index: number) {
    const {
      data,
      inActiveScale = 0.8,
      inActiveOpacity = 0.8,
      itemWidth,
      separatorWidth = 0,
      containerWidth,
    } = this.props;
    const animatedOffset =
      index === 0
        ? this.halfItemWidth
        : index === data.length - 1
        ? containerWidth - this.halfItemWidth
        : this.halfContainerWidth;
    const midPoint =
      index * (itemWidth + separatorWidth) +
      this.halfItemWidth -
      animatedOffset;
    const startPoint =
      index === 1
        ? 0
        : index === data.length - 1
        ? (data.length - 2) * (itemWidth + separatorWidth) +
          this.halfItemWidth -
          this.halfContainerWidth
        : midPoint - itemWidth - separatorWidth;
    const endPoint =
      index === 0
        ? itemWidth +
          separatorWidth +
          this.halfItemWidth -
          this.halfContainerWidth
        : index === data.length - 2
        ? (data.length - 1) * (itemWidth + separatorWidth) +
          itemWidth -
          containerWidth
        : midPoint + itemWidth + separatorWidth;

    const animatedOpacity = {
      opacity: this.xOffset.interpolate({
        inputRange: [startPoint, midPoint, endPoint],
        outputRange: [inActiveOpacity, 1, inActiveOpacity],
      }),
    };

    const animatedScale = {
      transform: [
        {
          scale: this.xOffset.interpolate({
            inputRange: [startPoint, midPoint, endPoint],
            outputRange: [inActiveScale, 1, inActiveScale],
          }),
        },
      ],
    };

    return {...animatedOpacity, ...animatedScale};
  }

  renderItemContainer({item, index}: {item: any; index: number}) {
    const {
      data,
      renderItem,
      inverted,
      itemWidth,
      separatorWidth,
      itemContainerStyle,
    } = this.props;
    let marginWidth = index !== data.length - 1 ? separatorWidth : 0;
    let marginStyle = inverted
      ? {marginLeft: marginWidth}
      : {marginRight: marginWidth};
    return (
      <Animated.View
        pointerEvents={'box-none'}
        style={[
          styles.itemContainer,
          itemContainerStyle,
          {width: itemWidth},
          marginStyle,
          this.itemAnimatedStyles(index),
        ]}>
        {renderItem && renderItem({item, index})}
      </Animated.View>
    );
  }

  render() {
    const {
      data,
      bounces,
      style,
      containerWidth,
      initialIndex,
      keyExtractor,
      ...otherProps
    } = this.props;
    return (
      <AnimatedFlatList
        {...otherProps}
        bounces={bounces}
        horizontal
        data={data}
        decelerationRate={0}
        automaticallyAdjustContentInsets={false}
        keyExtractor={keyExtractor}
        ref={(ref: any) => (this._scrollView = ref)}
        renderItem={this.renderItemContainer}
        style={[styles.container, {width: containerWidth}, style]}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollBeginDrag={this.handleOnScrollBeginDrag}
        onScroll={this.handleOnScroll}
        onScrollEndDrag={this.handleOnScrollEndDrag}
      />
    );
  }
}

Carousel.defaultProps = {
  inActiveScale: 0.8,
  inActiveOpacity: 0.8,
  separatorWidth: 0,
  containerWidth: width,
  itemWidth: 0.9 * width,
  bounces: true,
  data: [],
  style: {},
  initialIndex: 0,
  pagingEnable: true,
  minScrollDistance: 20,
  itemContainerStyle: {},
  keyExtractor: (_item: any, index: number) => index.toString(),
  renderItem: null,
  onScrollEnd: () => {},
  onScrollBeginDrag: () => {},
  onScrollEndDrag: () => {},
};
export default Carousel;
