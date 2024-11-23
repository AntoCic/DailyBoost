#                  _         _____ _      
#      /\         | |       / ____(_)     
#     /  \   _ __ | |_ ___ | |     _  ___ 
#    / /\ \ | '_ \| __/ _ \| |    | |/ __|
#   / ____ \| | | | || (_) | |____| | (__ 
#  /_/    \_\_| |_|\__\___/ \_____|_|\___|
#                                         
# ./ff.ps1

# Se non ho i permessi per eseguire i il manù lanciare
# Set-ExecutionPolicy RemoteSigned

# Mappa dei comandi associati alle chiavi
$commandsMenu = @{
    "Deploy"              = @{
        "Compila velocemente e distribuisci"            = "vite build; firebase deploy"
        "Compila in modalità sviluppo e distribuisci"   = "npm ci; vite build; firebase deploy"
        "Compila in modalità produzione e distribuisci" = "npm ci; vite build; firebase deploy"
        "Upload env var con config.json e deploy"       = @(
            "cd ./functions",
            ".\env.ps1 -u",
            "cd ../",
            "vite build",
            "firebase deploy"
        ) -join "; "
        "Pull env var in config.json"                   = @(
            "cd ./functions",
            ".\env.ps1 -p",
            "cd ../"
        ) -join "; "
    }
    
    "Global dependencies" = @{
        "Installa -g Vue CLI"      = "npm install -g @vue/cli"
        "Installa -g Firebase CLI" = "npm install -g firebase-tools"
        "Installa -g Vite"         = "npm install -g vite"
        "Installa -g create-vite"  = "npm install -g create-vite"
        "Installa -g json-server"  = "npm install -g json-server"
        "Installa -g Netlify CLI"  = "npm install -g netlify-cli"
        "Installa -g TypeScript"   = "npm install -g typescript"
        "Installa -g Vercel CLI"   = "npm install -g vercel"
        "Installa -g Nodemon"      = "npm install -g nodemon"
    }
    "Dev dependencies"    = @{
        "Installa @vitejs/plugin-vue" = "npm install @vitejs/plugin-vue --save-dev"
        "Installa Sass"               = "npm install sass --save-dev"
        "Installa Vite"               = "npm install vite --save-dev"
    }
    "Dependencies"        = @{
        "Installa @popperjs/core"     = "npm install @popperjs/core"
        "Installa Axios"              = "npm install axios"
        "Installa Bootstrap"          = "npm install bootstrap"
        "Installa Firebase"           = "npm install firebase"
        "Installa Firebase Functions" = "npm install firebase-functions"
        "Installa Vue Router"         = "npm install vue-router"
        "Installa Vue"                = "npm install vue"
        "Installa ESLint"             = "npm install eslint"
        "Installa Prettier"           = "npm install prettier"
        "Installa Nodemon"            = "npm install nodemon"
        "Installa Express"            = "npm i express"
        "Installa vue-i18n"           = "npm i vue-i18n"
    }
        
    "Init"                = @{
        "Installa dipendenze globali necessarie"     = @(
            "npm install -g @vue/cli",
            "npm install -g firebase-tools",
            "npm install -g vite",
            "npm install -g create-vite"
        ) -join "; "
        "Installa dipendenze locali necessarie"      = @(
            "npm install @popperjs/core",
            "npm install axios",
            "npm install bootstrap",
            "npm install firebase",
            "npm install firebase-functions",
            "npm install vue-router",
            "npm install vue"
        ) -join "; "
        "Installa dipendenze di sviluppo necessarie" = @(
            "npm install @vitejs/plugin-vue --save-dev",
            "npm install sass --save-dev",
            "npm install vite --save-dev"
        ) -join "; "
        "Inizializza progetto"                       = @(
            "npm i",
            "cd ./functions",
            "npm i",
            "cd ../",
            "firebase login",
            "vite build",
            "firebase deploy"
        ) -join "; "
    }
}

$commands = @{}

foreach ($menuKey in $commandsMenu.Keys) {
    # Ottieni il sotto-menu
    $subMenu = $commandsMenu[$menuKey]
    
    foreach ($commandKey in $subMenu.Keys) {
        $commands[$commandKey] = $subMenu[$commandKey]
    }
}

