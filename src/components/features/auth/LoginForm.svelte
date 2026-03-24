<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    let email = "";
    let password = "";
    let loading = false;

    function handleLogin() {
        loading = true;
        console.log(email, password);
        loading = false;
    }
</script>

<Card.Root class="w-full max-w-md">
    <Card.Header>
        <Card.Title>Inicio de Sesion</Card.Title>
        <Card.Description>Inicia sesion en tu cuenta</Card.Description>
    </Card.Header>
    <Card.Content>
        <form on:submit|preventDefault={handleLogin}>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Correo Electronico"
                        bind:value={email}
                        required
                    /> 
                </div>
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        bind:value={password}
                        required
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </Button>
            </div>
        </form>
    </Card.Content>
</Card.Root>
