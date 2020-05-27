export const getAllCars = () => {
  return {
    query: `
  query {
    cars {
      name,
      _id,
      description,
      icon,
    }
}
`,
  };
};
export const getAllReservationQuery = () => {
  return {
    query: `
  query {
    reservations {
      dateStart,
      dateEnd,
      status,
      _id,
      userName,
      carId      
    }
}
`,
  };
};
export const addReservationQuery = ({ start, end, customer, carId, status }) => {
  return {
    query: `
            mutation{
              addReservation(dateStart: ${start}, dateEnd: ${end}, userName: "${customer}", carId: "${carId}",status: "${status}"){
                status
              }
            }
        `,
  };
};