[console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Imposta colori per il testo
# Esempi di colori disponibili:
# Black
# Blue
# Cyan
# DarkBlue
# DarkCyan
# DarkGray
# DarkGreen
# DarkMagenta
# DarkRed
# DarkYellow
# Gray
# Green
# Magenta
# Red
# White
# Yellow
function Write-Text {
    param(
        [string]$Text,
        [ConsoleColor]$Color = [ConsoleColor]::White
    )
    $originalColor = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $Color
    Write-Host $Text
    $Host.UI.RawUI.ForegroundColor = $originalColor
}

# Funzione per mostrare un menu con navigazione tramite frecce o tasti (W/S)
function Show-Menu {
    param (
        [string[]]$Options
    )
    $currentSelection = 0
    $key = $null

    do {
        Clear-Host
        Write-Text $productorName -Color DarkGray
        Check-Time  # Mostra messaggi personalizzati in base all'orario
        Write-Text "FastFunction Menù: (usa 'w' o 's' o le freccette)" -Color Yellow
        for ($i = 0; $i -lt $Options.Length; $i++) {
            if ($i -eq $currentSelection) {
                Write-Text "> $($Options[$i])" -Color Cyan
            }
            else {
                Write-Host "  $($Options[$i])"
            }
        }
        $key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        if ($key.VirtualKeyCode -eq 38 -or $key.Character -eq 'w') {
            # Freccia Su o W
            $currentSelection = ($currentSelection - 1) % $Options.Length
            if ($currentSelection -lt 0) { $currentSelection = $Options.Length - 1 }
        }
        elseif ($key.VirtualKeyCode -eq 40 -or $key.Character -eq 's') {
            # Freccia Giù o S
            $currentSelection = ($currentSelection + 1) % $Options.Length
        }
        elseif ($key.VirtualKeyCode -eq 27) {
            # Esc
            return -1
        }
    } while ($key.VirtualKeyCode -ne 13) # Invio
    return $currentSelection
}

# Funzione per richiedere una password
function Ask-Confirmation {
    Write-Text "Sei sicuro? (s/n): " -Color Green
    $response = Read-Host

    if ($response -eq 's' -or $response -eq 'S') {
        Write-Text "Operazione confermata!" -Color Green
        return $true
    }
    elseif ($response -eq 'n' -or $response -eq 'N') {
        Write-Text "Operazione annullata." -Color Red
        return $false
    }
    else {
        Write-Text "Risposta non valida. Usa 's' per sì o 'n' per no." -Color Red
        return $false
    }
}


# Funzione per il countdown
function Countdown {
    param (
        [int]$Seconds
    )

    Write-Text "Il sistema si spegnerà in $Seconds secondi. Premi Invio, Spazio o Esc per annullare." -Color Yellow

    for ($i = $Seconds; $i -ge 0; $i--) {
        Write-Text "$i..." -Color Red

        $endTime = (Get-Date).AddSeconds(1)
        while ((Get-Date) -lt $endTime) {
            if ([console]::KeyAvailable) {
                $key = [console]::ReadKey($true)
                if ($key.Key -eq [ConsoleKey]::Escape -or $key.Key -eq [ConsoleKey]::Enter -or $key.KeyChar -eq ' ') {
                    Write-Text "Countdown interrotto dall'utente!" -Color Green
                    return $false
                }
            }
            Start-Sleep -Milliseconds 100
        }
    }

    return $true
}

# Funzione per controllare l'ora e visualizzare messaggi personalizzati
function Check-Time {
    $currentTime = Get-Date
    $hour = $currentTime.Hour
    $minute = $currentTime.Minute

    if (($hour -eq 20 -and $minute -ge 30) -or ($hour -eq 21 -or ($hour -eq 22 -and $minute -eq 0))) {
        Write-Text "--> Vai a Cenare! <--" -Color Red
        Write-Text " "
    }
    elseif ($hour -ge 0 -and $hour -lt 6) {
        Write-Text "--> Vai a Dormire! <--" -Color Red
        Write-Text " "
    }
    elseif (($hour -eq 12 -and $minute -ge 40) -or ($hour -eq 13) -or ($hour -eq 14 -and $minute -eq 0)) {
        Write-Text "--> Vai a Pranzare! <--" -Color Red
        Write-Text " "
    }
}

# Funzione per mostrare i colori disponibili
function Show-Colors {
    $colors = [System.Enum]::GetValues([System.ConsoleColor])
    foreach ($color in $colors) {
        Write-Text "Questo è il colore: $color" -Color $color
    }
}

# Mostra data e ora correnti
function Show-DateAndTime {
    Write-Text "Data e ora correnti: $(Get-Date)" -Color Cyan
}

# Mostra data e ora correnti
function backToMenu {
    Invoke-Expression "./ff.ps1"
    if ($LASTEXITCODE -ne 0) {
        throw "Errore durante l'esecuzione di: ./ff.ps1"
    }
}

function Run-ScriptByKey {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Key  # La chiave specificata come parametro
    )

    # Controlla se la chiave esiste nella mappa
    if (-not $commands.ContainsKey($Key)) {
        Write-Text "Errore: la chiave '$Key' non è valida. Scegli tra: $($commands.Keys -join ', ')" -Color Red
        return
    }

    # Ottieni i comandi associati alla chiave
    $script = $commands[$Key]
    Write-Text "Eseguendo i comandi per la chiave: '$Key'" -Color Yellow
    Write-Text "Comandi: $script" -Color Cyan

    # Esegui i comandi
    try {
        $script.Split(';') | ForEach-Object {
            $command = $_.Trim()
            if ($command -ne "") {
                Write-Text "Eseguendo: $command" -Color Green
                Invoke-Expression $command
                if ($LASTEXITCODE -ne 0) {
                    throw "Errore durante l'esecuzione di: $command"
                }
            }
        }
        Write-Text "Tutti i comandi per '$Key' sono stati eseguiti con successo!" -Color Green
    }
    catch {
        Write-Text "Errore: $_" -Color Red
    }
}

