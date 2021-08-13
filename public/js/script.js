const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const token = document
    .querySelector("meta[name='csrf_token']")
    .getAttribute("content");
const errorList = document.querySelector(".error_list");
const linkList = document.querySelector(".link_list");

const url = "http://localhost:8000";

form.addEventListener("submit", submitFormHandler);

async function submitFormHandler(e) {
    e.preventDefault();
    errorList.innerHTML = "";

    if (!input.value) {
        return errorList.insertAdjacentHTML(
            "afterbegin",
            `<li>Поле Ссылка обязательно для заполнения.</li>`
        );
    }

    const data = {
        _token: token,
        original: input.value,
    };

    try {
        const response = await postData(`${url}/create-url`, data);

        linkList.insertAdjacentHTML(
            "afterbegin",
            `<li>
                <a href="${url}/${response.alias}" target="_blank">
                    ${url}/${response.alias}
                </a>
            </li>`
        );
    } catch (errorResponse) {
        handleError(errorResponse);
    }
}

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw response;
    }

    return await response.json();
}

async function handleError(errorResponse) {
    const errors = await errorResponse.json();

    if (errorResponse.status === 422) {
        for (let field in errors) {
            errors[field].map((errorText) => {
                errorList.insertAdjacentHTML(
                    "afterbegin",
                    `<li>${errorText}</li>`
                );
            });
        }
    } else {
        errorList.insertAdjacentHTML(
            "afterbegin",
            `<li>Не удалось сгенерировать. Попробуйте еще раз.</li>`
        );
    }
}
