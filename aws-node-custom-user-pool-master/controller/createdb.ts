import User from "../model/user";
import Post from "../model/post";
import PostAction from "../model/postAction";
import { sequelize } from "../model/index";
import { getResponseHeaders } from "../util/util";
import { APIGatewayEvent, Context } from "aws-lambda";

export const createdb = async (event, context) => {
  try {
    // console.log("1")
    // await User.sync({ alter:true});
    // console.log("2")
    // await Post.sync({ alter:true });
    // console.log("3")
    // await PostAction.sync({ force: true })
    sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
      .then(function () {
        return sequelize.sync({ force: true });
      })
      .then(function () {
        return sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
      })
      .then(
        function () {
          console.log("Database synchronised.");
        },
        function (err) {
          console.log(err);
        }
      );
    console.log("Created");
    return {
      statusCode: 200,
      headers: getResponseHeaders(),
      body: JSON.stringify("DB created"),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: getResponseHeaders(),
      body: JSON.stringify(err),
    };
  }
};