# Oggetto con estensioni e template
$fileTemplates = [ordered]@{
    "txt" = ""
    "vue" = "<template>
  <div>
    <!-- Your template here -->
  </div>
</template>

<script>
export default {
  name: 'ComponentName',
  props: {},
  data() {
    return {
      // Your data here
    };
  },
  methods: {
    // Your methods here
  }
};
</script>

<style scoped>
/* Your styles here */
</style>"
    "jsx" = "import React from 'react';

const ComponentName = () => {
  return (
    <div>
      {/* Your content here */}
    </div>
  );
};

export default ComponentName;"
}


function Create-File {
    # Chiedi il nome del file
    Write-Text "Inserisci il nome del file (senza estensione):" -Color Green
    $fileName = Read-Host

    if ([string]::IsNullOrWhiteSpace($fileName)) {
        Write-Text "Nome del file non valido." -Color Red
        return
    }

    # Ottieni le estensioni dall'hash table ordinato
    $extensions = @($fileTemplates.Keys)

    # Mostra menu per selezionare l'estensione
    Write-Text "Seleziona un'estensione per il file:" -Color Yellow
    $selection = Show-Menu -Options $extensions

    if ($selection -lt 0) {
        Write-Text "Operazione annullata." -Color Red
        return
    }

    $selectedExtension = $extensions[$selection]
    $filePath = "$PWD\$fileName.$selectedExtension"

    if ($selectedExtension -eq "txt") {
        # Chiede il contenuto per i file .txt
        Write-Text "Inserisci il contenuto del file .txt (lascia vuoto per un file vuoto):" -Color Green
        $content = Read-Host
        $content | Out-File -FilePath $filePath -Encoding UTF8
    }
    else {
        # Usa il template per altre estensioni
        $template = $fileTemplates[$selectedExtension]
        $template | Out-File -FilePath $filePath -Encoding UTF8
    }

    Write-Text "File creato: $filePath" -Color Green
}


