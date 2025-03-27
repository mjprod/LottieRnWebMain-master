import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native-web';
import AssetPack from '../util/AssetsPack';
import { Dimentions } from '../util/constants';

function getPagesArray(current, total) {
  const maxVisible = 5;
  const pages = [];

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    pages.push(1, 2, 3, 4, '...', total);
    return pages;
  }

  if (current >= total - 2) {
    pages.push(1, '...', total - 3, total - 2, total - 1, total);
    return pages;
  }

  pages.push(
    1,
    '...',
    current - 1,
    current,
    current + 1,
    '...',
    total
  );

  return pages;
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = getPagesArray(currentPage, totalPages);

  return (
    <View style={{}}>
      <View style={styles.container} >
        <TouchableOpacity
          style={styles.arrowLeft}
          disabled={currentPage === 1}
          onPress={() => onPageChange(currentPage - 1)}>
          <Image source={AssetPack.icons.ARROW_LEFT} style={{ width: 10, height: 20 }} resizeMode="contain" />
        </TouchableOpacity>{
          pagesToShow.map((page, index) => {
            if (page === '...') {
              return (
                <Text key={`ellipsis-${index}`} style={{ color: "#A6A6A6" }}>
                  ...
                </Text>
              );
            }

            const isActive = page === currentPage;
            return (
              <TouchableOpacity
                style={isActive ? styles.pageActive : styles.page}
                key={`page-${page}`}
                onPress={() => onPageChange(page)}>
                <Text style={{
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#000' : '#A6A6A6'
                }}>
                  {page}
                </Text>
              </TouchableOpacity>
            );
          })
        }

        <TouchableOpacity
          style={styles.arrowRight}
          disabled={currentPage === totalPages}
          onPress={() => onPageChange(currentPage + 1)}>
          <Image source={AssetPack.icons.ARROW_LEFT} style={{ width: 10, height: 20, transform: [{ rotate: "180deg" }], }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: "#262626",
    alignItems: 'center',
    borderColor: '#5F5F5F',
    borderWidth: 1,
    borderRadius: 8,
  },
  arrowLeft: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: "#5F5F5F",
    paddingVertical: 10,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    flex: 0.5,
  },
  pageActive: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    flex: 0.5,
    backgroundColor: "#FFDEA8",
  },
  arrowRight: {
    paddingVertical: 10,
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: "#5F5F5F"
  },
});
export default Pagination;