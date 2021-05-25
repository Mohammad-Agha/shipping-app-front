import { gql } from "@apollo/client";

export const GET_SHIPMENTS = gql`
  query GetShipments($userId: Int!, $page: Int!) {
    shipments(user_id: $userId, page: $page) {
      data {
        id
        waybill
        customer_address
        customer_name
        customer_phone
        created_at
        updated_at
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;

export const GET_SHIPMENT = gql`
  query GetShipment($id: Int!) {
    shipment(id: $id) {
      id
      waybill
      customer_address
      customer_name
      customer_phone
      created_at
      updated_at
    }
  }
`;

export const ADD_SHIPMENT = gql`
  mutation AddShipment(
    $waybill: Upload!
    $customerAddress: String!
    $customerName: String!
    $customerPhone: String!
    $userId: Int!
  ) {
    createShipment(
      waybill: $waybill
      customer_address: $customerAddress
      customer_name: $customerName
      customer_phone: $customerPhone
      user_id: $userId
    ) {
      id
      customer_name
      customer_phone
      customer_address
      created_at
      updated_at
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment(
    $waybill: Upload
    $customerAddress: String!
    $customerName: String!
    $customerPhone: String!
    $id: ID!
  ) {
    updateShipment(
      waybill: $waybill
      customer_address: $customerAddress
      customer_name: $customerName
      customer_phone: $customerPhone
      id: $id
    ) {
      id
      customer_name
      customer_phone
      customer_address
      created_at
      updated_at
    }
  }
`;

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id) {
      id
    }
  }
`;
