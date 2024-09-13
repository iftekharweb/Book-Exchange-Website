"use server";

import axios from "axios";
import { redirect } from "next/navigation";

export const goToLoginPage = () => redirect("/auth/login");
export const goToHome = () => redirect("/");
export const goToRegisterPage = () => redirect("/auth/register");
export const goToProfilePage = () => redirect("/user/profile");
export const goToUserBooks = () => redirect("/user/books");
export const goToBooksPage = () => redirect("/books");
export const goToBlogsPage = () => redirect("/blogs");
export const goToBuyRqToYou = () => redirect("/books/buy-request-to-you");
export const goToExchangeRqToYou = () =>
  redirect("/books/exchange-request-to-you");
export const goToYourBuyOrders = () => redirect("/books/your-buy-orders");
export const goToYourExchangeOrders = () =>
  redirect("/books/your-exchange-orders");
export const goToSelectBook = () =>
  redirect("/books/exchange-request-to-you/select");

export const goToTermsAndConditions = () => redirect("/terms-and-conditions");
export const goToPrivacyPolicy = () => redirect("/privacy-policy");
export const goToDevelopersPage = () => redirect("/developers");

export const loginOperation = async (email, password) => {
  let data;
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/login/`, {
      email,
      password,
    });
    if (res.data) {
      data = res.data;
      data = { ...data, msg: "Login successfull" };
      return data;
    }
  } catch (error) {
    data = {
      msg: "Invalid email or password",
    };
  }
  return data;
};

export const registerOperation = async (
  email,
  date_of_birth,
  gender,
  district,
  upazilla,
  phone,
  name,
  password
) => {
  let data;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/register/`,
      {
        email,
        date_of_birth,
        gender,
        district,
        upazilla,
        phone,
        name,
        password,
      }
    );
    if (res.data) {
      data = res.data;
      data = { ...data, msg: "Registration successfull" };
      return data;
    }
  } catch (error) {
    data = {
      msg: "Email already exists. Try a different email.",
    };
  }
  return data;
};

export const fetchUserWithImage = async (token, id) => {
  let data;
  try {
    const [res, imgRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/users/${id}/images/`),
    ]);
    if (res.data && imgRes.data) {
      data = {
        user: res.data,
        image: imgRes.data,
        msg: "",
      };
    }
  } catch (error) {
    data = {
      msg: "Something wrong! Please try again",
    };
  }
  return data;
};

export const deleteProfilePicAndUploadOne = async (id, imgId, formData) => {
  let data;
  try {
    const [dltImg, postImg] = await Promise.all([
      axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/users/${id}/images/${imgId}/`
      ),
      axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/users/${id}/images/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),
    ]);
    data = {
      msg: "Profile picture has been changed",
      error: false,
    };
  } catch (error) {
    data = {
      msg: "Someting is wrong! Please try again",
      error: true,
    };
  }
  return data;
};

export const uploadProfilePic = async (id, formData) => {
  let data;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/users/${id}/images/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    data = {
      msg: "Profile picture has been uploaded",
      error: false,
    };
  } catch (error) {
    data = {
      msg: "Someting is wrong! Please try again",
      error: true,
    };
  }
  return data;
};

export const changePassword = async (token, postData) => {
  let data;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/change-password/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) {
      data = {
        msg: "Password Changed successfully",
        error: false,
      };
    }
  } catch (error) {
    data = {
      msg: "Old password is not correct!",
      error: true,
    };
  }
  return data;
};

export const editProfile = async (token, id, profileData) => {
  let data;
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASEURL}/users/${id}/`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      data = {
        msg: "Profile info updated successfully",
        error: false,
      };
    }
  } catch (error) {
    data = {
      msg: "Failed to update profile. Please try again.",
      error: true,
    };
  }
  return data;
};

export const fetchAllBooks = async (id) => {
  let data;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/user-books/?user=${id}`
    );
    if (res.data) {
      data = {
        books: res.data,
        error: false,
      };
    }
  } catch (error) {
    data = {
      error: true,
    };
  }
  return data;
};

