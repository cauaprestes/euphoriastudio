<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Variáveis que irão receber os dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $data_agendamento = htmlspecialchars($_POST['data']);
    $mensagem = htmlspecialchars($_POST['mensagem']);

    // E-mail para onde será enviado
    $destinatario = "cauaprestes@outlook.com";

    // Assunto do e-mail
    $assunto = "Novo agendamento de " . $nome;

    // Corpo do e-mail
    $corpo = "
        Nome: $nome\n
        E-mail: $email\n
        Telefone: $telefone\n
        Data do Agendamento: $data_agendamento\n
        Mensagem: $mensagem
    ";

    // Cabeçalhos do e-mail
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Envia o e-mail
    if (mail($destinatario, $assunto, $corpo, $headers)) {
        echo "Agendamento enviado com sucesso!";
    } else {
        echo "Falha ao enviar o agendamento.";
    }
}
?>
