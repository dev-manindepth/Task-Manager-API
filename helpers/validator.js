export const validator = (title, description,priority , completed) => {
  if (!title || !description || !priority) {
    return { status: "fail", message: "Title and description and priority is required" };
  }
  if (
    (title && typeof title !== "string") ||
    (description && typeof description !== "string") ||
    (priority && typeof priority !== "string")
  ) {
    return {
      status: "fail",
      message: "Title and description  and priority must be string",
    };
  }
  if (title.length <= 5) {
    return {
        status: "fail",
        message: "Title must be atleast 5 characters long",
      };
  }
  if (description.length <= 10) {
    return {
      status: "fail",
      message: "Description must be atleast 10 characters long",
    };
  }
 if (priority !== "low" && priority !== "medium" && priority !== "high") {
   return {
     status: "fail",
     message: `Priority must be only either "low" or "medium" or "high"`,
   };
 }
 if(completed && typeof completed !== "boolean"){
    return {
      status: "fail",
      message: `completed must be only either "true" or "false" `,
    };
 }
};
