<template>
  <div id="app">
    <div style="width: 200px">
      <sm-number-input
        v-model="vmodelNumber2"
        @input="test"
        @increment="test"
        @decrement="test"
        placeholder="number input"
      >
        <template #help> is this shown? </template>
      </sm-number-input>
    </div>
    <sm-input
      ghost
      style="width: 300px"
      :error="selectErrorToggle && 'asdsd dsihsadoi ahsid asihdoias dhoiahsd'"
      v-model="vmodelNumber2"
      label="Hola!"
      size="small"
    />
    <br />
    <sm-input
      ghost
      style="width: 300px"
      :error="
        selectErrorToggle && [
          'Este campo es requerido',
          'El campo debe ser numerico',
          'Esto es una prueba'
        ]
      "
      v-model="vmodelNumber2"
      label="Hola!"
      size="medium"
    />
    <br />
    <sm-input
      ghost
      style="width: 300px"
      :error="
        selectErrorToggle && [
          'Este campo es requerido',
          'El campo debe ser numerico',
          'Esto es una prueba'
        ]
      "
      v-model="vmodelNumber2"
      label="Hola!"
      size="large"
    />
    <br />

    <div style="width: 1000px; max-width: 1000px">
      aaaaaaaaaaaaaaaa
      <sm-select
        ghost
        label="zaz"
        size="small"
        :options="sOptions"
        v-model="selectV"
        :error="selectErrorToggle && 'Este campo es requerido'"
      >
        <!-- style="width: 80px; max-width: 80px" -->
        <template v-slot:beforeInside="{ selectedOption }"> {{ selectedOption }} -$$-con</template>
        <!-- <template #before-inside>-con-</template> -->
        <template #afterInside>MXNa</template>
      </sm-select>
    </div>
    <button @click="selectV = undefined">asas</button>

    <sm-select
      ghost
      label="Before after inside slots"
      size="medium"
      :options="sOptions"
      block
      style="width: 200px"
      v-model="selectV"
      autocomplete
      :error="selectErrorToggle && 'Este campo es requerido'"
    >
      <template #beforeInside>$con</template>
      <template #afterInside>MXN</template>
    </sm-select>
    <sm-select
      label="Before after inside slots"
      size="large"
      :options="sOptions"
      block
      style="width: 300px"
      v-model="selectV"
      autocomplete
      :error="
        selectErrorToggle && [
          'Este campo es requerido',
          'El campo debe ser numerico',
          'Esto es una prueba'
        ]
      "
    >
      <template #beforeInside>$con</template>
      <template #afterInside>MXN</template>
    </sm-select>
    <br />
    <sm-button primary @click="selectErrorToggle = !selectErrorToggle">toggle error</sm-button>
    <br />

    <!-- <div>
      <div style="display: inline-block"> -->
    <sm-select
      label="TEST NO AUTOCOMPLETE"
      size="small"
      :options="largeNumberOptions"
      autocomplete
      block
      style="width: 240px"
      v-model="vmodelNumber"
    >
      <template v-slot:before-inside>
        <sm-icon icon="shop" />
      </template>
      <template v-slot:after-inside>
        <sm-icon icon="contacts" />
      </template>
      <!-- <template slot="optionHeader">
        <div style="padding: 8px 20px; background-color: #00b19d; color: white; font-size: 1.2rem">
          select Header
        </div>
      </template>
      <template slot="optionFooter">
        <div style="padding: 8px 20px; background-color: #00b19d; color: white; font-size: 1.2rem">
          select footer
        </div>
      </template> -->
    </sm-select>
    <!-- </div>
      <div style="display: inline-block">
        <sm-select
          label="TEST NO AUTOCOMPLETE"
          size="small"
          :options="largeNumberOptions"
          block
          style="width: 240px"
          v-model="vmodelNumber"
        >

        </sm-select>
      </div>
    </div> -->
    <br />
    <sm-select
      size="medium"
      :options="largeNumberOptions"
      block
      style="width: 240px"
      v-model="vmodelNumber"
    >
      <template v-slot:before-inside>$con</template>
      <template v-slot:after-inside>MXN</template>
      <template v-slot:optionHeader>
        <div style="padding: 8px 20px; background-color: #00b19d; color: white; font-size: 1.2rem">
          select Header
        </div>
      </template>
      <template v-slot:optionFooter>
        <div style="padding: 8px 20px; background-color: #00b19d; color: white; font-size: 1.2rem">
          select footer
        </div>
      </template>
    </sm-select>
    <sm-select
      size="large"
      :options="largeNumberOptions"
      block
      style="width: 240px"
      v-model="vmodelNumber"
    >
      <template v-slot:before-inside>$con</template>
      <template v-slot:after-inside>MXN</template>
      <template v-slot:optionHeader>
        <div style="padding: 8px 20px; background-color: #00b19d; color: white; font-size: 1.2rem">
          select Header
        </div>
      </template>
      <template v-slot:optionFooter>
        <div style="padding: 8px 20px; background-color: #00b19d; color: white; font-size: 1.2rem">
          select footer
        </div>
      </template>
    </sm-select>
    <br />
    <br />
    <sm-input label="Before after inside slots" error size="small" style="width: 300px">
      <template v-slot:before-inside><b>€</b></template>
      <template v-slot:after-inside>MXN</template>
      <template v-slot:before>out</template>
      <template v-slot:after>out</template>
    </sm-input>
    <br />
    <sm-input label="Before after inside slots" error size="medium" style="width: 300px">
      <template v-slot:before-inside><b>€</b></template>
      <template v-slot:after-inside>MXN</template>
      <template v-slot:before>out</template>
      <template v-slot:after>out</template>
    </sm-input>
    <br />
    <sm-input label="Before after inside slots" error size="large" style="width: 300px">
      <template v-slot:before-inside><b>€</b></template>
      <template v-slot:after-inside>MXN</template>
      <template v-slot:before>out</template>
      <template v-slot:after>out</template>
    </sm-input>
    <br />

    <sm-button @click="test('basic')" basic>
      Holaaaaa!
      <template #loading-slot> Cargando... </template>
    </sm-button>
    <sm-button @click="test('primary')" primary icon-right="help" loading> Hola! </sm-button>
    <sm-button @click="test('secondary')" secondary loading> Hola! </sm-button>
    <sm-button @click="test('ghost')" ghost loading> Hola! </sm-button>
    <sm-button @click="test('outline')" outline loading> Hola! </sm-button>

    <sm-card-proposal width="20em">
      <template #header>header</template>
      <template #body>body</template>
      <template #footer>footer</template>
    </sm-card-proposal>

    <sm-alert
      v-show="false"
      title="Hide by click"
      message="not auto hide"
      auto-hide-timeout="3000"
      hide="click"
    />
    <sm-select
      label="demo server side"
      size="small"
      placeholder="Select "
      :options="serverSideOptions"
      block
      style="width: 240px"
      v-model="selectV"
      autocomplete
      server-side
      v-model:loading="loadingServerSideOptions"
      @filter="getOptions"
    />
    <sm-select
      label="always listen options"
      size="small"
      :options="sOptions"
      style="width: 240px"
      v-model="selectV"
      reset-value-upon-options
    />
    <div style="width: 500px">
      <sm-button-group
        label="Tipo de documento"
        :grow="false"
        help="Si necesitas ayuda para crear una venta, haz clic aquí."
        size="small"
        v-model="documentType"
        :options="[
          { text: 'Opcion 1', value: 'opt1' },
          { text: 'Opcion 2', value: 'opt2' },
          { text: 'Opcion 3', value: 'opt3' }
        ]"
      />
    </div>
    <sm-icon icon="home" color="#ccc" error />
    <!-- <sm-select
      label="simple1"
      size="medium"
      placeholder="Select trunc text lorem  lorem lorem lorem"
      :options="[
        'some text a little bit larger to see if it gets truncated',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisa hd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd',
        {
          groupLabel: 'grouplabel',
          optGroup: true
        },
        'opt1',
        'opt2'
      ]"
      block
      style="width: 240px"
      v-model="selectV"
      required
      autocomplete
      disabled
    /> -->
    <sm-button
      size="small"
      label="Dropdown"
      :dropdownOptions="[
        { text: 'option1 has a very long text', event: 'opt1' },
        { text: 'Note that it its larger than button but still attached under it', event: 'opt2' }
      ]"
      style="margin-bottom: 50px"
      @click="test"
    />

    <sm-table
      :rows="tableData"
      :column-config="columnData"
      :filter-config="filterConfig"
      :selectable="true"
      separator="horizontal"
      style="min-width: 700px; max-width: 800px"
      separatorColor="#00B19D"
      @change="changeTablePage"
      @refresh="refreshTablePage"
      @filter="test"
      @click-row="test"
      scroll
      :loading="loadingg"
    >
      <!-- <div slot="actionsCol" slot-scope="{ row }">Prueba: {{ row.id }}</div> -->
      <!-- <template v-slot:selection-state-actions="{ rowsSelected }">
        {{ rowsSelected }}
        <sm-button label="Imprimir" outline icon-left="print" />
      </template> -->
      <template v-slot:selection-state-help>
        <a href="#"> Hit the road jack </a>
        , and dont you look back, no more
      </template>
    </sm-table>

    data XD
    <sm-table
      :rows="tableDataXD"
      :column-config="columnData"
      :filter-config="filterConfig"
      :selectable="true"
      separator="horizontal"
      style="min-width: 700px; max-width: 800px"
      separatorColor="#00B19D"
      @change="changeTablePage"
      @refresh="refreshTablePage"
      @filter="test"
      @click-row="test"
      scroll
      id-field="xd"
      :loading="loadingg"
    >
      <!-- <div slot="actionsCol" slot-scope="{ row }">Prueba: {{ row.id }}</div> -->
      <!-- <template v-slot:selection-state-actions="{ rowsSelected }">
        {{ rowsSelected }}
        <sm-button label="Imprimir" outline icon-left="print" />
      </template> -->
      <template v-slot:selection-state-help>
        <a href="#"> Hit the road jack </a>
        , and dont you look back, no more
      </template>
    </sm-table>

    <sm-textarea label="textarea 1" help="little help from friends" rows="5" required />

    <sm-icon-help
      help="<a href='https://docs.google.com/spreadsheets/d/1L0kvObIIuvQRgj3ZaZ2fAYimCRrjio9UOyC3gy6St2E/edit#gid=2100078219'>Keep growing</a>"
      :tooltip-options="{ offset: '50, 200' }"
    />

    <sm-icon icon="home" @click="test" @mouseenter="test" />
    <sm-icon-help @click="test"> Tiny help </sm-icon-help>
    <!-- <sm-checkbox>
      label
    </sm-checkbox> -->
    <br />
    <!-- <sm-checkbox /> -->
    <br />
    <sm-radio size="large" label-left> label </sm-radio>
    <br />
    <sm-radio size="large" />
    <br />
    <br />
    <!-- <sm-select
      v-model="multpleSelectNOAutocomplete"
      label="Multiple select NO autocomplete"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisa        hd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
      multiple
      style="width: 150px"
      block
      size="small"
    /> -->
    <br />
    <sm-button icon="home" iconButton size="small" />
    <!-- <sm-select
      v-model="multpleSelectAutocomplete"
      label="Multiple select with autocomplete"
      :options="[
        'primera opcion',
        'segunda opcion',
        'tercera opcion',
        'cuarta opcion',
        'quinta opcion',
        'sexta opcion',
        'octava opcion',
        'novena opcion'
      ]"
      autocomplete
      multiple
      style="width: 150px"
      block
      size="small"
    /> -->
    <!-- <sm-select
      label="simple"
      size="small"
      placeholder="simple select to test"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisa hd sfjlk ;flksjf lasdf;lds; lfalsjhl ',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
      return-object
      v-model="selectV"
      style="width: 200px"
      block
    /> -->
    <!-- <sm-select
      label="simple with objects"
      size="small"
      placeholder="simple select to test"
      :options="[
        {
          text: 'SIHDIAOS',
          value: 'sihdiaos'
        },
        {
          text: 'OIASHD',
          value: 'oiashd'
        }
      ]"
      return-object
      autocomplete
      v-model="selectV1"
    /> -->
    <sm-select
      label="simple with objects multiple"
      size="small"
      placeholder="simple select to test"
      :options="objOptions"
      multiple
      v-model="multpleSelect"
    />
    <sm-toggle size="large" help="help in toggle" />
    <sm-toggle />
    <sm-toggle size="small" />

    <div style="width: 400px">
      <sm-datepicker
        v-model="date"
        placeholder="Seleccionar fecha"
        :locale="locale"
        size="small"
        label="campo datepicker"
        block
        required
        @calendar-change="testCal('cal change')"
        @focus="testCal('focus')"
        @pick="testCal('pick')"
        @panel-change="testCal('panel-change')"
        format="MM/DD/YYYY"
      />
    </div>

    <div style="width: 300px">
      <sm-button-group
        label="Tipo de documento"
        help="Si necesitas ayuda para crear una venta, haz clic aquí."
        size="small"
        v-model="documentType"
        :options="[
          { text: 'Opcion 1', value: 'opt1' },
          { text: 'Opcion 2', value: 'opt2' },
          { text: 'Opcion 3', value: 'opt3' }
        ]"
      />
    </div>

    <!-- <sm-select
      v-model="multpleSelect"
      label="Multiple select"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisa        hd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
      multiple
      autocomplete
      style="width: 150px"
      block
      size="small"
    /> -->
    <sm-icon-help help="Hit the road jack, and dont you look back, no more" />
    <br />
    <sm-icon-help>
      <a href="#"> Hit </a>
      the road jack, and dont you look back, no more
    </sm-icon-help>
    <br /><br /><br />
    <br />
    <div style="display: flex">
      <sm-input
        label="Hola"
        help="and dont you look back, no more"
        placeholder="Test input"
        size="small"
        hint="Prueba wwsdhsa dhsaudi hsaiud hs dsahd sihdios"
        required
        :error="['Este campo es obligatorio', 'Este campo tiene que ser un numero']"
      />
      <div style="width: 30px">&nbsp;</div>
      <sm-input
        label="Hola"
        placeholder="Test input"
        size="large"
        hint="Prueba wwsdhsa dhsaudi hsaiud hs dsahd sihdiosah dioash doi"
        :error="['Este campo es obligatorio', 'Este campo tiene que ser un numero']"
      />
    </div>

    <sm-input
      label="Hola!!!!!!"
      help="and dont you look back, no more"
      placeholder="Test input"
      size="large"
      hint="Prueba wwsdhsa dhsaudi hsaiud hs dsahd sihdiosah dioash doi"
    >
      <template v-slot:before>
        <sm-icon icon="search" />
      </template>
      <template v-slot:after>
        <sm-icon icon="search" />
      </template>
    </sm-input>
    <br />
    <sm-input
      placeholder="Test input"
      hint="Prueba wwsdhsa dhsaudi hsaiud hs dsahd sihdiosah dioash doi"
    >
      <template v-slot:help>
        <a href="#"> and </a>
        dont you look back, no more
      </template>
    </sm-input>
    <br />
    <!-- <sm-select
      label="Medium select"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisa        hd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
      autocomplete
      help="and dont you look back, no more"
      size="small"
    /> -->
    <sm-select-simple
      label="dosjdaosjd saodja"
      v-model="selectVal"
      help="and dont you look back, no more"
    >
      <option value="a">Option very very very long 1</option>
      <option value="b">Test 2</option>
      <option value="c">Test 3</option>
    </sm-select-simple>
    <br />
    <sm-checkbox help="no more" label="GROW" v-model="grow" size="medium" :label-left="true">
      grow
    </sm-checkbox>
    <br />
    <sm-progress-bar max="    160" value="80" style="max-width: 400px" show-percentage />
    <br />
    <br />
    <sm-progress-circle max="160" value="160" style="max-width: 400px" show-percentage />
    <br />
    <br />
    <sm-progress-circle max="160" value="160" size="small" show-percentage />
    <br />
    <br />
    <sm-progress-circle max="160" value="40" size="large" show-percentage />
    <br />
    <!-- <sm-button :icon-right-src="require('@/assets/refresh.png')" label="icon src" size="large" /> -->
    <sm-button icon-left="home" size="small" label="icon src" @click-icon-left="test" />
    <sm-button icon-left="home" size="large" label="icon src" />
    <sm-button icon-left="home" label="icon src" />
    <sm-table
      :rows="tableData"
      :column-config="columnData"
      :filter-config="filterConfig"
      :selectable="true"
      separator="horizontal"
      style="min-width: 700px; max-width: 800px"
      separatorColor="#00B19D"
      @change="changeTablePage"
      @refresh="refreshTablePage"
    >
      <template v-slot:actionsCol="{ row }">Prueba: {{ row.id }}</template>
      <template v-slot:selection-state-actions="{ rowsSelected }">
        {{ rowsSelected }}
        <sm-button label="Imprimir" outline icon-left="print" />
      </template>
      <template v-slot:selection-state-help>
        <a href="#"> Hit the road jack </a>
        , and dont you look back, no more
      </template>
    </sm-table>
    <br />
    <sm-table
      :rows="tableData"
      :column-config="columnData"
      :filter-config="filterConfig"
      separator="horizontal"
      style="min-width: 700px; max-width: 800px"
      separatorColor="#00B19D"
      @change="changeTablePage"
      @refresh="refreshTablePage"
    >
      <div v-slot:actionsCol="{ row }">Prueba: {{ row.id }}</div>
    </sm-table>

    <sm-card elevation="4" inline class="ZZZ">Holaa!</sm-card>
    <br />
    <sm-button @click.prevent="openMenu"> Open Context menu </sm-button>
    <sm-context-menu ref="menuplus" v-click-outside="closeMenu" class="ctxmenu">
      <li>menu item 1</li>
      <li>menu item 2</li>
    </sm-context-menu>
    <br />
    default

    <br />
    <br />
    <sm-markup-table>
      <tr>
        <th>Table Head 1</th>
        <th>Table Head 2</th>
        <th>Table Head 3</th>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
    </sm-markup-table>
    <br />
    <br />
    dense
    <br />
    <br />
    <sm-markup-table dense>
      <tr>
        <th>Table Head 1</th>
        <th>Table Head 2</th>
        <th>Table Head 3</th>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
    </sm-markup-table>
    <br />
    <br />
    separator: cell && separatorColor: #00B19D (alegra) tal vez no es una buena combinación pero se
    puede hacer
    <br />
    <br />
    <sm-markup-table separator="cell" separatorColor="#00B19D">
      <tr>
        <th>Table Head 1</th>
        <th>Table Head 2</th>
        <th>Table Head 3</th>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
    </sm-markup-table>
    <br />
    <br />
    separator: horizontal
    <br />
    <br />
    <sm-markup-table separator="horizontal" separatorColor="#00B19D">
      <tr>
        <th>Table Head 1</th>
        <th>Table Head 2</th>
        <th>Table Head 3</th>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
    </sm-markup-table>
    <br />
    <br />
    separator: vertical
    <br />
    <br />
    <sm-markup-table separator="vertical">
      <tr>
        <th>Table Head 1</th>
        <th>Table Head 2</th>
        <th>Table Head 3</th>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
      <tr>
        <td>Division 1</td>
        <td>Division 2</td>
        <td>Division 3</td>
      </tr>
    </sm-markup-table>
    <br />
    <br />
    <sm-pagination
      v-model="page"
      v-model:items-per-page="itemsPerPage"
      :total="totalItems"
      style="width: 70%; margin: 0 auto"
    />
    <br />
    <sm-datepicker v-model="date" placeholder="Seleccionar fecha" :locale="locale" />
    <br />
    <div style="width: 300px">
      <sm-accordion
        :sections="[
          {
            title: 'Title number 1 for section',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
          },
          {
            title: 'Maybe something different',
            content:
              'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
          },
          {
            title: 'Last one for the road',
            content: 'Hit the road jack, and dont you look back, no more'
          }
        ]"
      />
      <br />
      <sm-accordion
        :sections="[
          {
            title: 'Title number 1 for section',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
          },
          {
            title: 'Maybe something different',
            content:
              'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
          },
          {
            title: 'Last one for the road',
            content: 'Hit the road jack, and dont you look back, no more'
          }
        ]"
      >
        <template v-slot:title="{ title }"> sm-{{ title }} </template>
        <template v-slot="{ content }">
          <div style="padding: 16px 32px">
            <h5>Content from slot</h5>
            {{ content }}
          </div>
        </template>
      </sm-accordion>
    </div>

    <br />
    <sm-radio v-model="tabsPos" native-value="left" size="medium">Tabs position left</sm-radio>
    <sm-radio v-model="tabsPos" native-value="right" size="medium">Tabs position right</sm-radio>
    <sm-radio v-model="tabsPos" native-value="center" size="medium">Tabs position center</sm-radio>
    <sm-checkbox label="GROW" v-model="grow" size="small" :indeterminate="true" @click="testMethod">
      grow</sm-checkbox
    >
    <br />
    <sm-tabs v-model="tab" :tabs-position="tabsPos" :grow="grow">
      <sm-tab
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
        :key="i"
        :id="`tab-${i}`"
      >
        Tab {{ i }}
      </sm-tab>
      <sm-tab-item v-for="i in [1, 2, 3]" :key="i" :value="`tab-${i}`">
        <div
          :style="`padding:20px;background:${i === 2 ? 'black' : i === 3 ? 'aquamarine' : 'white'}`"
        >
          <h1>Everything is working just fine.</h1>
          <br />
          <h2>Tab {{ i }} has been activated and that is why you are seen this text</h2>
          <br />
          <p>
            Some more text just to fill it up. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </sm-tab-item>
    </sm-tabs>
    <br />
    <div class="bg-brand1" style="max-width: 250px">
      <ul class="accordion">
        <sm-accordion-item v-bind="menu[1]" v-model:open="open">
          <template v-slot:title> sm </template>
        </sm-accordion-item>
      </ul>
    </div>
    <br />
    <sm-accordion-with-links :menu="menu">
      <template v-slot:title="{ title }"> sm - {{ title }} </template>
    </sm-accordion-with-links>

    <br />
    <!-- <sm-select
      label="Large select"
      size="large"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisahd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
      autocomplete
      disabled
    /> -->
    <!-- <sm-select
      label="With Object"
      size="large"
      :options="[
        { text: 'sihdiaos', value: 1 },
        { text: 'sihdia', value: 2 },
        { text: 'sihdiaosafsdlk', value: 3 },
        { text: 'dhisahd', value: 4 },
        { text: 'dhisahdadmlk', value: 5 },
        { text: 'dhisahdas jhl', value: 6 },
        { text: 'dhisahdad lk', value: 7 },
        { text: 'iasod dhi oia', value: 8 },
        { text: 'hiosahd  man', value: 9 },
        { text: 'oiashd', value: 10 }
      ]"
      placeholder="Walk"
      autocomplete
      error="test e"
    >
      <template slot="empty"> This is from <code>empty</code> slot </template>
    </sm-select> -->
    <br />
    <!-- <sm-select
      label="Medium select"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisahd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
      autocomplete
    /> -->
    <!-- <sm-select
      label="Medium select"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisahd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
    /> -->
    <br />
    <!-- <sm-select
      label="Small select"
      size="small"
      :options="[
        'sihdiaos',
        'sihdia',
        'sihdiaosafsdlk',
        'dhisahd',
        'dhisahdadmlk',
        'dhisahdas jhl',
        'dhisahdad lk',
        'iasod dhi oia',
        'hiosahd  man',
        'oiashd'
      ]"
      autocomplete
    /> -->
    <!-- <sm-select
      label="with server-side"
      size="small"
      :options="filterOptions"
      @filter="filter"
      :loading="filterLoading"
      hint="set server-side to handle filtering by yourself"
      autocomplete
      server-side
    /> -->
    <!-- <sm-select
      label="with v-modal"
      size="small"
      :options="filterOptions"
      autocomplete
      v-model="selectV"
    /> -->
    <br />
    <sm-alert-stack />
    <button @click="showModal = true">show modal</button>
    <sm-modal
      v-if="showModal"
      @close="showModal = false"
      :header-config="{ props: { noPadding: true } }"
      :body-config="{ props: { padding: '5px' } }"
      padding-footer="5px 5px"
    >
      <template v-slot:header>Header of Card</template>
      <template>Body of card</template>
      <template v-slot:footer>
        <button @click="showModal = false">hide</button>
      </template>
    </sm-modal>

    <!-- :modal="modalFooter" -->
    <!-- :body="modalBody" -->
    <!-- <sm-modal
      :modalConfig="modalConfig"
      :header="modalHeader"
      :headerConfig="modalHeaderConfig"
      :bodyConfig="{ props: { noPadding: '0' } }"
      footer-text="Hola!"
      :footerConfig="{ props: { padding: '0' } }"
    >
      <template>Body of card</template>
    </sm-modal> -->

    <br />
    <sm-component-extended :component="modalBody" v-bind="modalBodyConfig" />

    <div>
      <div style="display: inline-block">
        <sm-tooltip :followCursor="true">
          <template v-slot:trigger>
            <sm-paragraph>Paragraph with tooltip that follows the cursor!!!</sm-paragraph>
          </template>
          I'm a tooltip!
        </sm-tooltip>
      </div>
    </div>

    <sm-heading>
      <span content="I'm a tooltip!" v-tooltip>TOOLTIP EXAMPLE</span>
    </sm-heading>

    <sm-heading size="1">sihdiaos dhisahd iasod hiosahd oiashd</sm-heading>
    <sm-heading size="2">sihdiaos dhisahd iasod hiosahd oiashd</sm-heading>
    <sm-heading size="3">sihdiaos dhisahd iasod hiosahd oiashd</sm-heading>
    <sm-heading size="4">sihdiaos dhisahd iasod hiosahd oiashd</sm-heading>
    <sm-heading size="5">sihdiaos dhisahd iasod hiosahd oiashd</sm-heading>
    <sm-heading size="6">sihdiaos dhisahd iasod hiosahd oiashd</sm-heading>

    <sm-input
      label="Hola with tooltip <span>HOLA!</span>"
      label-class="teststst"
      placeholder="Test input"
      v-model="size"
      :size="size"
      content="I'm a Tippy tooltip!"
      error="test error"
      v-tooltip
    >
      <template v-slot:before><span>$</span> <sm-icon icon="help" /> </template>
      <template v-slot:after> % </template>
    </sm-input>

    <br /><br /><br />

    <sm-input
      label="Hola"
      placeholder="Test input"
      size="small"
      hint="Prueba wwsdhsa dhsaudi hsaiud hs dsahd sihdiosah dioash doi"
      input-class="test"
      input-style="border:1px dashed red;"
    />

    <sm-input
      label="Hola"
      placeholder="Test input"
      size="medium"
      hint="Prueba wwsdhsa dhsaudi hsaiud hs dsahd sihdiosah dioash doi"
    />

    <sm-input
      label="Hola"
      placeholder="Test input"
      size="large"
      hint="Prueba wwsdhsa dhsaudi hsaiud hs dsahd sihdiosah dioash doi"
    />

    <br />
    <input type="checkbox" v-model="primaryBtn" />

    <br />

    <sm-button
      :label="size"
      :size="size"
      icon-right="plus"
      icon-left="minus"
      content="I'm a Tippy tooltip!"
      v-tooltip
    />
    <sm-button :primary="primaryBtn" :size="size" pill @click="test" disabled> test2 </sm-button>

    <br />

    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <sm-checkbox
            v-model="checkVal"
            size="small"
            true-value="A"
            false-value="B"
            native-value="first"
            hint="Prueba wwsdhsa dhsaudi hsaiud h"
            required
            >Test Checkbox small</sm-checkbox
          >
        </div>
        <div class="col">.col</div>
      </div>
    </div>

    <sm-checkbox
      v-model="checkVal"
      size="medium"
      true-value="A"
      false-value="B"
      native-value="second"
      hint="Prueba wwsdhsa dhsaudi hsaiud h"
      >Test Checkbox medium</sm-checkbox
    >

    <sm-checkbox v-model="checkVal2" size="large" hint="Prueba wwsdhsa dhsaudi hsaiud h"
      >Test Checkbox large</sm-checkbox
    >

    <sm-checkbox
      v-model="checkVal3"
      size="medium"
      true-value="TestValueTrue"
      false-value="TestValueFalse"
      error="test error"
      hint="Prueba 12913 9028294"
      >Test Checkbox different true/false values</sm-checkbox
    >

    <br />
    <br />

    <sm-radio v-model="radioVal" native-value="A" size="small" hint="Prueba 12913 9028294"
      >Test Radio small</sm-radio
    >
    <sm-radio
      v-model="radioVal"
      native-value="B"
      error="test error"
      size="medium"
      hint="Prueba 12913 9028294"
      >Test Radio medium</sm-radio
    >
    <sm-radio v-model="radioVal" native-value="C" size="large" hint="Prueba 12913 9028294"
      >Test Radio large</sm-radio
    >
    <br />
    <sm-radio v-model="radioVal2" disabled native-value="D" size="large" hint="Prueba 12913 9028294"
      >Test Radio large</sm-radio
    >

    <br />
    <br />
    <sm-select-simple
      error="test error"
      size="large"
      label="dosjdaosjd saodja"
      v-model="selectVal"
      required
    >
      <option value="a">Option very very very long 1</option>
      <option value="b">Test 2</option>
      <option value="c">Test 3</option>
    </sm-select-simple>
    <br />
    <br />
    <sm-icon icon="plus" size="large" />
    <br />
    <br />

    <!-- Card Group -->
    <sm-card-group>
      <div>Test</div>
      <div>Card</div>
      <div>Group</div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore quos beatae at
        accusantium expedita nulla vel vero harum fugiat deserunt officiis nihil ducimus nam
        blanditiis, cupiditate ea aliquid? Eius?
      </div>
    </sm-card-group>
    <!--// -->

    <sm-plugin-modal />

    <br />
    <br />
  </div>
