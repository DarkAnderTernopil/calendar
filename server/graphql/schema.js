const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID,
    GraphQLInt, GraphQLList, GraphQLFloat, GraphQLNonNull} = graphql;
const {getCars, addReservation, getReservations} = require('../controllers/api/carController');
const CarType = new GraphQLObjectType({
    name: 'Car',
    fields: {
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        icon: {type: GraphQLString},
        description: {type: GraphQLString},
    }
});
const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: {
        _id: {type: GraphQLString},
        dateStart: {type: GraphQLFloat},
        dateEnd: {type: GraphQLFloat},
        locationStart: {type: GraphQLString},
        locatingEnd: {type: GraphQLString},
        nameEvent: {type: GraphQLString},
        status: {type: GraphQLString},
        userName: {type: GraphQLString},
        carId: {type: GraphQLString},
    }
});
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        cars: {
            type: GraphQLList(CarType),
            resolve: getCars
        },
        reservations: {
            type: GraphQLList(ReservationType),
            resolve: getReservations
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addReservation: {
            type: ReservationType,
            args: {
                userName: {type: GraphQLString},
                status: {type: GraphQLString},
                carId: {type: GraphQLString},
                dateEnd: {type: GraphQLFloat},
                dateStart: {type: GraphQLFloat},
            },
            resolve: addReservation
        }
    }
});
module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});