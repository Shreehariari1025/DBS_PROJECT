import React from "react";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog"; 

function ReviewCard2({ review, onDelete }) {
    const navigate = useNavigate(); // ✅ Initialize navigation
    const [showConfirm, setShowConfirm] = useState(false);
    const handleDelete = async () => {
       

        try {
            const response = await fetch(`http://localhost:5000/deletereviews/${review.review_id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete review.");
            }

            onDelete(review.review_id);
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Failed to delete review. Please try again.");
        }
    };

    const handleEdit = () => {
        navigate(`/editreview/${review.review_id}`); // ✅ Navigate to EditReview page
    };

    return (
        <div>
            <div className="lg:w-96 sm:w-60 h-96 bg-gradient-to-br from-black to-red-950 rounded-2xl text-red-50 font-[Inter] relative">
                <div className="relative">
                    <img className="object-cover w-full h-60 rounded-t-2xl" src={review.image_url} alt={review.title} />
                    <div className="bg-red-950 flex justify-evenly items-center gap-2 absolute right-0 top-0 h-12 w-16 rounded-tr-2xl">
                        <i className="fa-sharp fa-solid fa-star fa-sm " style={{ color: "#dc2626" }}></i>
                        <div>{review.rating}</div>
                    </div>
                </div>

                <div className="flex flex-col px-2 justify-evenly">
                    <div className="text-left text-red-50/60 text-sm">Reviewed on {new Date(review.review_date).toLocaleDateString()}</div>
                    <div className="lg:text-xl sm:text-sm text-left">{review.review_heading}</div>
                </div>

                <div className="flex justify-evenly items-center text-black text-sm px-2 absolute bottom-3 gap-3">
                    <button className="lg:w-44 sm:w-25 h-10 bg-red-600 rounded-2xl" onClick={handleEdit}>
                        Edit review
                    </button>
                    <button onClick={() => setShowConfirm(true)} className="lg:w-44 sm:w-25 h-10 bg-white rounded-2xl" >
                        Delete review
                    </button>
                    {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this review?"
          onConfirm={() => {
            handleDelete();
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
                </div>
            </div>
        </div>
    );
}

export default ReviewCard2;