</template>
<script>
import smParagraph from "./components/Paragraph/Paragraph"
import smHeading from "./components/Heading/Heading"
import smButton from "./components/Button/Button"
import smInput from "./components/Input/Input"
import smSelectSimple from "./components/SelectSimple/SelectSimple"
import smCheckbox from "./components/Checkbox/Checkbox"
import smIcon from "./components/Icon/Icon"
import smIconHelp from "./components/Icon/IconHelp"
import smRadio from "./components/Radio/Radio"
import smCard from "./components/Card/Card"
import smAlert from "./components/Alert/Alert"
import smAlertStack from "./components/Alert/AlertStack"
import smModal from "./components/Modal/Modal"
import smPluginModal from "./components/Modal/PluginModal"
import smSelect from "./components/Select/Select"
import smAccordionItem from "./components/Accordion/AccordionItem"
import smAccordionWithLinks from "./components/Accordion/AccordionWithLinks"
import smAccordion from "./components/Accordion/Accordion"
import smTabs from "./components/Tabs/Tabs"
import smTab from "./components/Tabs/Tab"
import smTabItem from "./components/Tabs/TabItem"
import smDatepicker from "./components/Datepicker/Datepicker"
import smPagination from "./components/Pagination/Pagination"
import smMarkupTable from "./components/MarkupTable/MarkupTable"
import smTable from "./components/Table/Table"
import smContextMenu from "./components/ContextMenu"
import smComponentExtended from "./components/ComponentExtended/ComponentExtended"
import smProgressBar from "./components/Progress/ProgressBar"
import smProgressCircle from "./components/Progress/ProgressCircle"
import smButtonGroup from "./components/ButtonGroup/ButtonGroup"
import smToggle from "./components/Toogle/Toggle"
import smTextarea from "./components/Textarea/Textarea"
import smCardGroup from "./components/CardGroup/CardGroup"
import smCardProposal from "./components/Card/CardProposal/Card"
import smNumberInput from "./components/Input/NumberInput"

