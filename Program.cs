var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// ������ �������� ��������� ����� (HTML, CSS, JS)
app.UseStaticFiles();

// ����������� ��������������� �� �������� ������� (index.html)
app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();

