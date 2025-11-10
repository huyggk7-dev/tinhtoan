// Hàm tìm UCLN (Euclid)
function ucln(a, b) {
    // Chuyển sang số nguyên dương để tính UCLN
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Hàm xử lý và định dạng kết quả giống như hàm ketqua trong C++
function formatResult(numerator, denominator) {
    const stp = numerator / denominator;

    // Kiểm tra nếu cả tử số và mẫu số đều là số nguyên
    if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
        // Tránh chia cho 0
        if (denominator === 0) return "Lỗi: Chia cho 0"; 
        
        // Trường hợp nghiệm là số nguyên (a, b, c nguyên)
        const uc = ucln(numerator, denominator);
        const tu = numerator / uc;
        const mau = denominator / uc;

        if (mau === 1) {
            return tu;
        } else if (mau === -1) { // Xử lý mẫu số âm
             return -tu;
        } else if (mau < 0) { // Đưa dấu âm lên tử số
             return `${-tu}/${-mau}`;
        } else {
            return `${tu}/${mau}`; // Dạng phân số tối giản
        }
    } else {
        // Trường hợp có căn bậc hai (delta không phải số chính phương hoàn hảo), 
        // hoặc a, b, c là số thực. Làm tròn 2 chữ số thập phân.
        const kq = Math.round(stp * 100) / 100;
        return `${kq}`;
    }
}

document.getElementById('quadraticForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form gửi đi theo cách truyền thống

    // Lấy giá trị a, b, c từ input, đảm bảo chúng là số thực (float)
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    // Tính Delta
    const delta = b * b - 4 * a * c;

    // Hiển thị Delta
    // document.getElementById('delta-display').textContent = `Delta = ${delta}`;

    const solutionDisplay = document.getElementById('solution-display');

    if (a === 0) {
        // Trường hợp đặc biệt: Phương trình bậc nhất (ax^2 + bx + c = 0)
        if (b === 0) {
            if (c === 0) {
                solutionDisplay.textContent = "Phương trình vô số nghiệm (0x + 0 = 0)";
            } else {
                solutionDisplay.textContent = "Phương trình vô nghiệm (0x + c = 0, c khác 0)";
            }
        } else {
            // Giải phương trình bậc nhất: bx + c = 0 => x = -c/b
            const x = -c / b;
            // Sử dụng formatResult để làm tròn hoặc hiển thị phân số nếu có thể
            solutionDisplay.textContent = `Đây là phương trình bậc nhất, có nghiệm: x = ${formatResult(-c, b)}`;
        }
        return; // Dừng hàm
    }

    // Biện luận theo Delta
    if (delta > 0) {
        // 2 nghiệm phân biệt: x1 = (-b + sqrt(delta)) / 2a, x2 = (-b - sqrt(delta)) / 2a
        const sqrtDelta = Math.sqrt(delta);
        const numerator1 = -b + sqrtDelta;
        const numerator2 = -b - sqrtDelta;
        const denominator = 2 * a;

        const x1 = formatResult(numerator1, denominator);
        const x2 = formatResult(numerator2, denominator);

        solutionDisplay.innerHTML = `Phương trình có 2 nghiệm phân biệt: <br>x = ${x1} và x = ${x2}`;
    } else if (delta === 0) {
        // Nghiệm kép: x = -b / 2a
        const x_kep = formatResult(-b, 2 * a);
        solutionDisplay.textContent = `Phương trình có nghiệm kép: x = ${x_kep}`;
    } else {
        // Nghiệm phức
        const thuc = formatResult(-b, 2 * a);
        const ao = formatResult(Math.sqrt(-delta), 2 * a);
        
        solutionDisplay.innerHTML = `Phương trình có 2 nghiệm phức liên hợp: <br>x = ${thuc} + ${ao} i <br>x = ${thuc} - ${ao} i`;
    }
    document.getElementById('other-display').textContent = `Các nghiệm đã được làm tròn 2 chữ số hoặc chuyển thành phân số.`;
});