export const fetchAllCatagories = async () => {
  let data;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/categories/`
    );
    if (res.data) {
      data = {
        catagories: res.data,
        error: false,
      };
    }
  } catch (error) {
    data = {
      error: true,
    };
  }
  return data;
};

export const addBookDetails = async (postData, id) => {
  postData = { ...postData };
  console.log(postData);
  let data;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/books/`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      data = {
        book: res.data,
        error: false,
      };
    }
  } catch (error) {
    data = {
      error: true,
      msg: "Somting is wrong! Don't forget to fill all the fields",
    };
  }
  return data;
};

export const uploadFirstBookImage = async (formData, bookId) => {
  let data;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/books/${bookId}/images/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data) {
      data = {
        error: false,
        msg: "Book with it's image has been added successfully",
      };
    } else {
      data = {
        error: true,
        msg: "Image is not uploaded!",
      };
    }
  } catch (error) {
    data = {
      error: true,
      msg: "Image is not uploaded!",
    };
  }
  return data;
};

export const deleteBookImageAndUploadOne = async (
  bookId,
  dltImgId,
  formData
) => {
  let data;
  try {
    const dltImg = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/books/${bookId}/images/${dltImgId}/`
    );

    const postImg = await uploadFirstBookImage(formData, bookId);

    if (!postImg.error) {
      data = {
        msg: "Book info has been changed",
        error: false,
      };
    } else {
      data = {
        msg: "Something is wrong! Uploaded image of the book is not changed",
        error: true,
      };
    }
  } catch (error) {
    data = {
      msg: "Something is wrong! Uploaded image of the book is not changed",
      error: true,
    };
  }
  return data;
};

export const updateBookDetails = async (id, postData) => {
  let data;
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/books/${id}/`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      data = {
        bookData: res.data,
        error: false,
      };
    }
  } catch (error) {
    data = {
      msg: "Something is wrong. Please try again",
      error: true,
    };
  }
  return data;
};

export const fetchAllGenBooks = async () => {
  let data;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/books/`);
    if (res.data) {
      data = {
        books: res.data,
        error: false,
      };
    }
  } catch (error) {
    data = {
      msg: "Faild to fetch books",
      error: true,
    };
  }
  console.log(data);
  return data;
};

export const fetchOwnerInfo = async (id) => {
  let data;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/users/${id}`
    );
    if (res.data) {
      data = {
        error: false,
        ownerData: res.data,
      };
    }
  } catch (error) {
    data = {
      error: true,
    };
  }
  return data;
};

export const fetchBookInfo = async (id) => {
  let data;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/books/${id}/`
    );
    if (res.data) {
      data = {
        error: false,
        bookData: res.data,
      };
    }
  } catch (error) {
    data = {
      error: true,
    };
  }
  return data;
};

export const handleBuyBook = async (book_id, buyer_id) => {
  let data;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/buybooks/`,
      {
        cancel: false,
        sold: false,
        book_id,
        buyer_id,
      }
    );
    if (res.data) {
      data = {
        error: false,
        msg: "Buy request has been sent for this book",
      };
    }
  } catch (error) {
    data = {
      error: true,
      msg: "This book is already requested for buying",
    };
  }
  return data;
};

export const handleSwapBook = async (book_id, buyer_id) => {
  let data;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/swapbooks/`,
      {
        cancel: false,
        sold: false,
        book_id,
        buyer_id,
      }
    );
    if (res.data) {
      data = {
        error: false,
        msg: "Swap request has been sent for this book",
      };
    }
  } catch (error) {
    data = {
      error: true,
      msg: "This book is already requested for exchanging",
    };
  }
  return data;
};

export const fetchRequestData = async (id) => {
  let data;
  try {
    const [buyRequestsRes, allBuyRequestsRes, allSwapRequestsRes] =
      await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/buy-requests/?user=${id}`
        ),
        axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/buybooks/`),
        axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/swapbooks/`),
      ]);
    data = {
      error: false,
      buyRequestsRes: buyRequestsRes.data,
      allBuyRequestsRes: allBuyRequestsRes.data,
      allSwapRequestsRes: allSwapRequestsRes.data,
    };
  } catch (error) {
    data = {
      error: true,
    };
  }
  return data;
};

