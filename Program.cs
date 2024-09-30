var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Додаємо підтримку статичних файлів (HTML, CSS, JS)
app.UseStaticFiles();

// Налаштовуємо перенаправлення до стартової сторінки (index.html)
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();

