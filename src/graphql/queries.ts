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