export const handleCancelBuyRQ = async (reqId) => {
  let data;
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/buybooks/${reqId}/`
    );
    data = {
      error: false,
      msg: "Cancelled Successfully",
    };
  } catch (error) {
    data = {
      error: false,
      msg: "Unsuccessfull Operation",
    };
  }
  return data;
};

export const handleConfirmBuyRQ = async (req) => {
  let data;
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASEURL}/books/${req.book.id}/`,
      {
        user: req.buyer.id,
      }
    );
    data = {
      error: false,
      msg: "Confirmation Successfull",
    };
  } catch (error) {
    data = {
      error: true,
      msg: "Faild to Confirm",
    };
  }
  return data;
};

export const deleteBuyBooksData = async (reqId) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/buybooks/${reqId}/`
    );
    return { error: false };
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
  }
};

export const deleteSwapBooksData = async (reqId) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/swapbooks/${reqId}/`
    );
    return { error: false };
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
  }
};

export const fetchBuyOrdersData = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/buy-orders/?user=${id}`
    );
    if (res.data) {
      return { error: false, reqs: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Faild to fetch" };
  }
};

export const fetchSwapRequestData = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/swap-orders/?user=${id}`
    );
    return { error: false, reqs: res.data };
  } catch (error) {
    return { error: true, msg: "Failed to fetch" };
  }
};

export const handleCancelSwapRQ = async (reqId) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/swapbooks/${reqId}/`
    );
    return { error: false, msg: "Cancelled successfully" };
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
  }
};

export const fetchExchangeRequestInfo = async (id) => {
  let data;
  try {
    const [buyRequestsRes, allBuyRequestsRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/swap-requests/?user=${id}`),
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/swapbooks/`),
    ]);
    data = {
      error: false,
      buyRequestsRes: buyRequestsRes.data,
      allBuyRequestsRes: allBuyRequestsRes.data,
    };
  } catch (error) {
    data = {
      error: true,
      msg: "Failed to fetch data",
    };
  }
  return data;
};

export const megaFetching = async (book_user, user_id, bookToSwap_id) => {
  let data;
  try {
    const [res, currUser, currBook, swapReq, buyReq] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/users/${book_user}/`),
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/users/${user_id}/`),
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/books/${bookToSwap_id}/`),
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/swapbooks/`),
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/buybooks/`),
    ]);

    if (
      res.data &&
      currUser.data &&
      currBook.data &&
      swapReq.data &&
      buyReq.data
    ) {
      data = {
        error: false,
        owner: res.data,
        currUser: currUser.data,
        currBook: currBook.data,
        swapReq: swapReq.data,
        buyReq: buyReq.data,
      };
    }
  } catch (error) {
    data = {
      error: true,
      msg: "Failed to fetch data",
    };
  }
  return data;
};

export const deleteTheBookFromSwapLog = async (reqId) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/swapbooks/${reqId}/`
    );
    return { error: false };
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
  }
};
export const deleteTheBookFromBuyLog = async (reqId) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/buybooks/${reqId}/`
    );
    return { error: false };
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
  }
};

export const handleConfirmForExchanging = async (
  theBook_id,
  book_id,
  theBook_user,
  book_user
) => {
  let data;
  try {
    const [res1, res2] = await Promise.all([
      axios.patch(`${process.env.NEXT_PUBLIC_BASEURL}/books/${theBook_id}/`, {
        user: book_user,
      }),
      axios.patch(`${process.env.NEXT_PUBLIC_BASEURL}/books/${book_id}/`, {
        user: theBook_user,
      }),
    ]);
    data = {
      error: false,
      res1: res1.data,
      res2: res2.data,
      msg: "These two books are exchanged Successfully",
    };
  } catch (error) {
    data = { error: true, msg: "Something went wrong" };
  }
  return data;
};

export const handleDeleteBook = async (book_id) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASEURL}/books/${book_id}/`);
    return {error: false, msg: "Deleted successfully"}
  } catch (error) {
    return {error: true, msg: "Error while deleting. Something went wrong."}
  }
}
