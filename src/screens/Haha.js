import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Haha = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [unavailableSeats, setUnavailableSeats] = useState([]);

  const handleSeatSelection = (seat) => {
    const newSelectedSeats = [...selectedSeats];

    if (newSelectedSeats.includes(seat)) {
      // Nếu ghế đã được chọn, bỏ chọn nó
      const index = newSelectedSeats.indexOf(seat);
      newSelectedSeats.splice(index, 1);
    } else {
      // Nếu ghế chưa được chọn, thêm nó vào danh sách đã chọn
      newSelectedSeats.push(seat);
    }

    setSelectedSeats(newSelectedSeats);

    // Log danh sách ghế đã chọn
    console.log('Danh sách ghế đã chọn:', newSelectedSeats);
  };

  useEffect(() => {
    const generateRandomUnavailableSeats = () => {
      const seats = [];
      while (seats.length < 5) {
        const randomSeat = Math.floor(Math.random() * 30) + 1;
        if (!seats.includes(randomSeat)) {
          seats.push(randomSeat);
        }
      }
      setUnavailableSeats(seats);
    };

    generateRandomUnavailableSeats(); // Tạo ngẫu nhiên danh sách ghế màu đỏ

    // Log danh sách ghế màu đỏ
    console.log('Danh sách ghế màu đỏ:', unavailableSeats);
  }, []); // useEffect chỉ chạy khi màn hình được render lần đầu

  return (
    <View>
      <Text>Chọn ghế:</Text>
      <View style={styles.seatContainer}>
        {[...Array(30).keys()].map((seat) => (
          <TouchableOpacity
            key={seat}
            style={[
              styles.seat,
              selectedSeats.includes(seat + 1) ? styles.selectedSeat : null,
              unavailableSeats.includes(seat + 1) ? styles.unavailableSeat : null,
            ]}
            onPress={() => handleSeatSelection(seat + 1)}
            disabled={unavailableSeats.includes(seat + 1)}
          >
            <Text>{seat + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Danh sách ghế đã chọn: {selectedSeats.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  seatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seat: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  selectedSeat: {
    backgroundColor: 'black',
  },
  unavailableSeat: {
    backgroundColor: 'red',
  },
});

export default Haha;
