import { gql } from "graphql-tag";

export const GET_ALL_VIDEOS = gql`
  query {
    getAllVideos {
      _id
      title
      genre
      likes
      posterUrl
    }
  }
`;

export const DELETE_VIDEO = gql`
  mutation DeleteVideo($id: ID!) {
    deleteVideo(id: $id) {
      _id
    }
  }
`;

export const ADD_VIDEO = gql`
  mutation ($input: VideoInput!) {
    addVideo(input: $input) {
      _id
      title
      genre
      posterUrl
      likes
    }
  }
`;

export const UPDATE_VIDEO = gql`
  mutation ($id: ID!, $input: VideoInput!) {
    updateVideo(id: $id, input: $input) {
      _id
      title
      genre
      posterUrl
      likes
    }
  }
`;
