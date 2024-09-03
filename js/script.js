import { getTasks,createTask, updateTask,deleteTask } from "./tasks.js";

$(document).ready(function () {

    // initially loads all available tasks
    getTasks();

    // When user clicks on new task button
    $("#new-task-btn").click(function () {
        $("#new-task-modal").modal("show");
    });

    // When user submits form in new task modal
    $("#task-form").submit(function (e){
        e.preventDefault();

        const taskName = $("#taskName").val();
        const taskDescription = $("#taskDescription").val();

        if(taskName === "" || taskDescription === ""){
            alert("Please fill in all fields!");
            return;
        }

        createTask(taskName, taskDescription);

        $("#new-task-modal").modal("hide");
        $("#taskName").val("");
        $("#taskDescription").val("");
    });

    // When user clicks on edit button on a specific task
    $(document).on("click",".edit-task-btn",function () {
        var taskTitle = $(this).closest(".card").find(".card-title").text();
        var taskDescription = $(this).closest(".card").find(".card-text").text();
        var taskId = $(this).data("task-id");
        var isCompleted = $(this).closest(".card").find("#task-completed").text();

        $("#edit-task-form").attr("data-task-id", taskId);
        $("#editTaskName").val(taskTitle);
        $("#editTaskDescription").val(taskDescription);
        $("#editTaskIsCompleted").val(isCompleted);

        $("#edit-task-modal").modal("show");

    });

    // When user submits form in edit task modal
    $("#edit-task-form").submit(function (event) {
        event.preventDefault();

        const taskId = $(this).attr("data-task-id");
        var taskName = $("#editTaskName").val();
        var taskDescription = $("#editTaskDescription").val();
        var taskIsCompleted = $("#editTaskIsCompleted").val();

        if(taskName === "" || taskDescription === ""){
            alert("Please fill in all fields!");
            return;
        }

        updateTask(taskId, taskName, taskDescription, taskIsCompleted);

        $("#edit-task-modal").modal("hide");
        $("#editTaskName").val("");
        $("#editTaskDescription").val("");
        $("#editTaskIsCompleted").val("");
    
    });

    // When user clicks on delete button on a specific task
    $(document).on("click", ".delete-task-btn", function () {
        const taskId = $(this).attr("data-task-id");
        deleteTask(taskId);
    });

    // When user wants to switch button mark as completed and incompleted 
    $(".mark-as-completed-btn").click(function () {
        const taskId = $(this).attr("data-task-id");
        const isCompleted = $(this).is(":checked");

        updateTask(taskId, null, null, taskIsCompleted);
    });
    $(document).on("click", ".mark-as-completed-btn", function () {
        var taskId = $(this).data("task-id");
        var taskTitle = $(this).closest(".card").find(".card-title").text();
        var taskDescription = $(this).closest(".card").find(".card-text").text();
        var isCompleted = $(this).hasClass("completed");

        updateTask(taskId, taskTitle, taskDescription, !isCompleted);
    });

    // to Close modal when user clicks on close button
    $(".close").click(function () {
        $("#new-task-modal").modal("hide");
        $("#edit-task-modal").modal("hide");
    });

});