// import footerModalSimple from "./FooterModalSimple"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    smCardProposal,
    smHeading,
    smParagraph,
    smButton,
    smInput,
    smNumberInput,
    smSelectSimple,
    smCheckbox,
    smIcon,
    smIconHelp,
    smRadio,
    smCard,
    smAlert,
    // eslint-disable-next-line vue/no-unused-components
    smAlertStack,
    smModal,
    smSelect,
    smAccordionWithLinks,
    smAccordionItem,
    smAccordion,
    smTabs,
    smTab,
    smTabItem,
    smDatepicker,
    smPagination,
    smMarkupTable,
    smTable,
    smContextMenu,
    smComponentExtended,
    smProgressBar,
    smProgressCircle,
    smButtonGroup,
    smToggle,
    smTextarea,
    smCardGroup,
    smPluginModal
  },
  data() {
    return {
      selectErrorToggle: true,
      vmodelNumber2: 1,
      vmodelNumber: 5,
      serverSideOptions: [],
      loadingServerSideOptions: false,
      objOptions: [
        {
          text: "SIHDIAOS",
          value: "sihdiaos"
        },
        {
          text: "OIASHD",
          value: "oiashd"
        }
      ],
      sOptions: [
        "some text a little b",
        "sihdia",
        "sihdiaosafsdlk",
        "dhisa hd",
        "dhisahdadmlk",
        "dhisahdas jhl",
        "dhisahdad lk",
        "iasod dhi oia",
        "hiosahd  man",
        "oiashd"
      ],
      largeNumberOptions: [],
      testBackspace: undefined,
      documentType: null,
      selectV: null,
      selectV1: null,
      primaryBtn: false,
      size: "large",
      selectVal: "b",
      checkVal: ["first"],
      checkVal2: false,
      checkVal3: "TestValueTrue",
      radioVal: "",
      radioVal2: "D",
      showModal: false,
      columnData: [
        {
          name: "age",
          label: "edad",
          format: s => s.toUpperCase(),
          filterable: true,
          width: "50px"
        },
        {
          name: "skills",
          label: "Aptitudes",
          headerAlign: "center",
          bodyAlign: "right",
          width: "270px",
          headerStyle: {
            background: "lightblue",
            "font-size": "18px",
            fontWeight: "bold"
          },
          bodyClass: "PRUEBA",
          bodyStyle: {
            "font-size": "15px",
            fontWeight: "thin"
          },
          filterable: true
        },
        {
          name: "name",
          label: "nombre:",
          firstToUpper: true,
          bodyAlign: "right",
          filterable: true
        },
        { name: "id", firstToUpper: true, order: false, headerClass: "TEST", filterable: true }
      ],
      filterConfig: {
        name: {
          type: "input",
          attrs: {
            placeholder: "Nombre"
          }
        },
        age: {
          type: "input",
          attrs: {
            nativeType: "number",
            placeholder: "Edad"
          }
        },
        skills: {
          type: "select",
          attrs: {
            placeholder: "Aptitudes",
            multiple: true
          },
          options: [
            "Vue",
            "Php",
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
          ]
        },
        id: {
          type: "select"
        }
        // skills: {
        //   type: "checkbox"
        // }
        // skills: {
        //   type: "select",
        //   options: [
        //     {label: "option 1",value: 1},
        //     {label: "option 2",value: 2},
        //     {label: "option 3",value: 3}
        //   ],
        //   attrs: {
        //     placeholder: "Aptitudes"
        //   }
        // }
      },
      tableData: [
        { id: 1, name: "Nacho", age: 33, skills: "Vue, Php" },
        { id: 2, name: "Lian", age: 25, skills: "Vue, React" },
        { id: 3, name: "Seba", age: 60, skills: "Node" },
        { id: 4, name: "Martin", age: 54, skills: "Php" },
        { id: 5, name: "Carlos", age: 18, skills: "Python" },
        { id: 6, name: "Ariana", age: 23, skills: "Javascript" },
        { id: 7, name: "Juan", age: 46, skills: "Php" },
        { id: 8, name: "Pedro", age: 55, skills: "Python" },
        { id: 9, name: "Diana", age: 66, skills: "Javascript" },
        { id: 10, name: "Zeta", age: 21, skills: "Php" },
        { id: 11, name: "Guillermo", age: 19, skills: "Python" },
        { id: 12, name: "Edgardo", age: 57, skills: "Javascript" },
        { id: 21, name: "Nacho", age: 33, skills: "Vue, Php" },
        { id: 22, name: "Lian", age: 25, skills: "Vue, React" },
        { id: 23, name: "Seba", age: 60, skills: "Node" },
        { id: 24, name: "Martin", age: 54, skills: "Php" },
        { id: 25, name: "Carlos", age: 18, skills: "Python" },
        { id: 26, name: "Ariana", age: 23, skills: "Javascript" },
        { id: 27, name: "Juan", age: 46, skills: "Php" },
        { id: 28, name: "Pedro", age: 55, skills: "Python" },
        { id: 29, name: "Diana", age: 66, skills: "Javascript" },
        { id: 210, name: "Zeta", age: 21, skills: "Php" },
        { id: 211, name: "Guillermo", age: 19, skills: "Python" },
        { id: 212, name: "Edgardo", age: 57, skills: "Javascript" },
        { id: 31, name: "Nacho", age: 33, skills: "Vue, Php" },
        { id: 32, name: "Lian", age: 25, skills: "Vue, React" },
        { id: 33, name: "Seba", age: 60, skills: "Node" },
        { id: 34, name: "Martin", age: 54, skills: "Php" },
        { id: 35, name: "Carlos", age: 18, skills: "Python" },
        { id: 36, name: "Ariana", age: 23, skills: "Javascript" },
        { id: 37, name: "Juan", age: 46, skills: "Php" },
        { id: 38, name: "Pedro", age: 55, skills: "Python" },
        { id: 39, name: "Diana", age: 66, skills: "Javascript" },
        { id: 310, name: "Zeta", age: 21, skills: "Php" },
        { id: 311, name: "Guillermo", age: 19, skills: "Python" },
        { id: 312, name: "Edgardo", age: 57, skills: "Javascript" },
        { id: 41, name: "Nacho", age: 33, skills: "Vue, Php" },
        { id: 42, name: "Lian", age: 25, skills: "Vue, React" },
        { id: 43, name: "Seba", age: 60, skills: "Node" },
        { id: 44, name: "Martin", age: 54, skills: "Php" },
        { id: 45, name: "Carlos", age: 18, skills: "Python" },
        { id: 46, name: "Ariana", age: 23, skills: "Javascript" },
        { id: 47, name: "Juan", age: 46, skills: "Php" },
        { id: 48, name: "Pedro", age: 55, skills: "Python" },
        { id: 49, name: "Diana", age: 66, skills: "Javascript" },
        { id: 410, name: "Zeta", age: 21, skills: "Php" },
        { id: 411, name: "Guillermo", age: 19, skills: "Python" },
        { id: 412, name: "Edgardo", age: 57, skills: "Javascript" }
      ],
      tableDataXD: [
        { xd: 1, name: "Nacho", age: 33, skills: "Vue, Php" },
        { xd: 2, name: "Lian", age: 25, skills: "Vue, React" },
        { xd: 3, name: "Seba", age: 60, skills: "Node" },
        { xd: 4, name: "Martin", age: 54, skills: "Php" },
        { xd: 5, name: "Carlos", age: 18, skills: "Python" },
        { xd: 6, name: "Ariana", age: 23, skills: "Javascript" },
        { xd: 7, name: "Juan", age: 46, skills: "Php" },
        { xd: 8, name: "Pedro", age: 55, skills: "Python" },
        { xd: 9, name: "Diana", age: 66, skills: "Javascript" },
        { xd: 10, name: "Zeta", age: 21, skills: "Php" },
        { xd: 11, name: "Guillermo", age: 19, skills: "Python" },
        { xd: 12, name: "Edgardo", age: 57, skills: "Javascript" },
        { xd: 21, name: "Nacho", age: 33, skills: "Vue, Php" },
        { xd: 22, name: "Lian", age: 25, skills: "Vue, React" },
        { xd: 23, name: "Seba", age: 60, skills: "Node" },
        { xd: 24, name: "Martin", age: 54, skills: "Php" },
        { xd: 25, name: "Carlos", age: 18, skills: "Python" },
        { xd: 26, name: "Ariana", age: 23, skills: "Javascript" },
        { xd: 27, name: "Juan", age: 46, skills: "Php" },
        { xd: 28, name: "Pedro", age: 55, skills: "Python" },
        { xd: 29, name: "Diana", age: 66, skills: "Javascript" },
        { xd: 210, name: "Zeta", age: 21, skills: "Php" },
        { xd: 211, name: "Guillermo", age: 19, skills: "Python" },
        { xd: 212, name: "Edgardo", age: 57, skills: "Javascript" },
        { xd: 31, name: "Nacho", age: 33, skills: "Vue, Php" },
        { xd: 32, name: "Lian", age: 25, skills: "Vue, React" },
        { xd: 33, name: "Seba", age: 60, skills: "Node" },
        { xd: 34, name: "Martin", age: 54, skills: "Php" },
        { xd: 35, name: "Carlos", age: 18, skills: "Python" },
        { xd: 36, name: "Ariana", age: 23, skills: "Javascript" },
        { xd: 37, name: "Juan", age: 46, skills: "Php" },
        { xd: 38, name: "Pedro", age: 55, skills: "Python" },
        { xd: 39, name: "Diana", age: 66, skills: "Javascript" },
        { xd: 310, name: "Zeta", age: 21, skills: "Php" },
        { xd: 311, name: "Guillermo", age: 19, skills: "Python" },
        { xd: 312, name: "Edgardo", age: 57, skills: "Javascript" },
        { xd: 41, name: "Nacho", age: 33, skills: "Vue, Php" },
        { xd: 42, name: "Lian", age: 25, skills: "Vue, React" },
        { xd: 43, name: "Seba", age: 60, skills: "Node" },
        { xd: 44, name: "Martin", age: 54, skills: "Php" },
        { xd: 45, name: "Carlos", age: 18, skills: "Python" },
        { xd: 46, name: "Ariana", age: 23, skills: "Javascript" },
        { xd: 47, name: "Juan", age: 46, skills: "Php" },
        { xd: 48, name: "Pedro", age: 55, skills: "Python" },
        { xd: 49, name: "Diana", age: 66, skills: "Javascript" },
        { xd: 410, name: "Zeta", age: 21, skills: "Php" },
        { xd: 411, name: "Guillermo", age: 19, skills: "Python" },
        { xd: 412, name: "Edgardo", age: 57, skills: "Javascript" }
      ],
      filterOptions: [
        { text: "Sihdiaos", value: 1 },
        { text: "Sihdia", value: 2 },
        { text: "Sihdiaosafsdlk", value: 3 },
        { text: "Dhisahd", value: 4 },
        { text: "Dhisahdadmlk", value: 5 },
        { text: "Dhisahdas jhl", value: 6 },
        { text: "Dhisahdad lk", value: 7 },
        { text: "Iasod dhi oia", value: 8 },
        { text: "Hiosahd  man", value: 9 },
        { text: "Oiashd", value: 10 }
      ],
      filterLoading: false,
      filter: value => {
        this.filterLoading = true
        setTimeout(() => {
          let options = [
            { text: "sihdiaos", value: 1 },
            { text: "sihdia", value: 2 },
            { text: "sihdiaosafsdlk", value: 3 },
            { text: "dhisahd", value: 4 },
            { text: "dhisahdadmlk", value: 5 },
            { text: "dhisahdas jhl", value: 6 },
            { text: "dhisahdad lk", value: 7 },
            { text: "iasod dhi oia", value: 8 },
            { text: "hiosahd  man", value: 9 },
            { text: "oiashd", value: 10 }
          ]
          options = options.filter(option => option.text.indexOf(value) !== -1)
          this.filterOptions = options
          this.filterLoading = false
        }, 2000)
      },
      menu: [
        {
          // id: "inicio",
          id: "home",
          icon: "home",
          sectionLink: "https://app.alegra.com/",
          title: "INICIO",
          order: 1,
          submenu: []
        }
      ],
      open: "",
      tab: "",
      tabsPos: "left",
      grow: false,
      date: null,
      locale: "es",
      page: 0,
      itemsPerPage: 20,
      totalItems: 45,
      modalHeader: smHeading,
      modalHeaderConfig: {
        children: "Heading Header",
        props: {
          size: 3
        }
      },
      modalBody: smParagraph,
      modalBodyConfig: {
        props: {
          "no-padding": true
        },
        "no-padding": true
        // children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
      },
      modalFooter: smButton,
      modalConfig: {
        props: {
          "no-padding-header": true,
          noPaddingFooter: true
        },
        "no-padding-header": true,
        noPaddingFooter: true
      },
      modalFooterConfig: {
        children: "Button Text",
        on: {
          click: () => alert("Modal button clicked")
        }
      },
      multpleSelect: null,
      multpleSelectAutocomplete: null,
      multpleSelectNOAutocomplete: [],
      loadingg: true
    }
  },
  watch: {
    selectVal(newVal, oldVal) {
      console.log(newVal, oldVal)
    },
    checkVal(newVal, oldVal) {
      console.log("checkVal", newVal)
      console.log("checkVal old", oldVal)
    },
    checkVal2(newVal, oldVal) {
      console.log("checkVal2", newVal)
      console.log("checkVal2 old", oldVal)
    },
    checkVal3(newVal, oldVal) {
      console.log("checkVal3", newVal)
      console.log("checkVal3 old", oldVal)
    },
    radioVal(newVal, oldVal) {
      console.log("radioVal", newVal)
      console.log("radioVal old", oldVal)
    }
  },
  computed: {
    par() {
      return smParagraph
    }
  },
  methods: {
    getOptions(searchTerm) {
      const allOptions = [
        "some text a little b",
        "some text a little c",
        "si hdia",
        "si hdiaosafsdlk",
        "dhi sa hd",
        "dhi fahdadmlk",
        "dhi sahdas jhl",
        "dhi sahdad lk",
        "iasod dhi oia",
        "hiosahd  man",
        "oiashd"
      ]
      this.loadingServerSideOptions = true
      setTimeout(() => {
        console.log(searchTerm)

        if (searchTerm !== "")
          this.serverSideOptions = allOptions.filter(opt => opt.includes(searchTerm))
        else this.serverSideOptions = allOptions

        this.loadingServerSideOptions = false
      }, 1000)
    },
    testCal(evt) {
      console.log("cal event:", evt)
    },
    changePage(page) {
      console.log("page change", page)
    },
    handleItemsPerPageChange(ipp) {
      console.log("ipp change", ipp)
    },
    test(arg) {
      console.log("test", arg)
    },
    openMenu($event) {
      this.$refs.menuplus.open($event)
    },
    closeMenu(e) {
      const { target: tg } = e
      // Si el elemento clickeado es el button (+), el NO cierra el menú. Esto es para evitar falsos positivos
      if (tg.tagName === "BUTTON" && tg.classList.contains("topbar-plus")) {
        return
      }
      this.$refs.menuplus.close()
    },
    changeTablePage(page) {
      console.log("Change table page: ", page)
    },
    refreshTablePage() {
      console.log("Refresh table page")
    },
    testMethod(e) {
      console.log(e, arguments)
    },
    range(size, startAt = 0) {
      return [...Array(size).keys()].map(i => String(i + startAt))
    }
  },
  created() {
    this.largeNumberOptions = this.range(100)
    // INGRESOS:
    this.menu.push({
      // id: "ingresos",
      id: "incomes",
      icon: "input",
      sectionLink: "#",
      title: "INGRESOS",
      order: 2,
      submenu: [
        {
          id: "incomes-invoice",
          order: 1,
          link: "https://app.alegra.com/invoice",
          title: "Facturas de Venta",
          quickAction: "https://app.alegra.com/invoice/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "incomes-recurring-invoice",
          order: 2,
          link: "https://app.alegra.com/recurring-invoice",
          title: "Facturas recurrentes",
          quickAction: "https://app.alegra.com/recurring-invoice/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "incomes-transaction-retrieve-in",
          order: 3,
          link: "https://app.alegra.com/transaction/retrieve-in",
          title: "Cobranzas",
          quickAction: "https://app.alegra.com/transaction/in",
          quickActionTitle: "Nuevo"
        },
        {
          id: "incomes-credit-note",
          order: 4,
          link: "https://app.alegra.com/credit-note",
          title: "Notas de crédito",
          quickAction: "https://app.alegra.com/credit-note/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "incomes-estimate",
          order: 5,
          link: "https://app.alegra.com/estimate",
          title: "Presupuestos",
          quickAction: "https://app.alegra.com/estimate/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "incomes-remission",
          order: 6,
          link: "https://app.alegra.com/remission",
          title: "Remitos",
          quickAction: "https://app.alegra.com/remission/add",
          quickActionTitle: "Nuevo"
        }
      ]
    })

    // GASTOS:
    this.menu.push({
      // id: "gastos",
      id: "expenses",
      icon: "output",
      sectionLink: "#",
      title: "GASTOS",
      order: 3,
      submenu: [
        {
          id: "expenses-payment",
          order: 1,
          link: "https://app.alegra.com/payment",
          title: "Pagos",
          quickAction: "https://app.alegra.com/transaction/out",
          quickActionTitle: "Nuevo"
        },
        {
          id: "expenses-bill",
          order: 2,
          link: "https://app.alegra.com/bill",
          title: "Facturas de proveedores",
          quickAction: "https://app.alegra.com/bill/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "expenses-recurring-payment",
          order: 3,
          link: "https://app.alegra.com/recurring-payment",
          title: "Pagos Recurrentes",
          quickAction: "https://app.alegra.com/recurring-payment/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "expenses-debit-note",
          order: 4,
          link: "https://app.alegra.com/debit-note",
          title: "Notas débito",
          quickAction: "https://app.alegra.com/debit-note/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "expenses-purchase-order",
          order: 5,
          link: "https://app.alegra.com/purchase-order",
          title: "Órdenes de compra",
          quickAction: "https://app.alegra.com/purchase-order/add",
          quickActionTitle: "Nuevo"
        }
      ]
    })

    // CONTACTOS:
    this.menu.push({
      // id: "contactos",
      id: "contacts",
      icon: "contacts",
      sectionLink: "#",
      title: "CONTACTOS",
      order: 4,
      submenu: [
        {
          id: "contacts-client",
          order: 1,
          link: "https://app.alegra.com/client",
          title: "Todos",
          quickAction: "https://app.alegra.com/client/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "contacts-client-view-clients",
          order: 2,
          link: "https://app.alegra.com/client/view-clients",
          title: "Clientes",
          quickAction: "https://app.alegra.com/client/add/type/client",
          quickActionTitle: "Nuevo"
        },
        {
          id: "contacts-client-view-providers",
          order: 3,
          link: "https://app.alegra.com/client/view-providers",
          title: "Proveedores",
          quickAction: "https://app.alegra.com/client/add/type/provider",
          quickActionTitle: "Nuevo"
        }
      ]
    })

    // INVENTARIO:
    this.menu.push({
      // id: "inventario",
      id: "stock",
      icon: "stock",
      sectionLink: "#",
      title: "INVENTARIO",
      order: 5,
      submenu: [
        {
          id: "stock-item",
          order: 1,
          link: "https://app.alegra.com/item",
          title: "Productos de venta",
          quickAction: "https://app.alegra.com/item/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "stock-report-inventory",
          order: 2,
          link: "https://app.alegra.com/report/inventory",
          title: "Valor de Inventario"
        },
        {
          id: "stock-inventory-adjustment",
          order: 3,
          link: "https://app.alegra.com/inventory-adjustment",
          title: "Ajustes de Inventario",
          quickAction: "https://app.alegra.com/inventory-adjustment/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "stock-item-items-management",
          order: 4,
          link: "https://app.alegra.com/item/items-management",
          title: "Gestión de Productos"
        },
        {
          id: "stock-price-list",
          order: 5,
          link: "https://app.alegra.com/price-list",
          title: "Listas de precios",
          quickAction: "https://app.alegra.com/price-list/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "stock-warehouse",
          order: 6,
          link: "https://app.alegra.com/warehouse",
          title: "Depósitos",
          quickAction: "https://app.alegra.com/warehouse/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "stock-item-category",
          order: 7,
          link: "https://app.alegra.com/item-category",
          title: "Categorías",
          quickAction: "https://app.alegra.com/item-category/add",
          quickActionTitle: "Nuevo"
        }
      ]
    })

    // BANCOS:
    this.menu.push({
      // id: "bancos",
      id: "banks",
      icon: "banks",
      sectionLink: "https://app.alegra.com/account",
      title: "BANCOS",
      order: 6,
      submenu: []
    })

    // CONTABILIDAD:
    this.menu.push({
      // id: "contabilidad",
      id: "accounting",
      icon: "accounting",
      sectionLink: "#",
      title: "CONTABILIDAD",
      order: 7,
      submenu: [
        {
          id: "accounting-category",
          order: 1,
          link: "https://app.alegra.com/category",
          title: "Catálogo de cuentas"
        },
        {
          id: "accounting-journal",
          order: 2,
          link: "https://app.alegra.com/journal",
          title: "Ajustes contables",
          quickAction: "https://app.alegra.com/journal/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "accounting-ledger",
          order: 3,
          link: "https://app.alegra.com/ledger",
          title: "Asientos contables"
        },
        {
          id: "accounting-report-accounting",
          order: 4,
          link: "https://app.alegra.com/report/accounting",
          title: "Reportes contables"
        }
      ]
    })

    // REPORTES:
    this.menu.push({
      // id: "reportes",
      id: "reports",
      icon: "reports",
      sectionLink: "https://app.alegra.com/report",
      title: "REPORTES",
      order: 8,
      submenu: []
    })

    // REPORTES:
    this.menu.push({
      id: "pos",
      icon: "pos",
      sectionLink: "#",
      title: "POS",
      order: 9,
      submenu: []
    })

    // CONFIGURACION:
    this.menu.push({
      // id: "configuracion",
      id: "settings",
      icon: "settings",
      sectionLink: "https://app.alegra.com/configuration",
      title: "CONFIGURACIÓN",
      order: 10,
      submenu: []
    })

    // HIDDEN LINKS
    this.menu.push({
      hidden: true,
      id: "HIDDEN",
      icon: "help-outline",
      sectionLink: "#",
      title: "HIDDEN",
      submenu: [
        {
          id: "hidden-bank-add",
          order: 1,
          link: "https://app.alegra.com/account/add",
          title: "Nuevo Banco",
          quickAction: "https://app.alegra.com/account/add",
          quickActionTitle: "Nuevo"
        },
        {
          id: "hidden-seller-add",
          order: 2,
          link: "https://app.alegra.com/seller/add",
          title: "Nuevo Vendedor",
          quickAction: "https://app.alegra.com/seller/add",
          quickActionTitle: "Nuevo"
        }
      ]
    })
  },
  mounted() {
    window.app = this
    this.$smAlert({
      title: "Test!!! <br><strong>HOLA!</strong>",
      message: "this is only a <stike>TEST</strike><strong>HOLA!</strong>"
    })
    this.$smAlert({ title: "Test!!!", message: "test <ul><li>1</li><li>2</li><li>3</li></ul>" })
    this.$smAlert({ title: "Test!!!", message: "test" })
    setTimeout(() => {
      this.loadingg = false
    }, 3000)

    /* const that = this
    this.$smOpenModal({
      headerText: "<strong>hola!</strong>",
      bodyText:
        "<strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><strong>hola!</strong><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><strong>hola!</strong><strong>hola!</strong><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>",
      headerConfig: {
        props: { padding: "50px" }
      },
      footer: footerModalSimple,
      footerEvents: {
        ok: () => {
          console.log("Ok clicked!")
        },
        hola: msg => {
          console.log("msg", msg)
        }
      },
      footerConfig: {
        props: {
          okFn(form, $v) {
            this.$emit("hola", "hola!!!")
            // that.$smSetLoadingModal(true)
            // setTimeout(() => {
            //   that.$smSetLoadingModal(false)
            // }, 2500)
          },
          loading: false,
          buttonText: "HOLA!"
        }
      },
      loading: false
    })

    setTimeout(() => {
      this.$smSetOptionsModal({
        footerConfig: {
          props: {
            loading: true
          }
        }
      })
    }, 2500)

    setTimeout(() => {
      this.$smSetLoadingModal(false)
    }, 4500) */
  }
})
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin: 60px auto 0;
  width: 90%;
}
.center {
  width: 400px;
  border: 1px solid red;
}
</style>

<style lang="scss">
body {
  background-color: #f4f5fb;
}
</style>