# ASCII art del produttore
$productorName = @"
                 _         _____ _      
     /\         | |       / ____(_)     
    /  \   _ __ | |_ ___ | |     _  ___ 
   / /\ \ | '_ \| __/ _ \| |    | |/ __|
  / ____ \| | | | || (_) | |____| | (__ 
 /_/    \_\_| |_|\__\___/ \_____|_|\___|
                                        
"@

# Menu principale
$menuOptions = @("Deploy", "Crea File", "Init", "Utilità", "Dev dependencies", "Dependencies", "Global dependencies", "Spegni il PC", "Esci")
$selection = Show-Menu -Options $menuOptions

# Azioni del menu principale
switch ($selection) {
    -1 {
        Write-Text "Uscita tramite Esc." -Color Yellow
        exit
    }
    0 {
        # Menu Deploy
        $selectedMenu = $commandsMenu["Deploy"]
        $menuOptions = @($selectedMenu.Keys + "Torna indietro")
        $subSelection = Show-Menu -Options $menuOptions

        if ($subSelection -ge 0 -and $subSelection -lt ($menuOptions.Count - 1)) {
            Run-ScriptByKey -Key $menuOptions[$subSelection]
        }
        elseif ($subSelection -eq ($menuOptions.Count - 1)) {
            backToMenu
        }
    }
    1 {
        # Menu Crea File
        Create-File
    }
    2 {
        # Menu Init
        $selectedMenu = $commandsMenu["Init"]
        $menuOptions = @($selectedMenu.Keys + "Torna indietro")
        $subSelection = Show-Menu -Options $menuOptions

        if ($subSelection -ge 0 -and $subSelection -lt ($menuOptions.Count - 1)) {
            Run-ScriptByKey -Key $menuOptions[$subSelection]
        }
        elseif ($subSelection -eq ($menuOptions.Count - 1)) {
            backToMenu
        }
    }
    3 {
        # Menu Utilità
        $utilityOptions = @("Mostra Colori", "Mostra Data e Ora", "Torna indietro")
        $utilitySelection = Show-Menu -Options $utilityOptions
    
        switch ($utilitySelection) {
            0 {
                Show-Colors
            }
            1 {
                Show-DateAndTime
            }
            2 {
                backToMenu
            }
        }
    }
    4 {
        # Menu Dev dependencies
        $selectedMenu = $commandsMenu["Dev dependencies"]
        $menuOptions = @($selectedMenu.Keys + "Torna indietro")
        $subSelection = Show-Menu -Options $menuOptions

        if ($subSelection -ge 0 -and $subSelection -lt ($menuOptions.Count - 1)) {
            Run-ScriptByKey -Key $menuOptions[$subSelection]
        }
        elseif ($subSelection -eq ($menuOptions.Count - 1)) {
            backToMenu
        }
    }
    5 {
        # Menu Dependencies
        $selectedMenu = $commandsMenu["Dependencies"]
        $menuOptions = @($selectedMenu.Keys + "Torna indietro")
        $subSelection = Show-Menu -Options $menuOptions

        if ($subSelection -ge 0 -and $subSelection -lt ($menuOptions.Count - 1)) {
            Run-ScriptByKey -Key $menuOptions[$subSelection]
        }
        elseif ($subSelection -eq ($menuOptions.Count - 1)) {
            backToMenu
        }
    }
    6 {
        # Menu Global dependencies
        $selectedMenu = $commandsMenu["Global dependencies"]
        $menuOptions = @($selectedMenu.Keys + "Torna indietro")
        $subSelection = Show-Menu -Options $menuOptions

        if ($subSelection -ge 0 -and $subSelection -lt ($menuOptions.Count - 1)) {
            Run-ScriptByKey -Key $menuOptions[$subSelection]
        }
        elseif ($subSelection -eq ($menuOptions.Count - 1)) {
            backToMenu
        }
    }
    7 {
        if (Ask-Confirmation) {
            Write-Text "-- $(Get-Date) --" -Color Cyan
            if (Countdown -Seconds 5) {
                Write-Text "Spegnimento in corso..." -Color Red  
                Stop-Computer -Force
            }
        }
    }
    8 {
        Write-Text "Arrivederci!" -Color Yellow
        exit
    }
}

