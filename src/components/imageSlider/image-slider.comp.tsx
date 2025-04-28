import { Dimensions, FlatList, Image, StyleSheet, View, ViewToken } from "react-native"
import PaginationComponent from "../pagination/pagination.comp";
import { useRef, useState } from "react";

type Props = {
    images: string[],
    preImage: string,
}

const width = Dimensions.get('window').width;

const ImageSliderComponent = ({ images, preImage }: Props) => {

    const [paginationIndex, setPaginationIndex] = useState(0);

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
            setPaginationIndex(viewableItems[0].index % images.length);
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged }
    ])

    return (
        <View style={styles.slideWrapper}>
            <FlatList
                data={images}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                keyExtractor={(item) => item}
                renderItem={({ index, item }) => (
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: `${preImage}/${item}` }}
                            style={styles.imageItem}
                        />
                    </View>
                )}
                scrollEventThrottle={16}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
            <View style={styles.pagingWrapper}>
                <PaginationComponent
                    items={images}
                    paginationIndex={paginationIndex}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slideWrapper: {
        position: 'relative'
    },
    imageWrapper: {
        width: width
    },
    imageItem: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        resizeMode: 'stretch'
    },
    pagingWrapper: {
        position: 'absolute',
        bottom: 0,
        width: width
    }
});

export default ImageSliderComponent;