import { CreatePostRequest, CreatePostResponse } from "../models/post.model";
import { getPrisma } from "../prisma-connect/prismaFunction";
import { Context } from "hono";
import { createErrorResponse } from "../utils/response.util";

export class PostService {
  async createPost(c: Context) {
    try {
      const body = await c.req.json();
      const prisma = getPrisma(c.env.DATABASE_URL);
      if (!body.postname) {
        return c.json(
          createErrorResponse(
            400,
            'The field "postname" is required in the request body.'
          ),
          400
        );
      }

      const post = await prisma.post.create({
        data: {
          name: body.postname,
        },
      });

      return c.json({
        status: "form the service ",
        post,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return c.json(
        createErrorResponse(500, "An internal server error occurred."),
        500
      );
    }
  }

  async getPost(c: Context) {
    try {
      const prisma = getPrisma(c.env.DATABASE_URL);
      const posts = await prisma.post.findMany();

      if (!posts.length) {
        return c.json(createErrorResponse(404, "No posts found."), 404);
      }
      return c.json({
        status: 1,
        message: "Posts retrieved successfully.",
        data: posts,
      });
    } catch (error) {
      console.error("Error retrieving posts:", error);
      return c.json(
        createErrorResponse(
          500,
          "An error occurred while retrieving posts. Please try again later."
        ),
        500
      );
    }
  }

  async deletePost(c: Context) {
    try {
      const prisma = getPrisma(c.env.DATABASE_URL);
      const { id } = c.req.query();

      if (!id) {
        return c.json(
          createErrorResponse(400, "Post ID is required to delete a post."),
          400
        );
      }

      const deletedPost = await prisma.post.delete({
        where: { id: Number(id) },
      });

      return c.json({
        status: 1,
        message: "Post deleted successfully.",
        data: deletedPost,
      });
    } catch (error) {
      console.error("Error deleting post:", error);

      if (error instanceof Error && (error as any).code === "P2025") {
        return c.json(
          createErrorResponse(404, "Post not found or already deleted."),
          404
        );
      }

      console.error("Error deleting post:", error);
      return c.json(
        createErrorResponse(
          500,
          "An error occurred while deleting the post. Please try again later."
        ),
        500
      );
    }
  }

  // UPDATE
  async updatePost(c: Context) {
    try {
      const prisma = getPrisma(c.env.DATABASE_URL);
      const { id } = c.req.query();
      const body = await c.req.json();
      if (!id) {
        return c.json(
          createErrorResponse(400, "Post ID is required to update a post."),
          400
        );
      }

      if (!body.postname) {
        return c.json(
          createErrorResponse(400, "Update data is required."),
          400
        );
      }

      // add logic for if the data for the id is not exist in the DB or the id is invalid

      const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          name: body.postname,
        },
      });

      return c.json({
        status: 1,
        message: "Post updated successfully.",
        data: updatedPost,
      });
    } catch (error) {
      console.error("Error updating post:", (error as any).code);

      if (error instanceof Error && (error as any).code === "P2025") {
        return c.json(
          createErrorResponse(404, "Post not found or cannot be updated."),
          404
        );
      }

      return c.json(
        createErrorResponse(
          500,
          "An error occurred while updating the post. Please try again later."
        ),
        500
      );
    }
  }
}
