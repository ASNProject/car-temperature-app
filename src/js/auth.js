// Copyright 2026 ariefsetyonugroho
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

async function login() {
    const username = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const errorBox = document.getElementById("error");

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, password})
    });

    const data = await res.json();

    if (!data.status) {
        errorBox.style.display = "block";
        errorBox.innerText = data.message || "Login gagal";
        return;
    }

    // Simpan user ke localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    // Pindah ke halaman monitoring
    window.location.href = "index.html";
}


function checkAuth() {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "login.html";
    }
}


function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}