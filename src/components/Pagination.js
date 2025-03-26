import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-web';

/**
 * Generates an array of page numbers (and ellipses as strings)
 * that should be displayed given the current page and total pages.
 */
function getPagesArray(current, total) {
  const maxVisible = 5; // max number of page *slots* (excluding arrows)
  const pages = [];

  // If total pages is small, show all of them
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // If current page is in the beginning range
  if (current <= 3) {
    pages.push(1, 2, 3, 4, '...', total);
    return pages;
  }

  // If current page is near the end
  if (current >= total - 2) {
    pages.push(1, '...', total - 3, total - 2, total - 1, total);
    return pages;
  }

  // Otherwise, current page is somewhere in the middle
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
    <View style={{ flexDirection: 'row', alignItems: 'center' , borderColor: '#5F5F5F', borderWidth: 1 ,borderRadius: 8, overflow: 'hidden', justifyContent: 'space-between', width: '100%' }}>
      <TouchableOpacity
        style={{width: 70, backgroundColor: "#1B1B1B"}}
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}>
        <Text style={{ marginHorizontal: 8, opacity: currentPage === 1 ? 0.3 : 1,  color: "#fff", paddingVertical: 4, fontSize: 20, textAlign: "center"}}>
          {'<'}
        </Text>
      </TouchableOpacity>

      {pagesToShow.map((page, index) => {
        if (page === '...') {
          return (
            <Text key={`ellipsis-${index}`} style={{ marginHorizontal: 8,   color: "#fff", paddingVertical: 4, fontSize: 20, textAlign: "center" }}>
              ...
            </Text>
          );
        }

        const isActive = page === currentPage;
        return (
          <TouchableOpacity
          style={{backgroundColor: "#fff"}}
            key={`page-${page}`}
            onPress={() => onPageChange(page)}>
            <Text style={{
              marginHorizontal: 8,
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? 'rgb(254 236 191)' : '#fff',
            }}>
              {page}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Right arrow */}
      <TouchableOpacity
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
      >
        <Text style={{
          marginHorizontal: 8,
          opacity: currentPage === totalPages ? 0.3 : 1,
          color: "#fff", paddingVertical: 4, fontSize: 20, textAlign: "center" 
        }}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;